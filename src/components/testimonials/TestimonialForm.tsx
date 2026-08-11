'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { submitTestimonial } from '@/lib/actions/testimonials';

interface TestimonialFormProps {
    onSuccess: () => void;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSuccess }) => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [calificacion, setCalificacion] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await submitTestimonial({ nombre, mensaje, calificacion });
            if (result.success) {
                onSuccess();
            } else {
                setError(result.error || 'Ocurrió un error al enviar tu testimonio.');
            }
        } catch (_err) {
            setError('Error de conexión. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Tu Nombre</label>
                <input
                    required
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                    placeholder="Ej. María García"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Calificación</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setCalificacion(star)}
                            title={`Calificar con ${star} estrellas`}
                            className="focus:outline-none transition-transform active:scale-95"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= calificacion
                                    ? 'fill-brand-green text-brand-green'
                                    : 'text-slate-300'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Tu Historia</label>
                <textarea
                    required
                    rows={5}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none"
                    placeholder="Cuéntanos tu experiencia con nuestro equipo..."
                />
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold transition-all ${loading
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-violet text-white hover:bg-brand-green hover:text-brand-violet shadow-lg shadow-brand-violet/10'
                    }`}
            >
                {loading ? 'Enviando...' : 'Enviar Testimonio'}
            </button>

            <p className="text-center text-xs text-slate-400 font-light">
                Tu testimonio será revisado por nuestro equipo antes de publicarse. ¡Gracias por compartir!
            </p>
        </form>
    );
};
