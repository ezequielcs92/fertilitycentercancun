import { getPublishedPosts } from '@/lib/actions/posts'

export async function GET() {
    const posts = await getPublishedPosts(50, 0) // Latest 50 posts

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com'

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fertility Center Cancun - Blog Médico</title>
    <link>${baseUrl}/blog</link>
    <description>Artículos sobre tratamientos de fertilidad, reproducción asistida y salud reproductiva</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
            .map(
                (post) => `
    <item>
      <title>${escapeXml(post.titulo)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.extracto || post.titulo)}</description>
      <pubDate>${new Date(post.fecha_publicacion || post.created_at).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      ${post.categoria ? `<category>${escapeXml(post.categoria.nombre)}</category>` : ''}
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
