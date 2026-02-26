'use server'

import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()
    if (!supabase) return null

    const [posts, team, testimonials, messages] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('equipo_medico').select('*', { count: 'exact', head: true }),
        supabase.from('testimonios_pacientes').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('mensajes_contacto').select('*', { count: 'exact', head: true })
    ])

    const { data: recentMessages } = await supabase
        .from('mensajes_contacto')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

    return {
        stats: {
            posts: posts.count || 0,
            team: team.count || 0,
            testimonials: testimonials.count || 0,
            messages: messages.count || 0
        },
        recentMessages: recentMessages || []
    }
}
