'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const locale = useLocale();
    const isEs = locale === 'es';
    const route = (es: string, en: string) => (isEs ? es : en);

    const footerLinks = [
        {
            title: t('sections.treatments.title'),
            links: [
                { name: t('sections.treatments.links.fiv'), href: route('/fiv-fertilizacion-in-vitro', '/ivf-in-vitro-fertilization') },
                { name: t('sections.treatments.links.artificial_insemination'), href: route('/inseminacion-artificial', '/artificial-insemination') },
                { name: t('sections.treatments.links.egg_donation'), href: route('/donacion-de-ovulos', '/egg-donation') },
                { name: t('sections.treatments.links.ropa'), href: route('/metodo-ropa', '/ropa-method') },
                { name: t('sections.treatments.links.preservation'), href: route('/preservacion-de-la-fertilidad', '/fertility-preservation') },
            ]
        },
        {
            title: t('sections.about.title'),
            links: [
                { name: t('sections.about.links.why_afcc'), href: route('/sobre-fertility-center-cancun', '/about-fertility-center') },
                { name: t('sections.about.links.team'), href: route('/equipo', '/ivf-team') },
                { name: t('sections.about.links.facilities'), href: route('/laboratorios-y-servicios', '/laboratories-and-services') },
                { name: t('sections.about.links.tourism'), href: route('/turismo-medico', '/international-patients') },
                { name: t('sections.about.links.faqs'), href: '/faqs' },
            ]
        },
        {
            title: t('sections.legal.title'),
            links: [
                { name: t('sections.legal.links.privacy'), href: route('/aviso-de-privacidad', '/privacy-notice') },
                { name: t('sections.legal.links.terms'), href: '#' },
            ]
        }
    ];

    return (
        <footer className="bg-brand-violet text-white pt-24 pb-12 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green rounded-full blur-[120px]" />
            </div>

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <Heart className="text-brand-violet w-7 h-7 fill-brand-violet/20" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-serif font-bold text-white leading-none tracking-tight">
                                    Advanced Fertility
                                </span>
                                <span className="text-[10px] uppercase font-bold text-brand-green tracking-[0.2em] mt-1">
                                    Center Cancun
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/60 font-light leading-relaxed mb-8 max-w-sm">
                            {t('description')}
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="font-serif text-xl mb-6 text-white">{group.title}</h4>
                            <ul className="space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-white/60 hover:text-brand-green transition-colors text-base font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base text-white/40">
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-brand-green" />
                            <span>+52 998 803 5530</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-brand-green" />
                            <span>contacto@fertilitycentercancun.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-brand-green" />
                            <span>{isEs ? 'Cancun, Quintana Roo, México' : 'Cancun, Quintana Roo, Mexico'}</span>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">
                        © {new Date().getFullYear()} Advanced Fertility Center Cancun. {t('developed_by')}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
