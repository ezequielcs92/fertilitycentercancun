'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface Post {
    id: string
    titulo: string
    slug: string
    contenido_html: string
    extracto: string
    imagen_banner_url: string | null
    categoria_id: string | null
    status: 'draft' | 'published'
    fecha_publicacion: string | null
    views: number
    created_at: string
    updated_at: string
    categoria?: {
        nombre: string
        slug: string
    }
}

/**
 * Obtiene todos los posts publicados (para blog público)
 */
export async function getPublishedPosts(limit = 12, offset = 0) {
    const supabase = await createClient()

    if (!supabase) return []

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      categoria:categorias(nombre, slug)
    `)
        .eq('status', 'published')
        .not('fecha_publicacion', 'is', null)
        .order('fecha_publicacion', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        console.error('Error fetching posts:', {
            message: error?.message,
            code: (error as any)?.code,
            details: (error as any)?.details,
            hint: (error as any)?.hint,
            name: error?.name,
            stack: error?.stack,
            rawString: String(error)
        })
        return []
    }

    return data as Post[]
}

/**
 * Obtiene un post por su slug
 */
export async function getPostBySlug(slug: string) {
    const supabase = await createClient()

    if (!supabase) return null

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      categoria:categorias(nombre, slug)
    `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    // Incrementar contador de vistas
    await supabase
        .from('posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id)

    return data as Post
}

/**
 * Obtiene posts por categoría
 */
export async function getPostsByCategory(categorySlug: string, limit = 12) {
    const supabase = await createClient()

    if (!supabase) return []

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      categoria:categorias!inner(nombre, slug)
    `)
        .eq('status', 'published')
        .eq('categoria.slug', categorySlug)
        .order('fecha_publicacion', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching posts by category:', error)
        return []
    }

    return data as Post[]
}

/**
 * Obtiene categorías disponibles
 */
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

/**
 * Obtiene posts relacionados (misma categoría)
 */
export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3) {
    if (!categoryId) return []

    const supabase = await createClient()

    if (!supabase) return []

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      categoria:categorias(nombre, slug)
    `)
        .eq('status', 'published')
        .eq('categoria_id', categoryId)
        .neq('id', postId)
        .order('fecha_publicacion', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching related posts:', error)
        return []
    }

    return data as Post[]
}

/**
 * Guarda un post (crear o actualizar)
 */
export async function savePost(post: Partial<Post>) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const { id, categoria, ...data } = post as any

    let result
    if (id) {
        result = await supabase
            .from('posts')
            .update({
                ...data,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
    } else {
        result = await supabase
            .from('posts')
            .insert([{
                ...data,
                autor_id: (await supabase.auth.getUser()).data.user?.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
    }

    if (result.error) {
        console.error('Error saving post:', result.error)
        return { success: false, error: result.error.message }
    }

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    if (data.slug) {
        revalidatePath(`/blog/${data.slug}`)
    }

    return { success: true }
}

/**
 * Elimina un post
 */
export async function deletePost(id: string) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Cambia el estado de un post
 */
export async function togglePostStatus(id: string, currentStatus: string) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const
        payload: any = { status: newStatus }

    if (newStatus === 'published') {
        payload.fecha_publicacion = new Date().toISOString()
    }

    const { error } = await supabase
        .from('posts')
        .update(payload)
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Cuenta total de posts publicados
 */
export async function getPublishedPostsCount() {
    // ... (existing code remains substantially same, just making sure footer is clean)
    const supabase = await createClient()
    if (!supabase) return 0
    const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published')
    return count || 0
}

