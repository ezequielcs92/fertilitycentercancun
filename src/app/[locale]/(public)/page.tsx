'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import TreatmentsGrid from '@/components/sections/TreatmentsGrid';
import AboutClinic from '@/components/sections/AboutClinic';
import SuccessStories from '@/components/sections/SuccessStories';
import SuccessRates from '@/components/sections/SuccessRates';
import ContactForm from '@/components/forms/ContactForm';
import { Award, ArrowRight, ShieldCheck, Microscope, Heart, Users, MapPin, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useLocale } from 'next-intl';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function HomePage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  return (
    <main className="bg-white">
      {/* 1. Impact Hero - Inspired by Ingenes */}
      <Hero rightContent={<ContactForm compact />} />

      {/* 2. Trust Metrics / Partners */}
      <ScrollReveal delay={0.1}>
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
      </ScrollReveal>

      {/* 3. About Clinic (The Ingenes Promise) */}
      <ScrollReveal>
        <AboutClinic />
      </ScrollReveal>

      {/* 4. Treatments Grid */}
      <ScrollReveal>
        <TreatmentsGrid />
      </ScrollReveal>

      {/* 5. Success Rates */}
      <ScrollReveal>
        <SuccessRates />
      </ScrollReveal>

      {/* 6. Success Stories (Emotion) */}
      <ScrollReveal>
        <SuccessStories />
      </ScrollReveal>

      {/* 8. Final Call to Action */}
      <ScrollReveal direction="down">
        <section className="py-24 bg-brand-violet relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px]" />
          </div>

          <Container className="relative z-10 text-center md:text-left">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
                  {isEs ? '¿Listo/a para dar el ' : 'Ready to take the '}
                  <span className="text-brand-green italic underline decoration-brand-green/30">{isEs ? 'primer paso?' : 'first step?'}</span>
                </h2>
                <p className="text-xl text-white/80 font-light">
                  {isEs
                    ? 'Habla con nuestro equipo bilingüe y recibe tu diagnóstico personalizado hoy mismo.'
                    : 'Talk to our bilingual team and receive your personalized diagnosis today.'}
                </p>
              </div>
              <Link href="#contacto" className="bg-brand-green text-brand-violet px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white transition-all duration-500 shadow-2xl flex items-center gap-3 whitespace-nowrap group">
                {isEs ? 'Iniciar Evaluación' : 'Start Evaluation'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x- motion-safe:group-hover:translate-x-2" />
              </Link>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      {/* 9. Contact Information */}
      <ScrollReveal>
        <section className="py-24 bg-white overflow-hidden">
          <Container>
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-serif text-brand-violet mb-8">
                  {isEs ? 'Estamos ' : 'We are '}<span className="text-brand-green italic">{isEs ? 'contigo' : 'with you'}</span>
                </h2>
                <p className="text-xl text-slate-600 font-light mb-12">
                  {isEs
                    ? 'Entendemos que el camino hacia la maternidad y paternidad es un viaje emocional profundo. En '
                    : 'We understand that the path to motherhood and fatherhood is a profound emotional journey. At '}
                  <strong>Advanced Fertility Center Cancún</strong>
                  {isEs
                    ? ', no solo ofrecemos tecnología médica, sino un acompañamiento humano, bilingüe y cercano en cada paso.'
                    : ', we offer not only medical technology, but also close, human, bilingual support at every step.'}
                </p>

                <div className="space-y-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                      <Heart className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-brand-violet mb-1">{isEs ? 'Clínica Certificada' : 'Certified Clinic'}</h4>
                      <p className="text-slate-500 font-light text-lg italic">{isEs ? 'Respaldada por REDLARA y COFEPRIS para tu seguridad total.' : 'Backed by REDLARA and COFEPRIS for your complete safety.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                      <Microscope className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-brand-violet mb-1">{isEs ? 'Tecnología de Vanguardia' : 'Cutting-Edge Technology'}</h4>
                      <p className="text-slate-500 font-light text-lg italic">{isEs ? 'Laboratorios de alta complejidad con los mejores estándares mundiales.' : 'High-complexity laboratories with world-class standards.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-brand-violet mb-1">{isEs ? 'Atención Personalizada' : 'Personalized Care'}</h4>
                      <p className="text-slate-500 font-light text-lg italic">{isEs ? 'Planes de tratamiento diseñados específicamente para tu caso clínico.' : 'Treatment plans specifically designed for your clinical case.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                      <Users className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-brand-violet mb-1">{isEs ? 'Especialistas Bilingües' : 'Bilingual Specialists'}</h4>
                      <p className="text-slate-500 font-light text-lg italic">{isEs ? 'Comunicación clara y empática en tu idioma nativo.' : 'Clear, empathetic communication in your native language.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                      <MapPin className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-brand-violet mb-1">{isEs ? 'Ubicación Premium' : 'Prime Location'}</h4>
                      <p className="text-slate-500 font-light text-lg italic">{isEs ? 'Ubicados en la Zona Hotelera de Cancún, fácil acceso y seguridad.' : 'Located in Cancun’s Hotel Zone, with easy access and safety.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-brand-violet/5 rounded-2xl flex items-center justify-center shadow-sm border border-brand-violet/5 group-hover:bg-brand-violet group-hover:text-white transition-all duration-300">
                      <Sparkles className="w-7 h-7 text-brand-violet fill-current group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-brand-violet mb-1">{isEs ? 'Resultados de Éxito' : 'Successful Results'}</h4>
                      <p className="text-slate-500 font-light text-lg italic">{isEs ? 'Altas tasas de embarazo comparables con las mejores clínicas del mundo.' : 'High pregnancy rates comparable to the world’s best clinics.'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-brand-violet/5 rounded-[4rem] blur-2xl opacity-50" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] shadow-[0_20px_50px_rgba(117,98,162,0.1)] border border-slate-50">
                  <Image
                    src="/medical-team.jpg"
                    alt="Fertility Center Cancun Medical Team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </Container>
        </section>
      </ScrollReveal>
    </main>
  );
}
