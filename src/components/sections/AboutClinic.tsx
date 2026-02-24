'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Microscope, ShieldCheck, CheckCircle } from 'lucide-react';

export default function AboutClinic() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white h-[600px] lg:h-[700px]">
                            <Image
                                src="/clinic-labs.jpg"
                                alt="Laboratorio Fertility Center Cancun"
                                width={800}
                                height={1400}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Experience Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-10 -right-10 bg-brand-green p-8 rounded-[2.5rem] shadow-2xl z-20 text-brand-violet"
                        >
                            <span className="block text-4xl font-serif font-bold italic leading-none">20+</span>
                            <span className="block text-base font-bold uppercase tracking-widest mt-1">Años de Exp.</span>
                        </motion.div>
                    </div>

                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-base mb-4 block">Tecnología y Humanismo</span>
                            <h2 className="text-5xl md:text-6xl font-serif text-brand-violet mb-8">
                                Instalaciones de Primer Nivel y <span className="text-brand-green italic">Tecnología Global</span>
                            </h2>
                            <p className="text-xl text-slate-600 font-light mb-8 leading-relaxed">
                                Nuestra clínica cuenta con equipo médico de última generación en laboratorios de análisis clínicos, andrología, quirófanos y unidad materno-fetal.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-violet/5 rounded-2xl flex items-center justify-center shrink-0">
                                        <Microscope className="w-6 h-6 text-brand-violet" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif text-brand-violet mb-1">Respaldo Médico de Leyenda</h4>
                                        <p className="text-slate-600 font-light">Contamos con el respaldo de Masashige Kuwayama, el "Padre de la Vitrificación".</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-6 h-6 text-brand-green" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif text-brand-violet mb-1">Seguridad y Comodidad</h4>
                                        <p className="text-slate-600 font-light">Espacios de recuperación diseñados para que te sientas segura y acompañada en todo momento.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    "Laboratorio ISO-7",
                                    "Unidad Materno-Fetal",
                                    "Área de Andrología",
                                    "Quirófanos Propios"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-brand-green" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
