'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { getSettings, updateNotificationEmail } from '@/lib/actions/settings';

export default function ConfiguracionPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const settings = await getSettings();
            if (settings && settings.notification_email) {
                setEmail(settings.notification_email);
            }
            setLoading(false);
        };
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setSaving(true);

        const result = await updateNotificationEmail(email);

        if (result.success) {
            setMessage({ type: 'success', text: 'Configuración guardada correctamente. Las notificaciones llegarán a este correo.' });
            setTimeout(() => setMessage(null), 5000);
        } else {
            setMessage({ type: 'error', text: result.error || 'Ocurrió un error al guardar la configuración.' });
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand-violet animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Configuración</h1>
                <p className="text-slate-500 font-light italic text-lg">Administra las preferencias generales del sitio web.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-brand-violet/5">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-brand-violet/10">
                    <div className="w-12 h-12 bg-brand-violet/10 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-brand-violet" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-brand-violet">Notificaciones por Correo</h2>
                        <p className="text-sm text-slate-500">Configura dónde recibir los avisos de nuevas consultas médicas.</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-brand-violet mb-2 uppercase tracking-wide">
                            Email Receptor de Consultas (Leads)
                        </label>
                        <p className="text-xs text-slate-500 mb-4 font-light">
                            Cada vez que un paciente llene el formulario de contacto, enviaremos un resumen a esta dirección.
                        </p>
                        <input
                            type="email"
                            id="email"
                            placeholder="ejemplo@clinicacancun.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full max-w-md px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-green/50 outline-none transition-all"
                        />
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl flex items-start gap-3 text-sm max-w-md ${message.type === 'success' ? 'bg-brand-green/10 text-brand-violet' : 'bg-red-50 text-red-600'
                            }`}>
                            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : null}
                            <p className="pt-0.5 font-medium">{message.text}</p>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-brand-violet hover:bg-brand-violet-light text-white px-6 py-3 rounded-xl font-bold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Guardar Configuración
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
