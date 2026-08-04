import React, { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { autoTranslateHtml, autoTranslateText } from '@/lib/i18n/auto-translate';
import { getPostBySlug } from '@/lib/actions/posts';
import { siteUrl } from '@/lib/seo';
import legacyPosts from '@/data/legacy-posts.json';

export const revalidate = 60;

interface ArticleData {
  title: string;
  content: string;
  excerpt: string;
  image?: string | null;
  publishedAt?: string | null;
}

function cleanContent(content: string) {
  if (!content) return '';
  return content
    .replace(/\\r\\n/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extracto de texto plano para la meta description. */
function toExcerpt(html: string, max = 158) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

/**
 * Resuelve un artículo por slug. Prioridad:
 *   1. Supabase — los posts publicados desde el panel de administración.
 *   2. Contenido heredado de WordPress (src/data/legacy-posts.json).
 */
const getArticle = cache(async (slug: string, locale: string): Promise<ArticleData | null> => {
  const post = await getPostBySlug(slug, locale);
  if (post) {
    return {
      title: post.titulo,
      content: post.contenido_html,
      excerpt: post.extracto || toExcerpt(post.contenido_html),
      image: post.imagen_banner_url,
      publishedAt: post.fecha_publicacion,
    };
  }

  const legacy = legacyPosts.find((item) => item.slug === slug);
  if (legacy) {
    const content = cleanContent(legacy.content);
    return {
      title: await autoTranslateText(legacy.title, locale),
      content: await autoTranslateHtml(content, locale),
      excerpt: toExcerpt(content),
      publishedAt: legacy.date ?? null,
    };
  }

  return null;
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticle(slug, locale);

  if (!article) return {};

  const current = locale === 'en' ? 'en' : 'es';
  const canonical = `${siteUrl}/${current}/blog/${slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical,
      languages: {
        es: `${siteUrl}/es/blog/${slug}`,
        en: `${siteUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
      images: article.image ? [article.image] : undefined,
      locale: current === 'es' ? 'es_MX' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function BlogArticlePage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const isEs = locale === 'es';

  const article = await getArticle(slug, locale);

  if (!article) return notFound();

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title={article.title}
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.title, href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </Container>
    </main>
  );
}
