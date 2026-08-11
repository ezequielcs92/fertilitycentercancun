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
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
