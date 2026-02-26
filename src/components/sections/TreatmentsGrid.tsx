'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Microscope, Heart, Sparkles, UserCheck, Baby, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function TreatmentsGrid() {
    const t = useTranslations('Treatments');

    const treatments = [
        {
            title: t('items.fiv.title'),
            desc: t('items.fiv.description'),
            icon: Microscope,
            href: "/fiv-fertilizacion-in-vitro"
        },
        {
            title: t('items.artificial_insemination.title'),
            desc: t('items.artificial_insemination.description'),
            icon: UserCheck,
            href: "/inseminacion-artificial"
        },
        {
            title: t('items.egg_donation.title'),
            desc: t('items.egg_donation.description'),
            icon: Heart,
            href: "/donacion-de-ovulos"
        },
        {
            title: t('items.ropa.title'),
            desc: t('items.ropa.description'),
            icon: Sparkles,
            href: "/metodo-ropa"
        },
        {
            title: t('items.genetic.title'),
            desc: t('items.genetic.description'),
            icon: ShieldCheck,
            href: "/estudios-geneticos"
        },
        {
            title: t('items.preservation.title'),
            desc: t('items.preservation.description'),
            icon: Baby,
            href: "/preservacion-de-la-fertilidad"
        }
    ];

    return (
        <section id="tratamientos" className="py-24 bg-brand-slate overflow-hidden">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-brand-violet/60 font-bold uppercase tracking-[0.2em] text-base mb-4 block">{t('tagline')}</span>
                    <h2 className="text-5xl font-serif text-brand-violet mb-6">
                        {t.rich('title', {
                            italic: (chunks) => <span className="text-brand-green italic">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-lg text-slate-600 font-light">
                        {t('description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {treatments.map((t_item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={t_item.href}
                                className="group block bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/5 rounded-full -mr-16 -mt-16 group-hover:bg-brand-green/10 transition-colors" />

                                <div className="w-16 h-16 bg-brand-violet/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-violet group-hover:rotate-6 transition-all duration-500">
                                    <t_item.icon className="w-8 h-8 text-brand-violet group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-2xl font-serif text-brand-violet mb-4 group-hover:text-brand-green transition-colors">{t_item.title}</h3>
                                <p className="text-slate-500 font-light leading-relaxed mb-6">
                                    {t_item.desc}
                                </p>
                                <div className="flex items-center gap-2 text-brand-violet font-bold text-base">
                                    {t('learn_more')}
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
