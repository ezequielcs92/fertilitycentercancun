'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMessages() {
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
