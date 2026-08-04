import type { Metadata } from 'next'

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com').replace(/\/$/, '')

export const SITE_NAME = 'Advanced Fertility Center Cancún'

export type SeoLocale = 'es' | 'en'

export interface RouteSeoCopy {
    title: string
    description: string
    /** Slug de la ruta en ese idioma, sin barra inicial. Vacío para la home. */
    path: string
}

export interface RouteSeoInput {
    locale: string
    es: RouteSeoCopy
    en: RouteSeoCopy
    noIndex?: boolean
}

/**
 * Construye la metadata de una ruta bilingüe con canonical y hreflang
 * consistentes. `localePrefix` es 'always', así que toda URL lleva /es o /en.
 */
export function buildRouteMetadata({ locale, es, en, noIndex }: RouteSeoInput): Metadata {
    const current: SeoLocale = locale === 'en' ? 'en' : 'es'
    const copy = current === 'en' ? en : es

    const urlFor = (target: SeoLocale) => {
        const path = target === 'en' ? en.path : es.path
        return path ? `${siteUrl}/${target}/${path}` : `${siteUrl}/${target}`
    }

    const canonical = urlFor(current)
    const fullTitle = `${copy.title} | ${SITE_NAME}`

    return {
        metadataBase: new URL(siteUrl),
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical,
            languages: {
                es: urlFor('es'),
                en: urlFor('en'),
                'x-default': urlFor('es'),
            },
        },
        robots: noIndex ? { index: false, follow: true } : undefined,
        openGraph: {
            title: fullTitle,
            description: copy.description,
            url: canonical,
            siteName: 'Advanced Fertility Center Cancun',
            locale: current === 'es' ? 'es_MX' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: copy.description,
        },
    }
}
