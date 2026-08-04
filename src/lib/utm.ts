/**
 * Captura y persistencia de parámetros UTM.
 *
 * El anuncio suele aterrizar en una página de tratamiento y el formulario está
 * en /contacto, así que los parámetros se guardan en sessionStorage al llegar y
 * se leen al enviar. Sin esto se pierde la atribución en el salto.
 */

const STORAGE_KEY = 'afcc_utm'

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export type UtmKey = (typeof UTM_KEYS)[number]
export type UtmParams = Partial<Record<UtmKey | 'gclid' | 'referrer', string>>

/** Parámetros de atribución que también nos interesan aunque no sean utm_*. */
const EXTRA_KEYS = ['gclid'] as const

/**
 * Lee la query actual y, si trae atribución, la guarda. No sobreescribe una
 * captura previa: gana la primera visita de la sesión, que es la que trajo al
 * usuario.
 */
export function captureUtmParams(search: string): void {
    if (typeof window === 'undefined') return

    try {
        const params = new URLSearchParams(search)
        const captured: UtmParams = {}

        for (const key of [...UTM_KEYS, ...EXTRA_KEYS]) {
            const value = params.get(key)?.trim()
            if (value) captured[key] = value.slice(0, 200)
        }

        if (Object.keys(captured).length === 0) return
        if (window.sessionStorage.getItem(STORAGE_KEY)) return

        if (document.referrer) {
            captured.referrer = document.referrer.slice(0, 200)
        }

        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured))
    } catch {
        // sessionStorage bloqueado (modo privado, cookies de terceros): la
        // atribución es un extra, nunca debe impedir el envío del formulario.
    }
}

export function readUtmParams(): UtmParams {
    if (typeof window === 'undefined') return {}

    try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY)
        if (!raw) return {}

        const parsed: unknown = JSON.parse(raw)
        return parsed && typeof parsed === 'object' ? (parsed as UtmParams) : {}
    } catch {
        return {}
    }
}

/** Representación en una línea, para volcarla en un único campo del CRM. */
export function formatUtmParams(utm: UtmParams): string {
    return Object.entries(utm)
        .filter(([, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join(' | ')
}
