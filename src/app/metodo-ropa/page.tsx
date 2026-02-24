import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Heart, Users, Star, Smile, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Método ROPA"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Método ROPA', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Una forma única y especial de compartir la maternidad.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              En <strong>Advanced Fertility Center Cancún</strong> apoyamos y celebramos la diversidad familiar. El <strong>Método ROPA</strong> (Recepción de Óvulos de la Pareja) es mucho más que un tratamiento médico; es una experiencia emocional profunda diseñada para parejas de mujeres que desean participar activamente en la creación de su familia.
            </p>
            <p>
              Esta técnica permite que ambas compartan biológicamente el proceso: una aportando la herencia genética y la otra gestando la vida en su vientre. Es un camino de amor e igualdad que fortalece el vínculo familiar desde el primer momento, brindándoles la oportunidad de vivir una maternidad compartida en un entorno de total respeto y apoyo profesional.
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
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-%C2%BFEn-que-consiste-.jpg"
              alt="Pareja método ROPA"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿En qué consiste el Método ROPA?</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
        <p className="text-slate-600 mb-6 leading-relaxed">
          Este tratamiento permite que ambas mujeres participen activamente:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-brand-violet/5 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-violet">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-violet text-lg mb-2">Madre Genética</h3>
            <p className="text-base text-slate-600">Aporta sus óvulos, los cuales son extraídos y fertilizados en el laboratorio con semen de donante.</p>
          </div>
          <div className="bg-brand-green/20 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-green">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-violet text-lg mb-2">Madre Gestante</h3>
            <p className="text-base text-slate-600">Recibe el embrión en su útero para llevar el embarazo el parto y la lactancia.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Ventajas del Método ROPA</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {[
          { icon: Heart, label: "Maternidad biológica compartida" },
          { icon: Smile, label: "Fortalece el vínculo emocional" },
          { icon: Zap, label: "Alta tasa de éxito con FIV" },
          { icon: ShieldCheck, label: "Proceso legalmente reconocido" },
          { icon: Users, label: "Inclusivo y respetuoso" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-4 items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm aspect-square text-center group hover:border-brand-violet/20 hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-brand-violet/5 rounded-2xl flex items-center justify-center text-brand-violet group-hover:scale-110 transition-transform">
              <item.icon className="w-10 h-10" />
            </div>
            <span className="text-slate-700 font-bold text-lg leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién está indicado?</h2>
      <div className="space-y-4">
        {[
          "Parejas de mujeres que desean ambas ser madres biológicas.",
          "Mujeres que desean aportar óvulos pero no pueden gestar por razones médicas.",
          "Parejas que buscan una experiencia de maternidad igualitaria.",
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}
