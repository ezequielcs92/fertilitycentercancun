import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    pathnames: {
        '/': '/',
        '/blog': {
            es: '/blog',
            en: '/blog'
        },
        '/contacto': {
            es: '/contacto',
            en: '/contact-ivf-doctors'
        },
        '/nosotros': {
            es: '/sobre-fertility-center-cancun',
            en: '/about-fertility-center'
        },
        // Catálogo de donantes. Las carpetas de `app/` están en castellano y se
        // comparten entre idiomas; lo que cambia por idioma es solo el slug
        // público, que es el que se indexa.
        '/catalogo-donantes-ovulos': {
            es: '/catalogo-de-donantes-de-ovulos',
            en: '/egg-donor-catalog'
        },
        '/catalogo-donantes-ovulos/[id]': {
            es: '/catalogo-de-donantes-de-ovulos/[id]',
            en: '/egg-donor-catalog/[id]'
        },
        '/catalogo-donantes-esperma': {
            es: '/catalogo-de-donantes-de-esperma',
            en: '/sperm-donor-catalog'
        },
        '/catalogo-donantes-esperma/[id]': {
            es: '/catalogo-de-donantes-de-esperma/[id]',
            en: '/sperm-donor-catalog/[id]'
        },
        '/donantes-favoritos': {
            es: '/donantes-favoritos',
            en: '/favorite-donors'
        },
        '/comparar-donantes': {
            es: '/comparar-donantes',
            en: '/compare-donors'
        }
    }
});

export type AppLocale = (typeof routing.locales)[number];

export function isValidLocale(value: unknown): value is AppLocale {
    return typeof value === 'string' && (routing.locales as readonly string[]).includes(value);
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
