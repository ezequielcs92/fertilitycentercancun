'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ChevronRight, Star, Heart, Award } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-brand-violet">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-violet via-transparent to-brand-violet opacity-80" />
                <div className="absolute inset-0 bg-brand-violet/20" />
            </div>

            {/* Background Decor Overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
                            <Star className="w-4 h-4 text-brand-green fill-brand-green" />
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Líderes en Reproducción Asistida</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1]">
                            Tu sueño de ser mamá, <br />
                            <span className="text-brand-green italic">hecho realidad.</span>
                        </h1>

                        <p className="text-xl text-white/80 font-light mb-10 max-w-xl leading-relaxed">
                            En Advanced Fertility Center Cancun combinamos tecnología de vanguardia con un trato cálido e inclusivo para brindarte la mayor probabilidad de éxito en tu tratamiento.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button className="bg-brand-green text-brand-violet px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 group">
                                Iniciar mi camino
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                Tasas de éxito
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-3xl font-serif text-white mb-1">96%</div>
                                <div className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Tasa de Éxito</div>
                            </div>
                            <div>
                                <div className="text-3xl font-serif text-white mb-1">20+</div>
                                <div className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Años de Expertise</div>
                            </div>
                            <div>
                                <div className="text-3xl font-serif text-white mb-1">75k+</div>
                                <div className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Vidas Creadas</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 group">
                            <div className="absolute inset-0 bg-brand-violet/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <Image
                                src="/maternity.png"
                                alt="Fertility Center Cancun Success"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/60 via-transparent to-transparent z-20" />
                        </div>

                        {/* Floating Info Card */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl hidden md:block border border-white/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center">
                                    <Heart className="text-brand-green w-6 h-6 fill-brand-green" />
                                </div>
                                <div>
                                    <div className="text-brand-violet font-serif text-lg leading-tight">Trato Humano</div>
                                    <div className="text-slate-500 text-xs font-medium">Atención personalizada 24/7</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
