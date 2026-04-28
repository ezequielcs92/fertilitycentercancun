import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { getPodcasts } from '@/lib/actions/podcasts';
import { Headphones, Clock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

function stripHtml(html: string | null | undefined) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ')
    .replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É').replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&uuml;/g, 'ü').replace(/&Uuml;/g, 'Ü')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDuration(seconds: number | null, isEs: boolean) {
  if (!seconds || seconds <= 0) return isEs ? 'Duración no especificada' : 'Duration not specified';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')} min`;
}

export default async function PodcastPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const podcasts = await getPodcasts(locale);

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title={isEs ? 'Podcast' : 'Podcast'}
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: 'Podcast', href: '#' },
        ]}
      />

      <Container className="pt-16">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-4">
            {isEs ? 'Escucha nuestros episodios' : 'Listen to our episodes'}
          </h2>
          <p className="text-slate-600 font-light text-lg leading-relaxed">
            {isEs
              ? 'Contenido sobre fertilidad, reproducción asistida y salud integral para acompañarte con información clara y confiable.'
              : 'Content about fertility, assisted reproduction, and comprehensive health to support you with clear and reliable information.'}
          </p>
        </div>

        {podcasts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
            <Headphones className="w-10 h-10 mx-auto text-brand-violet/40 mb-4" />
            <p className="text-slate-500 italic">
              {isEs ? 'Aún no hay episodios publicados.' : 'There are no published episodes yet.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <article
                key={podcast.id}
                className="bg-white rounded-[2.2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                  {podcast.thumbnail_url ? (
                    <img src={podcast.thumbnail_url} alt={podcast.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-violet/10 to-brand-green/10">
                      <Headphones className="w-10 h-10 text-brand-violet/50" />
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-serif text-brand-violet mb-3 line-clamp-2">{podcast.titulo}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                    {stripHtml(podcast.descripcion) || (isEs ? 'Sin descripción' : 'No description')}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(podcast.duracion_segundos, isEs)}
                  </div>

                  <Link
                    href={`/${locale}/podcast/${podcast.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-violet text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-brand-green hover:text-brand-violet transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {isEs ? 'Ver episodio' : 'View episode'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
