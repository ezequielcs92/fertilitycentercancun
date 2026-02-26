'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { autoTranslateText } from '@/lib/i18n/auto-translate'

export interface TestimonialSubmission {
    nombre: string
    mensaje: string
    calificacion?: number
    status?: 'pending' | 'approved' | 'rejected'
}

export async function submitTestimonial(data: TestimonialSubmission) {
    const supabase = await createClient()

    if (!supabase) {
        return { success: false, error: 'Supabase client not initialized' }
    }

    const { error } = await supabase
        .from('testimonios_pacientes')
        .insert([
            {
                nombre: data.nombre,
                mensaje: data.mensaje,
                calificacion: data.calificacion || 5,
                status: data.status || 'pending'
            }
        ])

    if (error) {
        console.error('Error submitting testimonial:', error)
        return { success: false, error: error.message }
    }

    // Revalidate paths to ensure admin or list view eventually shows changes if needed
    revalidatePath('/testimonios')
    revalidatePath('/primera-visita-a-nuestra-clinica-de-fertilidad')

    return { success: true }
}

export async function updateTestimonial(id: string, data: Partial<TestimonialSubmission> & { status?: string }) {
    const supabase = await createClient()

    if (!supabase) {
        return { success: false, error: 'Supabase client not initialized' }
    }

    const { error } = await supabase
        .from('testimonios_pacientes')
        .update(data)
        .eq('id', id)

    if (error) {
        console.error('Error updating testimonial:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/testimonios')
    revalidatePath('/admin/testimonios')
    return { success: true }
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient()

    if (!supabase) {
        return { success: false, error: 'Supabase client not initialized' }
    }

    const { error } = await supabase
        .from('testimonios_pacientes')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting testimonial:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/testimonios')
    revalidatePath('/admin/testimonios')
    return { success: true }
}

export async function getTestimonials(status?: string, locale = 'es') {
    const supabase = await createClient()
    if (!supabase) return []

    let query = supabase
        .from('testimonios_pacientes')
        .select('*')
        .order('created_at', { ascending: false })

    if (status && status !== 'all') {
        query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching testimonials:', error)
        return []
    }

    if (locale !== 'en') {
        return data
    }

    return await Promise.all(
        (data || []).map(async (testimonial: any) => ({
            ...testimonial,
            mensaje: await autoTranslateText(testimonial.mensaje, locale)
        }))
    )
}
