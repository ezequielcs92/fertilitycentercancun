'use server'

import { createClient } from '@/lib/supabase/client'

export interface LeadFormData {
    nombre: string
    email: string
    telefono: string
    pais: string
    tratamiento: string
    mensaje: string
}

export interface ActionResult {
    success: boolean
    message: string
    error?: string
}

export async function submitLead(formData: LeadFormData): Promise<ActionResult> {
    try {
        // Validación básica del lado del servidor
        if (!formData.nombre || !formData.email) {
            return {
                success: false,
                message: 'Nombre y email son requeridos',
                error: 'VALIDATION_ERROR'
            }
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            return {
                success: false,
                message: 'Por favor ingrese un email válido',
                error: 'INVALID_EMAIL'
            }
        }

        const supabase = createClient()

        if (!supabase) {
            return {
                success: false,
                message: 'Error de configuración del servidor'
            }
        }

        // Insertar lead en la base de datos
        const { error } = await supabase
            .from('leads')
            .insert([
                {
                    nombre: formData.nombre.trim(),
                    email: formData.email.trim().toLowerCase(),
                    telefono: formData.telefono?.trim() || null,
                    pais: formData.pais || null,
                    tratamiento: formData.tratamiento || null,
                    mensaje: formData.mensaje?.trim() || null,
                }
            ])

        if (error) {
            console.error('Error al insertar lead:', error)
            return {
                success: false,
                message: 'Hubo un error al enviar su consulta. Por favor intente nuevamente.',
                error: error.message
            }
        }

        return {
            success: true,
            message: 'Gracias por contactarnos. Nuestro equipo médico se pondrá en contacto en menos de 24 horas.'
        }

    } catch (error) {
        console.error('Error inesperado:', error)
        return {
            success: false,
            message: 'Error de conexión. Por favor verifique su internet e intente nuevamente.',
            error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
        }
    }
}
