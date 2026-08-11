
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQAccordionProps {
    id: string;
    pregunta: string;
    respuesta: string;
}

export default function FAQAccordion({ pregunta, respuesta }: FAQAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left p-6 md:p-8 rounded-[2rem] transition-all duration-300 flex items-center justify-between gap-4 border ${isOpen
                    ? 'bg-white shadow-[0_15px_40px_rgba(117,98,162,0.08)] border-brand-violet/10'
                    : 'bg-white/50 border-white hover:bg-white hover:border-brand-violet/5'
                    }`}
            >
                <span className={`text-lg md:text-xl font-serif leading-tight transition-colors ${isOpen ? 'text-brand-violet' : 'text-slate-600'
                    }`}>
                    {pregunta}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-violet text-white rotate-0' : 'bg-brand-violet/5 text-brand-violet rotate-90'
                    }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 md:p-10 text-slate-500 font-light leading-relaxed text-lg pt-2">
                            <div className="w-full h-px bg-slate-50 mb-6" />
                            {respuesta}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
