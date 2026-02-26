import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const legacyLocaleMatch = pathname.match(/^\/(es|en)(\/|$)/)

    if (legacyLocaleMatch) {
        const legacyLocale = legacyLocaleMatch[1]
        const strippedPath = pathname.replace(/^\/(es|en)/, '') || '/'
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = strippedPath

        const redirectResponse = NextResponse.redirect(redirectUrl)
        redirectResponse.cookies.set('NEXT_LOCALE', legacyLocale)

        return await updateSession(request, redirectResponse)
    }

    // 1. First handle next-intl
    const intlResponse = intlMiddleware(request);

    // 2. Then update Supabase session
    // This allows the session cookie to be preserved/refreshed
    return await updateSession(request, intlResponse)
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
