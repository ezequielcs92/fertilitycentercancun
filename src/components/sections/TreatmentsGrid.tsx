'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Microscope, Heart, Sparkles, UserCheck, Baby, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const treatments = [
    {
        title: "FIV (Fertilización In Vitro)",
        desc: "La técnica más efectiva con laboratorios certificados y tasas de éxito mundiales.",
        icon: Microscope,
        href: "/fiv-fertilizacion-in-vitro"
    },
    {
        title: "Inseminación Artificial",
        desc: "Un proceso sencillo y menos invasivo para casos de baja complejidad.",
        icon: UserCheck,
        href: "/inseminacion-artificial"
    },
    {
        title: "Donación de Óvulos",
        desc: "Programas éticos y seguros con donantes rigurosamente seleccionadas.",
        icon: Heart,
        href: "/donacion-de-ovulos"
    },
    {
        title: "Método ROPA",
        desc: "Especialmente diseñado para parejas de mujeres que desean compartir la maternidad.",
        icon: Sparkles,
        href: "/metodo-ropa"
    },
    {
        title: "Diagnóstico Genético",
        desc: "Detección de anomalías cromosómicas para asegurar un bebé sano.",
        icon: ShieldCheck,
        href: "/estudios-geneticos"
    },
    {
        title: "Preservación de Fertilidad",
        desc: "Congela tus óvulos para ser mamá cuando tú lo decidas.",
        icon: Baby,
        href: "/preservacion-de-la-fertilidad"
    }
];

export default function TreatmentsGrid() {
    return (
        <section id="tratamientos" className="py-24 bg-brand-slate overflow-hidden">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-brand-violet/60 font-bold uppercase tracking-[0.2em] text-base mb-4 block">Soluciones Avanzadas</span>
                    <h2 className="text-5xl font-serif text-brand-violet mb-6">
                        Nuestros <span className="text-brand-green italic">Tratamientos</span>
                    </h2>
                    <p className="text-lg text-slate-600 font-light">
                        Ofrecemos el catálogo más completo de servicios de reproducción asistida, adaptados a tus necesidades específicas.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {treatments.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={t.href}
                                className="group block bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/5 rounded-full -mr-16 -mt-16 group-hover:bg-brand-green/10 transition-colors" />

                                <div className="w-16 h-16 bg-brand-violet/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-violet group-hover:rotate-6 transition-all duration-500">
                                    <t.icon className="w-8 h-8 text-brand-violet group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-2xl font-serif text-brand-violet mb-4 group-hover:text-brand-green transition-colors">{t.title}</h3>
                                <p className="text-slate-500 font-light leading-relaxed mb-6">
                                    {t.desc}
                                </p>
                                <div className="flex items-center gap-2 text-brand-violet font-bold text-base">
                                    Saber más
                                    <div className="w-5 h-[1px] bg-brand-violet group-hover:w-10 transition-all" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
