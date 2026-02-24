import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Pill, Zap, TrendingDown, Target, ShieldCheck } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Mini FIV"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Mini FIV', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Una opción más natural, accesible y menos invasiva.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        El <strong>Mini FIV</strong> es una variante de la Fertilización In Vitro tradicional diseñada para ser más suave con tu cuerpo. Utilizamos dosis reducidas de medicación para estimular los ovarios de manera controlada, priorizando la calidad de los óvulos sobre la cantidad, reduciendo costos y efectos secundarios.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2024/07/medicamentos-1024x824.jpg"
          alt="Medicamentos Mini FIV"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Beneficios del Mini FIV</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Pill, title: "Menos Medicación", desc: "Dosis hormonales reducidas significativamente." },
          { icon: TrendingDown, title: "Menor Costo", desc: "Más accesible que la FIV convencional." },
          { icon: ShieldCheck, title: "Menos Riesgos", desc: "Reduce drásticamente el riesgo de hiperestimulación." },
          { icon: Zap, title: "Menos Invasivo", desc: "Proceso más amigable física y emocionalmente." },
          { icon: Target, title: "Calidad vs Cantidad", desc: "Enfocado en obtener óvulos de alta calidad." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <item.icon className="w-8 h-8 text-brand-green mb-4" />
            <h4 className="font-bold text-brand-violet mb-2">{item.title}</h4>
            <p className="text-base text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién está indicado?</h2>
      <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5">
        <ul className="space-y-4">
          {[
            "Mujeres con baja reserva ovárica que no responden a altas dosis.",
            "Pacientes que desean evitar altas cargas hormonales.",
            "Mujeres jóvenes con buen pronóstico de fertilidad.",
            "Parejas buscando una alternativa más económica.",
            "Pacientes con riesgo de Síndrome de Hiperestimulación Ovárica (SHO)."
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-center">
              <div className="w-2 h-2 bg-brand-violet rounded-full shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </InnerPageLayout>
  );
}
