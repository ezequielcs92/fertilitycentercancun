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
    locale?: 'es' | 'en'
    captchaToken?: string | null
}

export interface ActionResult {
    success: boolean
    message: string
    error?: string
}

function resolveUpnifyIntegrationUrl(locale: 'es' | 'en'): string | null {
    const suffix = locale === 'en' ? 'EN' : 'ES'
    const directUrl = process.env[`UPNIFY_INTEGRATION_URL_${suffix}`]?.trim()
    if (directUrl) {
        return directUrl
    }

    const integrationToken = process.env[`UPNIFY_INTEGRATION_TOKEN_${suffix}`]?.trim()
    if (integrationToken) {
        return `https://api.upnify.com/v4/integraciones/${integrationToken}`
    }

    // Mantiene operativa la integración existente mientras se configuran las dos nuevas.
    const legacyUrl = process.env.UPNIFY_INTEGRATION_URL?.trim()
    if (legacyUrl) {
        return legacyUrl
    }

    const legacyToken = process.env.UPNIFY_INTEGRATION_TOKEN?.trim()
    if (legacyToken) {
        return `https://api.upnify.com/v4/integraciones/${legacyToken}`
    }

    return null
}

function splitName(fullName: string): { nombre: string; apellidos?: string } {
    const normalized = fullName.trim().replace(/\s+/g, ' ')
    const [nombre, ...rest] = normalized.split(' ')

    return {
        nombre: nombre || normalized,
        apellidos: rest.length > 0 ? rest.join(' ') : undefined,
    }
}

function parseUpnifyCode(responseBody: unknown): number | null {
    const body = Array.isArray(responseBody) ? responseBody[0] : responseBody
    if (!body || typeof body !== 'object') {
        return null
    }

    const maybeCode = (body as { code?: unknown }).code
    return typeof maybeCode === 'number' ? maybeCode : null
}

async function sendLeadToUpnify(formData: LeadFormData): Promise<{ delivered: boolean; error?: string }> {
    const locale = formData.locale === 'en' ? 'en' : 'es'
    const upnifyUrl = resolveUpnifyIntegrationUrl(locale)
    if (!upnifyUrl) {
        return { delivered: false, error: 'UPNIFY_NOT_CONFIGURED' }
    }

    const { nombre, apellidos } = splitName(formData.nombre)
    const treatmentField = process.env.UPNIFY_TREATMENT_FIELD?.trim() || 'tratamiento'
    const countryField = process.env.UPNIFY_COUNTRY_FIELD?.trim() || 'pais'
    const upnifyPayload: Record<string, string | undefined> = {
        nombre,
        apellidos,
        correo: formData.email.trim().toLowerCase(),
        telefono: formData.telefono?.trim() || undefined,
        movil: formData.telefono?.trim() || undefined,
        [countryField]: formData.pais || undefined,
        [treatmentField]: formData.tratamiento || undefined,
        comentarios: [
            formData.tratamiento ? `Tratamiento: ${formData.tratamiento}` : null,
            formData.pais ? `Pais: ${formData.pais}` : null,
            `Idioma: ${locale === 'en' ? 'Ingles' : 'Español'}`,
            formData.mensaje?.trim() ? `Mensaje: ${formData.mensaje.trim()}` : null,
            'Origen: formulario web fertilitycentercancun.com',
        ].filter(Boolean).join('\n'),
        origen: 'Sitio Web',
    }

    const maxAttempts = 2

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        let timeoutId: ReturnType<typeof setTimeout> | undefined
        try {
            const controller = new AbortController()
            timeoutId = setTimeout(() => controller.abort(), 8000)

            const response = await fetch(upnifyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(upnifyPayload),
                signal: controller.signal,
                cache: 'no-store',
            })

            const responseText = await response.text().catch(() => '')
            const responseBody = responseText ? JSON.parse(responseText) : null

            if (!response.ok) {
                if (attempt === maxAttempts) {
                    return {
                        delivered: false,
                        error: `UPNIFY_HTTP_${response.status}${responseText ? `: ${responseText.slice(0, 300)}` : ''}`,
                    }
                }
                continue
            }

            const code = parseUpnifyCode(responseBody)
            if (code === null || code === 0) {
                return { delivered: true }
            }

            if (attempt === maxAttempts) {
                return {
                    delivered: false,
                    error: `UPNIFY_CODE_${code}`,
                }
            }
        } catch (error) {
            if (attempt === maxAttempts) {
                return {
                    delivered: false,
                    error: error instanceof Error ? error.message : 'UPNIFY_REQUEST_FAILED',
                }
            }
        } finally {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }

    return { delivered: false, error: 'UPNIFY_UNKNOWN_ERROR' }
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
        locale: formData.locale === 'en' ? 'en' : 'es',
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
            // CRM y correo son canales independientes; continuamos para evitar perder el lead.
        }

        // Entregar lead al CRM: primero Upnify (si está configurado), luego webhook genérico.
        const upnifyResult = await sendLeadToUpnify(formData)
        const crmResult = upnifyResult.delivered
            ? upnifyResult
            : await sendLeadToCrm(formData)
        const requireCrmDelivery = process.env.REQUIRE_CRM_DELIVERY === 'true'

        if (!crmResult.delivered) {
            console.error('No se pudo entregar lead al CRM:', crmResult.error)
        }

        // Obtener destinatarios configurados y conservar las copias corporativas acordadas.
        let configuredNotificationEmail: string | null = null;
        try {
            const { data: settings } = await supabase
                .from('site_settings')
                .select('notification_email')
                .eq('id', 1)
                .single();

            if (settings && settings.notification_email) {
                configuredNotificationEmail = settings.notification_email;
            }
        } catch (settingsError) {
            console.error('Error fetching notification settings:', settingsError);
        }

        const notificationEmails = Array.from(new Set([
            'comercial@afcc.com.mx',
            'info@fertilitycentercancun.com.mx',
            configuredNotificationEmail,
            ...(process.env.LEAD_NOTIFICATION_EMAILS || '').split(',').map((email) => email.trim()),
        ].filter((email): email is string => Boolean(email))))

        // Enviar email si hay destinatarios y la API key de Resend existe.
        if (notificationEmails.length > 0 && process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || 'Fertility Center Cancun <onboarding@resend.dev>',
                    to: notificationEmails,
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
                            <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Idioma:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${formData.locale === 'en' ? 'Inglés' : 'Español'}</td></tr>
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

        if (!crmResult.delivered && requireCrmDelivery) {
            return {
                success: false,
                message: formData.locale === 'en'
                    ? 'We received your information, but could not process the CRM registration. Please try again in a few minutes.'
                    : 'Recibimos tus datos, pero no pudimos procesar el registro en CRM. Intenta nuevamente en unos minutos.',
                error: crmResult.error || 'CRM_DELIVERY_FAILED'
            }
        }

        return {
            success: true,
            message: formData.locale === 'en'
                ? 'Thank you for contacting us. Our medical team will contact you within 24 hours.'
                : 'Gracias por contactarnos. Nuestro equipo médico se pondrá en contacto en menos de 24 horas.'
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
