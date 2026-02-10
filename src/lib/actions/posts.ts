'use server'

import { createClient } from '@/lib/supabase/client'

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
    const supabase = createClient()

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
        console.error('Error fetching posts:', error)
        return []
    }

    return data as Post[]
}

/**
 * Obtiene un post por su slug
 */
export async function getPostBySlug(slug: string) {
    const supabase = createClient()

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
    const supabase = createClient()

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
    const supabase = createClient()

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

    const supabase = createClient()

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
 * Cuenta total de posts publicados
 */
export async function getPublishedPostsCount() {
    const supabase = createClient()

    const { count, error } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published')

    if (error) {
        console.error('Error counting posts:', error)
        return 0
    }

    return count || 0
}
