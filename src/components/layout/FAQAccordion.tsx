"use client";

import React, { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQAccordionProps {
    id: string;
    pregunta: string;
    respuesta: string;
}

export default function FAQAccordion({ id, pregunta, respuesta }: FAQAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const reactId = useId();
    const buttonId = `${id || reactId}-button`;
    const panelId = `${id || reactId}-panel`;

    return (
        <div className="mb-4">
            <h2 className="m-0">
                <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full text-left p-6 md:p-8 rounded-[2rem] transition-all duration-300 flex items-center justify-between gap-4 border ${isOpen
                        ? 'bg-white shadow-[0_15px_40px_rgba(117,98,162,0.08)] border-brand-violet/10'
                        : 'bg-white/50 border-white hover:bg-white hover:border-brand-violet/5'
                        }`}
                >
                    <span className={`text-lg md:text-xl font-serif leading-tight transition-colors ${isOpen ? 'text-brand-violet' : 'text-slate-600'}`}>
                        {pregunta}
                    </span>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-violet text-white' : 'bg-brand-violet/5 text-brand-violet'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                </button>
            </h2>

            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={isOpen ? 'block' : 'hidden'}
            >
                <div className="p-8 md:p-10 text-slate-500 font-light leading-relaxed text-lg pt-2">
                    <div className="w-full h-px bg-slate-50 mb-6" />
                    {respuesta}
                </div>
            </div>
        </div>
    );
}
