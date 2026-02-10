import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Heart, Users, Star } from 'lucide-react';
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
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Una forma única y especial de compartir la maternidad para todas las familias.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        En <strong>Advanced Fertility Center Cancún</strong> apoyamos y celebramos la diversidad familiar. El <strong>Método ROPA</strong> (Recepción de Óvulos de la Pareja) es un tratamiento diseñado para parejas de mujeres que desean compartir biológicamente la experiencia de ser madres, fortaleciendo su vínculo a través de la maternidad compartida.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-%C2%BFEn-que-consiste-.jpg"
          alt="Pareja método ROPA"
          fill
          className="object-cover"
          unoptimized
        />
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
            <p className="text-sm text-slate-600">Aporta sus óvulos, los cuales son extraídos y fertilizados en el laboratorio con semen de donante.</p>
          </div>
          <div className="bg-brand-green/20 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-green">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-violet text-lg mb-2">Madre Gestante</h3>
            <p className="text-sm text-slate-600">Recibe el embrión en su útero para llevar el embarazo el parto y la lactancia.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Ventajas del Método ROPA</h2>
      <ul className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          "Maternidad biológica compartida.",
          "Fortalece el vínculo emocional de la pareja.",
          "Alta tasa de éxito con FIV.",
          "Proceso legalmente reconocido y seguro.",
          "Inclusivo y respetuoso con la diversidad.",
        ].map((item, i) => (
          <li key={i} className="flex gap-3 items-center p-4 bg-brand-gray rounded-xl">
            <Users className="w-5 h-5 text-brand-violet shrink-0" />
            <span className="text-slate-700 font-medium">{item}</span>
          </li>
        ))}
      </ul>

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
