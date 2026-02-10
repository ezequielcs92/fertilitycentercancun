'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Heart, Phone, MapPin, Globe, Instagram, Facebook } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface SubMenuItem {
    name: string;
    href: string;
    description?: string;
}

interface NavItem {
    name: string;
    href: string;
    submenu?: SubMenuItem[];
    mega?: boolean;
}

const navigation: NavItem[] = [
    {
        name: 'Nosotros',
        href: '#',
        submenu: [
            { name: '¿Por qué AFCC?', href: '/sobre-fertility-center-cancun', description: 'Nuestra filosofía y compromiso.' },
            { name: 'Vacaciones de Fertilidad', href: '/turismo-medico', description: 'Logística para pacientes internacionales.' },
            { name: 'Instalaciones', href: '/nuestras-instalaciones', description: 'Tecnología de vanguardia.' },
            { name: 'Equipo Médico', href: '/equipo', description: 'Especialistas certificados.' },
            { name: 'Soporte Internacional', href: '/soporte-internacional', description: 'Te acompañamos en cada paso.' },
            { name: 'Certificaciones', href: '/certificaciones-acreditaciones-y-alianzas', description: 'Seguridad y calidad avalada.' },
        ]
    },
    {
        name: 'Tratamientos',
        href: '/tratamientos-de-fertilidad',
        mega: true,
        submenu: [
            { name: 'FIV - Fertilización In vitro', href: '/fiv-fertilizacion-in-vitro' },
            { name: 'FIV con Estudio Genético', href: '/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo' },
            { name: 'Mini FIV', href: '/mini-fiv' },
            { name: 'Inseminación Artificial', href: '/inseminacion-artificial' },
            { name: 'Donación de Óvulos', href: '/donacion-de-ovulos' },
            { name: 'Donación de Esperma', href: '/donacion-de-espermatozoides' },
            { name: 'Donación y Adopción de Embriones', href: '/donacion-y-adopcion-embriones' },
            { name: 'Método ROPA', href: '/metodo-ropa' },
            { name: 'Preservación de la Fertilidad', href: '/preservacion-de-la-fertilidad' },
            { name: 'Coito Programado', href: '/coito-programado-e-induccion-de-ovulacion' },
            { name: 'Transferencia de Embriones', href: '/transferencia-de-embriones-y-preparacion-endometrial' },
            { name: 'Comunidad LGBT+', href: '/comunidad-lgbt-tratamiento' },
        ]
    },
    {
        name: 'Experiencia',
        href: '#',
        submenu: [
            { name: 'Testimonios', href: '/testimonios' },
            { name: 'Blog de Fertilidad', href: '/blog' },
            { name: 'Preguntas Frecuentes', href: '/faqs' },
            { name: 'Primera Visita', href: '/primera-visita-a-nuestra-clinica-de-fertilidad' },
        ]
    },
    { name: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar - High Premium Detail */}
            <div className={`fixed top-0 left-0 right-0 z-[60] py-2 bg-brand-violet border-b border-white/5 transition-all duration-500 ${scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <Container className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/50 tracking-widest uppercase">
                            <Link href="https://instagram.com" className="hover:text-brand-green transition-colors"><Instagram className="w-3.5 h-3.5" /></Link>
                            <Link href="https://facebook.com" className="hover:text-brand-green transition-colors"><Facebook className="w-3.5 h-3.5" /></Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-bold text-white/60 tracking-widest uppercase">
                        <Link href="tel:+529988035530" className="hover:text-brand-green transition-colors flex items-center gap-1.5 font-sans">
                            <Phone className="w-3 h-3 text-brand-green" /> +52 998 803 5530
                        </Link>
                        <div className="flex items-center gap-1.5 opacity-40">
                            <Globe className="w-3 h-3" /> ESPAÑOL
                        </div>
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
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                            <Heart className="text-brand-violet w-6 h-6 md:w-7 md:h-7 fill-brand-violet/20" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-2xl font-serif font-bold text-white leading-none tracking-tight">
                                Advanced Fertility
                            </span>
                            <span className="text-[8px] md:text-[10px] uppercase font-bold text-brand-green tracking-[0.2em] mt-1">
                                Center Cancun
                            </span>
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
                                                        <span className="text-brand-violet font-bold text-sm flex items-center justify-between">
                                                            {sub.name}
                                                            <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-0 group-hover/sub:opacity-100 transition-all -translate-x-2 group-hover/sub:translate-x-0" />
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
                            href="/contacto"
                            className="hidden sm:flex items-center gap-2 bg-brand-green text-brand-violet px-6 py-2.5 rounded-full text-xs font-bold hover:bg-white transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            AGENDAR CITA
                        </Link>

                        <button
                            className="lg:hidden text-white w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl"
                            onClick={() => setMobileOpen(true)}
                            title="Abrir menú"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </Container>

                {/* Mega Menu Overlay - Treatments */}
                <AnimatePresence>
                    {activeMega === 'Tratamientos' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 hidden lg:block overflow-hidden"
                            onMouseEnter={() => setActiveMega('Tratamientos')}
                            onMouseLeave={() => setActiveMega(null)}
                        >
                            <Container className="py-12">
                                <div className="grid grid-cols-4 gap-12">
                                    <div className="col-span-1">
                                        <div className="bg-brand-violet rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden group/card shadow-2xl">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                            <h4 className="text-3xl font-serif mb-4 relative z-10">Terapia <br /><span className="text-brand-green italic">Personalizada</span></h4>
                                            <p className="text-white/60 text-sm leading-relaxed mb-8 relative z-10">Más de 20 años cumpliendo sueños con la tecnología más avanzada del Caribe.</p>
                                            <Link href="/tratamientos-de-fertilidad" className="inline-flex items-center gap-2 text-brand-green text-xs font-bold uppercase tracking-widest hover:text-white transition-colors relative z-10">
                                                Ver Todos
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
                                                    <Heart className="w-5 h-5 text-brand-violet group-hover/item:text-brand-violet" />
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
                            <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white" title="Cerrar menú">
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
                                                        className="text-white/50 hover:text-brand-green text-sm flex items-center gap-2"
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
                                <p className="text-white/40 text-xs flex items-center gap-2 uppercase tracking-widest font-bold">
                                    <MapPin className="w-4 h-4 text-brand-green" /> Cancún, México
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
