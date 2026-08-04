'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Handshake,
  Globe,
  
  CheckCircle2,
  Heart
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const certifications = [
  {
    title: "PACAL – Excelencia Analítica",
    desc: "Certificación de excelencia en calidad analítica otorgada por el Programa de Aseguramiento de la Calidad para Laboratorios clínicos en México.",
    image: "/images/wp/2025_10_hand-shake.png",
    areas: ["Química clínica", "Inmunología-Endocrinología", "Citometría Hemática"]
  },
  {
    title: "Cumplimiento FDA",
    desc: "Alineados con las estrictas regulaciones de la U.S. Food and Drug Administration (FDA) para el transporte y manejo de tejidos reproductivos humanos.",
    icon: <ShieldCheck className="w-12 h-12" />,
    badges: ["USA Standard", "Transfronterizo"]
  },
  {
    title: "Canadian Health Council",
    desc: "Acreditados por el Canadian Health Council en un segundo ciclo de evaluación, garantizando estándares equivalentes a clínicas en Norteamérica.",
    image: "/images/wp/2025_09_CEHC01.jpg",
    status: "2do Ciclo de Acreditación"
  },
  {
    title: "Membresía ESHRE",
    desc: "Miembros de la European Society of Human Reproduction and Embryology, asegurando protocolos basados en la excelencia científica europea.",
    image: "/images/wp/2025_09_eshre01.jpg"
  },
  {
    title: "Sello REDLARA Dorado",
    desc: "Acreditación de la Red Latinoamericana de Reproducción Asistida con el Sello Dorado, la máxima distinción en calidad y ética regional.",
    image: "/images/wp/2025_09_redlara02.jpg"
  },
  {
    title: "Distintivo de Salud SECTUR",
    desc: "Reconocimiento de la Secretaría de Turismo por cumplir estrictos protocolos de higiene y seguridad en el sector de turismo médico.",
    icon: <Award className="w-12 h-12" />
  }
];

const alliances = [
  {
    title: "Igenomix",
    subtitle: "Genética Reproductiva Avanzada",
    desc: "Colaboración líder para diagnósticos genéticos preimplantacionales (PGT-A), maximizando la tasa de éxito por transferencia.",
    image: "/images/wp/2025_10_igenomix001.png"
  },
  {
    title: "Cryotec",
    subtitle: "Tecnología de Vitrificación",
    desc: "Tecnología japonesa de vitrificación ultrarrápida, garantizando la mayor tasa de supervivencia de óvulos y embriones.",
    image: "/images/wp/2025_09_cryotec-01.jpg"
  },
  {
    title: "Fairfax Cryobank & Xytex",
    subtitle: "Bancos Internacionales",
    desc: "Alianzas con los bancos de gametos más grandes del mundo, asegurando diversidad, ética y cumplimiento normativo internacional.",
    image: "/images/wp/2025_05_logo-fairfax.png"
  },
  {
    title: "Ferticare",
    subtitle: "Apoyo Emocional",
    desc: "Acompañamiento psicológico especializado para cuidar el bienestar mental durante todo el proceso reproductivo.",
    image: "/images/wp/2025_09_ferticare01.jpg"
  }
];

export default function Page() {
  return (
    <main className="bg-white pb-24 overflow-x-hidden">
      <PageHeader
        title="Excelencia y Alianzas"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Certificaciones y Alianzas', href: '#' }
        ]}
      />

      {/* Intro Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-violet mb-8 leading-tight">
              Comprometidos con la <span className="text-brand-green italic">Excelencia Médica</span> Global
            </h1>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              En Advanced Fertility Center Cancún, no solo buscamos cumplir sueños; lo hacemos bajo los estándares más rigurosos de seguridad, ética y calidad internacional. Cada certificación y alianza estratégica es un testimonio de nuestra dedicación a tu bienestar.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Certifications Grid */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
            <div className="max-w-2xl">
              <span className="text-brand-green font-bold tracking-widest text-sm uppercase mb-4 block">CALIDAD CERTIFICADA</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-violet">Acreditaciones y Membresías</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:border-brand-violet/10 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="h-48 mb-6 relative rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-brand-violet opacity-60">
                      {item.icon}
                    </div>
                  )}
                  {item.status && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-brand-green text-brand-violet text-[10px] font-bold rounded-full">
                      {item.status}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-serif text-brand-violet mb-4">{item.title}</h3>
                <p className="text-slate-500 font-light flex-grow leading-relaxed mb-6">
                  {item.desc}
                </p>

                {item.areas && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                    {item.areas.map((area, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 bg-brand-violet/5 text-brand-violet rounded-md font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                )}

                {item.badges && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                    {item.badges.map((badge, i) => (
                      <span key={i} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-brand-green/10 text-brand-violet rounded-md font-bold uppercase tracking-tighter">
                        <CheckCircle2 className="w-3 h-3 text-brand-green" /> {badge}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Strategic Alliances */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <Handshake className="w-12 h-12 text-brand-green mb-6 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-serif text-brand-violet mb-6 italic">Alianzas que potencian resultados</h2>
            <p className="text-lg text-slate-600 font-light">
              Nuestra red de socios estratégicos nos permite integrar tecnología de vanguardia y soporte internacional en cada tratamiento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {alliances.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                className="bg-white rounded-[3rem] p-10 flex flex-col md:flex-row gap-8 items-center border border-transparent hover:border-brand-violet/10 hover:shadow-xl transition-all"
              >
                <div className="w-full md:w-2/5 shrink-0 rounded-2xl overflow-hidden aspect-square bg-slate-50 flex items-center justify-center p-6">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-brand-green font-bold text-xs tracking-widest uppercase mb-2 block">{item.subtitle}</span>
                  <h3 className="text-2xl font-serif text-brand-violet mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-light leading-relaxed italic">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-violet/5 -z-10" />
        <Container>
          <div className="max-w-5xl mx-auto bg-brand-violet rounded-[4rem] p-12 lg:p-24 text-white text-center relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

            <Globe className="w-16 h-16 text-brand-green mb-8 mx-auto animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Calidad sin fronteras</h2>
            <p className="text-xl text-indigo-100 font-light max-w-3xl mx-auto mb-12">
              Ya sea que te encuentres en México, Estados Unidos o Canadá, nuestra estructura certificada garantiza que tu camino hacia la maternidad o paternidad sea fluido, seguro y de clase mundial.
            </p>

            <div className="grid sm:grid-cols-3 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-serif text-brand-green text-3xl mb-2 italic">100%</h4>
                <p className="text-sm text-indigo-200">Cumplimiento Etico</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-serif text-brand-green text-3xl mb-2 italic">Global</h4>
                <p className="text-sm text-indigo-200">Protocolos Seguridad</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-serif text-brand-green text-3xl mb-2 italic">Lideres</h4>
                <p className="text-sm text-indigo-200">Reproduccion Asistida</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Last snippet */}
      <section className="py-20">
        <Container className="text-center">
          <Heart className="w-12 h-12 text-brand-green mb-6 mx-auto" />
          <h3 className="text-2xl font-serif text-brand-violet italic mb-4">Tu bienestar es nuestro mayor aval.</h3>
          <p className="text-slate-500 font-light italic leading-relaxed max-w-2xl mx-auto">
            Seguimos renovando nuestras acreditaciones año tras año para asegurarte siempre lo mejor de la ciencia y el corazón.
          </p>
        </Container>
      </section>
    </main>
  );
}
