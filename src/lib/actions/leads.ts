'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveNotificationRecipients } from '@/lib/notifications'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash')

/**
 * Escapa texto proveniente del formulario antes de interpolarlo en el HTML del
 * correo. Sin esto, un lead puede inyectar marcado (enlaces de phishing, por
 * ejemplo) en la bandeja del equipo comercial.
 */
function escapeHtml(value: string | null | undefined): string {
    if (!value) return ''
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}


export interface LeadFormData {
    nombre: string
    email: string
    telefono: string
    pais: string
    tratamiento: string
    mensaje: string
    /** Promoción concreta solicitada, cuando el lead viene del formulario de promociones. */
    promocion?: string
    /** Atribución capturada en la URL de entrada (utm_*, gclid, referrer). */
    utm?: Record<string, string | undefined>
    locale?: 'es' | 'en'
    captchaToken?: string | null
}

/**
 * Nombres de los campos personalizados en Upnify.
 *
 * Deben coincidir EXACTAMENTE con la columna "etiqueta" de
 * Ajustes > Campos personalizados del CRM: es el nombre real en su base de
 * datos. Si no coincide, Upnify descarta el valor sin devolver error.
 *
 * No hay valores por defecto a propósito. `pais` y `tratamiento` parecen
 * razonables pero no funcionan: `pais` es un campo de sistema de tipo lista
 * (por eso todos los leads llegaban como "México"). Mientras un campo no esté
 * configurado, su dato viaja en `comentarios` para no perderlo.
 */
interface UpnifyFieldMap {
    treatment?: string
    country?: string
    promotion?: string
    utm?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    utmTerm?: string
    utmContent?: string
}

/**
 * El CRM muestra las etiquetas entre corchetes ([TRATAMIENTODEINTERES]), pero la
 * API espera el nombre pelado. Se normaliza aquí para que dé igual cómo se copie
 * el valor a la variable de entorno.
 */
function normalizeFieldName(value: string | undefined): string | undefined {
    const clean = value?.trim().replace(/^\[|\]$/g, '').trim()
    return clean || undefined
}

function readUpnifyFieldMap(locale: 'es' | 'en'): UpnifyFieldMap {
    const suffix = locale === 'en' ? 'EN' : 'ES'

    /**
     * Upnify duplica algunos campos por idioma (por ejemplo
     * [QUETEDESCRIBEMEJOR] y [WHATDESCRIBESYOUBEST]). Por eso se busca primero
     * la variante del idioma y, si no existe, se usa el campo único.
     */
    const read = (name: string) =>
        normalizeFieldName(process.env[`${name}_${suffix}`]) || normalizeFieldName(process.env[name])

    return {
        treatment: read('UPNIFY_TREATMENT_FIELD'),
        country: read('UPNIFY_COUNTRY_FIELD'),
        promotion: read('UPNIFY_PROMOTION_FIELD'),
        utm: read('UPNIFY_UTM_FIELD'),
        utmSource: read('UPNIFY_UTM_SOURCE_FIELD'),
        utmMedium: read('UPNIFY_UTM_MEDIUM_FIELD'),
        utmCampaign: read('UPNIFY_UTM_CAMPAIGN_FIELD'),
        utmTerm: read('UPNIFY_UTM_TERM_FIELD'),
        utmContent: read('UPNIFY_UTM_CONTENT_FIELD'),
    }
}

export interface ActionResult {
    success: boolean
    message: string
    error?: string
}

/**
 * Base para construir la URL a partir de un token suelto.
 *
 * Las integraciones de tipo "API - Sistemas externos" de esta cuenta usan
 * `https://api.salesup.com/integraciones/<token>`, sin el segmento `/v4/` que sí
 * llevan las de Elementor. Preferir siempre las variables *_URL_*: son las que
 * aparecen tal cual en el CRM y no dependen de adivinar el formato.
 */
const UPNIFY_API_BASE = (process.env.UPNIFY_API_BASE_URL?.trim() || 'https://api.salesup.com/integraciones').replace(/\/$/, '')

function resolveUpnifyIntegrationUrl(locale: 'es' | 'en'): string | null {
    const suffix = locale === 'en' ? 'EN' : 'ES'
    const directUrl = process.env[`UPNIFY_INTEGRATION_URL_${suffix}`]?.trim()
    if (directUrl) {
        return directUrl
    }

    const integrationToken = process.env[`UPNIFY_INTEGRATION_TOKEN_${suffix}`]?.trim()
    if (integrationToken) {
        return `${UPNIFY_API_BASE}/${integrationToken}`
    }

    // Mantiene operativa la integración existente mientras se configuran las dos nuevas.
    const legacyUrl = process.env.UPNIFY_INTEGRATION_URL?.trim()
    if (legacyUrl) {
        return legacyUrl
    }

    const legacyToken = process.env.UPNIFY_INTEGRATION_TOKEN?.trim()
    if (legacyToken) {
        return `${UPNIFY_API_BASE}/${legacyToken}`
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

const warnedMissingFields = new Set<string>()

/** Avisa una sola vez por proceso para no inundar los logs en cada lead. */
function warnMissingField(envVar: string, dato: string) {
    if (warnedMissingFields.has(envVar)) return
    warnedMissingFields.add(envVar)
    console.warn(
        `[crm] ${envVar} sin configurar: "${dato}" se enviará dentro de comentarios ` +
        'en lugar de su campo propio en Upnify.'
    )
}

/**
 * Arma el cuerpo que se envía a la integración de Upnify.
 *
 * Cada dato va a su campo personalizado si está mapeado en el entorno; si no,
 * cae en `comentarios` para no perderlo. `origen` y `fase` NO se envían: los
 * define cada integración desde el CRM, y mandarlos desde aquí pisaría esa
 * configuración (usa UPNIFY_ORIGEN solo si necesitas forzarlo).
 */
function buildUpnifyPayload(formData: LeadFormData, locale: 'es' | 'en'): Record<string, string | undefined> {
    const fields = readUpnifyFieldMap(locale)
    const { nombre, apellidos } = splitName(formData.nombre)
    const telefono = formData.telefono?.trim() || undefined

    const payload: Record<string, string | undefined> = {
        nombre,
        apellidos,
        correo: formData.email.trim().toLowerCase(),
        telefono,
        movil: telefono,
    }

    // Datos que no encuentran campo propio y acaban en comentarios.
    const sinCampo: string[] = []

    const assign = (fieldName: string | undefined, value: string | undefined, envVar: string, etiqueta: string) => {
        if (!value) return
        if (fieldName) {
            payload[fieldName] = value
            return
        }
        warnMissingField(envVar, etiqueta)
        sinCampo.push(`${etiqueta}: ${value}`)
    }

    assign(fields.treatment, formData.tratamiento || undefined, 'UPNIFY_TREATMENT_FIELD', 'Tratamiento de interes')
    assign(fields.country, formData.pais || undefined, 'UPNIFY_COUNTRY_FIELD', 'Pais')
    assign(fields.promotion, formData.promocion || undefined, 'UPNIFY_PROMOTION_FIELD', 'Promocion')

    const utm = formData.utm || {}
    const utmPairs = Object.entries(utm).filter(([, value]) => Boolean(value)) as Array<[string, string]>

    if (utmPairs.length > 0) {
        const perParameter: Record<string, string | undefined> = {
            utm_source: fields.utmSource,
            utm_medium: fields.utmMedium,
            utm_campaign: fields.utmCampaign,
            utm_term: fields.utmTerm,
            utm_content: fields.utmContent,
        }

        const pendientes = utmPairs.filter(([key, value]) => {
            const target = perParameter[key]
            if (!target) return true
            payload[target] = value
            return false
        })

        if (pendientes.length > 0) {
            const resumen = pendientes.map(([key, value]) => `${key}=${value}`).join(' | ')
            if (fields.utm) {
                payload[fields.utm] = resumen
            } else {
                sinCampo.push(`Atribucion: ${resumen}`)
            }
        }
    }

    // Con integraciones separadas por idioma la etiqueta la pone Upnify. El
    // idioma solo se anota si se está usando la integración única heredada.
    const usaIntegracionPorIdioma = Boolean(
        process.env[`UPNIFY_INTEGRATION_URL_${locale === 'en' ? 'EN' : 'ES'}`]?.trim() ||
        process.env[`UPNIFY_INTEGRATION_TOKEN_${locale === 'en' ? 'EN' : 'ES'}`]?.trim()
    )
    if (!usaIntegracionPorIdioma) {
        sinCampo.push(`Idioma: ${locale === 'en' ? 'Ingles' : 'Espanol'}`)
    }

    const mensaje = formData.mensaje?.trim()
    payload.comentarios = [mensaje || null, sinCampo.length > 0 ? sinCampo.join('\n') : null]
        .filter(Boolean)
        .join('\n\n') || undefined

    const origen = process.env.UPNIFY_ORIGEN?.trim()
    if (origen) {
        payload.origen = origen
    }

    return payload
}

async function sendLeadToUpnify(formData: LeadFormData): Promise<{ delivered: boolean; error?: string }> {
    const locale = formData.locale === 'en' ? 'en' : 'es'
    const upnifyUrl = resolveUpnifyIntegrationUrl(locale)
    if (!upnifyUrl) {
        return { delivered: false, error: 'UPNIFY_NOT_CONFIGURED' }
    }

    const upnifyPayload = buildUpnifyPayload(formData, locale)

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
        promocion: formData.promocion || null,
        mensaje: formData.mensaje?.trim() || null,
        utm: formData.utm && Object.keys(formData.utm).length > 0 ? formData.utm : null,
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

        const { to: notificationTo, cc: notificationCc } = resolveNotificationRecipients(configuredNotificationEmail)

        const attributionSummary = Object.entries(formData.utm || {})
            .filter(([, value]) => Boolean(value))
            .map(([key, value]) => `${key}=${value}`)
            .join(' | ')

        // Enviar email si hay destinatarios y la API key de Resend existe.
        if (notificationTo.length > 0 && process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || 'Fertility Center Cancun <onboarding@resend.dev>',
                    to: notificationTo,
                    ...(notificationCc.length > 0 ? { cc: notificationCc } : {}),
                    subject: `${crmResult.delivered ? 'Nuevo Lead' : '[NO ENTRÓ AL CRM] Nuevo Lead'}: ${formData.nombre} - ${formData.tratamiento || 'Consulta general'}`,
                    html: `
                        <h2>Nueva Solicitud de Consulta</h2>
                        ${crmResult.delivered ? '' : `
                        <div style="margin: 16px 0; padding: 14px; background-color: #fef2f2; border-left: 4px solid #dc2626; color: #7f1d1d;">
                            <strong>Este prospecto NO se registró en el CRM.</strong>
                            <p style="margin: 6px 0 0;">Hay que darlo de alta a mano en Upnify. Causa: ${escapeHtml(crmResult.error || 'desconocida')}.</p>
                            <p style="margin: 6px 0 0; font-size: 12px;">Si el correo del paciente ya existe como prospecto, Upnify lo rechaza porque el campo Correo es único.</p>
                        </div>`}
                        <p>Se ha registrado un nuevo contacto desde el sitio web.</p>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Nombre:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${escapeHtml(formData.nombre)}</td></tr>
                            <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Email:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></td></tr>
                            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Teléfono:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${escapeHtml(formData.telefono) || 'No especificado'}</td></tr>
                            <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>País:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${escapeHtml(formData.pais) || 'No especificado'}</td></tr>
                            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Tratamiento de Interés:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${escapeHtml(formData.tratamiento) || 'No especificado'}</td></tr>
                            ${formData.promocion ? `<tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Promoción:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${escapeHtml(formData.promocion)}</td></tr>` : ''}
                            <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Idioma:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${formData.locale === 'en' ? 'Inglés' : 'Español'}</td></tr>
                            ${attributionSummary ? `<tr style="background-color: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Atribución:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${escapeHtml(attributionSummary)}</td></tr>` : ''}
                        </table>
                        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #8b5cf6;">
                            <strong>Mensaje del paciente:</strong><br/>
                            <p style="white-space: pre-wrap;">${escapeHtml(formData.mensaje) || 'Vacío.'}</p>
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
