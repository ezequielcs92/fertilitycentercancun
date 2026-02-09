const fs = require('fs');
const path = require('path');

const DATA_FILE = 'migrating_data.json';
const BASE_PATH = path.join('src', 'app');

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Componente template para páginas estáticas
const pageTemplate = (title, content) => `
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="${title.replace(/"/g, '&quot;')}" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: '${title.replace(/"/g, '&quot;')}', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
      </Container>
    </main>
  );
}
`;

function generatePages() {
    data.pages.forEach(page => {
        // Evitar sobreescribir home o páginas especiales si ya existen
        if (['inicio', 'home-25', 'inicio-25', ''].includes(page.slug)) return;

        const dirPath = path.join(BASE_PATH, page.slug);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filePath = path.join(dirPath, 'page.tsx');
        fs.writeFileSync(filePath, pageTemplate(page.title, page.content));
        console.log(`Generada: ${page.slug}`);
    });

    // Rutas dinámicas
    const dynamicRoutes = [
        { name: 'blog', folder: 'blog', title: 'Blog' },
        { name: 'equipo', folder: 'equipo', title: 'Equipo Médico' },
        { name: 'podcasts', folder: 'podcasts', title: 'Podcasts' }
    ];

    dynamicRoutes.forEach(route => {
        const dirPath = path.join(BASE_PATH, route.folder, '[slug]');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        // Aquí se creará un template dinámico que use los datos del JSON
        const dynamicTemplate = `
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
  const item = await getData(slug, '${route.name === 'equipo' ? 'team' : route.name}');

  if (!item) return notFound();

  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title={item.title} 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: '${route.title}', href: '/${route.folder}' },
          { label: item.title, href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </Container>
    </main>
  );
}
    `;
        fs.writeFileSync(path.join(dirPath, 'page.tsx'), dynamicTemplate);
    });
}

generatePages();
