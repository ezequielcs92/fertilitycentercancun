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
import { Award, ArrowRight, ShieldCheck, Microscope, Heart, Users, MapPin, Sparkles } from 'lucide-react';
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
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">¿Listo/a para dar el <span className="text-brand-green italic underline decoration-brand-green/30">primer paso?</span></h2>
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
      <section id="contacto" className="py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-serif text-brand-violet mb-8">Estamos <span className="text-brand-green italic">contigo</span></h2>
              <p className="text-xl text-slate-600 font-light mb-12">
                Entendemos que el camino hacia la maternidad y paternidad es un viaje emocional profundo. En <strong>Advanced Fertility Center Cancún</strong>, no solo ofrecemos tecnología médica, sino un acompañamiento humano, bilingüe y cercano en cada paso.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                    <Heart className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-violet mb-1">Clínica Certificada</h4>
                    <p className="text-slate-500 font-light text-lg italic">Respaldada por REDLARA y COFEPRIS para tu seguridad total.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                    <Microscope className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-violet mb-1">Tecnología de Vanguardia</h4>
                    <p className="text-slate-500 font-light text-lg italic">Laboratorios de alta complejidad con los mejores estándares mundiales.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-violet mb-1">Atención Personalizada</h4>
                    <p className="text-slate-500 font-light text-lg italic">Planes de tratamiento diseñados específicamente para tu caso clínico.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                    <Users className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-violet mb-1">Especialistas Bilingües</h4>
                    <p className="text-slate-500 font-light text-lg italic">Comunicación clara y empática en tu idioma nativo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                    <MapPin className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-violet mb-1">Ubicación Premium</h4>
                    <p className="text-slate-500 font-light text-lg italic">Ubicados en la Zona Hotelera de Cancún, fácil acceso y seguridad.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                    <Sparkles className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-violet mb-1">Resultados de Éxito</h4>
                    <p className="text-slate-500 font-light text-lg italic">Altas tasas de embarazo comparables con las mejores clínicas del mundo.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-brand-violet/5 rounded-[4rem] blur-2xl opacity-50" />
              <div className="relative bg-white rounded-[3.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(117,98,162,0.1)] border border-slate-50">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
