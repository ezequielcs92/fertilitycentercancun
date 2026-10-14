/**
 * `localePrefix` es `always`: un enlace interno sin /es o /en pasa antes por
 * una redirección del middleware. Este helper deja la URL ya canónica.
 */
export function localeHref(locale: string, href: string): string {
    if (!href.startsWith('/') || href.startsWith('//')) return href

    const prefix = locale === 'en' ? '/en' : '/es'
    if (href === prefix || href.startsWith(`${prefix}/`)) return href
    if (href === '/es' || href.startsWith('/es/') || href === '/en' || href.startsWith('/en/')) {
        return href
    }

    return href === '/' ? prefix : `${prefix}${href}`
}
