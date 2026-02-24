'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Mariana & Carlos",
        story: "Después de 3 años de búsqueda, logramos nuestro sueño en el primer ciclo de FIV. El trato fue excepcional.",
        image: "/lab.png",
        location: "USA"
    },
    {
        name: "Elena S.",
        story: "Gracias al programa de Donación de Óvulos, hoy tengo a mi pequeño en brazos. La transparencia fue lo que más me gustó.",
        image: "/maternity.png",
        location: "México"
    },
    {
        name: "Clara & Sofia",
        story: "El Método ROPA nos permitió ser ambas parte del milagro. Estamos eternamente agradecidas con todo el equipo.",
        image: "/lab.png",
        location: "España"
    }
];

export default function SuccessStories() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-brand-violet/60 font-bold uppercase tracking-[0.2em] text-base mb-4 block underline decoration-brand-green decoration-2 underline-offset-8">Testimonios</span>
                        <h2 className="text-5xl font-serif text-brand-violet">
                            Historias que nos <span className="text-brand-green italic">llenan de orgullo</span>
                        </h2>
                    </div>
                    <button className="text-brand-violet font-bold border-b-2 border-brand-green pb-1 hover:text-brand-green transition-colors">
                        Ver más testimoniales
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group"
                        >
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                                <Image src={t.image} alt={t.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                    <Quote className="text-white w-6 h-6" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                                    <p className="text-base italic font-light">"{t.story}"</p>
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif text-brand-violet">{t.name}</h3>
                            <p className="text-brand-green font-medium text-base tracking-widest uppercase">{t.location}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
