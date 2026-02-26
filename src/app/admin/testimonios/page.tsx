'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Trash2, Star, Search, Filter, Edit2, Save, X, Plus } from 'lucide-react';
import { updateTestimonial, deleteTestimonial, getTestimonials, submitTestimonial } from '@/lib/actions/testimonials';
import { Button } from '@/components/ui/Button';

interface Testimonial {
    id: string;
    nombre: string;
    mensaje: string;
    calificacion: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export default function TestimonialModerator() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ nombre: '', mensaje: '', calificacion: 5 });

    // Create state
    const [isCreating, setIsCreating] = useState(false);
    const [newForm, setNewForm] = useState({ nombre: '', mensaje: '', calificacion: 5 });

    const fetchTestimonials = async () => {
        setLoading(true);
        // Replaced client-side Supabase fetch with server action
        const data = await getTestimonials(filter); // Pass filter to the server action
        setTestimonials(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, [filter]);

    const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
        const result = await updateTestimonial(id, { status: newStatus });
        if (result.success) {
            fetchTestimonials();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar este testimonio permanentemente?')) {
            const result = await deleteTestimonial(id);
            if (result.success) {
                fetchTestimonials();
            }
        }
    };

    const startEditing = (t: Testimonial) => {
        setEditingId(t.id);
        setEditForm({
            nombre: t.nombre,
            mensaje: t.mensaje,
            calificacion: t.calificacion
        });
    };

    const handleSaveEdit = async () => {
        if (!editingId) return;

        const result = await updateTestimonial(editingId, editForm);
        if (result.success) {
            setEditingId(null);
            fetchTestimonials();
        } else {
            alert('Error al guardar: ' + result.error);
        }
    };

    const handleCreate = async () => {
        if (!newForm.nombre.trim() || !newForm.mensaje.trim()) {
            alert('El nombre y el mensaje son obligatorios.');
            return;
        }

        const result = await submitTestimonial({ ...newForm, status: 'approved' });
        if (result.success) {
            setIsCreating(false);
            setNewForm({ nombre: '', mensaje: '', calificacion: 5 });
            setFilter('approved'); // Switch to approved to see the new entry
            fetchTestimonials();
        } else {
            alert('Error al crear: ' + result.error);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
                <div className="flex-shrink-0">
                    <h1 className="text-4xl font-serif text-brand-violet mb-2">Moderación de Testimonios</h1>
                    <p className="text-slate-500 font-light italic text-lg">Revisa y aprueba las historias compartidas por los pacientes.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto xl:justify-end">
                    <Button
                        onClick={() => setIsCreating(!isCreating)}
                        className="bg-brand-violet text-white hover:bg-brand-green hover:text-brand-violet transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-violet/20 whitespace-nowrap px-6 py-6 sm:py-2"
                    >
                        {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isCreating ? 'Cancelar' : 'Agregar Testimonio'}
                    </Button>

                    <div className="flex bg-white p-1 rounded-2xl shadow-lg border border-brand-violet/5 overflow-x-auto max-w-full">
                        {['all', 'pending', 'approved', 'rejected'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === f
                                    ? 'bg-brand-violet text-white'
                                    : 'text-slate-400 hover:text-brand-violet'
                                    }`}
                            >
                                {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : f === 'approved' ? 'Aprobados' : 'Rechazados'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="p-20 text-center">
                    <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 italic">Cargando historias...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isCreating && (
                        <div className="bg-brand-green/5 p-8 rounded-[2.5rem] shadow-xl border-2 border-brand-green/30 flex flex-col group relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-6 py-1.5 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest z-10 bg-brand-green text-white shadow-sm">
                                Nuevo
                            </div>
                            <h3 className="text-xl font-serif text-brand-violet mb-4">Agregar Testimonio</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                                    <input
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                                        value={newForm.nombre}
                                        onChange={(e) => setNewForm({ ...newForm, nombre: e.target.value })}
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="calificacion" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calificación</label>
                                    <select
                                        id="calificacion"
                                        title="Calificación"
                                        aria-label="Calificación del testimonio"
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                                        value={newForm.calificacion}
                                        onChange={(e) => setNewForm({ ...newForm, calificacion: parseInt(e.target.value) })}
                                    >
                                        {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} Estrellas</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mensaje</label>
                                    <textarea
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-brand-green outline-none min-h-[100px]"
                                        value={newForm.mensaje}
                                        onChange={(e) => setNewForm({ ...newForm, mensaje: e.target.value })}
                                        placeholder="Escribe aquí la historia del paciente..."
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        onClick={handleCreate}
                                        className="flex-1 bg-brand-violet text-white text-xs py-2 rounded-xl hover:bg-brand-green hover:text-brand-violet transition-colors"
                                    >
                                        <Save className="w-4 h-4 mr-1" /> Crear Aprobado
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {testimonials.length === 0 && !isCreating ? (
                        <div className="col-span-full py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                            <p className="text-slate-400 italic">No hay testimonios que coincidan con el filtro.</p>
                        </div>
                    ) : (
                        testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-violet/5 flex flex-col group relative overflow-hidden"
                            >
                                {/* Status Banner */}
                                <div className={`absolute top-0 right-0 px-6 py-1.5 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest z-10 ${t.status === 'approved' ? 'bg-brand-green/20 text-brand-green' :
                                    t.status === 'rejected' ? 'bg-red-50 text-red-500' :
                                        'bg-orange-50 text-orange-500'
                                    }`}>
                                    {t.status}
                                </div>

                                {editingId === t.id ? (
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                                            <input
                                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                                                value={editForm.nombre}
                                                onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                                                title="Nombre del paciente"
                                                placeholder="Ej. Juan Pérez"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calificación</label>
                                            <select
                                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                                                value={editForm.calificacion}
                                                onChange={(e) => setEditForm({ ...editForm, calificacion: parseInt(e.target.value) })}
                                                title="Calificación en estrellas"
                                            >
                                                {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} Estrellas</option>)}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mensaje</label>
                                            <textarea
                                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-brand-green outline-none min-h-[100px]"
                                                value={editForm.mensaje}
                                                onChange={(e) => setEditForm({ ...editForm, mensaje: e.target.value })}
                                                title="Contenido del testimonio"
                                                placeholder="Escribe aquí la historia del paciente..."
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <Button
                                                onClick={handleSaveEdit}
                                                className="flex-1 bg-brand-green text-brand-violet text-xs py-2 rounded-xl"
                                            >
                                                <Save className="w-4 h-4 mr-1" /> Guardar
                                            </Button>
                                            <Button
                                                onClick={() => setEditingId(null)}
                                                className="flex-1 bg-slate-100 text-slate-500 text-xs py-2 rounded-xl"
                                            >
                                                <X className="w-4 h-4 mr-1" /> Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-brand-violet/10 rounded-full flex items-center justify-center text-brand-violet flex-shrink-0">
                                                <Star className="w-5 h-5 fill-brand-violet" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-brand-violet italic underline decoration-brand-green/30 decoration-2 underline-offset-4 truncate">{t.nombre}</h4>
                                                <div className="flex gap-0.5 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < t.calificacion ? 'fill-brand-green text-brand-green' : 'text-slate-200'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-slate-600 text-sm italic font-light leading-relaxed">"{t.mensaje}"</p>
                                            <p className="text-[10px] text-slate-300 mt-4">{new Date(t.created_at).toLocaleString()}</p>
                                        </div>

                                        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex gap-2">
                                                {t.status !== 'approved' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(t.id, 'approved')}
                                                        title="Aprobar"
                                                        className="p-3 bg-brand-green/10 text-brand-green rounded-2xl hover:bg-brand-green hover:text-white transition-all shadow-sm"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                                {t.status !== 'rejected' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(t.id, 'rejected')}
                                                        title="Rechazar"
                                                        className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => startEditing(t)}
                                                    title="Editar"
                                                    className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-brand-violet hover:text-white transition-all"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    title="Eliminar"
                                                    className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
