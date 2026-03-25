'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash')

export interface LeadFormData {
    nombre: string
    email: string
    telefono: string
    pais: string
    tratamiento: string
    mensaje: string
    captchaToken?: string | null
}

export interface ActionResult {
    success: boolean
    message: string
    error?: string
}

function resolveCrmWebhookUrl(): string | null {
    const candidates = [
        process.env.CRM_WEBHOOK_URL,
        process.env.LEADS_WEBHOOK_URL,
        process.env.CRM_LEAD_WEBHOOK_URL,
    ]

    const valid = candidates.find((value) => typeof value === 'string' && value.trim().length > 0)
    return valid?.trim() || null
}

async function sendLeadToCrm(formData: LeadFormData): Promise<{ delivered: boolean; error?: string }> {
    const webhookUrl = resolveCrmWebhookUrl()
    if (!webhookUrl) {
        return { delivered: false, error: 'CRM_WEBHOOK_NOT_CONFIGURED' }
    }

    const payload = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono?.trim() || null,
        pais: formData.pais || null,
        tratamiento: formData.tratamiento || null,
        mensaje: formData.mensaje?.trim() || null,
        source: 'fertilitycentercancun_web_form',
        submittedAt: new Date().toISOString(),
    }

    const maxAttempts = 2

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        let timeoutId: ReturnType<typeof setTimeout> | undefined
        try {
            const controller = new AbortController()
            timeoutId = setTimeout(() => controller.abort(), 8000)

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(process.env.CRM_WEBHOOK_TOKEN
                        ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_TOKEN}` }
                        : {}),
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
                cache: 'no-store',
            })

            if (response.ok) {
                return { delivered: true }
            }

            const errorBody = await response.text().catch(() => '')
            if (attempt === maxAttempts) {
                return {
                    delivered: false,
                    error: `CRM_HTTP_${response.status}${errorBody ? `: ${errorBody.slice(0, 300)}` : ''}`,
                }
            }
        } catch (error) {
            if (attempt === maxAttempts) {
                return {
                    delivered: false,
                    error: error instanceof Error ? error.message : 'CRM_REQUEST_FAILED',
                }
            }
        } finally {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }

    return { delivered: false, error: 'CRM_UNKNOWN_ERROR' }
}

export async function submitLead(formData: LeadFormData): Promise<ActionResult> {
    try {
        // 1. Verificar CAPTCHA primero
        const secretKey = process.env.TURNSTILE_SECRET_KEY;
        const isTurnstileTestSecret = secretKey === '1x0000000000000000000000000000000AA';
        const isProduction = process.env.NODE_ENV === 'production';
        const isCaptchaEnabled = Boolean(secretKey && !isTurnstileTestSecret);

        if (isProduction && !isCaptchaEnabled) {
            return {
                success: false,
                message: 'Sistema anti-spam no configurado. Contacte al administrador del sitio.',
                error: 'CAPTCHA_UNCONFIGURED'
            }
        }

        if (isCaptchaEnabled) {
            if (!formData.captchaToken) {
                return {
                    success: false,
                    message: 'Verificación de seguridad requerida',
                    error: 'CAPTCHA_REQUIRED'
                }
            }

            // Validar contra la API de Cloudflare
            const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                body: new URLSearchParams({
                    secret: secretKey || '',
                    response: formData.captchaToken,
                }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyData.success) {
                return {
                    success: false,
                    message: 'La verificación de seguridad ha fallado. Por favor intente de nuevo.',
                    error: 'CAPTCHA_FAILED'
                }
            }
        }

        // 2. Validación básica del lado del servidor
        if (!formData.nombre || !formData.email) {
            return {
                success: false,
                message: 'Nombre y email son requeridos',
                error: 'VALIDATION_ERROR'
            }
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            return {
                success: false,
                message: 'Por favor ingrese un email válido',
                error: 'INVALID_EMAIL'
            }
        }

        const supabase = await createClient()

        if (!supabase) {
            return {
                success: false,
                message: 'Error de configuración del servidor'
            }
        }

        // Insertar lead en la base de datos
        const { error } = await supabase
            .from('leads')
            .insert([
                {
                    nombre: formData.nombre.trim(),
                    email: formData.email.trim().toLowerCase(),
                    telefono: formData.telefono?.trim() || null,
                    pais: formData.pais || null,
                    tratamiento: formData.tratamiento || null,
                    mensaje: formData.mensaje?.trim() || null,
                }
            ])

        if (error) {
            console.error('Error al insertar lead:', error)
            return {
                success: false,
                message: 'Hubo un error al enviar su consulta. Por favor intente nuevamente.',
                error: error.message
            }
        }

        // Entregar lead al CRM (si está configurado).
        const crmResult = await sendLeadToCrm(formData)
        const requireCrmDelivery = process.env.REQUIRE_CRM_DELIVERY === 'true'

        if (!crmResult.delivered) {
            console.error('No se pudo entregar lead al CRM:', crmResult.error)
            if (requireCrmDelivery) {
                return {
                    success: false,
                    message: 'Recibimos tus datos, pero no pudimos procesar el registro en CRM. Intenta nuevamente en unos minutos.',
                    error: crmResult.error || 'CRM_DELIVERY_FAILED'
                }
            }
        }

        // Obtener el email de notificación configurado
        let notificationEmail = null;
        try {
            const { data: settings } = await supabase
                .from('site_settings')
                .select('notification_email')
                .eq('id', 1)
                .single();

            if (settings && settings.notification_email) {
                notificationEmail = settings.notification_email;
            }
        } catch (settingsError) {
            console.error('Error fetching notification settings:', settingsError);
        }

        // Enviar email si hay un destinatario configurado y la API key de Resend existe
        if (notificationEmail && process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: 'Fertility Center Cancun <onboarding@resend.dev>',
                    to: notificationEmail,
                    subject: `Nuevo Lead: ${formData.nombre} - ${formData.tratamiento || 'Consulta general'}`,
                    html: `
                        <h2>Nueva Solicitud de Consulta</h2>
                        <p>Se ha registrado un nuevo contacto desde el sitio web.</p>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Nombre:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${formData.nombre}</td></tr>
                            <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Email:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
                            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Teléfono:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${formData.telefono || 'No especificado'}</td></tr>
                            <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>País:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${formData.pais || 'No especificado'}</td></tr>
                            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Tratamiento de Interés:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${formData.tratamiento || 'No especificado'}</td></tr>
                        </table>
                        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #8b5cf6;">
                            <strong>Mensaje del paciente:</strong><br/>
                            <p style="white-space: pre-wrap;">${formData.mensaje || 'Vació.'}</p>
                        </div>
                        <p style="margin-top: 30px; font-size: 12px; color: #64748b;">Este mensaje fue generado automáticamente por Fertility Center Cancun.</p>
                    `
                });
            } catch (emailError) {
                console.error('Error enviando email de notificación:', emailError);
                // No retornamos error al usuario porque su registro en la BD fue exitoso
            }
        }

        return {
            success: true,
            message: 'Gracias por contactarnos. Nuestro equipo médico se pondrá en contacto en menos de 24 horas.'
        }

    } catch (error) {
        console.error('Error inesperado:', error)
        return {
            success: false,
            message: 'Error de conexión. Por favor verifique su internet e intente nuevamente.',
            error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
        }
    }
}
