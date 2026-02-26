'use client';

import React, { useEffect, useState } from 'react';
import {
    Users,
    MessageSquare,
    ArrowUpRight,
    Mail,
    Clock,
    Sparkles
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { getDashboardStats } from '@/lib/actions/dashboard';
import Link from 'next/link';

const data = [
    { name: 'Lun', visits: 400, conversions: 24 },
    { name: 'Mar', visits: 300, conversions: 18 },
    { name: 'Mie', visits: 600, conversions: 45 },
    { name: 'Jue', visits: 800, conversions: 56 },
    { name: 'Vie', visits: 500, conversions: 32 },
    { name: 'Sab', visits: 900, conversions: 78 },
    { name: 'Dom', visits: 700, conversions: 65 },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        posts: 0,
        team: 0,
        testimonials: 0,
        messages: 0
    });
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const data = await getDashboardStats();
            if (data) {
                setStats(data.stats);
                setMessages(data.recentMessages);
            }
            setLoading(false);
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-10 space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Artículos Blog"
                    value={stats.posts}
                    icon={MessageSquare}
                    trend="+12% vs mes pasado"
                    color="bg-brand-violet"
                />
                <StatCard
                    title="Equipo Médico"
                    value={stats.team}
                    icon={Users}
                    trend="2 nuevos perfiles"
                    color="bg-brand-green"
                />
                <StatCard
                    title="Testimonios Pend."
                    value={stats.testimonials}
                    icon={Sparkles}
                    trend="Requieren moderación"
                    color="bg-orange-400"
                />
                <StatCard
                    title="Mensajes Totales"
                    value={stats.messages}
                    icon={Mail}
                    trend="Bandeja de entrada"
                    color="bg-slate-800"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-2xl shadow-brand-violet/5 border border-brand-violet/5">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-serif text-brand-violet italic">Rendimiento del Sitio</h3>
                            <p className="text-slate-400 text-sm">Visitas vs Conversiones (7 días)</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs font-bold text-brand-violet">
                                <div className="w-3 h-3 rounded-full bg-brand-violet" /> Visitas
                            </span>
                            <span className="flex items-center gap-2 text-xs font-bold text-brand-green">
                                <div className="w-3 h-3 rounded-full bg-brand-green" /> Leads
                            </span>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7562A2" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#7562A2" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#99E5D8" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#99E5D8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#7562A2"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="conversions"
                                    stroke="#99E5D8"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorLeads)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inbox Preview */}
                <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-brand-violet/5 border border-brand-violet/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-serif text-brand-violet italic">Mensajes Recientes</h3>
                        <Link href="/admin/contacto" className="text-brand-green hover:underline text-sm font-bold">Ver todos</Link>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <p className="text-center text-slate-400 py-10 italic">Cargando mensajes...</p>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-12">
                                <Mail className="w-10 h-10 text-slate-100 mx-auto mb-4" />
                                <p className="text-slate-400 text-sm">Bandeja de entrada vacía</p>
                            </div>
                        ) : messages.map((m, i) => (
                            <div key={i} className="group relative p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center text-brand-violet text-xs font-bold">
                                        {m.nombre.charAt(0)}
                                    </div>
                                    <p className="font-bold text-brand-violet text-sm truncate">{m.nombre}</p>
                                    {!m.leido && <div className="w-2 h-2 rounded-full bg-brand-green" />}
                                </div>
                                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed italic">"{m.mensaje}"</p>
                                <p className="text-[10px] text-slate-300 mt-2 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {new Date(m.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/admin/contacto"
                        className="block w-full text-center mt-8 py-3 bg-brand-violet/5 text-brand-violet rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-violet hover:text-white transition-all"
                    >
                        Gestionar Bandeja
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-brand-violet/5 border border-brand-violet/5 group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-4 ${color} rounded-2xl text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand-green transition-colors" />
            </div>
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-4xl font-serif text-brand-violet italic">{value}</p>
            <p className="text-[10px] text-brand-green font-bold mt-2 uppercase tracking-wide">{trend}</p>
        </div>
    );
}
