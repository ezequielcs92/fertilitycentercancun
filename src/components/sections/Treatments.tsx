'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Microscope, Activity, Heart, Sparkles, Users, UserPlus } from 'lucide-react';

const treatments = [
    {
        title: "FIV – Fertilización In Vitro",
        description: "Técnica de alta complejidad con excelentes tasas de éxito para diversas causas de infertilidad.",
        icon: Microscope,
        delay: 0.1
    },
    {
        title: "Ovodonación",
        description: "Programa de donación de óvulos con rigurosos estándares de selección para lograr tu embarazo.",
        icon: UserPlus,
        delay: 0.2
    },
    {
        title: "Inseminación Artificial",
        description: "Procedimiento de baja complejidad que consiste en depositar espermatozoides en el útero.",
        icon: Activity,
        delay: 0.3
    },
    {
        title: "Método ROPA",
        description: "Recepción de Óvulos de la Pareja, diseñado para la maternidad compartida en parejas de mujeres.",
        icon: Users,
        delay: 0.4
    },
    {
        title: "PGT-A (Selección de sexo)",
        description: "Estudios genéticos preimplantacionales para asegurar la salud cromosómica del embrión.",
        icon: Sparkles,
        delay: 0.5
    },
    {
        title: "Apoyo LGBT+",
        description: "Soluciones inclusivas de fertilidad adaptadas a todas las estructuras familiares.",
        icon: Heart,
        delay: 0.6
    }
];

export default function Treatments() {
    return (
        <section id="tratamientos" className="py-24 bg-brand-cream relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-5xl md:text-6xl font-serif text-brand-violet mb-6">
                        Nuestros <span className="text-brand-green italic">Tratamientos</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-light">
                        Ofrecemos soluciones personalizadas y de vanguardia para cada camino hacia la paternidad.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {treatments.map((item, index) => (
                        <GlassCard key={index} className="p-8 group hover:border-brand-green/30 transition-all duration-500" delay={item.delay}>
                            <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center mb-6 text-brand-violet group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-serif text-brand-violet mb-4">{item.title}</h3>
                            <p className="text-slate-600 font-light leading-relaxed">
                                {item.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
