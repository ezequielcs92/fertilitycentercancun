'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { savePodcast, type Podcast } from '@/lib/actions/podcasts';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface PodcastFormProps {
  initialData?: Partial<Podcast>;
}

export default function PodcastForm({ initialData }: PodcastFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Podcast>>(initialData || {
    titulo: '',
    url_audio: '',
    descripcion: '',
    duracion_segundos: null,
    thumbnail_url: '',
    fecha: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duracion_segundos' ? (value ? Number(value) : null) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await savePodcast(formData);
      if (result.success) {
        router.push('/admin/podcasts');
        router.refresh();
      } else {
        setError(result.error || 'Ocurrió un error al guardar.');
      }
    } catch {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `podcasts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, thumbnail_url: publicUrl }));
    } catch (uploadError: any) {
      setError('Error al subir la imagen: ' + uploadError.message);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-24">
      <div className="flex items-center justify-between sticky top-20 bg-brand-slate/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 border-b border-slate-100">
        <Link href="/admin/podcasts" className="flex items-center gap-2 text-slate-400 hover:text-brand-violet transition-colors">
          <ArrowLeft className="w-5 h-5" /> Volver
        </Link>
        <Button
          type="submit"
          disabled={loading}
          className="bg-brand-violet text-white flex items-center gap-2 px-8 shadow-xl shadow-brand-violet/20 hover:bg-brand-green hover:text-brand-violet transition-all"
        >
          <Save className="w-5 h-5" /> {loading ? 'Guardando...' : 'Guardar episodio'}
        </Button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">{error}</div>}

      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título</label>
          <input
            required
            name="titulo"
            value={formData.titulo || ''}
            onChange={handleChange}
            placeholder="Ej. Fertilidad después de los 35"
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">URL del audio</label>
          <input
            required
            name="url_audio"
            value={formData.url_audio || ''}
            onChange={handleChange}
            placeholder="https://..."
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duración (segundos)</label>
            <input
              name="duracion_segundos"
              type="number"
              min={0}
              value={formData.duracion_segundos ?? ''}
              onChange={handleChange}
              placeholder="1800"
              className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha</label>
            <input
              name="fecha"
              type="datetime-local"
              value={(formData.fecha || '').slice(0, 16)}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thumbnail URL</label>
          <div className="flex items-center gap-3">
            <input
              name="thumbnail_url"
              value={formData.thumbnail_url || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
            <button
              type="button"
              disabled={uploadingImage}
              onClick={() => document.getElementById('podcast-thumbnail-upload')?.click()}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:border-brand-green text-brand-violet hover:bg-brand-green/10 transition-all inline-flex items-center gap-2"
            >
              {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploadingImage ? 'Subiendo...' : 'Subir imagen'}
            </button>
            <input
              id="podcast-thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
          </div>
          {formData.thumbnail_url && (
            <div className="mt-2 w-40 h-40 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
              <img src={formData.thumbnail_url} alt="Preview thumbnail" className="w-full h-full object-cover" />
            </div>
          )}
          {!formData.thumbnail_url && (
            <div className="mt-2 w-40 h-40 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              <span className="inline-flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Sin imagen</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descripción</label>
          <textarea
            name="descripcion"
            rows={5}
            value={formData.descripcion || ''}
            onChange={handleChange}
            placeholder="Resumen del episodio..."
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none"
          />
        </div>
      </div>
    </form>
  );
}
