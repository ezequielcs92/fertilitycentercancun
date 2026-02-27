import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { getPodcastById } from '@/lib/actions/podcasts';
import { Clock, ExternalLink } from 'lucide-react';

function formatDuration(seconds: number | null, isEs: boolean) {
  if (!seconds || seconds <= 0) return isEs ? 'Duración no especificada' : 'Duration not specified';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')} min`;
}

function getSpotifyEmbedUrl(url: string) {
  if (!url) return null;

  const episodeMatch = url.match(/spotify\.com\/episode\/([a-zA-Z0-9]+)/);
  if (episodeMatch?.[1]) {
    return `https://open.spotify.com/embed/episode/${episodeMatch[1]}?utm_source=generator`;
  }

  const showMatch = url.match(/spotify\.com\/show\/([a-zA-Z0-9]+)/);
  if (showMatch?.[1]) {
    return `https://open.spotify.com/embed/show/${showMatch[1]}?utm_source=generator`;
  }

  const spotifyUriEpisode = url.match(/spotify:episode:([a-zA-Z0-9]+)/);
  if (spotifyUriEpisode?.[1]) {
    return `https://open.spotify.com/embed/episode/${spotifyUriEpisode[1]}?utm_source=generator`;
  }

  const spotifyUriShow = url.match(/spotify:show:([a-zA-Z0-9]+)/);
  if (spotifyUriShow?.[1]) {
    return `https://open.spotify.com/embed/show/${spotifyUriShow[1]}?utm_source=generator`;
  }

  return null;
}

export default async function PodcastDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const isEs = locale === 'es';

  const podcast = await getPodcastById(id, locale);
  if (!podcast) return notFound();

  const spotifyEmbedUrl = getSpotifyEmbedUrl(podcast.url_audio);

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="Podcast"
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: 'Podcast', href: `/${locale}/podcast` },
          { label: podcast.titulo, href: '#' },
        ]}
      />

      <Container className="pt-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/podcast`}
            className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-brand-violet transition-colors mb-8"
          >
            {isEs ? '← Volver a podcast' : '← Back to podcast'}
          </Link>

          <article className="bg-white rounded-[2.2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 md:p-10">
              <h1 className="text-3xl md:text-4xl font-serif text-brand-violet leading-tight mb-4">{podcast.titulo}</h1>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(podcast.duracion_segundos, isEs)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-brand-violet mb-4">
                  {isEs ? 'Escuchar en Spotify' : 'Listen on Spotify'}
                </h2>

                {spotifyEmbedUrl ? (
                  <iframe
                    title={podcast.titulo}
                    src={spotifyEmbedUrl}
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                  />
                ) : (
                  <p className="text-slate-500 text-sm">
                    {isEs
                      ? 'No se pudo generar el reproductor de Spotify para este enlace.'
                      : 'Could not generate the Spotify player for this link.'}
                  </p>
                )}
              </div>

              <a
                href={podcast.url_audio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-violet text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-green hover:text-brand-violet transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {isEs ? 'Abrir en Spotify' : 'Open in Spotify'}
              </a>

              <div className="prose prose-slate max-w-none mt-10">
                <p className="text-slate-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {podcast.descripcion || (isEs ? 'Sin descripción.' : 'No description.')}
                </p>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </main>
  );
}
