'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { getTestimonials } from '@/lib/actions/testimonials';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SuccessStories() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const t = useTranslations('SuccessStories');

    useEffect(() => {
        const fetchTestimonials = async () => {
            const data = await getTestimonials('approved');
            setTestimonials(data.slice(0, 3));
        };
        fetchTestimonials();
    }, []);

    const fallbackImages = ['/lab.png', '/maternity.png', '/lab.png'];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-brand-violet/60 font-bold uppercase tracking-[0.2em] text-base mb-4 block underline decoration-brand-green decoration-2 underline-offset-8">
                            {t('tagline')}
                        </span>
                        <h2 className="text-5xl font-serif text-brand-violet">
                            {t.rich('title', {
                                italic: (chunks) => <span className="text-brand-green italic">{chunks}</span>
                            })}
                        </h2>
                    </div>
                    <Link href="/testimonios" className="text-brand-violet font-bold border-b-2 border-brand-green pb-1 hover:text-brand-green transition-colors">
                        {t('view_more')}
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t_item, i) => (
                        <motion.div
                            key={t_item.id || i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group"
                        >
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                                <Image src={fallbackImages[i % fallbackImages.length]} alt={t_item.nombre} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                    <Quote className="text-white w-6 h-6" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                                    <p className="text-base italic font-light line-clamp-4">"{t_item.mensaje}"</p>
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif text-brand-violet line-clamp-1">{t_item.nombre}</h3>
                            <div className="flex gap-0.5 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < (t_item.calificacion || 5) ? 'fill-brand-green text-brand-green' : 'text-slate-200'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
