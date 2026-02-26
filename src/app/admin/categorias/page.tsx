'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getCategories, saveCategory, deleteCategory } from '@/lib/actions/categories';

interface Category {
    id: string;
    nombre: string;
    slug: string;
    parent_id?: string | null;
}

export default function CategoriesManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nombre: '', slug: '', parent_id: '' });

    const fetchCategories = async () => {
        setLoading(true);
        const data = await getCategories();
        setCategories(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            nombre: formData.nombre,
            slug: formData.slug || formData.nombre.toLowerCase().replace(/ /g, '-'),
            parent_id: formData.parent_id || null
        };

        const result = await saveCategory(editingId, payload);

        if (result.success) {
            setEditingId(null);
            setFormData({ nombre: '', slug: '', parent_id: '' });
            fetchCategories();
        } else {
            alert('Error al guardar: ' + result.error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar esta categoría? Se desvinculará de los posts.')) {
            const result = await deleteCategory(id);
            if (result.success) {
                fetchCategories();
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Gestor de Categorías</h1>
                <p className="text-slate-500 font-light italic text-lg">Organiza el contenido de tu blog.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                {/* Formulario */}
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-violet/5 space-y-6 sticky top-24">
                        <h3 className="text-xl font-serif text-brand-violet italic">
                            {editingId ? 'Editar Categoría' : 'Nueva Categoría'}
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                            <input
                                required
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                placeholder="Nombre de la categoría"
                                title="Nombre de la categoría"
                                className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug</label>
                            <input
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="slug-de-categoria"
                                title="Slug de la categoría"
                                className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all text-sm"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-brand-violet text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-green hover:text-brand-violet transition-all">
                            {editingId ? <><Edit className="w-5 h-5" /> Actualizar</> : <><Plus className="w-5 h-5" /> Crear</>}
                        </Button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={() => { setEditingId(null); setFormData({ nombre: '', slug: '', parent_id: '' }); }}
                                className="w-full text-slate-400 text-sm hover:text-brand-violet underline"
                            >
                                Cancelar edición
                            </button>
                        )}
                    </form>
                </div>

                {/* Lista */}
                <div className="md:col-span-2 space-y-4">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className="w-10 h-10 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-400 italic">Cargando categorías...</p>
                        </div>
                    ) : (
                        categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="bg-white p-6 rounded-2xl border border-brand-violet/5 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
                            >
                                <div>
                                    <h4 className="font-bold text-brand-violet italic underline decoration-brand-green/30 decoration-2 underline-offset-4">{cat.nombre}</h4>
                                    <p className="text-xs text-slate-400 mt-1">/{cat.slug}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setEditingId(cat.id); setFormData({ nombre: cat.nombre, slug: cat.slug, parent_id: '' }); }}
                                        title="Editar"
                                        className="p-2 text-slate-400 hover:text-brand-violet bg-slate-50 rounded-lg"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        title="Eliminar"
                                        className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
