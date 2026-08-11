
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import BlogGrid from '@/components/blog/BlogGrid';
import { getPublishedPosts, getCategoriesTranslated, type Category } from '@/lib/actions/posts';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;



export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const [realPosts, categories] = await Promise.all([
    getPublishedPosts(12, 0, locale),
    getCategoriesTranslated(locale)
  ]);
  const posts = realPosts || [];

  return (
    <main className="bg-brand-slate min-h-screen pb-24">
      <PageHeader
        title="Blog"
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: 'Blog', href: '#' }
        ]}
      />

      <Container className="pt-16 pb-24">
        {/* isMock warning removed per user request */}

        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={isEs ? 'Buscar artículos...' : 'Search articles...'}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-violet/20 bg-white shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            <Link
              href="/blog"
              className="px-6 py-3 rounded-xl bg-brand-violet text-white font-bold whitespace-nowrap shadow-md shadow-brand-violet/20 hover:scale-105 transition-transform"
            >
              {isEs ? 'Todos' : 'All'}
            </Link>
            {categories?.length > 0 ? categories.map((cat: Category) => (
              <Link
                key={cat.id}
                href={`/blog/categoria/${cat.slug}`}
                className="px-6 py-3 rounded-xl bg-white text-slate-600 font-medium whitespace-nowrap border border-slate-100 hover:border-brand-green/30 hover:text-brand-violet transition-all shadow-sm"
              >
                {cat.nombre}
              </Link>
            )) : (
              [isEs ? 'Salud' : 'Health', isEs ? 'Ciencia' : 'Science', isEs ? 'Estilo de Vida' : 'Lifestyle'].map(cat => (
                <button key={cat} className="px-6 py-3 rounded-xl bg-white text-slate-400 font-medium whitespace-nowrap border border-slate-100 cursor-not-allowed cursor-not-allowed shadow-none">
                  {cat}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="space-y-16">
          <BlogGrid posts={posts} locale={locale} />

          {posts.length >= 12 && (
            <div className="text-center pt-12">
              <button className="px-12 py-4 bg-white border border-brand-violet/20 text-brand-violet font-bold rounded-2xl hover:bg-brand-violet hover:text-white transition-all shadow-lg">
                {isEs ? 'Cargar más artículos' : 'Load more articles'}
              </button>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
