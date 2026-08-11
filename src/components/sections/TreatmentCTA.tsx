import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function TreatmentCTA({ locale }: { locale: 'es' | 'en' }) {
    const isEs = locale === 'es';
    const href = isEs ? '/es/contacto#formulario' : '/en/contact-ivf-doctors#formulario';

    return (
        <section className="bg-white pb-24">
            <Container>
                <div className="relative overflow-hidden bg-brand-violet rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-green/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                            {isEs ? '¿Listo/a para dar el primer paso?' : 'Ready to take the first step?'}
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
                            {isEs
                                ? 'Agenda tu consulta y recibe un plan de tratamiento personalizado para tu caso.'
                                : 'Schedule your consultation and receive a treatment plan personalized for your case.'}
                        </p>
                        <Link
                            href={href}
                            className="inline-flex items-center gap-3 bg-brand-green text-brand-violet px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl hover:-translate-y-1"
                        >
                            <Calendar className="w-6 h-6" />
                            {isEs ? 'Agendar consulta' : 'Schedule a consultation'}
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}