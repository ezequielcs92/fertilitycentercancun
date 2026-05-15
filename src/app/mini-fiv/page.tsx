import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Una opción más natural, accesible y menos invasiva.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              El <strong>Mini FIV</strong> es una variante optimizada de la Fertilización In Vitro tradicional, diseñada para pacientes que buscan un enfoque más suave y menos demandante para su cuerpo. Este protocolo utiliza dosis reducidas de medicación para estimular los ovarios de manera controlada y fisiológica.
            </p>
            <p>
              Nuestra filosofía se centra en la <strong>calidad sobre la cantidad</strong>. Al evitar la sobre-estimulación, obtenemos óvulos de mejor potencial reproductivo, reducimos significativamente los costos en fármacos y minimizamos los efectos secundarios, ofreciendo una experiencia mucho más cómoda y amigable sin comprometer tus posibilidades de éxito.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Agendar Consulta de Valoración
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="not-prose relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="/images/treatments/mini-fiv-portada.png"
              alt="Medicamentos Mini FIV"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Beneficios del Mini FIV</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {[
          { icon: Pill, title: "Menos Medicación", desc: "Dosis hormonales reducidas." },
          { icon: TrendingDown, title: "Menor Costo", desc: "Más accesible que la FIV." },
          { icon: ShieldCheck, title: "Menos Riesgos", desc: "Evita hiperestimulación." },
          { icon: Zap, title: "Menos Invasivo", desc: "Proceso más amigable." },
          { icon: Target, title: "Calidad vs Cantidad", desc: "Óvulos de alta calidad." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col items-center justify-center text-center aspect-square group hover:border-brand-violet/20">
            <div className="p-4 bg-brand-violet/5 rounded-2xl text-brand-green mb-4 group-hover:scale-110 transition-transform">
              <item.icon className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-brand-violet text-lg leading-tight mb-2">{item.title}</h4>
            <p className="text-base text-slate-400 leading-tight">{item.desc}</p>
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

