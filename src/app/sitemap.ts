import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/actions/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPublishedPosts(1000, 0) // Get all posts

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]

    // Blog posts
    const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...blogPosts]
}
