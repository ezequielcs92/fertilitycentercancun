'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin'
import { revalidatePath } from 'next/cache'

export interface ExperienceEntry {
    rango: string
    titulo: string
    descripcion: string
}

/** Una entrada de experiencia tal como puede venir de la base de datos. */
export type StoredExperienceEntry = ExperienceEntry | string

export interface TeamMember {
    id?: string
    slug?: string
    nombre: string
    especialidad: string
    bio: string
    perfil_profesional: string
    /**
     * Entradas creadas con ExperienceForm. Los perfiles migrados de WordPress
     * pueden traer texto plano, así que la lectura acepta ambas formas.
     */
    experiencia_profesional: ExperienceEntry[]
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

export async function getTeamMemberByIdentifier(identifier: string) {
    const supabase = await createClient()
    if (!supabase) return null

    const byId = await supabase
        .from('equipo_medico')
        .select('*')
        .eq('id', identifier)
        .maybeSingle()

    if (byId.data) {
        return byId.data
    }

    const bySlug = await supabase
        .from('equipo_medico')
        .select('*')
        .eq('slug', identifier)
        .maybeSingle()

    if (bySlug.error) {
        return null
    }

    return bySlug.data
}

export async function saveTeamMember(member: TeamMember) {
    const denied = await requireAdmin()
    if (denied) return denied

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
    const denied = await requireAdmin()
    if (denied) return denied

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
