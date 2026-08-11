import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { getAdminUser } from '@/lib/auth/admin';
import { logout } from '@/lib/actions/auth';
import AdminShell from '@/components/admin/AdminShell';

// La sesión se comprueba en cada request: el panel nunca debe cachearse.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = await getAdminUser();

    // El middleware ya redirige a /login cuando no hay sesión. Aquí cubrimos el
    // caso distinto: hay sesión, pero la cuenta no está dada de alta como
    // administradora en `admin_users`.
    if (!user) {
        return (
            <div className="min-h-screen bg-brand-slate flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-brand-violet/5 p-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 mb-6">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-serif text-brand-violet mb-3">Acceso no autorizado</h1>
                    <p className="text-slate-500 mb-8">
                        Tu cuenta no tiene permisos de administración. Solicita a un administrador
                        que te dé de alta para acceder al panel.
                    </p>
                    <div className="flex flex-col gap-3">
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-2xl bg-brand-violet text-white font-bold hover:opacity-90 transition-all"
                            >
                                Cerrar sesión
                            </button>
                        </form>
                        <Link
                            href="/"
                            className="w-full py-3 rounded-2xl border border-brand-violet/10 text-brand-violet font-bold hover:bg-brand-violet/5 transition-all"
                        >
                            Volver al sitio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return <AdminShell userEmail={user.email}>{children}</AdminShell>;
}
