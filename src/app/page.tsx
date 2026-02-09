'use client';

import React from 'react';
import Hero from '@/components/sections/Hero';
import QuoteSection from '@/components/sections/QuoteSection';
import Treatments from '@/components/sections/Treatments';
import AboutClinic from '@/components/sections/AboutClinic';
import MedicalTeam from '@/components/sections/MedicalTeam';
import ContactForm from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import { ShieldCheck, Microscope, Heart, Award, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Premium Hero Section */}
      <Hero />

      {/* Quote Transition Section */}
      <QuoteSection />

      {/* Treatments Section */}
      <Treatments />

      {/* About Clinic Section */}
      <AboutClinic />

      {/* Medical Team Section */}
      <MedicalTeam />


      {/* CTA Section */}
      <section id="tratamientos" className="py-24 bg-brand-violet relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-5xl font-serif text-white mb-6">¿Lista para dar el <span className="text-brand-green italic underline decoration-brand-green/30">primer paso?</span></h2>
              <p className="text-xl text-white/80 font-light">Habla con uno de nuestros especialistas y recibe una evaluación personalizada hoy mismo.</p>
            </div>
            <button className="bg-brand-green text-brand-violet px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white transition-all duration-500 shadow-2xl flex items-center gap-3 whitespace-nowrap">
              Agendar Evaluación
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-brand-slate">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-serif text-brand-violet mb-8">Contáctanos</h2>
              <p className="text-xl text-slate-600 font-light mb-12">
                Estamos aquí para escucharte y resolver todas tus dudas sobre fertilidad y reproducción asistida.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-violet/5">
                    <Award className="w-6 h-6 text-brand-violet" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-violet">Clínica #1 en México</h4>
                    <p className="text-slate-500 font-light">Especialistas reconocidos a nivel mundial.</p>
                  </div>
                </div>
              </div>
            </div>

            <GlassCard className="p-8 md:p-12">
              <ContactForm />
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}
