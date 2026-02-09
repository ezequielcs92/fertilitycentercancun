'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Tratamientos', href: '/#tratamientos' },
    { name: 'Equipo Médico', href: '/equipo' },
    { name: 'Blog', href: '/blog' },
    { name: 'Podcasts', href: '/podcasts' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'py-4 backdrop-blur-xl bg-white/70 shadow-lg'
                    : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-violet rounded-xl flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
                        <span className="text-white font-serif font-bold text-xl">F</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif font-bold text-brand-violet leading-none tracking-tight">
                            Fertility Center
                        </span>
                        <span className="text-[10px] uppercase font-bold text-brand-green tracking-[0.2em] leading-none mt-1">
                            Cancun • Premium Care
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-brand-violet hover:text-brand-green transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/#contacto"
                        className="bg-brand-violet text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-green transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        Agendar Cita
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-brand-violet"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-violet/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-serif text-brand-violet hover:text-brand-green transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/#contacto"
                                onClick={() => setIsOpen(false)}
                                className="bg-brand-violet text-white text-center py-4 rounded-2xl font-bold"
                            >
                                Agendar Cita
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
