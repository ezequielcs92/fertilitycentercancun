import { createPublicClient } from '@/lib/supabase/public'
import { siteUrl } from '@/lib/seo'

export const revalidate = 3600

interface FeedPost {
    slug: string
    titulo: string
    extracto: string | null
    fecha_publicacion: string | null
    created_at: string
    imagen_banner_url: string | null
}

export async function GET() {
    const supabase = createPublicClient()
    const { data } = supabase
        ? await supabase
            .from('posts')
            .select('slug, titulo, extracto, fecha_publicacion, created_at, imagen_banner_url')
            .eq('status', 'published')
            .order('fecha_publicacion', { ascending: false })
            .limit(50)
        : { data: null }

    const posts = (data || []) as FeedPost[]
    const baseUrl = siteUrl

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fertility Center Cancun - Blog Médico</title>
    <link>${baseUrl}/es/blog</link>
    <description>Artículos sobre tratamientos de fertilidad, reproducción asistida y salud reproductiva</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
            .map(
                (post) => `
    <item>
      <title>${escapeXml(post.titulo)}</title>
      <link>${baseUrl}/es/blog/${post.slug}</link>
      <description>${escapeXml(post.extracto || post.titulo)}</description>
      <pubDate>${new Date(post.fecha_publicacion || post.created_at).toUTCString()}</pubDate>
      <guid>${baseUrl}/es/blog/${post.slug}</guid>
      ${post.imagen_banner_url ? `<enclosure url="${post.imagen_banner_url}" type="image/jpeg"/>` : ''}
    </item>`
            )
            .join('')}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
    })
}

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;'
            case '>': return '&gt;'
            case '&': return '&amp;'
            case '\'': return '&apos;'
            case '"': return '&quot;'
            default: return c
        }
    })
}
