'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Heart, Phone, Microscope, Dna, Zap, UserCheck, Droplets, Baby, Users, Clock, Calendar, ArrowLeftRight, HeartHandshake, MapPin, Instagram, Facebook } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

function TiktokIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.2 8.2 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
        </svg>
    );
}

function XIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
    );
}

function SpotifyIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    );
}

function YoutubeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);
    const t = useTranslations('Navbar');
    const tFooter = useTranslations('Footer');
    const locale = useLocale();
    const isEs = locale === 'es';
    const route = (es: string, en: string) => (isEs ? es : en);

    const socialLinks: Array<{ href: string; label: string; icon: React.ElementType }> = [
        { href: 'https://share.google/ESPToAzwRd2je1P8r', label: 'Google Maps', icon: MapPin },
        { href: 'https://www.facebook.com/AdvancedFertilityCenterCancun', label: 'Facebook', icon: Facebook },
        { href: 'https://www.youtube.com/channel/UCC2jGdKaXHDn9G6J0NcSjAQ', label: 'YouTube', icon: YoutubeIcon },
        { href: 'https://www.instagram.com/advancedfertilitycentercancun/', label: 'Instagram', icon: Instagram },
        { href: 'https://www.tiktok.com/@fertilitycentercancun', label: 'TikTok', icon: TiktokIcon },
        { href: 'https://x.com/fertilitycc', label: 'X (Twitter)', icon: XIcon },
        { href: 'https://open.spotify.com/show/4jzZYLfhfb3xiXaYpB8WQC', label: 'Spotify', icon: SpotifyIcon },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    interface SubMenuItem {
        name: string;
        href: string;
        description?: string;
        icon?: React.ElementType;
    }

    interface NavItem {
        name: string;
        href: string;
        submenu?: SubMenuItem[];
        mega?: boolean;
    }

    const navigation: NavItem[] = [
        {
            name: t('items.about.name'),
            href: '#',
            submenu: [
                { name: t('items.about.links.philosophy.name'), href: route('/sobre-fertility-center-cancun', '/about-fertility-center'), description: t('items.about.links.philosophy.description') },
                { name: t('items.about.links.tourism.name'), href: route('/turismo-medico', '/international-patients'), description: t('items.about.links.tourism.description') },
                { name: t('items.about.links.facilities.name'), href: route('/laboratorios-y-servicios', '/laboratories-and-services'), description: t('items.about.links.facilities.description') },
                { name: t('items.about.links.team.name'), href: route('/equipo', '/ivf-team'), description: t('items.about.links.team.description') },
                { name: t('items.about.links.podcast.name'), href: route('/podcast', '/podcast'), description: t('items.about.links.podcast.description') },
                { name: t('items.about.links.tour.name'), href: route('/instalaciones', '/clinic-tour'), description: t('items.about.links.tour.description') },
                { name: t('items.about.links.certifications.name'), href: route('/certificaciones-acreditaciones-y-alianzas', '/certifications-accreditations-and-partnerships'), description: t('items.about.links.certifications.description') },
            ]
        },
        {
            name: t('items.treatments.name'),
            href: route('/tratamientos', '/fertility-treatments'),
            mega: true,
            submenu: [
                { name: t('items.treatments.links.fiv'), href: route('/fiv-fertilizacion-in-vitro', '/ivf-in-vitro-fertilization'), icon: Microscope },
                { name: t('items.treatments.links.genetic'), href: route('/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo', '/in-vitro-fertilization-with-genetic-testing-and-sex-selection'), icon: Dna },
                { name: t('items.treatments.links.mini_fiv'), href: route('/mini-fiv', '/mini-ivf'), icon: Zap },
                { name: t('items.treatments.links.artificial_insemination'), href: route('/inseminacion-artificial', '/artificial-insemination'), icon: UserCheck },
                { name: t('items.treatments.links.egg_donation'), href: route('/ovodon', '/ovodon'), icon: Heart },
                { name: t('items.treatments.links.sperm_donation'), href: route('/programa-donacion-lifestart', '/programa-donacion-lifestart'), icon: Droplets },
                { name: t('items.treatments.links.embryo'), href: route('/donacion-y-adopcion-embriones', '/embryo-donation-and-adoption'), icon: Baby },
                { name: t('items.treatments.links.ropa'), href: route('/metodo-ropa', '/ropa-method'), icon: Users },
                { name: t('items.treatments.links.preservation'), href: route('/preservacion-de-la-fertilidad', '/fertility-preservation'), icon: Clock },
                { name: t('items.treatments.links.timed_intercourse'), href: route('/coito-programado-e-induccion-de-ovulacion', '/timed-intercourse-and-ovulation-induction'), icon: Calendar },
                { name: t('items.treatments.links.transfer'), href: route('/transferencia-de-embriones-y-preparacion-endometrial', '/embryo-transfer-and-endometrial-preparation'), icon: ArrowLeftRight },
                { name: t('items.treatments.links.lgbt'), href: route('/construyendo-familias', '/building-families'), icon: HeartHandshake },
            ]
        },
        {
            name: t('items.experience.name'),
            href: '#',
            submenu: [
                { name: t('items.experience.links.testimonials'), href: route('/testimonios', '/testimonials') },
                { name: t('items.experience.links.blog'), href: '/blog' },
                { name: t('items.experience.links.faqs'), href: '/faqs' },
                { name: t('items.experience.links.first_visit'), href: route('/primera-visita-a-nuestra-clinica-de-fertilidad', '/first-visit') },
            ]
        },
        {
            name: tFooter('sections.legal.title'),
            href: '#',
            submenu: [
                { name: tFooter('sections.legal.links.privacy'), href: route('/aviso-de-privacidad', '/privacy-notice') },
                { name: tFooter('sections.legal.links.terms'), href: route('/terminos-y-condiciones', '/terminos-y-condiciones') },
            ]
        },
        { name: t('items.contact'), href: route('/contacto', '/contact-ivf-doctors') },
    ];

    return (
        <>
            {/* Top Bar - High Premium Detail */}
            <div className={`fixed top-0 left-0 right-0 z-[60] py-2 bg-brand-violet border-b border-white/5 transition-all duration-500 ${scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <Container className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/50 tracking-widest uppercase">
                        {socialLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-brand-green transition-colors"
                                aria-label={label}
                            >
                                <Icon className="w-3.5 h-3.5" />
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-bold text-white/60 tracking-widest uppercase">
                        <Link href="tel:+529988035530" className="hover:text-brand-green transition-colors flex items-center gap-1.5 font-sans">
                            <Phone className="w-3 h-3 text-brand-green" /> +52 998 803 5530
                        </Link>
                        <LanguageSwitcher />
                    </div>
                </Container>
            </div>

            <header
                className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'top-0 py-3 backdrop-blur-xl bg-brand-violet/90 shadow-2xl border-b border-white/10'
                    : 'top-10 py-6 bg-transparent'
                    }`}
            >
                <Container className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-48 h-12 md:w-56 md:h-16 flex items-center group-hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/images/logotipo-AFCC.svg"
                                alt="Advanced Fertility Center Cancun"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative group/nav"
                                onMouseEnter={() => setActiveMega(item.name)}
                                onMouseLeave={() => setActiveMega(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-white/80 hover:text-white text-[13px] font-bold uppercase tracking-widest flex items-center gap-1.5 py-2 transition-colors relative"
                                >
                                    {item.name}
                                    {item.submenu && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMega === item.name ? 'rotate-180' : ''}`} />}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover/nav:w-full" />
                                </Link>

                                {/* Generic Dropdown */}
                                {item.submenu && !item.mega && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300">
                                        <div className="bg-white rounded-2xl shadow-2xl p-6 min-w-[280px] border border-slate-100 overflow-hidden relative">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-violet" />
                                            <div className="flex flex-col gap-1">
                                                {item.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="group/sub flex flex-col p-3 rounded-xl hover:bg-brand-violet/5 transition-colors"
                                                    >
                                                        <span className="text-brand-violet font-bold text-base">
                                                            {sub.name}
                                                        </span>
                                                        {sub.description && <span className="text-[11px] text-slate-500 font-light mt-0.5">{sub.description}</span>}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA & Mobile Trigger */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href={route('/contacto', '/contact-ivf-doctors')}
                            className="hidden sm:flex items-center gap-2 bg-brand-green text-brand-violet px-6 py-2.5 rounded-full text-base font-bold hover:bg-white transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            {t('cta')}
                        </Link>

                        <button
                            className="lg:hidden text-white w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl"
                            onClick={() => setMobileOpen(true)}
                            title={isEs ? "Abrir menú" : "Open menu"}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </Container>

                {/* Mega Menu Overlay - Treatments */}
                <AnimatePresence>
                    {activeMega === navigation[1].name && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 hidden lg:block overflow-hidden"
                            onMouseEnter={() => setActiveMega(navigation[1].name)}
                            onMouseLeave={() => setActiveMega(null)}
                        >
                            <Container className="py-12">
                                <div className="grid grid-cols-4 gap-12">
                                    <div className="col-span-1">
                                        <div className="bg-brand-violet rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden group/card shadow-2xl">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                            <h4 className="text-3xl font-serif mb-4 relative z-10">
                                                {t.rich('items.treatments.card.title', {
                                                    italic: (chunks) => <span className="text-brand-green italic">{chunks}</span>
                                                })}
                                            </h4>
                                            <p className="text-white/60 text-base leading-relaxed mb-8 relative z-10">{t('items.treatments.card.description')}</p>
                                            <Link href={route('/tratamientos', '/fertility-treatments')} className="inline-flex items-center gap-2 text-brand-green text-base font-bold uppercase tracking-widest hover:text-white transition-colors relative z-10">
                                                {t('items.treatments.card.view_all')}
                                                <ChevronDown className="w-4 h-4 -rotate-90" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-span-3 grid grid-cols-3 gap-x-8 gap-y-2">
                                        {navigation[1].submenu?.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="group/item flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                                            >
                                                <div className="w-10 h-10 bg-brand-violet/5 rounded-xl flex items-center justify-center group-hover/item:bg-brand-green group-hover/item:scale-110 transition-all">
                                                    {sub.icon ? (
                                                        <sub.icon className="w-5 h-5 text-brand-violet group-hover/item:text-brand-violet" />
                                                    ) : (
                                                        <Heart className="w-5 h-5 text-brand-violet group-hover/item:text-brand-violet" />
                                                    )}
                                                </div>
                                                <span className="text-brand-violet font-bold text-[13px] leading-tight group-hover/item:translate-x-1 transition-transform">{sub.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Container>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-brand-violet flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                    <Heart className="text-brand-violet w-6 h-6" />
                                </div>
                                <span className="text-white font-serif font-bold text-xl uppercase tracking-tighter">AFCC</span>
                            </div>
                            <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white" title={isEs ? "Cerrar menú" : "Close menu"}>
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="flex flex-col gap-6">
                                {navigation.map((item) => (
                                    <div key={item.name} className="flex flex-col gap-4">
                                        <Link
                                            href={item.href}
                                            onClick={() => !item.submenu && setMobileOpen(false)}
                                            className="text-2xl font-serif text-white flex items-center justify-between"
                                        >
                                            {item.name}
                                            {item.submenu && <ChevronDown className="w-5 h-5 opacity-30" />}
                                        </Link>
                                        {item.submenu && (
                                            <div className="grid grid-cols-1 gap-3 pl-4 border-l border-white/10">
                                                {item.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="text-white/50 hover:text-brand-green text-base flex items-center gap-2"
                                                    >
                                                        <span className="w-1 h-1 bg-brand-green rounded-full" />
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 border-t border-white/5 bg-black/10">
                            <div className="flex flex-col gap-4">
                                <Link href="tel:+529988035530" className="text-brand-green font-bold text-lg flex items-center gap-2">
                                    <Phone className="w-5 h-5" /> +52 998 803 5530
                                </Link>
                                <p className="text-white/40 text-base flex items-center gap-2 uppercase tracking-widest font-bold">
                                    <MapPin className="w-4 h-4 text-brand-green" /> {isEs ? 'Cancún, México' : 'Cancun, Mexico'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
