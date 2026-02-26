'use client';

import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ExperienceItem {
    rango: string;
    titulo: string;
    descripcion: string;
}

interface ExperienceFormProps {
    value: ExperienceItem[];
    onChange: (value: ExperienceItem[]) => void;
}

export default function ExperienceForm({ value, onChange }: ExperienceFormProps) {
    const addItem = () => {
        onChange([...value, { rango: '', titulo: '', descripcion: '' }]);
    };

    const removeItem = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof ExperienceItem, newValue: string) => {
        const newList = [...value];
        newList[index] = { ...newList[index], [field]: newValue };
        onChange(newList);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif text-brand-violet">Experiencia Profesional</h3>
                <Button
                    type="button"
                    onClick={addItem}
                    variant="outline"
                    className="flex items-center gap-2 border-brand-green text-brand-violet hover:bg-brand-green/10"
                >
                    <Plus className="w-4 h-4" /> Agregar Logro
                </Button>
            </div>

            <div className="space-y-4">
                {value.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400">No hay experiencia añadida. Haz clic en "Agregar Logro".</p>
                    </div>
                )}

                {value.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-[2rem] border border-brand-violet/5 shadow-sm space-y-4 group relative"
                    >
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rango de Fecha</label>
                                <input
                                    type="text"
                                    value={item.rango}
                                    onChange={(e) => updateItem(index, 'rango', e.target.value)}
                                    placeholder="Ej. 2011 - PRESENTE"
                                    className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all text-sm"
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título del Cargo / Institución</label>
                                <input
                                    type="text"
                                    value={item.titulo}
                                    onChange={(e) => updateItem(index, 'titulo', e.target.value)}
                                    placeholder="Ej. Director Médico - Fertility Center"
                                    className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descripción</label>
                            <textarea
                                rows={3}
                                value={item.descripcion}
                                onChange={(e) => updateItem(index, 'descripcion', e.target.value)}
                                placeholder="Breve descripción de logros o responsabilidades..."
                                className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all text-sm resize-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            title="Eliminar este logro"
                            className="absolute -top-2 -right-2 w-8 h-8 bg-white text-red-400 rounded-full shadow-md flex items-center justify-center border border-red-50 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
