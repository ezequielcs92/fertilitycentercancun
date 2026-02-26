'use server'

const translationCache = new Map<string, string>()

function shouldTranslate(targetLocale?: string) {
    return targetLocale === 'en'
}

function buildCacheKey(text: string, targetLocale: string) {
    return `${targetLocale}::${text}`
}

async function translateWithOpenAI(text: string, targetLocale: string): Promise<string | null> {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return null

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_TRANSLATION_MODEL || 'gpt-4.1-mini',
                temperature: 0,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional medical website translator. Translate Spanish to English. Preserve meaning, tone, and formatting. If input contains HTML, preserve tags and only translate human-readable text.'
                    },
                    {
                        role: 'user',
                        content: `Translate to locale ${targetLocale}:\n\n${text}`
                    }
                ]
            })
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return data?.choices?.[0]?.message?.content?.trim() || null
    } catch {
        return null
    }
}

async function translateWithGoogle(text: string, targetLocale: string): Promise<string | null> {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLocale}&dt=t&q=${encodeURIComponent(text)}`
        const response = await fetch(url, { method: 'GET' })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        if (!Array.isArray(data) || !Array.isArray(data[0])) return null

        const translated = data[0]
            .map((part: any) => (Array.isArray(part) ? part[0] : ''))
            .join('')
            .trim()

        return translated || null
    } catch {
        return null
    }
}

export async function autoTranslateText(text: string | null | undefined, targetLocale = 'es'): Promise<string> {
    if (!text) return ''
    if (!shouldTranslate(targetLocale)) return text

    const trimmed = text.trim()
    if (!trimmed) return text

    const cacheKey = buildCacheKey(trimmed, targetLocale)
    const cached = translationCache.get(cacheKey)
    if (cached) return cached

    const openAiResult = await translateWithOpenAI(trimmed, targetLocale)
    const translated = openAiResult || await translateWithGoogle(trimmed, targetLocale) || text

    translationCache.set(cacheKey, translated)
    return translated
}

export async function autoTranslateHtml(html: string | null | undefined, targetLocale = 'es'): Promise<string> {
    if (!html) return ''
    if (!shouldTranslate(targetLocale)) return html

    const translated = await autoTranslateText(html, targetLocale)
    return translated || html
}
