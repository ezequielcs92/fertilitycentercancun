'use client';

import React from 'react';
import Hero from '@/components/sections/Hero';
import QuoteSection from '@/components/sections/QuoteSection';
import TreatmentsGrid from '@/components/sections/TreatmentsGrid';
import AboutClinic from '@/components/sections/AboutClinic';
import MedicalTeam from '@/components/sections/MedicalTeam';
import SuccessStories from '@/components/sections/SuccessStories';
import SuccessRates from '@/components/sections/SuccessRates';
import ContactForm from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import { Award, ArrowRight, ShieldCheck, Microscope, Heart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Container } from '@/components/ui/Container';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* 1. Impact Hero - Inspired by Ingenes */}
      <Hero />

      {/* 2. Trust Metrics / Partners */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
        <Container className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="font-serif text-2xl text-brand-violet flex items-center gap-2">
            <ShieldCheck className="w-8 h-8" /> REDLARA
          </div>
          <div className="font-serif text-2xl text-brand-violet flex items-center gap-2">
            <Award className="w-8 h-8" /> COFEPRIS
          </div>
          <div className="font-serif text-2xl text-brand-violet flex items-center gap-2">
            <Microscope className="w-8 h-8" /> ASRM Member
          </div>
        </Container>
      </section>

      {/* 3. About Clinic (The Ingenes Promise) */}
      <AboutClinic />

      {/* 4. Treatments Grid */}
      <TreatmentsGrid />

      {/* 5. Success Rates */}
      <SuccessRates />

      {/* 6. Success Stories (Emotion) */}
      <SuccessStories />

      {/* 6. Medical Team */}
      <MedicalTeam />

      {/* 7. Final Call to Action */}
      <section className="py-24 bg-brand-violet relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px]" />
        </div>

        <Container className="relative z-10 text-center md:text-left">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">¿Lista para dar el <span className="text-brand-green italic underline decoration-brand-green/30">primer paso?</span></h2>
              <p className="text-xl text-white/80 font-light">Habla con nuestro equipo bilingüe y recibe tu diagnóstico personalizado hoy mismo.</p>
            </div>
            <button className="bg-brand-green text-brand-violet px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white transition-all duration-500 shadow-2xl flex items-center gap-3 whitespace-nowrap group">
              Iniciar Evaluación
              <ArrowRight className="w-6 h-6 group-hover:translate-x- motion-safe:group-hover:translate-x-2" />
            </button>
          </div>
        </Container>
      </section>

      {/* 8. Contact Section */}
      <section id="contacto" className="py-24 bg-brand-slate overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-serif text-brand-violet mb-8">Estamos <span className="text-brand-green italic">contigo</span></h2>
              <p className="text-xl text-slate-600 font-light mb-12">
                Resuelve tus dudas sobre fertilidad y reproducción asistida con nuestros especialistas. Ofrecemos consultas presenciales y virtuales.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-violet/5">
                    <Heart className="w-6 h-6 text-brand-violet fill-brand-violet/20" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-violet">Clínica Certificada</h4>
                    <p className="text-slate-500 font-light">Especialistas bilingües reconocidos internacionalmente.</p>
                  </div>
                </div>
              </div>
            </div>

            <GlassCard className="p-8 md:p-12">
              <ContactForm />
            </GlassCard>
          </div>
        </Container>
      </section>
    </main>
  );
}
