'use client';

import React, { useState } from 'react';
import { login } from '@/lib/actions/auth';
import { Sparkles, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await login(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-brand-slate flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-violet/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-md relative">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] shadow-2xl shadow-brand-violet/10 mb-6 border border-brand-violet/5">
                        <span className="text-brand-violet font-serif font-bold text-3xl italic">A</span>
                    </div>
                    <h1 className="text-4xl font-serif text-brand-violet italic mb-2 tracking-tight">Admin Center</h1>
                    <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">Fertility Center Cancun</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-brand-violet/10 border border-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <Sparkles className="w-6 h-6 text-brand-green/30" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Email Corporativo</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-brand-violet transition-colors" />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="ejemplo@clinic.com"
                                        className="block w-full pl-14 pr-6 py-4 bg-white/50 border border-slate-100 rounded-3xl text-brand-violet placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-brand-violet/5 focus:border-brand-violet/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-brand-violet transition-colors" />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="block w-full pl-14 pr-6 py-4 bg-white/50 border border-slate-100 rounded-3xl text-brand-violet placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-brand-violet/5 focus:border-brand-violet/20 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-500 text-sm font-medium animate-shake">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-violet text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-violet/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 overflow-hidden relative group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <span>Entrar al Panel</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Decor */}
                <p className="text-center mt-12 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    Sistema de Gestión Médica &copy; 2026
                </p>
            </div>
        </div>
    );
}
