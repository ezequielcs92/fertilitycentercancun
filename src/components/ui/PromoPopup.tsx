'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'afcc_promo_popup_shown';
const SHOW_DELAY_MS = 1200;

export default function PromoPopup() {
    const locale = useLocale();
    const isEs = locale === 'es';
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            if (window.sessionStorage.getItem(SESSION_KEY)) {
                return;
            }
        } catch {
            // sessionStorage no disponible: mostramos el popup igualmente
        }

        const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    const close = () => {
        setOpen(false);
        try {
            window.sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
            // ignorar
        }
    };

    const goToPromotions = () => {
        close();
        router.push(isEs ? '/es/promociones' : '/en/promotions');
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={isEs ? 'Promoción actual' : 'Current promotion'}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="relative w-full max-w-[520px] max-h-[85vh]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={close}
                            aria-label={isEs ? 'Cerrar' : 'Close'}
                            className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white text-brand-violet shadow-xl flex items-center justify-center hover:bg-brand-green transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            onClick={goToPromotions}
                            className="block w-full cursor-pointer rounded-3xl overflow-hidden shadow-2xl"
                            aria-label={isEs ? 'Ver promociones' : 'View promotions'}
                        >
                            <Image
                                src={isEs ? '/images/promo-popup-es.jpg' : '/images/promo-popup-en.jpg'}
                                alt={isEs ? 'Promoción FIV - Advanced Fertility Center Cancún' : 'IVF Promotion - Advanced Fertility Center Cancun'}
                                width={1080}
                                height={1350}
                                className="w-full h-auto max-h-[85vh] object-contain"
                                priority
                            />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}