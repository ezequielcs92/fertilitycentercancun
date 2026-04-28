'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-12 overflow-hidden bg-brand-violet">
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
                    <ScrollReveal direction="right" delay={0.2}>
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
                                <Sparkles className="w-4 h-4 text-brand-green" />
                                <span className="text-white text-base font-bold uppercase tracking-widest">{t('tagline')}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1]">
                                {t.rich('title', {
                                    italic: (chunks) => <span className="text-brand-green italic">{chunks}</span>
                                })}
                            </h1>

                            <p className="text-xl text-white/80 font-light mb-10 max-w-xl leading-relaxed">
                                {t('description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a href="#tratamientos" className="bg-brand-green text-brand-violet px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 group">
                                    {t('cta')}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a href="https://wa.me/5219983050373" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                                    <MessageCircle className="w-5 h-5 text-brand-green" />
                                    {t('stats_button')}
                                </a>
                            </div>

                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                                <div>
                                    <div className="text-3xl font-serif text-white mb-1">{t('stats.success').split(' ')[0]}</div>
                                    <div className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{t('stats.success').split(' ').slice(1).join(' ')}</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-serif text-white mb-1">{t('stats.experience').split(' ')[0]}</div>
                                    <div className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{t('stats.experience').split(' ').slice(1).join(' ')}</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-serif text-white mb-1">{t('stats.babies').split(' ')[0]}</div>
                                    <div className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{t('stats.babies').split(' ').slice(1).join(' ')}</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.4}>
                        <div className="relative flex justify-center lg:justify-end xl:pr-12">
                            <div className="relative w-full max-w-[520px] lg:max-w-none aspect-[4/5] lg:aspect-auto lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 group">
                                <div className="absolute inset-0 bg-brand-violet/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src="/medical-team.jpg"
                                    alt="Fertility Center Cancun Medical Team"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/60 via-transparent to-transparent z-20" />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Container>
        </section>
    );
}
