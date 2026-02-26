
import React from 'react';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { autoTranslateHtml, autoTranslateText } from '@/lib/i18n/auto-translate';

// Nota: En una app real esto vendría de una DB o API. 
// Para el prototipo, usamos el JSON procesado.
const SCRAPED_POSTS = [
  {
    slug: 'la-fertilidad-despues-del-diagnostico-oncologico',
    title: 'La fertilidad después del diagnóstico oncológico',
    content: '<p>Contenido detallado sobre la preservación de la fertilidad en pacientes oncológicos...</p>'
  },
  {
    slug: 'el-viaje-del-ovocito',
    title: 'El viaje del ovocito',
    content: '<p>Exploración científica del desarrollo del ovocito...</p>'
  },
  {
    slug: 'que-es-la-endometriosis',
    title: '¿Qué es la endometriosis?',
    content: '<p>Información completa sobre la endometriosis y su impacto...</p>'
  },
  {
    slug: 'abordaje-de-la-pareja-infertil',
    title: 'Abordaje de la pareja infértil',
    content: '<p>Guía sobre el proceso de diagnóstico de infertilidad...</p>'
  },
  {
    slug: 'por-que-elegir-una-clinica-de-fertilidad-especializada',
    title: 'Por qué elegir una clínica de fertilidad especializada',
    content: '<p>Ventajas competitivas y tecnológicas de AFCC...</p>'
  },
  {
    slug: 'combina-la-fertilidad-con-tus-vacaciones',
    title: 'Combina la fertilidad con tus vacaciones',
    content: '<p>El turismo médico en Cancún para tratamientos de reproducción asistida...</p>'
  }
];

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

async function getData(slug: string, type: string) {
  try {
    const data = require('@/../migrating_data.json');
    // En migrating_data.json, los artículos están bajo la clave 'posts'
    const actualType = type === 'blog' ? 'posts' : type;
    const item = data[actualType]?.find((item: any) => item.slug === slug);

    if (item) {
      return { ...item, content: cleanContent(item.content) };
    }

    // Fallback a los posts scrapeados si no se encuentra en el JSON de migración
    const fallback = SCRAPED_POSTS.find(p => p.slug === slug);
    return fallback ? { ...fallback, content: cleanContent(fallback.content) } : null;
  } catch (error) {
    console.error('Error loading migrating_data:', error);
    const fallback = SCRAPED_POSTS.find(p => p.slug === slug);
    return fallback ? { ...fallback, content: cleanContent(fallback.content) } : null;
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const isEs = locale === 'es';

  const item = await getData(slug, 'blog');

  if (!item) return notFound();

  const translatedTitle = await autoTranslateText(item.title, locale);
  const translatedContent = await autoTranslateHtml(item.content, locale);

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title={translatedTitle}
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: translatedTitle, href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: translatedContent }} />
      </Container>
    </main>
  );
}
