
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import BlogGrid from '@/components/blog/BlogGrid';
import { getPublishedPosts, getCategories, type Post } from '@/lib/actions/posts';
import GlassCard from '@/components/ui/GlassCard';
import { Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

const MOCK_POSTS: Post[] = [
  {
    id: 'live-1',
    titulo: 'La fertilidad después del diagnóstico oncológico',
    slug: 'la-fertilidad-despues-del-diagnostico-oncologico',
    extracto: 'Información vital sobre la preservación de la fertilidad y las opciones disponibles después de un diagnóstico de cáncer.',
    imagen_banner_url: 'https://images.unsplash.com/photo-1579154238328-3e9613675de9?q=80&w=1000',
    fecha_publicacion: '2025-11-24T18:38:50Z',
    categoria: { nombre: 'Blog', slug: 'blog' },
    contenido_html: '',
    categoria_id: '1',
    status: 'published',
    views: 156,
    created_at: '2025-11-24T18:38:50Z',
    updated_at: '2025-11-24T18:38:50Z'
  },
  {
    id: 'live-2',
    titulo: 'El viaje del ovocito',
    slug: 'el-viaje-del-ovocito',
    extracto: 'Un recorrido detallado por el proceso biológico y científico que atraviesa el óvulo durante el tratamiento de fertilidad.',
    imagen_banner_url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000',
    fecha_publicacion: '2025-10-15T12:00:00Z',
    categoria: { nombre: 'Blog', slug: 'blog' },
    contenido_html: '',
    categoria_id: '1',
    status: 'published',
    views: 243,
    created_at: '2025-10-15T12:00:00Z',
    updated_at: '2025-10-15T12:00:00Z'
  },
  {
    id: 'live-3',
    titulo: '¿Qué es la endometriosis?',
    slug: 'que-es-la-endometriosis',
    extracto: 'Entendiendo una de las causas más comunes de infertilidad femenina y cómo abordarla médicamente.',
    imagen_banner_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000',
    fecha_publicacion: '2025-09-20T10:00:00Z',
    categoria: { nombre: 'Blog', slug: 'blog' },
    contenido_html: '',
    categoria_id: '1',
    status: 'published',
    views: 189,
    created_at: '2025-09-20T10:00:00Z',
    updated_at: '2025-09-20T10:00:00Z'
  },
  {
    id: 'live-4',
    titulo: 'Abordaje de la pareja infértil',
    slug: 'abordaje-de-la-pareja-infertil',
    extracto: 'El primer paso hacia la maternidad y paternidad: cómo realizamos el diagnóstico integral en AFCC.',
    imagen_banner_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000',
    fecha_publicacion: '2025-08-05T09:00:00Z',
    categoria: { nombre: 'Blog', slug: 'blog' },
    contenido_html: '',
    categoria_id: '1',
    status: 'published',
    views: 312,
    created_at: '2025-08-05T09:00:00Z',
    updated_at: '2025-08-05T09:00:00Z'
  },
  {
    id: 'live-5',
    titulo: 'Por qué elegir una clínica de fertilidad especializada',
    slug: 'por-que-elegir-una-clinica-de-fertilidad-especializada',
    extracto: 'La importancia de la tecnología, la experiencia médica y el acompañamiento humano en tu proceso.',
    imagen_banner_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000',
    fecha_publicacion: '2025-07-12T08:00:00Z',
    categoria: { nombre: 'Blog', slug: 'blog' },
    contenido_html: '',
    categoria_id: '1',
    status: 'published',
    views: 405,
    created_at: '2025-07-12T08:00:00Z',
    updated_at: '2025-07-12T08:00:00Z'
  },
  {
    id: 'live-6',
    titulo: 'Combina la fertilidad con tus vacaciones',
    slug: 'combina-la-fertilidad-con-tus-vacaciones',
    extracto: 'Descubre cómo Cancún ofrece el entorno perfecto para relajarte mientras realizas tu tratamiento.',
    imagen_banner_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
    fecha_publicacion: '2025-06-30T07:00:00Z',
    categoria: { nombre: 'Blog', slug: 'blog' },
    contenido_html: '',
    categoria_id: '1',
    status: 'published',
    views: 520,
    created_at: '2025-06-30T07:00:00Z',
    updated_at: '2025-06-30T07:00:00Z'
  }
];

export default async function Page() {
  const [realPosts, categories] = await Promise.all([
    getPublishedPosts(12),
    getCategories()
  ]);

  // Usar mock posts si la base de datos está vacía
  const posts = realPosts && realPosts.length > 0 ? realPosts : MOCK_POSTS;
  const isMock = !realPosts || realPosts.length === 0;

  return (
    <main className="bg-brand-slate min-h-screen pb-24">
      <PageHeader
        title="Blog"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Blog', href: '#' }
        ]}
      />

      <Container className="pt-16 pb-24">
        {isMock && (
          <div className="mb-8 p-4 bg-brand-violet/5 border border-brand-violet/10 rounded-2xl flex items-center gap-3 text-brand-violet max-w-2xl mx-auto">
            <Sparkles className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium italic">
              Nota: Se muestran artículos de ejemplo mientras se carga el contenido oficial.
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-violet/20 bg-white shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            <Link
              href="/blog"
              className="px-6 py-3 rounded-xl bg-brand-violet text-white font-bold whitespace-nowrap shadow-md shadow-brand-violet/20 hover:scale-105 transition-transform"
            >
              Todos
            </Link>
            {categories?.length > 0 ? categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/blog/categoria/${cat.slug}`}
                className="px-6 py-3 rounded-xl bg-white text-slate-600 font-medium whitespace-nowrap border border-slate-100 hover:border-brand-green/30 hover:text-brand-violet transition-all shadow-sm"
              >
                {cat.nombre}
              </Link>
            )) : (
              ['Salud', 'Ciencia', 'Estilo de Vida'].map(cat => (
                <button key={cat} className="px-6 py-3 rounded-xl bg-white text-slate-400 font-medium whitespace-nowrap border border-slate-100 cursor-not-allowed cursor-not-allowed shadow-none">
                  {cat}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="space-y-16">
          <BlogGrid posts={posts} />

          {!isMock && posts.length >= 12 && (
            <div className="text-center pt-12">
              <button className="px-12 py-4 bg-white border border-brand-violet/20 text-brand-violet font-bold rounded-2xl hover:bg-brand-violet hover:text-white transition-all shadow-lg">
                Cargar más artículos
              </button>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
