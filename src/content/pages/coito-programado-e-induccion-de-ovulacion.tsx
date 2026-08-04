import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Sencillez y naturalidad para maximizar tu fertilidad.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              El <strong>Coito Programado</strong> es una técnica de baja complejidad que respeta el ritmo natural de la mujer, optimizando las condiciones para la concepción. Mediante un monitoreo preciso del ciclo (seguimiento folicular), identificamos los días de máxima fertilidad para orientarte de manera exacta.
            </p>
            <p>
              Es el tratamiento ideal para parejas jóvenes o con causas de infertilidad leves, ya que permite mantener la intimidad del hogar mientras se cuenta con la guía experta de nuestros especialistas. Maximizar las probabilidades de embarazo nunca fue tan sencillo, natural y accesible.
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
          <div className="not-prose relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="/images/treatments/coito-programado-portada.png"
              alt="Pareja feliz"
              fill
              className="object-cover m-0"
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Cómo funciona?</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
        <div>
          <p className="text-slate-600 mb-4">
            El proceso es sencillo y mínimamente invasivo:
          </p>
          <ul className="space-y-6">
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 font-bold text-brand-violet text-lg">1</div>
              <p className="text-slate-700 text-lg"><strong>Seguimiento Folicular:</strong> Realizamos ultrasonidos periódicos para observar el crecimiento del folículo dominante.</p>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 font-bold text-brand-violet text-lg">2</div>
              <p className="text-slate-700 text-lg"><strong>Inducción (Opcional):</strong> Si es necesario, recetamos medicamentos suaves para asegurar la ovulación.</p>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 font-bold text-brand-violet text-lg">3</div>
              <p className="text-slate-700 text-lg"><strong>Programación:</strong> El médico indica los días exactos para mantener relaciones sexuales.</p>
            </li>
          </ul>
        </div>
        <div className="not-prose relative h-64 md:h-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/treatments/coito-programado-portada.png"
            alt="Consulta médica"
            fill
            className="object-cover m-0"
          />
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Ventajas Principales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Heart, label: "Método Natural" },
          { icon: DollarSign, label: "Bajo Costo" },
          { icon: Calendar, label: "Sin Cirugía" },
          { icon: Clock, label: "Proceso Rápido" },
        ].map((item, i) => (
          <div key={i} className="bg-brand-gray p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-5 border border-transparent hover:border-brand-violet/10 transition-all hover:shadow-md group">
            <div className="p-4 bg-white rounded-2xl text-brand-green shadow-sm group-hover:scale-110 transition-transform">
              <item.icon className="w-10 h-10" />
            </div>
            <span className="font-bold text-brand-violet text-xl">{item.label}</span>
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

