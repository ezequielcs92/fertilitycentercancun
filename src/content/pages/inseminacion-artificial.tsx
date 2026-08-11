import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Heart, Check } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Inseminación Artificial"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Inseminación Artificial', href: '#' }
      ]}
    >
      {/* Intro */}
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Una opción accesible y efectiva para parejas con infertilidad leve o sin causa aparente.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        La <strong>Inseminación Intrauterina (IIU)</strong>, conocida comúnmente como inseminación artificial, es un procedimiento de reproducción asistida de baja complejidad. Su objetivo es facilitar la concepción al colocar espermatozoides previamente capacitados directamente en el útero de la mujer, justo en el momento de la ovulación.
      </p>

      {/* Main Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
        <Image
          src="/images/treatments/inseminacion-artificial-portada.png"
          alt="Proceso de Inseminación Intrauterina"
          fill
          className="object-cover"
        />
      </div>

      {/* Process Steps */}
      <h2 className="text-3xl font-serif text-brand-violet mb-8">¿Cómo funciona?</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5">
          <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/treatments/inseminacion-artificial-portada.png"
              alt="Seguimiento Folicular"
              fill
              className="object-cover object-[45%_35%]"
            />
          </div>
          <h3 className="text-xl font-bold text-brand-violet mb-3">1. Seguimiento Folicular</h3>
          <p className="text-base text-slate-600">
            Monitoreamos el desarrollo de los folículos mediante ultrasonido. Utilizamos medicamentos específicos para estimular el crecimiento folicular y programar la ovulación en el momento óptimo.
          </p>
        </div>
        <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5">
          <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/treatments/inseminacion-artificial-portada.png"
              alt="Inseminación"
              fill
              className="object-contain p-2 bg-white"
            />
          </div>
          <h3 className="text-xl font-bold text-brand-violet mb-3">2. Inseminación</h3>
          <p className="text-base text-slate-600">
            Una vez preparada la muestra de semen (capacitación espermática), se introduce delicadamente en el útero mediante una cánula fina. Es un proceso rápido, indoloro y ambulatorio.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <h2 className="text-3xl font-serif text-brand-violet mb-6">Beneficios Principales</h2>
      <div className="bg-brand-violet/5 p-8 rounded-3xl mb-12">
        <ul className="space-y-4">
          {[
            "Tratamiento de baja complejidad y menor costo.",
            "Procedimiento sencillo realizado en consultorio.",
            "Sin anestesia ni recuperación prolongada.",
            "Aumenta las probabilidades comparado con el coito programado.",
            "Menor estrés físico y emocional."
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-brand-green mt-1 shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Candidates */}
      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Es para mí?</h2>
      <p className="mb-6 text-slate-600">Recomendamos la Inseminación Artificial en casos como:</p>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          "Infertilidad leve o sin causa aparente.",
          "Alteraciones leves en el semen.",
          "Problemas cervicales que dificultan el paso del esperma.",
          "Mujeres solteras o parejas del mismo sexo (con banco de esperma)."
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-white shadow-sm p-4 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-brand-violet fill-current" />
            </div>
            <span className="text-base font-medium text-slate-700">{item}</span>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}

