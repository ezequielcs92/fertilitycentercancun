'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTeamMember, type TeamMember } from '@/lib/actions/team';
import { Button } from '@/components/ui/Button';
import ExperienceForm, { type ExperienceItem } from './ExperienceForm';
import { ArrowLeft, Save, Upload, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface TeamMemberFormProps {
    initialData?: TeamMember;
}

export default function TeamMemberForm({ initialData }: TeamMemberFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<TeamMember>(initialData || {
        nombre: '',
        especialidad: '',
        bio: '',
        perfil_profesional: '',
        experiencia_profesional: [],
        foto_url: '',
        telefono: '',
        ubicacion: '',
        email: '',
        activo: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleExperienceChange = (exp: ExperienceItem[]) => {
        setFormData(prev => ({ ...prev, experiencia_profesional: exp }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await saveTeamMember(formData);
            if (result.success) {
                router.push('/admin/equipo');
                router.refresh();
            } else {
                setError(result.error || 'Ocurrió un error al guardar.');
            }
        } catch (_err) {
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

            const { error: uploadError } = await supabase.storage
                .from('team-photos')
                .upload(fileName, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('team-photos')
                .getPublicUrl(fileName);

            setFormData(prev => ({ ...prev, foto_url: publicUrl }));
        } catch (uploadError) {
            setError('Error al subir la imagen: ' + (uploadError instanceof Error ? uploadError.message : 'error desconocido'));
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12 pb-24">
            <div className="flex items-center justify-between sticky top-20 bg-brand-slate/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 border-b border-slate-100">
                <Link href="/admin/equipo" className="flex items-center gap-2 text-slate-400 hover:text-brand-violet transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Volver
                </Link>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-violet text-white flex items-center gap-2 px-8 shadow-xl shadow-brand-violet/20 hover:bg-brand-green hover:text-brand-violet transition-all"
                >
                    <Save className="w-5 h-5" /> {loading ? 'Guardando...' : 'Guardar Especialista'}
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    {error}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Lateral: Foto y Estado */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-violet/5 text-center">
                        <div className="relative w-48 h-48 mx-auto mb-6 group">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border-4 border-brand-green/20 flex items-center justify-center">
                                {uploadingImage ? (
                                    <Loader2 className="w-10 h-10 text-brand-violet animate-spin" />
                                ) : formData.foto_url ? (
                                    <img src={formData.foto_url} alt="Previsualización" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-20 h-20 text-slate-300" />
                                )}
                            </div>
                            <button
                                type="button"
                                title="Subir foto"
                                disabled={uploadingImage}
                                className="absolute bottom-2 right-2 p-3 bg-brand-violet text-white rounded-full shadow-lg hover:bg-brand-green hover:text-brand-violet transition-all"
                                onClick={() => document.getElementById('team-photo-upload')?.click()}
                            >
                                <Upload className="w-5 h-5" />
                            </button>
                            <input
                                id="team-photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                className="hidden"
                            />
                        </div>
                        <div className="space-y-4 text-left">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">URL de la Foto</label>
                                <input
                                    name="foto_url"
                                    value={formData.foto_url || ''}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all text-sm"
                                />
                            </div>
                            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <input
                                    type="checkbox"
                                    name="activo"
                                    checked={formData.activo}
                                    onChange={(e) => setFormData(prev => ({ ...prev, activo: e.target.checked }))}
                                    className="w-5 h-5 accent-brand-green"
                                />
                                <span className="text-sm font-bold text-brand-violet">Perfil Activo</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Principal: Información */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Información Básica */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-6">
                        <h3 className="text-2xl font-serif text-brand-violet mb-6 italic">Información Básica</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre Completo</label>
                                <input
                                    required
                                    name="nombre"
                                    value={formData.nombre || ''}
                                    onChange={handleChange}
                                    placeholder="Ej. Dra. Esther Cojab"
                                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Especialidad</label>
                                <input
                                    required
                                    name="especialidad"
                                    value={formData.especialidad || ''}
                                    onChange={handleChange}
                                    placeholder="Ej. Ginecología y Obstetricia"
                                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono</label>
                                <input
                                    name="telefono"
                                    value={formData.telefono || ''}
                                    onChange={handleChange}
                                    placeholder="+52 ..."
                                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    placeholder="esther@example.com"
                                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ubicación</label>
                                <input
                                    name="ubicacion"
                                    value={formData.ubicacion || ''}
                                    onChange={handleChange}
                                    placeholder="Ej. Cancún, México"
                                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perfil Profesional (Resumen)</label>
                            <textarea
                                name="perfil_profesional"
                                rows={4}
                                value={formData.perfil_profesional || ''}
                                onChange={handleChange}
                                placeholder="Breve resumen del perfil profesional..."
                                className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Biografía Corta (Para tarjetas)</label>
                            <textarea
                                name="bio"
                                rows={2}
                                value={formData.bio || ''}
                                onChange={handleChange}
                                placeholder="Una frase corta que describa al médico..."
                                className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Experiencia Dinámica */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-violet/5">
                        <ExperienceForm
                            value={formData.experiencia_profesional || []}
                            onChange={handleExperienceChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
