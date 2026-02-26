'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface CategoryData {
    nombre: string
    slug: string
    parent_id?: string | null
}

export async function getCategories() {
    const supabase = await createClient()
    if (!supabase) return []

    const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data
}

export async function saveCategory(id: string | null, data: CategoryData) {
    const supabase = await createClient()
    if (!supabase) return { success: false }

    let result;
    if (id) {
        result = await supabase.from('categorias').update(data).eq('id', id)
    } else {
        result = await supabase.from('categorias').insert([data])
    }

    if (result.error) return { success: false, error: result.error.message }

    revalidatePath('/admin/categorias')
    revalidatePath('/blog') // If blog shows categories
    return { success: true }
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()
    if (!supabase) return { success: false }

    const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id', id)

    if (error) return { success: false, error: error.message }

    revalidatePath('/admin/categorias')
    return { success: true }
}
