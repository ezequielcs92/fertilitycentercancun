import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Calendar, Clock, DollarSign, Heart } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Coito Programado"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Coito Programado', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Un método natural y sencillo para favorecer el embarazo en ciclos controlados.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        El <strong>Coito Programado</strong> es una técnica de baja complejidad que consiste en monitorear el ciclo natural de la mujer para identificar el momento exacto de la ovulación. Mediante ultrasonidos (seguimiento folicular), determinamos los días más fértiles para indicar el momento ideal para tener relaciones sexuales en casa, maximizando las probabilidades de embarazo.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2024/08/coito-programado-01.jpg"
          alt="Pareja feliz"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Cómo funciona?</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
        <div>
          <p className="text-slate-600 mb-4">
            El proceso es sencillo y mínimamente invasivo:
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 font-bold text-brand-violet">1</div>
              <p className="text-slate-700"><strong>Seguimiento Folicular:</strong> Realizamos ultrasonidos periódicos para observar el crecimiento del folículo dominante.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 font-bold text-brand-violet">2</div>
              <p className="text-slate-700"><strong>Inducción (Opcional):</strong> Si es necesario, recetamos medicamentos suaves para asegurar la ovulación.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 font-bold text-brand-violet">3</div>
              <p className="text-slate-700"><strong>Programación:</strong> El médico indica los días exactos para mantener relaciones sexuales.</p>
            </li>
          </ul>
        </div>
        <div className="relative h-64 md:h-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-Coito-programado-1.jpg"
            alt="Consulta médica"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Ventajas Principales</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Heart, label: "Método Natural" },
          { icon: DollarSign, label: "Bajo Costo" },
          { icon: Calendar, label: "Sin Cirugía" },
          { icon: Clock, label: "Proceso Rápido" },
        ].map((item, i) => (
          <div key={i} className="bg-brand-gray p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
            <item.icon className="w-8 h-8 text-brand-green" />
            <span className="font-bold text-brand-violet text-base">{item.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién está indicado?</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <ul className="space-y-4">
          {[
            "Parejas jóvenes con infertilidad leve o reciente.",
            "Mujeres con ciclos irregulares (anovulación).",
            "Infertilidad sin causa aparente (idiopática).",
            "Parejas que desean iniciar con métodos de baja complejidad."
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-center">
              <div className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </InnerPageLayout>
  );
}
