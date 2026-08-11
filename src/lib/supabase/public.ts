import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase sin sesión, para contextos que deben poder renderizarse
 * de forma estática (sitemap, RSS). El cliente de `server.ts` lee cookies, lo
 * que fuerza render dinámico y hace fallar la generación en build time.
 *
 * Solo lee datos públicos: la RLS sigue aplicando con la clave anónima.
 */
export function createPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anonKey) return null

    return createSupabaseClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    })
}
