import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/**
 * Autorización del panel de administración.
 *
 * Regla: ser un usuario autenticado de Supabase NO es suficiente para administrar
 * el sitio. El usuario debe estar registrado en la tabla `admin_users`
 * (ver `supabase-schema-admin-roles.sql`) o figurar en ADMIN_EMAILS.
 *
 * Compatibilidad: mientras la tabla `admin_users` no exista en el proyecto de
 * Supabase se conserva el comportamiento anterior (cualquier autenticado) y se
 * emite una advertencia en consola. En cuanto se ejecuta la migración el modo
 * estricto se activa solo, sin tocar código.
 */

const MISSING_TABLE_CODE = '42P01'

export interface AuthorizationFailure {
    success: false
    error: string
}

export const UNAUTHORIZED: AuthorizationFailure = {
    success: false,
    error: 'No autorizado. Se requieren permisos de administrador.',
}

function allowlistedEmails(): string[] {
    return (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean)
}

/**
 * Devuelve el usuario autenticado solo si tiene permisos de administrador.
 */
export async function getAdminUser(): Promise<User | null> {
    const supabase = await createClient()
    if (!supabase) return null

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const email = user.email?.toLowerCase()
    if (email && allowlistedEmails().includes(email)) {
        return user
    }

    const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle()

    if (error) {
        if (error.code === MISSING_TABLE_CODE) {
            console.warn(
                '[seguridad] La tabla `admin_users` no existe: cualquier usuario autenticado ' +
                'puede administrar el sitio. Ejecuta supabase-schema-admin-roles.sql para activar ' +
                'el control por rol.'
            )
            return user
        }

        console.error('Error verificando permisos de administrador:', error)
        return null
    }

    return data ? user : null
}

export async function isAdmin(): Promise<boolean> {
    return (await getAdminUser()) !== null
}

/**
 * Guard para Server Actions de escritura.
 * Devuelve `null` si el usuario es administrador, o el objeto de error a
 * retornar tal cual desde la acción.
 */
export async function requireAdmin(): Promise<AuthorizationFailure | null> {
    return (await getAdminUser()) ? null : UNAUTHORIZED
}
