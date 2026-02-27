import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PodcastForm from '@/components/admin/PodcastForm';

export default async function EditPodcastPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  if (!supabase) return notFound();

  const { data: podcast } = await supabase
    .from('podcasts')
    .select('*')
    .eq('id', id)
    .single();

  if (!podcast) return notFound();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-brand-violet mb-2">Editar episodio</h1>
        <p className="text-slate-500 font-light text-lg italic">Actualiza la información del podcast.</p>
      </div>
      <PodcastForm initialData={podcast} />
    </div>
  );
}
