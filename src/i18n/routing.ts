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

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
