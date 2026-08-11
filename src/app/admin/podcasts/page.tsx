'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Mic, Clock } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { deletePodcast, type Podcast } from '@/lib/actions/podcasts';
import { Button } from '@/components/ui/Button';

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function PodcastsManagerPage() {
  const [items, setItems] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from('podcasts')
      .select('*')
      .order('fecha', { ascending: false });

    if (!error && data) setItems(data as Podcast[]);
    setLoading(false);
  };

  useEffect(() => {
    // Carga de datos en el montaje: el setState ocurre tras el await, no de forma síncrona.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Deseas eliminar este episodio?')) {
      const result = await deletePodcast(id);
      if (result.success) fetchItems();
      else alert('Error al eliminar: ' + result.error);
    }
  };

  const filtered = items.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif text-brand-violet mb-2">Gestor de Podcast</h1>
          <p className="text-slate-500 font-light">Administra episodios y enlaces de audio.</p>
        </div>
        <Link href="/admin/podcasts/nuevo">
          <Button className="bg-brand-violet text-white flex items-center gap-2 px-6 py-4 rounded-2xl shadow-xl shadow-brand-violet/20 hover:bg-brand-green hover:text-brand-violet transition-all">
            <Plus className="w-5 h-5" /> Nuevo episodio
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-brand-violet/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar episodio por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 italic">Cargando episodios...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Episodio</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Duración</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic">
                      No hay episodios.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                            {item.thumbnail_url ? (
                              <img src={item.thumbnail_url} alt={item.titulo} className="w-full h-full object-cover" />
                            ) : (
                              <Mic className="w-5 h-5 text-brand-violet/60" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-brand-violet line-clamp-1">{item.titulo}</p>
                            <a href={item.url_audio} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-brand-violet">
                              Ver enlace de audio
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-slate-500 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> {formatDuration(item.duracion_segundos)}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-500 text-sm">
                        {new Date(item.fecha).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/podcasts/${item.id}/editar`}>
                            <button className="p-2 text-slate-400 hover:text-brand-violet hover:bg-white rounded-lg shadow-sm transition-all" title="Editar episodio">
                              <Edit className="w-5 h-5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all"
                            title="Eliminar episodio"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
