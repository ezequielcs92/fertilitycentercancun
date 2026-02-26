'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface TeamMember {
    id?: string
    nombre: string
    especialidad: string
    bio: string
    perfil_profesional: string
    experiencia_profesional: any[]
    foto_url: string
    telefono: string
    ubicacion: string
    email: string
    activo: boolean
}

export async function getTeamMembers() {
    const supabase = await createClient()
    if (!supabase) return []

    const { data, error } = await supabase
        .from('equipo_medico')
        .select('*')
        .order('orden', { ascending: true })

    if (error) {
        console.error('Error fetching team members:', error)
        return []
    }

    return data
}

export async function saveTeamMember(member: TeamMember) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const { id, ...data } = member

    let result
    if (id) {
        result = await supabase
            .from('equipo_medico')
            .update(data)
            .eq('id', id)
    } else {
        result = await supabase
            .from('equipo_medico')
            .insert([data])
    }

    if (result.error) {
        console.error('Error saving team member:', result.error)
        return { success: false, error: result.error.message }
    }

    revalidatePath('/admin/equipo')
    revalidatePath('/equipo')
    return { success: true }
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const { error } = await supabase
        .from('equipo_medico')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting team member:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/equipo')
    revalidatePath('/equipo')
    return { success: true }
}
