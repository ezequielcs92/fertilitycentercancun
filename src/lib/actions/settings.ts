'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin'
import { revalidatePath } from 'next/cache'

export interface SiteSettings {
    id: number
    notification_email: string | null
    created_at: string
    updated_at: string
}

export async function getSettings(): Promise<SiteSettings | null> {
    const supabase = await createClient()
    if (!supabase) return null

    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single()

    if (error) {
        if (error.code !== 'PGRST116') { // Ignorar error de 'no rows returned'
            console.error('Error fetching settings:', error)
        }
        return null
    }

    return data
}

export async function updateNotificationEmail(email: string) {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Database client not initialized' }

    // Validación básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
        return { success: false, error: 'Formato de correo electrónico inválido' }
    }

    const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, notification_email: email })

    if (error) {
        console.error('Error updating notification email:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/configuracion')
    return { success: true }
}
