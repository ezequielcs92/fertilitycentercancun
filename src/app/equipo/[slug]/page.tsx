
import React from 'react';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

// Nota: En una app real esto vendría de una DB o API. 
// Para el prototipo, usamos el JSON procesado.
async function getData(slug: string, type: string) {
  const data = require('@/../migrating_data.json');
  return data[type].find((item: any) => item.slug === slug);
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const item = await getData(slug, 'team');

  if (!item) return notFound();

  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title={item.title} 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Equipo Médico', href: '/equipo' },
          { label: item.title, href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </Container>
    </main>
  );
}
    