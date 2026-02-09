'use server'

import { createClient } from '@/lib/supabase/client'

export interface Comment {
    id: string
    post_id: string
    nombre: string
    email: string
    contenido: string
    status: 'pending' | 'approved' | 'rejected'
    created_at: string
}

/**
 * Obtiene comentarios aprobados de un post
 */
export async function getApprovedComments(postId: string) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .eq('post_id', postId)
        .eq('status', 'approved')
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching comments:', error)
        return []
    }

    return data as Comment[]
}

/**
 * Envía un nuevo comentario (requiere moderación)
 */
export async function submitComment(formData: {
    post_id: string
    nombre: string
    email: string
    contenido: string
}) {
    try {
        // Validación
        if (!formData.nombre || !formData.email || !formData.contenido) {
            return {
                success: false,
                message: 'Todos los campos son requeridos'
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            return {
                success: false,
                message: 'Email inválido'
            }
        }

        const supabase = createClient()

        const { error } = await supabase
            .from('comentarios')
            .insert([
                {
                    post_id: formData.post_id,
                    nombre: formData.nombre.trim(),
                    email: formData.email.trim().toLowerCase(),
                    contenido: formData.contenido.trim(),
                    status: 'pending'
                }
            ])

        if (error) {
            console.error('Error submitting comment:', error)
            return {
                success: false,
                message: 'Error al enviar el comentario'
            }
        }

        return {
            success: true,
            message: 'Comentario enviado. Será visible una vez aprobado por el equipo.'
        }

    } catch (error) {
        console.error('Unexpected error:', error)
        return {
            success: false,
            message: 'Error de conexión'
        }
    }
}
