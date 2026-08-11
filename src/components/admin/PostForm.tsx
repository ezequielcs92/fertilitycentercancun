'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { savePost, getCategories, type Category, type Post } from '@/lib/actions/posts';
import { Button } from '@/components/ui/Button';
import RichTextEditor from './RichTextEditor';
import { ArrowLeft, Save, Image as ImageIcon, Sparkles, UploadCloud, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface PostFormProps {
    initialData?: Partial<Post>;
}

export default function PostForm({ initialData }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Partial<Post>>(initialData || {
        titulo: '',
        slug: '',
        contenido_html: '',
        extracto: '',
        imagen_banner_url: '',
        categoria_id: '',
        status: 'draft'
    });

    useEffect(() => {
        const fetchCats = async () => {
            const cats = await getCategories();
            setCategories(cats);
        };
        fetchCats();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'titulo' && !initialData?.id) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '')
            }));
        }
    };

    const handleEditorChange = (content: string) => {
        setFormData(prev => ({ ...prev, contenido_html: content }));
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
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, imagen_banner_url: publicUrl }));
        } catch (error) {
            setError('Error al subir la imagen: ' + (error instanceof Error ? error.message : 'error desconocido'));
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await savePost(formData);
            if (result.success) {
                router.push('/admin/blog');
                // No llamamos a setLoading(false) aquí porque la página se va a desmontar
            } else {
                setError(result.error || 'Ocurrió un error al guardar.');
                setLoading(false);
            }
        } catch (_err) {
            setError('Error de conexión.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12 pb-24">
            <div className="flex items-center justify-between sticky top-20 bg-brand-slate/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 border-b border-slate-100">
                <Link href="/admin/blog" className="flex items-center gap-2 text-slate-400 hover:text-brand-violet transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Volver
                </Link>
                <div className="flex items-center gap-4">
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        title="Estado de publicación"
                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-brand-violet outline-none"
                    >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                    </select>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-brand-violet text-white flex items-center gap-2 px-8 shadow-xl shadow-brand-violet/20 hover:bg-brand-green hover:text-brand-violet transition-all"
                    >
                        <Save className="w-5 h-5" /> {loading ? 'Guardando...' : 'Guardar Artículo'}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    {error}
                </div>
            )}

            <div className="grid lg:grid-cols-4 gap-12">
                {/* Principal: Editor */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título del Artículo</label>
                            <input
                                required
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                placeholder="Ej. 10 Consejos para tu Primera Cita de Fertilidad"
                                className="text-2xl md:text-3xl font-serif text-brand-violet px-0 border-none focus:ring-0 placeholder:text-slate-200 outline-none italic"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contenido</label>
                            <RichTextEditor
                                value={formData.contenido_html || ''}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Lateral: Meta y Galería */}
                <div className="space-y-8">
                    {/* Publicación */}
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-6">
                        <h3 className="text-lg font-serif text-brand-violet flex items-center gap-2 italic">
                            <Sparkles className="w-4 h-4 text-brand-green" /> Publicación
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">URL (Slug)</label>
                            <input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                title="Slug URL del artículo"
                                placeholder="url-del-articulo"
                                className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categoría</label>
                            <select
                                name="categoria_id"
                                value={formData.categoria_id || ''}
                                onChange={handleChange}
                                title="Categoría del artículo"
                                className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-sm"
                            >
                                <option value="">Seleccionar...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Imagen de Banner */}
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-4">
                        <h3 className="text-lg font-serif text-brand-violet flex items-center gap-2 italic">
                            <ImageIcon className="w-4 h-4 text-brand-green" /> Imagen Banner
                        </h3>

                        <div className="aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 relative overflow-hidden group hover:border-brand-violet/50 transition-colors">
                            {uploadingImage ? (
                                <div className="flex flex-col items-center justify-center text-brand-violet">
                                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                    <p className="text-xs font-medium">Subiendo imagen...</p>
                                </div>
                            ) : formData.imagen_banner_url ? (
                                <>
                                    <img src={formData.imagen_banner_url} alt="Banner" className="w-full h-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-xs font-bold flex items-center gap-2">
                                            <UploadCloud className="w-4 h-4" /> Cambiar Imagen
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <UploadCloud className="w-8 h-8 text-slate-300 mx-auto mb-2 group-hover:text-brand-violet transition-colors" />
                                    <p className="text-xs text-slate-500 font-medium">Haz clic para subir imagen</p>
                                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                                </div>
                            )}

                            {/* Hidden file input filling the whole container */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                title="Subir imagen"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">O pega una URL directamente</label>
                            <input
                                type="text"
                                name="imagen_banner_url"
                                value={formData.imagen_banner_url || ''}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-100 text-slate-600 outline-none focus:ring-1 focus:ring-brand-violet"
                            />
                        </div>
                    </div>

                    {/* Extracto */}
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-4">
                        <h3 className="text-lg font-serif text-brand-violet italic">Resumen (Extracto)</h3>
                        <textarea
                            name="extracto"
                            rows={5}
                            value={formData.extracto}
                            onChange={handleChange}
                            placeholder="Breve resumen del artículo para las tarjetas de la lista..."
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs resize-none outline-none focus:ring-2 focus:ring-brand-green"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
