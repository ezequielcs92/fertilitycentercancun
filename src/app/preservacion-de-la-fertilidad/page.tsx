import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Snowflake, Clock, Shield, Baby } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Preservación de la fertilidad"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Preservación', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Cuidamos tu futuro reproductivo para que decidas cuál es el mejor momento.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        La <strong>preservación de la fertilidad</strong> permite conservar óvulos, esperma o embriones mediante técnicas de congelación ultrarrápida (vitrificación). Es la opción ideal para postergar la maternidad o paternidad sin que el paso del tiempo afecte la calidad de tus células reproductivas.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2024/08/Etapas-criopreservacion-01.jpg"
          alt="Preservación de fertilidad"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Técnicas Disponibles</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-brand-violet mb-3">Vitrificación de Óvulos</h3>
          <p className="text-base text-slate-600 mb-4">
            Ideal para mujeres que desean posponer el embarazo. Se realiza una estimulación ovárica suave para extraer óvulos y congelarlos a -196°C.
          </p>
          <Image
            src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Medicamentos.jpg"
            alt="Estimulación"
            width={400}
            height={250}
            className="rounded-xl object-cover w-full h-40"
            unoptimized
          />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-brand-violet mb-3">Criopreservación de Esperma</h3>
          <p className="text-base text-slate-600 mb-4">
            Procedimiento sencillo que no requiere medicación. Recomendado antes de tratamientos médicos o vasectomías.
          </p>
          <Image
            src="https://fertilitycentercancun.com/wp-content/uploads/2024/07/Criopreservacion-masculina-894x1024.jpg"
            alt="Criopreservación de esperma"
            width={400}
            height={250}
            className="rounded-xl object-cover w-full h-40"
            unoptimized
          />
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién es este tratamiento?</h2>
      <div className="flex flex-col mb-12">
        {[
          { icon: Clock, title: "Postergar Maternidad", desc: "Decide ser madre cuando estés lista personal o profesionalmente." },
          { icon: Shield, title: "Tratamientos Médicos", desc: "Antes de quimioterapia o radioterapia." },
          { icon: Baby, title: "Edad Reproductiva", desc: "Mujeres que desean asegurar óvulos de buena calidad antes de los 35." },
          { icon: Snowflake, title: "Transición de Género", desc: "Preservación antes de iniciar terapia hormonal." },
        ].map((item, i) => (
          <div key={i} className="py-4 border-b border-slate-100 last:border-0 flex items-center text-left gap-6">
            <div className="w-14 h-14 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-green border border-slate-50">
              <item.icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-bold text-brand-violet text-lg leading-tight mb-1">{item.title}</h4>
              <p className="text-base text-slate-500 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Por qué elegirnos?</h2>
      <p className="text-slate-600 mb-6">
        En <strong>Advanced Fertility Center Cancún</strong> contamos con un laboratorio de alta complejidad y tecnología de punta para garantizar las tasas de supervivencia más altas tras la descongelación.
      </p>

    </InnerPageLayout>
  );
}
