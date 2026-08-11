'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin'
import { revalidatePath } from 'next/cache'
import { autoTranslateHtml, autoTranslateText } from '@/lib/i18n/auto-translate'

export interface Category {
    id: string
    nombre: string
    slug: string
    descripcion?: string
}

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
export async function getPublishedPosts(limit = 12, offset = 0, locale = 'es') {
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
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return []
    }

    const posts = (data || []) as Post[]

    if (locale !== 'en') {
        return posts
    }

    return await Promise.all(
        posts.map(async (post) => ({
            ...post,
            titulo: await autoTranslateText(post.titulo, locale),
            extracto: await autoTranslateText(post.extracto, locale),
            categoria: post.categoria
                ? {
                    ...post.categoria,
                    nombre: await autoTranslateText(post.categoria.nombre, locale)
                }
                : post.categoria
        }))
    )
}

/**
 * Obtiene un post por su slug
 */
export async function getPostBySlug(slug: string, locale = 'es') {
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
        .maybeSingle()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    // Slug inexistente en Supabase: puede ser un artículo heredado de WordPress,
    // así que no es un error — quien llama decide el fallback.
    if (!data) return null

    // Incrementar contador de vistas
    await supabase
        .from('posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id)

    const post = data as Post

    if (locale !== 'en') {
        return post
    }

    return {
        ...post,
        titulo: await autoTranslateText(post.titulo, locale),
        extracto: await autoTranslateText(post.extracto, locale),
        contenido_html: await autoTranslateHtml(post.contenido_html, locale),
        categoria: post.categoria
            ? {
                ...post.categoria,
                nombre: await autoTranslateText(post.categoria.nombre, locale)
            }
            : post.categoria
    } as Post
}

/**
 * Obtiene posts por categoría
 */
export async function getPostsByCategory(categorySlug: string, limit = 12, locale = 'es') {
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

    const posts = (data || []) as Post[]

    if (locale !== 'en') {
        return posts
    }

    return await Promise.all(
        posts.map(async (post) => ({
            ...post,
            titulo: await autoTranslateText(post.titulo, locale),
            extracto: await autoTranslateText(post.extracto, locale),
            categoria: post.categoria
                ? {
                    ...post.categoria,
                    nombre: await autoTranslateText(post.categoria.nombre, locale)
                }
                : post.categoria
        }))
    )
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

export async function getCategoriesTranslated(locale = 'es') {
    const categories = await getCategories()

    if (locale !== 'en') {
        return categories
    }

    return await Promise.all(
        (categories || []).map(async (category: Category) => ({
            ...category,
            nombre: await autoTranslateText(category.nombre, locale),
            descripcion: await autoTranslateText(category.descripcion, locale)
        }))
    )
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
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    // `categoria` es la relación expandida en las lecturas, no una columna.
    const { id, categoria: _categoria, ...data } = post

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
    const denied = await requireAdmin()
    if (denied) return denied

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
    const denied = await requireAdmin()
    if (denied) return denied

    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const payload: { status: string; fecha_publicacion?: string } = { status: newStatus }

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

