'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Trash2, Search, CheckCircle2, User, Clock, Phone } from 'lucide-react';
import { getMessages, markMessageAsRead, deleteMessage } from '@/lib/actions/messages';

export default function ContactInbox() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMessages = async () => {
        setLoading(true);
        const data = await getMessages();
        setMessages(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleMarkAsRead = async (id: string) => {
        const result = await markMessageAsRead(id);
        if (result.success) {
            fetchMessages();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar mensaje?')) {
            const result = await deleteMessage(id);
            if (result.success) {
                fetchMessages();
            }
        }
    };

    const filteredMessages = messages.filter(m =>
        m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Bandeja de Entrada</h1>
                <p className="text-slate-500 font-light italic text-lg">Gestiona las consultas recibidas a través del sitio web.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-brand-violet/5 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            title="Buscar mensajes"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 text-center">
                        <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 italic">Cargando mensajes...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredMessages.length === 0 ? (
                            <div className="p-20 text-center text-slate-400 italic">No hay mensajes.</div>
                        ) : (
                            filteredMessages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row gap-8 ${!m.leido ? 'border-l-4 border-brand-green bg-brand-green/5' : ''}`}
                                >
                                    <div className="md:w-1/4 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center text-brand-violet flex-shrink-0">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-brand-violet truncate">{m.nombre}</p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1 italic">
                                                    <Clock className="w-3 h-3" /> {new Date(m.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-xs">
                                            <p className="flex items-center gap-2 text-slate-600 break-all"><Mail className="w-3.5 h-3.5" /> {m.email}</p>
                                            {m.telefono && <p className="flex items-center gap-2 text-slate-600"><Phone className="w-3.5 h-3.5" /> {m.telefono}</p>}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative italic leading-relaxed text-slate-600">
                                            "{m.mensaje}"
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col justify-end gap-2">
                                        {!m.leido && (
                                            <button
                                                onClick={() => handleMarkAsRead(m.id)}
                                                className="p-3 bg-brand-green/20 text-brand-green rounded-xl hover:bg-brand-green hover:text-white transition-all shadow-sm"
                                                title="Marcar como leido"
                                            >
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(m.id)}
                                            className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
