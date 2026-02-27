'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { autoTranslateText } from '@/lib/i18n/auto-translate'

export interface Podcast {
    id: string
    titulo: string
    url_audio: string
    descripcion: string | null
    duracion_segundos: number | null
    thumbnail_url: string | null
    fecha: string
    created_at: string
}

export async function getPodcasts(locale = 'es') {
    const supabase = await createClient()
    if (!supabase) return []

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('fecha', { ascending: false })

    if (error) {
        console.error('Error fetching podcasts:', error)
        return []
    }

    const podcasts = (data || []) as Podcast[]

    if (locale !== 'en') {
        return podcasts
    }

    return await Promise.all(
        podcasts.map(async (podcast) => ({
            ...podcast,
            titulo: await autoTranslateText(podcast.titulo, locale),
            descripcion: await autoTranslateText(podcast.descripcion, locale)
        }))
    )
}

export async function getPodcastById(id: string, locale = 'es') {
    const supabase = await createClient()
    if (!supabase) return null

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching podcast by id:', error)
        return null
    }

    const podcast = data as Podcast

    if (locale !== 'en') {
        return podcast
    }

    return {
        ...podcast,
        titulo: await autoTranslateText(podcast.titulo, locale),
        descripcion: await autoTranslateText(podcast.descripcion, locale)
    }
}

export async function savePodcast(podcast: Partial<Podcast>) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const { id, ...payload } = podcast as any

    let result
    if (id) {
        result = await supabase
            .from('podcasts')
            .update(payload)
            .eq('id', id)
    } else {
        result = await supabase
            .from('podcasts')
            .insert([payload])
    }

    if (result.error) {
        console.error('Error saving podcast:', result.error)
        return { success: false, error: result.error.message }
    }

    revalidatePath('/podcast')
    revalidatePath('/es/podcast')
    revalidatePath('/en/podcast')
    revalidatePath('/admin/podcasts')

    return { success: true }
}

export async function deletePodcast(id: string) {
    const supabase = await createClient()
    if (!supabase) return { success: false, error: 'Client not initialized' }

    const { error } = await supabase
        .from('podcasts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting podcast:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/podcast')
    revalidatePath('/es/podcast')
    revalidatePath('/en/podcast')
    revalidatePath('/admin/podcasts')

    return { success: true }
}
