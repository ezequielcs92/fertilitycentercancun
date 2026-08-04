import React, { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { autoTranslateHtml, autoTranslateText } from '@/lib/i18n/auto-translate';
import { siteUrl } from '@/lib/seo';
import legacyPodcasts from '@/data/legacy-podcasts.json';

/**
 * Episodios heredados de WordPress en `/podcasts/<slug>`. El catálogo actual
 * vive en `/[locale]/podcast` (Supabase); estas páginas se conservan porque son
 * URLs ya indexadas con contenido propio.
 */

export const revalidate = 86400;

function toExcerpt(html: string, max = 158) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

const getEpisode = cache(async (slug: string, locale: string) => {
  const item = legacyPodcasts.find((episode) => episode.slug === slug);
  if (!item) return null;

  return {
    title: await autoTranslateText(item.title, locale),
    content: await autoTranslateHtml(item.content || '', locale),
    excerpt: toExcerpt(item.content || ''),
    date: item.date ?? null,
  };
});

export function generateStaticParams() {
  return legacyPodcasts.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const episode = await getEpisode(slug, locale);

  if (!episode) return {};

  const current = locale === 'en' ? 'en' : 'es';

  return {
    metadataBase: new URL(siteUrl),
    title: episode.title,
    description: episode.excerpt,
    alternates: {
      canonical: `${siteUrl}/${current}/podcasts/${slug}`,
      languages: {
        es: `${siteUrl}/es/podcasts/${slug}`,
        en: `${siteUrl}/en/podcasts/${slug}`,
      },
    },
    openGraph: {
      title: episode.title,
      description: episode.excerpt,
      url: `${siteUrl}/${current}/podcasts/${slug}`,
      type: 'article',
      publishedTime: episode.date ?? undefined,
      locale: current === 'es' ? 'es_MX' : 'en_US',
    },
  };
}

export default async function LegacyPodcastPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const isEs = locale !== 'en';
  const episode = await getEpisode(slug, locale);

  if (!episode) return notFound();

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title={episode.title}
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: 'Podcast', href: '/podcast' },
          { label: episode.title, href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: episode.content }} />
      </Container>
    </main>
  );
}
