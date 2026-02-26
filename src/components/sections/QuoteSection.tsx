'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function QuoteSection() {
    const t = useTranslations('QuoteSection');

    return (
        <section className="py-20 bg-brand-cream relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-3xl md:text-4xl font-serif text-slate-500 italic mb-6">
                        {t('quote')}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-violet font-bold">
                        {t.rich('title', {
                            italic: (chunks) => <span className="text-brand-green italic">{chunks}</span>
                        })}
                    </h2>
                </motion.div>
            </div>

            {/* Subtle decorative background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-violet/10 to-transparent z-0" />
        </section>
    );
}
