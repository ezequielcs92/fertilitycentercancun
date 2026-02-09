'use client';

import React from 'react';
import CommentsManager from '@/components/admin/CommentsManager';

export default function AdminDashboardPage() {
    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard label="Leads Totales" value="124" trend="+12% que ayer" />
                <StatCard label="Posts Publicados" value="48" trend="3 nuevos" />
                <StatCard label="Podcast Views" value="2.5k" trend="+5% mensual" />
                <StatCard label="Comentarios" value="45" trend="Pendientes" status="warning" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <CommentsManager />
                {/* Potentially an activity feed or recent leads here */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-brand-violet/5">
                    <h3 className="text-2xl font-serif text-brand-violet mb-6">Últimos Leads</h3>
                    <p className="text-slate-500 italic">Cargando datos de Supabase...</p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, status = 'success' }: { label: string, value: string, trend: string, status?: 'success' | 'warning' }) {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-brand-violet/5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <h4 className="text-4xl font-serif text-brand-violet mb-4">{value}</h4>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${status === 'success' ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-500'}`}>
                {trend}
            </span>
        </div>
    );
}
