import React from 'react'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import TreatmentCTA from '@/components/sections/TreatmentCTA'
import {
  contentPages,
  enToEsSlug,
  esToEnSlug,
  getContentPage,
  legacySlugRedirects,
  type ContentLocale,
} from '@/content/pages/registry'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com').replace(/\/$/, '')

type PageParams = { slug: string; locale: string }

function normalizeLocale(locale: string): ContentLocale {
  return locale === 'en' ? 'en' : 'es'
}

/**
 * Resuelve a dónde debe ir una petición: renderizar la página registrada o
 * redirigir al slug correcto para ese idioma.
 */
function resolve(slug: string, locale: ContentLocale): { redirectTo: string } | { page: string } | null {
  const canonical = legacySlugRedirects[slug]
  if (canonical) {
    const target = locale === 'en' ? (esToEnSlug[canonical] ?? canonical) : (enToEsSlug[canonical] ?? canonical)
    return { redirectTo: `/${locale}/${target}` }
  }

  if (locale === 'en' && esToEnSlug[slug]) {
    return { redirectTo: `/en/${esToEnSlug[slug]}` }
  }

  if (locale === 'es' && enToEsSlug[slug]) {
    return { redirectTo: `/es/${enToEsSlug[slug]}` }
  }

  return getContentPage(slug) ? { page: slug } : null
}

export function generateStaticParams() {
  return Object.entries(contentPages).map(([slug, page]) => ({
    locale: page.locale,
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  // El idioma canónico de la página lo define el registro, no la URL.
  const { slug } = await params
  const page = getContentPage(slug)

  if (!page) {
    return {}
  }

  const canonical = `${siteUrl}/${page.locale}/${slug}`
  const languages: Record<string, string> = {
    [page.locale]: canonical,
  }

  if (page.counterpart) {
    const otherLocale: ContentLocale = page.locale === 'es' ? 'en' : 'es'
    languages[otherLocale] = `${siteUrl}/${otherLocale}/${page.counterpart}`
  }

  // El sufijo de marca lo añade el template de `[locale]/layout.tsx`.
  const fullTitle = `${page.title} | Advanced Fertility Center Cancún`

  return {
    metadataBase: new URL(siteUrl),
    title: page.title,
    description: page.description,
    alternates: { canonical, languages },
    robots: page.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: canonical,
      siteName: 'Advanced Fertility Center Cancun',
      locale: page.locale === 'es' ? 'es_MX' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: page.description,
    },
  }
}

export default async function ContentPageRoute({ params }: { params: Promise<PageParams> }) {
  const { slug, locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)

  const resolution = resolve(slug, locale)

  if (!resolution) {
    notFound()
  }

  if ('redirectTo' in resolution) {
    redirect(resolution.redirectTo)
  }

  const page = contentPages[resolution.page]
  const { default: PageComponent } = await page.load()

  return (
    <>
      <PageComponent locale={page.locale} />
      {page.isTreatment && <TreatmentCTA locale={page.locale} />}
    </>
  )
}
