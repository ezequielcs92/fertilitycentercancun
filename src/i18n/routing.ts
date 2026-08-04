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
        }
    }
});

export type AppLocale = (typeof routing.locales)[number];

export function isValidLocale(value: unknown): value is AppLocale {
    return typeof value === 'string' && (routing.locales as readonly string[]).includes(value);
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
