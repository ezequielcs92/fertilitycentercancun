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

/**
 * Copia a AltraVita de las solicitudes del catálogo de donantes.
 *
 * El banco de donantes es suyo, así que necesitan ver cada consulta para
 * confirmar disponibilidad. Cada tipo de donante tiene su propio buzón.
 *
 * El mapa está aquí, en el servidor, y no llega del formulario: si el
 * destinatario viajara en la petición, cualquiera podría usar el formulario
 * para mandar correos a la dirección que quisiera.
 */
const DONOR_CATALOG_CC: Record<DonorLeadType, string> = {
    egg: 'vk_lead_do@altravita.ru',
    sperm: 'vk_lead_sperm@altravita.ru',
}

export type DonorLeadType = 'egg' | 'sperm'

function resolveDonorCc(donorType: DonorLeadType): string[] {
    const override = parseEmailList(
        process.env[donorType === 'egg' ? 'DONOR_LEAD_CC_EGG' : 'DONOR_LEAD_CC_SPERM'],
    )

    return override.length > 0 ? override : [DONOR_CATALOG_CC[donorType]]
}

/**
 * Buzón de la clínica para las consultas del catálogo de donantes.
 *
 * Por defecto van al mismo sitio que cualquier otro lead. Si la clínica lleva
 * las consultas de donación en una dirección aparte, basta con rellenar
 * `DONOR_LEAD_TO`: no hace falta tocar el código ni volver a desplegar el
 * sitio, solo reiniciar el contenedor.
 */
function resolveDonorTo(): string[] {
    return parseEmailList(process.env.DONOR_LEAD_TO)
}

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

export interface NotificationOptions {
    /**
     * Tipo de donante cuando el lead viene del catálogo. Añade en copia el
     * buzón que corresponda de AltraVita.
     */
    donorType?: DonorLeadType
}

export function resolveNotificationRecipients(
    configuredEmail?: string | null,
    options: NotificationOptions = {},
): NotificationRecipients {
    // Un lead del catálogo puede ir a un buzón propio de la clínica; si no se
    // configura, sigue el mismo camino que el resto de formularios.
    const donorTo = options.donorType ? resolveDonorTo() : []
    const overrideTo = donorTo.length > 0 ? donorTo : parseEmailList(process.env.LEAD_NOTIFICATION_TO)
    const to = overrideTo.length > 0 ? overrideTo : [DEFAULT_NOTIFICATION_TO]

    const overrideCc = parseEmailList(process.env.LEAD_NOTIFICATION_CC)
    const baseCc = overrideCc.length > 0 ? overrideCc : DEFAULT_NOTIFICATION_CC

    const inTo = new Set(to.map((email) => email.toLowerCase()))
    const cc: string[] = []

    const extras = [
        ...baseCc,
        configuredEmail,
        ...parseEmailList(process.env.LEAD_NOTIFICATION_EMAILS),
        ...(options.donorType ? resolveDonorCc(options.donorType) : []),
    ]

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
