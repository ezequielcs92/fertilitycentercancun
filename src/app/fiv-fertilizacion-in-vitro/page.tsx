
import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Heart, MessageCircle } from 'lucide-react';

export default function Page() {
  const steps = [
    {
      title: "Estimulación Ovárica",
      desc: "Se utilizan medicamentos para estimular los folículos en los ovarios con la intención de obtener el mayor número de óvulos de alta calidad.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Captura de Óvulos",
      desc: "Los óvulos se capturan mediante aspiración dirigida por ultrasonido en nuestro quirófano especializado bajo sedación ligera.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Capacitación de Esperma",
      desc: "El esperma se procesa en el laboratorio para seleccionar los espermatozoides con mejor movilidad y morfología para la fertilización.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Laboratorio y Fertilización",
      desc: "Los ovocitos se fertilizan en el laboratorio (FIV o ICSI) y se cultivan los embriones bajo monitoreo constante de nuestros embriólogos.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Transferencia o Vitrificación",
      desc: "Los embriones pueden ser transferidos al útero o vitrificados (congelados) para su almacenamiento y transferencia posterior.",
      image: "/images/treatments/IVF.jpg"
    }
  ];

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="FIV – Fertilización In vitro"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
          { label: 'FIV – Fertilización In vitro', href: '#' }
        ]}
      />

      <Container className="pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl font-serif text-brand-violet mb-6">Una solución avanzada para superar problemas de fertilidad, con alta tasa de éxito.</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-8">
              La <strong>Fertilización In Vitro (FIV)</strong> es un tratamiento de reproducción asistida avanzado para resolver problemas de fertilidad. Este proceso involucra la fertilización de un óvulo con esperma en el laboratorio y la transferencia del embrión al útero de la mujer.
            </p>

            <div className="bg-brand-gray p-8 rounded-[2.5rem] border border-brand-violet/5 mb-8">
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                Utilizamos la <strong>última tecnología en embriología</strong> y un laboratorio especializado para asegurar la mayor probabilidad de éxito en cada ciclo.
              </p>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=5219983050373&text=Visit%C3%A9%20su%20sitio%20web%20y%20quisiera%20agendar%20mi%20videollamada%20gratuita."
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-3 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              Agenda tu videollamada gratuita
            </a>
          </div>

          <div className="not-prose relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="/images/treatments/RODOLFO.png"
              alt="Tratamiento FIV"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <h2 className="text-3xl font-serif text-brand-violet text-center mb-12">El Proceso Paso a Paso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:border-brand-violet/20 transition-all hover:shadow-xl">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-sm text-brand-violet flex items-center justify-center font-bold text-xl shadow-sm">
                  {i + 1}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-brand-violet mb-3">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-3xl font-serif text-brand-violet mb-8">Beneficios Principales</h2>
            <ul className="grid grid-cols-1 gap-4 list-none p-0 font-medium">
              {[
                "Altas tasas de éxito por ciclo",
                "Tratamiento 100% personalizado",
                "Tecnología de última generación",
                "Diagnóstico genético preimplantacional opcional",
                "Acompañamiento médico bilingüe",
                "Laboratorio certificado ISO-7"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-brand-gray p-5 rounded-2xl border border-brand-violet/5">
                  <div className="w-3 h-3 rounded-full bg-brand-green shrink-0" />
                  <span className="text-brand-violet text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-serif text-brand-violet mb-8">¿Quiénes son candidatos?</h2>
            <div className="bg-brand-violet rounded-[2.5rem] p-10 text-white shadow-xl h-full">
              <ul className="grid grid-cols-1 gap-y-6 list-none p-0">
                {[
                  "Mujeres con trompas de Falopio bloqueadas o dañadas",
                  "Parejas con infertilidad de causa desconocida",
                  "Casos de infertilidad masculina severa",
                  "Pacientes con baja reserva ovárica o endometriosis",
                  "Fallos previos en Inseminación Artificial"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-brand-green shrink-0 fill-brand-green mt-1" />
                    <span className="text-lg font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


