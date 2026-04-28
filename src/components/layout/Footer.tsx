'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

// Social icon SVGs inline para Tiktok, X, Spotify, Maps
const TiktokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.2 8.2 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z"/>
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
);
const SpotifyIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
);
const MapsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
);
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);
const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
);

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
                        <Link href="/" className="inline-flex mb-8">
                            <div className="relative w-80 h-24">
                                <Image src="/images/logo-afcc.png" alt="Advanced Fertility Center Cancun" fill className="object-contain object-left" />
                            </div>
                        </Link>
                        <p className="text-white/60 font-light leading-relaxed mb-8 max-w-sm">
                            {t('description')}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="https://share.google/ESPToAzwRd2je1P8r" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="Google Maps">
                                <MapsIcon />
                            </Link>
                            <Link href="https://www.facebook.com/AdvancedFertilityCenterCancun" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="Facebook">
                                <FacebookIcon />
                            </Link>
                            <Link href="https://www.youtube.com/channel/UCC2jGdKaXHDn9G6J0NcSjAQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="YouTube">
                                <YoutubeIcon />
                            </Link>
                            <Link href="https://www.instagram.com/advancedfertilitycentercancun/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="Instagram">
                                <InstagramIcon />
                            </Link>
                            <Link href="https://www.tiktok.com/@fertilitycentercancun" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="TikTok">
                                <TiktokIcon />
                            </Link>
                            <Link href="https://x.com/fertilitycc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="X (Twitter)">
                                <XIcon />
                            </Link>
                            <Link href="https://open.spotify.com/show/4jzZYLfhfb3xiXaYpB8WQC" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green hover:text-brand-violet transition-all border border-white/10" aria-label="Spotify">
                                <SpotifyIcon />
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
                    {/* Certifications */}
                    <div className="bg-white rounded-2xl px-10 py-6 flex flex-wrap items-center justify-center gap-10 mb-10">
                        {[
                            { src: '/images/certifications/1ASMR LOGO.png', alt: 'ASMR' },
                            { src: '/images/certifications/1COFEPRIS_logo.png', alt: 'COFEPRIS' },
                            { src: '/images/certifications/1LOGO SECTOR SALUD.png', alt: 'Sector Salud' },
                            { src: '/images/certifications/LOGO FDA WEBSITE.png', alt: 'FDA' },
                            { src: '/images/certifications/LOGOTIPO PACAL WEBSITE.png', alt: 'PACAL' },
                            { src: '/images/certifications/logo_REDLARA.png', alt: 'REDLARA' },
                        ].map((cert) => (
                            <div key={cert.alt} className="relative h-14 w-36">
                                <Image src={cert.src} alt={cert.alt} fill className="object-contain" />
                            </div>
                        ))}
                    </div>

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
