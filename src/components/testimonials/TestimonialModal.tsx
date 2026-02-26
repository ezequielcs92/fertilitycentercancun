'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialForm } from './TestimonialForm';
import { CheckCircle2, X } from 'lucide-react';

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSuccess = () => {
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setTimeout(() => setSubmitted(false), 500);
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-brand-violet/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            title="Cerrar modal"
                            className="absolute top-6 right-6 text-slate-400 hover:text-brand-violet transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-brand-green" />
                                </div>
                                <h2 className="text-3xl font-serif text-brand-violet mb-4">¡Gracias!</h2>
                                <p className="text-slate-600 font-light leading-relaxed">
                                    Tu historia ha sido enviada correctamente. <br />
                                    Nos hace muy felices contar con tu testimonio.
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-serif text-brand-violet mb-2 italic">Tu Historia</h2>
                                    <p className="text-slate-500 font-light">Cuéntanos cómo fue tu experiencia con nosotros e inspira a otras personas.</p>
                                </div>
                                <TestimonialForm onSuccess={handleSuccess} />
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
