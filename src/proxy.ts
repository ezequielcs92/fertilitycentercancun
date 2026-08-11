import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Convención `proxy` de Next 16 (antes `middleware`).
 *
 * Las rutas de administración y autenticación no llevan prefijo de idioma, así
 * que se resuelven con la sesión de Supabase y se saltan el middleware de i18n.
 */
export default async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAdminOrAuthRoute =
        pathname.startsWith('/admin') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/auth');

    if (isAdminOrAuthRoute) {
        return await updateSession(request);
    }

    const intlResponse = intlMiddleware(request);
    return intlResponse
}

export const config = {
    matcher: [
        /*
         * Todo menos:
         * - api
         * - los internos de Next (_next, _vercel)
         * - cualquier ruta con extension
         *
         * Lo ultimo es imprescindible: el matcher anterior solo excluia
         * imagenes por extension, asi que next-intl anteponia el idioma a
         * robots.txt, sitemap.xml y rss.xml, y esas rutas no existen con
         * prefijo. Google recibia un 307 a /es/robots.txt y un 404 detras.
         *
         * Ningun slug del sitio lleva punto, asi que excluir las rutas con
         * extension no deja ninguna pagina sin localizar.
         */
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
}
