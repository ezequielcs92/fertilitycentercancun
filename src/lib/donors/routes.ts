import type { DonorLocale, DonorType } from './types'

/**
 * URLs públicas del catálogo de donantes.
 *
 * Las rutas internas (las carpetas de `app/`) están en castellano y son las
 * mismas para los dos idiomas; `i18n/routing.ts` las traduce a estos slugs, que
 * son los que ve el visitante y los que indexa Google.
 *
 * Aquí se construyen con el prefijo de idioma incluido porque `localePrefix` es
 * 'always': enlazar sin prefijo funcionaría, pero pasando antes por una
 * redirección del middleware en cada clic.
 */

export const DONOR_CATALOG_SLUGS: Record<DonorType, Record<DonorLocale, string>> = {
    egg: {
        es: 'catalogo-de-donantes-de-ovulos',
        en: 'egg-donor-catalog',
    },
    sperm: {
        es: 'catalogo-de-donantes-de-esperma',
        en: 'sperm-donor-catalog',
    },
}

export const DONOR_FAVORITES_SLUGS: Record<DonorLocale, string> = {
    es: 'donantes-favoritos',
    en: 'favorite-donors',
}

export const DONOR_COMPARE_SLUGS: Record<DonorLocale, string> = {
    es: 'comparar-donantes',
    en: 'compare-donors',
}

/** Rutas internas, tal y como se llaman las carpetas dentro de `app/[locale]`. */
export const DONOR_INTERNAL_PATHS = {
    egg: '/catalogo-donantes-ovulos',
    sperm: '/catalogo-donantes-esperma',
    favorites: '/donantes-favoritos',
    compare: '/comparar-donantes',
} as const

export function asDonorLocale(locale: string): DonorLocale {
    return locale === 'en' ? 'en' : 'es'
}

export function donorCatalogHref(type: DonorType, locale: string): string {
    const current = asDonorLocale(locale)
    return `/${current}/${DONOR_CATALOG_SLUGS[type][current]}`
}

export function donorDetailHref(type: DonorType, locale: string, id: string): string {
    return `${donorCatalogHref(type, locale)}/${encodeURIComponent(id)}`
}

export function donorFavoritesHref(locale: string): string {
    const current = asDonorLocale(locale)
    return `/${current}/${DONOR_FAVORITES_SLUGS[current]}`
}

export function donorCompareHref(locale: string): string {
    const current = asDonorLocale(locale)
    return `/${current}/${DONOR_COMPARE_SLUGS[current]}`
}

/** Ruta sin prefijo de idioma, para `buildRouteMetadata`, que ya lo añade. */
export function donorCatalogSeoPath(type: DonorType, locale: DonorLocale): string {
    return DONOR_CATALOG_SLUGS[type][locale]
}
