'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { BadgeCheck, MessageCircle, MoreVertical, ThumbsUp, Trash2 } from 'lucide-react';

// Mock data for initial UI - will be replaced with Supabase fetch
const initialComments = [
    { id: 1, author: 'María García', post: 'Tratamiento FIV: Mi historia', content: '¿Cuánto tiempo dura el proceso completo?', status: 'pending', date: '2026-02-07' },
    { id: 2, author: 'Juan Perez', post: 'Infertilidad Masculina', content: 'Muy buena información, gracias doctores.', status: 'pending', date: '2026-02-06' },
];

export default function AdminComments() {
    const [comments, setComments] = useState(initialComments);

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-serif text-brand-violet mb-2">Moderación de Comentarios</h1>
                <p className="text-slate-500">Gestiona los {comments.length} comentarios pendientes de revisión.</p>
            </div>

            <div className="grid gap-6">
                {comments.map((comment) => (
                    <GlassCard key={comment.id} className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-brand-violet">{comment.author}</span>
                                <span className="text-xs px-2 py-0.5 bg-brand-violet/10 text-brand-violet rounded-full">Pendiente</span>
                                <span className="text-xs text-slate-400">{comment.date}</span>
                            </div>
                            <p className="text-slate-600 mb-2 italic">"{comment.content}"</p>
                            <p className="text-xs text-brand-green font-bold uppercase tracking-wider">
                                Post: {comment.post}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-brand-green/20 text-brand-green rounded-2xl hover:bg-brand-green hover:text-white transition-all shadow-sm">
                                <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                <Trash2 className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-200 transition-all">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
