'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin'
import { revalidatePath } from 'next/cache'

export interface ContactMessage {
    id: string
    nombre: string
    email: string
    telefono: string | null
    asunto: string | null
    mensaje: string
    leido: boolean
    created_at: string
}

export async function getMessages() {
    if (await requireAdmin()) return []

    const supabase = await createClient()
    if (!supabase) return []

    const { data, error } = await supabase
        .from('mensajes_contacto')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching messages:', error)
        return []
    }

    return data
}

export async function markMessageAsRead(id: string) {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = await createClient()
    if (!supabase) return { success: false }

    const { error } = await supabase
        .from('mensajes_contacto')
        .update({ leido: true })
        .eq('id', id)

    if (error) return { success: false, error: error.message }

    revalidatePath('/admin/contacto')
    return { success: true }
}

export async function deleteMessage(id: string) {
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = await createClient()
    if (!supabase) return { success: false }

    const { error } = await supabase
        .from('mensajes_contacto')
        .delete()
        .eq('id', id)

    if (error) return { success: false, error: error.message }

    revalidatePath('/admin/contacto')
    return { success: true }
}
