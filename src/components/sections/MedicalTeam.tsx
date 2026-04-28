'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';
import { useLocale } from 'next-intl';

const doctors = [
    {
        name: "Dr. Eduardo Emanuel Espadas Reyes",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/dr-eduardo-espadas.jpg",
        videoId: "12c-uapLkt4",
        delay: 0.1
    },
    {
        name: "Dr. Everardo Treviño",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/dr-everardo-trevino.jpg",
        videoId: "gIMat1gL5gE",
        delay: 0.2
    },
    {
        name: "Dra. Esther Iyune Cojab",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/dra-esther-iyune.jpg",
        videoId: "oMwhqoWecOk",
        delay: 0.3
    },
    {
        name: "Dr. Rodolfo González Hovelman",
        specialty: "Ginecología y Obstetricia / Biología de la Reproducción",
        image: "/images/treatments/RODOLFO.png",
        videoId: "k48OS-glyqg",
        delay: 0.4
    }
];

export default function MedicalTeam() {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <section className="py-24 bg-brand-slate overflow-hidden">
            {/* Video Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="w-full h-full"
                            />
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                                {/* Play Button */}
                                <button
                                    onClick={() => setActiveVideo(doctor.videoId)}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center z-10"
                                    aria-label={isEs ? `Ver video de ${doctor.name}` : `Watch video of ${doctor.name}`}
                                >
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-brand-green transition-all duration-300 hover:scale-110">
                                        <PlayCircle className="w-10 h-10 text-brand-violet hover:text-white transition-colors" />
                                    </div>
                                </button>
                            </div>
                            <h3 className="text-xl font-serif text-brand-violet mb-2">{doctor.name}</h3>
                            <p className="text-brand-green font-medium text-sm px-4">
                                {isEs ? doctor.specialty : 'Gynecology and Obstetrics / Reproductive Biology'}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
