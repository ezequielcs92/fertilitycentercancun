import { NextResponse, type NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { DONORS_CACHE_TAG, getDonors } from '@/lib/donors/feed'

/**
 * Refresco diario del catálogo de donantes.
 *
 * El sitio de Moscú regenera los feeds cada noche a las 23:00 (UTC+3). Este
 * endpoint se llama a las 08:05 de Cancún (UTC-5, sin horario de verano) para
 * invalidar la caché y volver a leerlos.
 *
 * Invalidar no basta: `revalidateTag` solo marca la caché como caduca, y quien
 * pagaría la espera sería la primera visita de la mañana. Por eso, después de
 * invalidar, se vuelven a pedir los cuatro feeds aquí mismo, de modo que la
 * caché ya está caliente cuando llega el primer visitante.
 *
 * Ejemplo de cron (servidor en hora de Cancún):
 *   5 8 * * *  curl -fsS -H "Authorization: Bearer $DONORS_REFRESH_TOKEN" \
 *              https://fertilitycentercancun.com/api/donors/refresh
 */

export const dynamic = 'force-dynamic'

/**
 * Compara en tiempo constante.
 *
 * Con `===` el tiempo de respuesta delata cuántos caracteres iniciales del
 * token son correctos, y eso permite reconstruirlo a base de intentos.
 */
function safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false

    let mismatch = 0
    for (let index = 0; index < a.length; index += 1) {
        mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index)
    }

    return mismatch === 0
}

function isAuthorized(request: NextRequest): boolean {
    const expected = process.env.DONORS_REFRESH_TOKEN?.trim()

    // Sin token configurado el endpoint queda cerrado. Dejarlo abierto
    // permitiría a cualquiera forzar la recarga de los feeds a voluntad.
    if (!expected) return false

    const header = request.headers.get('authorization') ?? ''
    const bearer = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : ''
    const provided = bearer || request.nextUrl.searchParams.get('token')?.trim() || ''

    return provided.length > 0 && safeEqual(provided, expected)
}

async function refresh(request: NextRequest) {
    if (!isAuthorized(request)) {
        const configured = Boolean(process.env.DONORS_REFRESH_TOKEN?.trim())
        if (!configured) {
            console.error('[donantes] DONORS_REFRESH_TOKEN sin configurar: el refresco diario está desactivado.')
        }

        return NextResponse.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 })
    }

    // Next 16 pide el perfil de caché al invalidar. 'max' purga la etiqueta sea
    // cual sea la vida que tuviera la entrada, que es justo lo que hace falta
    // en un refresco forzado desde el cron.
    revalidateTag(DONORS_CACHE_TAG, 'max')

    // Se recalientan los cuatro feeds (dos tipos × dos idiomas) en paralelo.
    const [esEgg, esSperm, enEgg, enSperm] = await Promise.all([
        getDonors('egg', 'es'),
        getDonors('sperm', 'es'),
        getDonors('egg', 'en'),
        getDonors('sperm', 'en'),
    ])

    const counts = {
        es: { egg: esEgg.length, sperm: esSperm.length },
        en: { egg: enEgg.length, sperm: enSperm.length },
    }

    // Un feed vacío significa que Moscú no respondió o cambió el formato. Se
    // deja constancia en el log: la página seguirá pintándose, pero sin fichas.
    const empty = Object.entries(counts).flatMap(([locale, byType]) =>
        Object.entries(byType)
            .filter(([, count]) => count === 0)
            .map(([type]) => `${locale}/${type}`),
    )

    if (empty.length > 0) {
        console.error(`[donantes] feeds vacíos tras el refresco: ${empty.join(', ')}`)
    }

    return NextResponse.json({
        ok: empty.length === 0,
        refreshedAt: new Date().toISOString(),
        counts,
        ...(empty.length > 0 ? { empty } : {}),
    })
}

export async function GET(request: NextRequest) {
    return refresh(request)
}

export async function POST(request: NextRequest) {
    return refresh(request)
}
