import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com').replace(/\/$/, '')

const AI_AGENTS = [
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'Claude-SearchBot',
    'Claude-User',
    'GPTBot',
    'ClaudeBot',
    'Google-Extended',
]

const publicRule = {
    allow: '/',
    disallow: ['/admin', '/login', '/api/'],
}

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            ...AI_AGENTS.map((userAgent) => ({ userAgent, ...publicRule })),
            { userAgent: '*', ...publicRule },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    }
}
