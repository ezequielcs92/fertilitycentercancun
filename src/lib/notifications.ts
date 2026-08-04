/**
 * Destinatarios del aviso por correo de cada lead.
 *
 * Acordado con el cliente: el formulario se envía a comercial@afcc.com.mx y se
 * manda copia a info@fertilitycentercancun.com.mx. El correo configurado en el
 * panel de administración y LEAD_NOTIFICATION_EMAILS se suman como copias.
 *
 * Vive fuera de `leads.ts` porque ese archivo es `'use server'` y allí solo se
 * pueden exportar funciones asíncronas.
 */

const DEFAULT_NOTIFICATION_TO = 'comercial@afcc.com.mx'
const DEFAULT_NOTIFICATION_CC = ['info@fertilitycentercancun.com.mx']

export function parseEmailList(value: string | undefined): string[] {
    return (value || '')
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean)
}

export interface NotificationRecipients {
    to: string[]
    cc: string[]
}

export function resolveNotificationRecipients(configuredEmail?: string | null): NotificationRecipients {
    const overrideTo = parseEmailList(process.env.LEAD_NOTIFICATION_TO)
    const to = overrideTo.length > 0 ? overrideTo : [DEFAULT_NOTIFICATION_TO]

    const overrideCc = parseEmailList(process.env.LEAD_NOTIFICATION_CC)
    const baseCc = overrideCc.length > 0 ? overrideCc : DEFAULT_NOTIFICATION_CC

    const inTo = new Set(to.map((email) => email.toLowerCase()))
    const cc: string[] = []

    const extras = [...baseCc, configuredEmail, ...parseEmailList(process.env.LEAD_NOTIFICATION_EMAILS)]

    for (const email of extras) {
        if (!email) continue
        const normalized = email.toLowerCase()
        // Repetir un destinatario entre `to` y `cc` duplica el correo en la bandeja.
        if (inTo.has(normalized)) continue
        if (cc.some((existing) => existing.toLowerCase() === normalized)) continue
        cc.push(email)
    }

    return { to, cc }
}
