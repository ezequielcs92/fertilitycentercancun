
import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Heart, Sparkles, Activity, Microscope, Baby, CheckCircle2, MessageCircle } from 'lucide-react';

export default function GeneticStudyPage() {
  const steps = [
    {
      title: "Estimulación Ovárica",
      desc: "Se utilizan medicamentos para estimular los folículos en los ovarios con la intención de obtener el mayor número de óvulos de alta calidad.",
      image: "https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Medicamentos.jpg"
    },
    {
      title: "Captura y Quirófano",
      desc: "Los óvulos se capturan mediante aspiración dirigida por ultrasonido en nuestro quirófano especializado bajo sedación ligera.",
      image: "https://fertilitycentercancun.com/wp-content/uploads/2025/10/WEB-2.-Quirofano001.jpg"
    },
    {
      title: "Capacitación de Esperma",
      desc: "El esperma se procesa en el laboratorio para seleccionar los espermatozoides con mejor movilidad y morfología para la fertilización.",
      image: "https://fertilitycentercancun.com/wp-content/uploads/2025/10/esperma-se-capacita-003.jpg"
    },
    {
      title: "Fertilización (FIV/ICSI)",
      desc: "Se realiza la fertilización en el laboratorio para crear los embriones, ya sea mediante FIV convencional o Inyección Intracitoplásmica (ICSI).",
      image: "https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-2.-Inyeccion.jpg"
    },
    {
      title: "Biopsia Blastocisto",
      desc: "Se realiza una biopsia de la capa externa del embrión (día 5-6) para analizar sus cromosomas sin afectar su potencial de desarrollo.",
      image: "https://fertilitycentercancun.com/wp-content/uploads/2025/10/biopsia-001.jpg"
    },
    {
      title: "Vitrificación y PGT",
      desc: "Los embriones se congelan de forma ultrarrápida mientras esperamos los resultados del estudio genético para una transferencia segura.",
      image: "https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-5.-Se-congelan.jpg"
    }
  ];

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="FIV con Estudio Genético y Selección de Sexo"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'FIV + PGT-A', href: '#' }
        ]}
      />

      <Container className="pt-16">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-violet mb-6">Mayor precisión, mejores resultados</h2>
          <p className="text-xl text-slate-600 leading-relaxed font-light mb-8">
            La combinación de la Fertilización In Vitro (FIV) con la <strong>Prueba Genética Preimplantacional para Aneuploidías (PGT-A)</strong> es una herramienta avanzada que permite identificar embriones cromosómicamente normales antes de la transferencia.
          </p>

          <div className="bg-brand-gray p-8 rounded-[2.5rem] border border-brand-violet/5 mb-12">
            <p className="text-lg text-slate-700 leading-relaxed font-light">
              Este estudio permite <strong>conocer el sexo del embrión</strong> y detectar alteraciones cromosómicas responsables de síndromes como <strong>Down, Patau, Edwards y Klinefelter</strong>. En Advanced Fertility Center Cancún, ofrecemos medicina reproductiva de vanguardia.
            </p>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=5219983050373&text=Visit%C3%A9%20su%20sitio%20web%20y%20quisiera%20agendar%20mi%20videollamada%20gratuita."
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-3 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all hover:-translate-y-1 mb-12"
          >
            <MessageCircle className="w-6 h-6" />
            Agenda tu videollamada gratuita
          </a>
        </div>

        <div className="not-prose relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl mb-24 bg-slate-100">
          <Image
            src="https://fertilitycentercancun.com/wp-content/uploads/2024/08/Etapas-del-FIV-2.jpg"
            alt="Etapas del proceso FIV con PGT-A"
            fill
            className="object-cover m-0"
            unoptimized
          />
        </div>

        <h2 className="text-3xl font-serif text-brand-violet text-center mb-12">El Proceso Paso a Paso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:border-brand-violet/20 transition-all hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center font-bold text-brand-violet shadow-sm">
                  {i + 1}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-brand-violet mb-3">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-brand-violet rounded-[3rem] p-10 text-white shadow-xl">
            <h3 className="text-3xl font-serif mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-brand-green" />
              Beneficios del PGT-A
            </h3>
            <ul className="space-y-4 list-none p-0">
              {[
                "Mejora las tasas de embarazo por transferencia",
                "Disminuye significativamente el riesgo de aborto",
                "Reduce la necesidad de múltiples intentos de FIV",
                "Míminiza riesgos de embarazo múltiple (SET)",
                "Identificación de síndromes genéticos comunes",
                "Selección del sexo embrionario (Balance familiar)"
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" />
                  <span className="text-lg font-light opacity-90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-gray rounded-[3rem] p-10 shadow-inner border border-brand-violet/5">
            <h3 className="text-3xl font-serif text-brand-violet mb-8 flex items-center gap-3">
              <Activity className="w-8 h-8 text-brand-violet" />
              ¿Para quién está indicado?
            </h3>
            <ul className="space-y-4 list-none p-0">
              {[
                "Mujeres mayores de 35 años",
                "Antecedentes de abortos recurrentes",
                "Fallos previos en tratamientos de FIV",
                "Antecedentes familiares de enfermedades genéticas",
                "Deseo de selección de sexo por razones médicas o familiares"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-2.5 shrink-0" />
                  <span className="text-lg text-slate-700 font-light leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-brand-violet p-12 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Microscope className="w-32 h-32 text-brand-violet" />
          </div>
          <h2 className="text-3xl font-serif text-brand-violet mb-6 relative z-10">Expertos en genética reproductiva</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-light relative z-10">
            Nuestro equipo de embriólogos y genetistas utiliza la tecnología más avanzada del mundo para ayudarte a formar una familia saludable.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5219983050373&text=Visit%C3%A9%20su%20sitio%20web%20y%20quisiera%20agendar%20mi%20videollamada%20gratuita."
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-3 bg-brand-violet text-white px-10 py-5 rounded-full font-bold hover:bg-brand-violet/90 transition-all hover:scale-105 shadow-xl"
          >
            <Baby className="w-6 h-6" />
            Contacta con un especialista
          </a>
        </div>
      </Container>
    </main>
  );
}
