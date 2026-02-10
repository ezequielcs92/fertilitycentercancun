import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Check, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Donación de óvulos"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Donación de óvulos', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Una alternativa esperanzadora para lograr el embarazo cuando no es posible usar óvulos propios.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        La <strong>ovodonación</strong> (FIV con donante de óvulos) es un tratamiento en el que se utilizan óvulos de una donante anónima, fertilizados con el esperma de la pareja o de un donante, para crear embriones que serán transferidos al útero de la paciente.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Aplicacion-de-medicamentos.jpg"
          alt="Proceso de Donación de Óvulos"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">¿Cómo funciona el proceso?</h2>

      <div className="space-y-8 mb-12">
        <div className="flex gap-6 items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 rounded-full bg-brand-green/20 text-brand-violet flex items-center justify-center shrink-0 font-bold text-xl">1</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-2">Estimulación de la Donante</h4>
            <p className="text-slate-600">La donante se somete a un tratamiento de estimulación ovárica para obtener múltiples óvulos maduros de alta calidad.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 rounded-full bg-brand-green/20 text-brand-violet flex items-center justify-center shrink-0 font-bold text-xl">2</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-2">Preparación de la Receptora</h4>
            <p className="text-slate-600">Simultáneamente, la paciente receptora prepara su endometrio mediante medicación para asegurar que el útero esté listo para recibir el embrión.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 rounded-full bg-brand-green/20 text-brand-violet flex items-center justify-center shrink-0 font-bold text-xl">3</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-2">Fertilización y Transferencia</h4>
            <p className="text-slate-600">Los óvulos se fertilizan en el laboratorio (FIV/ICSI). Los embriones resultantes se transfieren al útero de la paciente o se pueden vitrificar para el futuro.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Ventajas de la Ovodonación</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          "Altas tasas de éxito (hasta 70-80%).",
          "Independiente de la edad de la paciente.",
          "Donantes rigurosamente seleccionadas.",
          "Proceso anónimo y confidencial.",
          "Experiencia completa del embarazo.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-center p-4 bg-brand-violet/5 rounded-xl">
            <Check className="w-5 h-5 text-brand-green shrink-0" />
            <span className="font-medium text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Nuestras Donantes</h2>
      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <p className="mb-6 text-slate-700 leading-relaxed">
          En <strong>Advanced Fertility Center Cancún</strong>, contamos con un banco de óvulos propio y una estricta selección de donantes. Todas nuestras candidatas pasan por evaluaciones:
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {["Médicas", "Genéticas", "Psicológicas", "Legales"].map(tag => (
            <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-brand-violet shadow-sm border border-slate-100">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-slate-500 italic">
          Garantizamos que solo las mejores candidatas forman parte de nuestro programa.
        </p>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién está indicada?</h2>
      <ul className="space-y-4 mb-8">
        {[
          "Mujeres con baja o nula reserva ovárica.",
          "Fallos repetidos en ciclos de FIV con óvulos propios.",
          "Menopausia precoz o edad materna avanzada.",
          "Riesgo de transmisión de enfermedades genéticas.",
        ].map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <Heart className="w-5 h-5 text-brand-violet shrink-0 fill-brand-violet/20" />
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>

    </InnerPageLayout>
  );
}
