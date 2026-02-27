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
