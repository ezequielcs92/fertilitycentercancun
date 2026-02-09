'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const navigation = [
    {
        name: 'Nosotros',
        href: '#',
        submenu: [
            { name: '¿Por qué AFCC?', href: '/sobre-fertility-center-cancun' },
            { name: 'Vacaciones de Fertilidad', href: '/turismo-medico' },
            { name: 'Instalaciones', href: '/nuestras-instalaciones' },
            { name: 'Equipo Médico', href: '/equipo' },
            { name: 'Soporte Internacional', href: '/soporte-internacional' },
            { name: 'Preguntas Frecuentes', href: '/faqs' },
            { name: 'Certificaciones', href: '/certificaciones-acreditaciones-y-alianzas' },
        ]
    },
    {
        name: 'Tratamientos de Fertilidad',
        href: '/tratamientos-de-fertilidad',
        submenu: [
            { name: 'FIV - Fertilización In vitro', href: '/fiv-fertilizacion-in-vitro' },
            { name: 'FIV con Estudio Genético', href: '/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo' },
            { name: 'Mini FIV', href: '/mini-fiv' },
            { name: 'Inseminación Artificial', href: '/inseminacion-artificial' },
            { name: 'Donación de Óvulos', href: '/donacion-de-ovulos' },
            { name: 'Método ROPA', href: '/metodo-ropa' },
            { name: 'Preservación de la fertilidad', href: '/preservacion-de-la-fertilidad' },
        ]
    },
    {
        name: 'Laboratorios y Servicios',
        href: '/laboratorios-y-servicios',
    },
    {
        name: 'Estudios genéticos',
        href: '/estudios-geneticos',
        submenu: [
            { name: 'Panorama General', href: '/estudios-geneticos' },
            { name: 'Estudios comunidad LGBT', href: '/comunidad-lgbt-tratamiento' },
        ]
    },
    { name: 'Primera visita', href: '/primera-visita-a-nuestra-clinica-de-fertilidad' },
    { name: 'Testimonios', href: '/testimonios' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ\'s', href: '/faqs' },
    { name: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar - High Premium Detail */}
            <div className={`fixed top-0 left-0 right-0 z-[60] py-2 bg-brand-violet border-b border-white/5 transition-transform duration-500 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
                <Container className="flex justify-end items-center gap-6">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-white/60 tracking-widest uppercase">
                        <Link href="tel:+529988035530" className="hover:text-brand-green transition-colors flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-brand-green rounded-full" /> +52 998 803 5530
                        </Link>
                        <Link href="/contacto" className="hover:text-brand-green transition-colors flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-brand-green rounded-full" /> CANCÚN, MÉXICO
                        </Link>
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
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
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

                    {/* Desktop & Mobile Hamburger Trigger */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/#contacto"
                            className="hidden sm:flex items-center gap-2 bg-brand-green text-brand-violet px-6 py-2.5 rounded-full text-xs font-bold hover:bg-white transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            AGENDAR CITA
                        </Link>

                        <button
                            className="text-white flex items-center gap-3 group"
                            onClick={() => setIsOpen(true)}
                            title="Abrir menú"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity hidden md:block">Menú</span>
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
                                <Menu className="w-6 h-6" />
                            </div>
                        </button>
                    </div>
                </Container>

                {/* Global Overlay Menu (Full Screen) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-brand-violet flex flex-col md:flex-row"
                        >
                            {/* Left Side - Background Decor & Info */}
                            <div className="hidden lg:flex w-1/3 p-20 flex-col justify-between border-r border-white/5 relative overflow-hidden">
                                <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px]" />

                                <div className="relative z-10">
                                    <h3 className="text-4xl font-serif text-white mb-6">Tu sueño de <br /><span className="text-brand-green italic">ser mamá</span></h3>
                                    <p className="text-white/60 font-light leading-relaxed max-w-xs">
                                        Ofrecemos soluciones integrales y personalizadas para ayudarte a formar la familia que siempre has deseado.
                                    </p>
                                </div>

                                <div className="relative z-10 flex flex-col gap-4">
                                    <div className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">Contact us</div>
                                    <div className="text-white text-xl font-serif">+52 998 803 5530</div>
                                </div>
                            </div>

                            {/* Right Side - Navigation Links */}
                            <div className="flex-1 p-12 md:p-24 overflow-y-auto relative">
                                <button
                                    className="absolute top-12 right-12 text-white/60 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    title="Cerrar menú"
                                >
                                    <X className="w-10 h-10" />
                                </button>

                                <div className="grid md:grid-cols-2 gap-16 max-w-4xl pt-12">
                                    {navigation.map((item, idx) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex flex-col gap-4"
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => !item.submenu && setIsOpen(false)}
                                                className="text-2xl md:text-3xl font-serif text-white hover:text-brand-green transition-all"
                                            >
                                                {item.name}
                                            </Link>
                                            {item.submenu && (
                                                <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                                                    {item.submenu.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-white/60 hover:text-white text-sm transition-colors"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
