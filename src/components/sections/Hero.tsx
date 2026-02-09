'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MousePointer2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-cream">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-violet/5 rounded-l-[100px] z-0" />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-20 left-10 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl z-0"
            />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full w-fit border border-brand-violet/10">
                        <Sparkles className="w-4 h-4 text-brand-green" />
                        <span className="text-xs font-bold text-brand-violet uppercase tracking-widest">
                            Líderes en Medicina Reproductiva
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-brand-violet mb-8 leading-[0.95] tracking-tight">
                        Cumpliendo el <span className="text-brand-green italic">sueño</span> más precioso de tu vida.
                    </h1>

                    <p className="text-xl text-slate-600 font-light mb-10 leading-relaxed max-w-lg">
                        Combinamos tecnología de vanguardia, un equipo médico altamente especializado y una atención humana, cálida e inclusiva para ayudarte a cumplir tu sueño de formar una familia.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-brand-violet text-white px-10 py-5 rounded-3xl font-bold text-lg hover:bg-brand-green transition-all duration-500 shadow-xl hover:shadow-brand-green/20 hover:-translate-y-1">
                            Quiero iniciar mi proceso
                        </button>
                        <button className="bg-white text-brand-violet border-2 border-brand-violet/10 px-10 py-5 rounded-3xl font-bold text-lg hover:border-brand-violet transition-all duration-500">
                            Conocer tratamientos
                        </button>
                    </div>

                    {/* Stats/Badges */}
                    <div className="mt-12 flex items-center gap-8 border-t border-brand-violet/10 pt-10">
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif font-bold text-brand-violet">92%</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Éxito en FIV</span>
                        </div>
                        <div className="w-px h-10 bg-brand-violet/10" />
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif font-bold text-brand-violet">+15k</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Bebés nacidos</span>
                        </div>
                        <div className="w-px h-10 bg-brand-violet/10" />
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif font-bold text-brand-violet">20+</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Años de Exp.</span>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[600px] w-full"
                >
                    {/* Main Image */}
                    <div className="absolute inset-0 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
                        <Image
                            src="/maternity.png"
                            alt="Maternidad en Fertility Center Cancun"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Floating cards */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 max-w-[200px]"
                    >
                        <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center mb-3">
                            <Heart className="w-5 h-5 text-brand-greenFill" fill="#99E5D8" />
                        </div>
                        <p className="text-sm font-serif font-bold text-brand-violet">Cuidado Humano Especializado</p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -bottom-10 -left-10 bg-brand-violet p-6 rounded-3xl shadow-2xl max-w-[200px]"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-bold text-white uppercase tracking-tighter">Certificación Internacional Joint Commission</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
