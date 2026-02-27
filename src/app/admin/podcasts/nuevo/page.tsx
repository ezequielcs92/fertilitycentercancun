import React from 'react';
import PodcastForm from '@/components/admin/PodcastForm';

export default function NewPodcastPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-brand-violet mb-2">Nuevo episodio</h1>
        <p className="text-slate-500 font-light text-lg italic">Agrega un episodio al podcast del sitio.</p>
      </div>
      <PodcastForm />
    </div>
  );
}
