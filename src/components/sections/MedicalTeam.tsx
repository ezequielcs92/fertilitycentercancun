'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Linkedin } from 'lucide-react';
import { useLocale } from 'next-intl';

const doctors = [
    {
        name: "Dr. Eduardo Emanuel Espadas Reyes",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/dr-eduardo-espadas.jpg",
        delay: 0.1
    },
    {
        name: "Dr. Everardo Treviño",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/dr-everardo-trevino.jpg",
        delay: 0.2
    },
    {
        name: "Dra. Esther Iyune Cojab",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/dra-esther-iyune.jpg",
        delay: 0.3
    }
];

export default function MedicalTeam() {
    const locale = useLocale();
    const isEs = locale === 'es';

    return (
        <section className="py-24 bg-brand-slate overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-brand-violet/60 font-bold uppercase tracking-[0.2em] text-base mb-4 block">{isEs ? 'Manos Expertas' : 'Expert Hands'}</span>
                    <h2 className="text-5xl md:text-6xl font-serif text-brand-violet mb-6">
                        {isEs ? 'Nuestro ' : 'Our '}<span className="text-brand-green italic">{isEs ? 'Equipo Médico' : 'Medical Team'}</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-light">
                        {isEs
                            ? 'Cuidamos de ti con experiencia y vocación, integrando un equipo multidisciplinario bilingüe de líderes nacionales.'
                            : 'We care for you with experience and purpose, through a bilingual multidisciplinary team of national leaders.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: doctor.delay }}
                            className="text-center"
                        >
                            <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-xl border-4 border-white group">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <h3 className="text-2xl font-serif text-brand-violet mb-2">{doctor.name}</h3>
                            <p className="text-brand-green font-medium text-base px-4">
                                {isEs ? doctor.specialty : 'Gynecology and Obstetrics / Reproductive Biology'}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
