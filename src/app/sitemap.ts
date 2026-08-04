import { MetadataRoute } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { getIndexablePages } from '@/content/pages/registry'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com').replace(/\/$/, '')

/**
 * Rutas con archivo propio bajo `app/[locale]/(public)`. El slug puede diferir
 * por idioma cuando está declarado en `i18n/routing.ts` (pathnames).
 */
const FIXED_ROUTES: Array<{ es: string; en: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { es: '', en: '', priority: 1, changeFrequency: 'daily' },
    { es: 'sobre-fertility-center-cancun', en: 'about-fertility-center', priority: 0.9, changeFrequency: 'monthly' },
    { es: 'tratamientos', en: 'tratamientos', priority: 0.9, changeFrequency: 'monthly' },
    { es: 'equipo', en: 'equipo', priority: 0.9, changeFrequency: 'monthly' },
    { es: 'contacto', en: 'contact-ivf-doctors', priority: 0.9, changeFrequency: 'monthly' },
    { es: 'experiencia', en: 'experiencia', priority: 0.7, changeFrequency: 'monthly' },
    { es: 'podcast', en: 'podcast', priority: 0.7, changeFrequency: 'weekly' },
    { es: 'blog', en: 'blog', priority: 0.9, changeFrequency: 'daily' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    const fixedPages: MetadataRoute.Sitemap = FIXED_ROUTES.flatMap((route) =>
        (['es', 'en'] as const).map((locale) => {
            const slug = route[locale]
            return {
                url: slug ? `${siteUrl}/${locale}/${slug}` : `${siteUrl}/${locale}`,
                lastModified: now,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
            }
        })
    )

    // Las ~66 páginas de contenido estático, cada una en su idioma.
    const contentPages: MetadataRoute.Sitemap = getIndexablePages().map(({ slug, page }) => ({
        url: `${siteUrl}/${page.locale}/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: page.priority ?? 0.7,
    }))

    let blogPosts: MetadataRoute.Sitemap = []
    try {
        const supabase = createPublicClient()
        if (supabase) {
            const { data } = await supabase
                .from('posts')
                .select('slug, updated_at')
                .eq('status', 'published')
                .order('fecha_publicacion', { ascending: false })
                .limit(1000)

            blogPosts = (data || []).flatMap((post) =>
                (['es', 'en'] as const).map((locale) => ({
                    url: `${siteUrl}/${locale}/blog/${post.slug}`,
                    lastModified: post.updated_at ? new Date(post.updated_at) : now,
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }))
            )
        }
    } catch (error) {
        // Un fallo de Supabase no debe dejar el sitemap sin las páginas estáticas.
        console.error('No se pudieron cargar los posts para el sitemap:', error)
    }

    return [...fixedPages, ...contentPages, ...blogPosts]
}
