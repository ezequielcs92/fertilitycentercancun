import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        // Durante el build de Vercel, si no están las variables, devolvemos un proxy 
        // o manejamos el error de forma que no rompa el build estático si no es crítico.
        console.warn('Supabase credentials missing. Client initialization skipped.')
        return null as any
    }

    return createSupabaseClient(url, key)
}
