import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Calendar, CheckCircle, Activity, Star } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Transferencia de Embriones"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Transferencia Embrionaria', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        El momento más esperado: el encuentro entre tu bebé y tú.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        La <strong>transferencia embrionaria</strong> es la etapa culminante de la Fertilización In Vitro (FIV). Consiste en depositar cuidadosamente los embriones (generalmente en etapa de blastocisto, día 5) dentro del útero materno. Es un procedimiento indoloro, rápido y cargado de emoción, realizado bajo guía ecográfica para asegurar la máxima precisión.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="/images/treatments/IVF.jpg"
          alt="Transferencia embrionaria"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Preparación Endometrial</h2>
      <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5 mb-12">
        <p className="text-slate-700 mb-6">
          Para que el embrión se implante, el "nido" (endometrio) debe estar en condiciones óptimas. Personalizamos este proceso según tu cuerpo:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-6 h-6 text-brand-green" />
              <h3 className="font-bold text-brand-violet text-lg">Ciclo Natural</h3>
            </div>
            <p className="text-base text-slate-600">
              Aprovechamos tu ciclo ovulatorio natural. Ideal para mujeres con periodos regulares. Menor medicación y monitoreo del desarrollo natural del endometrio.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-brand-green" />
              <h3 className="font-bold text-brand-violet text-lg">Ciclo Sustituido</h3>
            </div>
            <p className="text-base text-slate-600">
              Utilizamos hormonas (estrógenos y progesterona) para preparar el útero de manera controlada. Ideal para mujeres con ciclos irregulares o para mayor flexibilidad en la agenda.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Qué sucede después?</h2>
      <div className="space-y-4">
        {[
          "Reposo relativo de 20-30 minutos en la clínica tras el procedimiento.",
          "Puedes retomar tus actividades diarias normales (evitando esfuerzos físicos intensos).",
          "Continuación del soporte hormonal (progesterona) según indicación médica.",
          "La prueba de embarazo (beta-hCG) se realiza 10-12 días después."
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-center">
            <CheckCircle className="w-5 h-5 text-brand-violet shrink-0" />
            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}

