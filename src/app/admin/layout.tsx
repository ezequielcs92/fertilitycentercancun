'use client';

import React from 'react';
import {
    Users,
    MessageSquare,
    Mic,
    LayoutDashboard,
    Settings,
    LogOut,
    Sparkles,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/actions/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'Blog', icon: MessageSquare, href: '/admin/blog' },
        { name: 'Categorías', icon: Sparkles, href: '/admin/categorias' },
        { name: 'Equipo Médico', icon: Users, href: '/admin/equipo' },
        { name: 'Testimonios', icon: MessageSquare, href: '/admin/testimonios' },
        { name: 'Galería', icon: Sparkles, href: '/admin/galeria' },
        { name: 'Bandeja', icon: Mail, href: '/admin/contacto' },
    ];

    return (
        <div className="min-h-screen bg-brand-slate flex">
            {/* Blue Sidebar */}
            <aside className="w-72 bg-brand-violet text-white p-8 flex flex-col shadow-2xl z-20">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center">
                        <span className="text-brand-violet font-serif font-bold text-xl">A</span>
                    </div>
                    <span className="text-xl font-serif font-bold tracking-tight">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive
                                    ? 'bg-brand-green text-brand-violet font-bold'
                                    : 'hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-violet' : 'text-white/60 group-hover:text-white'}`} />
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/10 space-y-2">
                    <Link href="/admin/configuracion" className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all text-white/60 hover:text-white">
                        <Settings className="w-5 h-5" />
                        <span>Configuración</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-red-500/20 text-red-300 hover:text-white transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto min-w-0">
                <header className="h-20 bg-white border-b border-brand-violet/5 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-bold">Resumen de Hoy</span>
                        <Sparkles className="w-4 h-4 text-brand-green" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-base font-bold text-brand-violet">Fertility Center</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Super Administrador</p>
                        </div>
                        <div className="w-10 h-10 bg-brand-violet/10 rounded-full border-2 border-brand-green" />
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
}
