'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getStorageFiles(bucket: string) {
    const supabase = await createClient()
    if (!supabase) return []

    const { data, error } = await supabase.storage.from(bucket).list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
    })

    if (error) {
        console.error('Error fetching storage files:', error)
        return []
    }

    const filesWithUrls = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(file.name)
        return { ...file, publicUrl }
    })

    return filesWithUrls
}

export async function deleteStorageFile(bucket: string, fileName: string) {
    const supabase = await createClient()
    if (!supabase) return { success: false }

    const { error } = await supabase.storage.from(bucket).remove([fileName])

    if (error) return { success: false, error: error.message }

    revalidatePath('/admin/galeria')
    return { success: true }
}
