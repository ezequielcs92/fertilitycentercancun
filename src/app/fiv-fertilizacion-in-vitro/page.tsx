
import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="FIV – Fertilización In vitro"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'FIV – Fertilización In vitro', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Una solución avanzada para superar problemas de fertilidad, con alta tasa de éxito.
      </p>

      <p>
        La <strong>Fertilización In Vitro (FIV)</strong> es un tratamiento de reproducción asistida avanzado para resolver problemas de fertilidad. Este proceso involucra la fertilización de un óvulo con esperma en el laboratorio y la transferencia del embrión al útero de la mujer.
      </p>

      <p className="mb-4">
        Utilizamos la última tecnología en embriología y un laboratorio especializado para asegurar la mayor probabilidad de éxito en cada ciclo.
      </p>

      <div className="not-prose relative aspect-[4/5] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl mb-12 bg-slate-100 border border-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2024/12/medico-de-fertilidad-en-Mexico-fertility-center-mexico-682x1024.jpg"
          alt="Tratamiento FIV"
          fill
          className="object-cover object-center m-0"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">¿Cómo es el proceso?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">1</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Estimulación Ovárica</h4>
            <p className="text-slate-600 leading-relaxed">Se utilizan medicamentos para estimular los folículos en los ovarios con la intención de obtener el mayor número de óvulos de alta calidad.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">2</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Captura de Óvulos</h4>
            <p className="text-slate-600 leading-relaxed">Los óvulos se capturan mediante aspiración dirigida por ultrasonido en nuestro quirófano especializado bajo sedación ligera.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">3</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Laboratorio y Fertilización</h4>
            <p className="text-slate-600 leading-relaxed">Los ovocitos se fertilizan en el laboratorio (FIV o ICSI) y se cultivan los embriones bajo monitoreo constante de nuestros embriólogos.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">Beneficios Principales</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-12 font-medium">
        {[
          "Altas tasas de éxito por ciclo",
          "Tratamiento 100% personalizado",
          "Tecnología de última generación",
          "Diagnóstico genético preimplantacional opcional",
          "Acompañamiento médico bilingüe",
          "Laboratorio certificado ISO-7"
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-3 bg-brand-gray p-4 rounded-2xl border border-brand-violet/5">
            <div className="w-2 h-2 rounded-full bg-brand-green" />
            <span className="text-brand-violet">{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">¿Quiénes son candidatos?</h2>
      <div className="bg-brand-violet rounded-[3rem] p-10 text-white shadow-xl">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 list-none p-0">
          {[
            "Mujeres con trompas de Falopio bloqueadas o dañadas",
            "Parejas con infertilidad de causa desconocida",
            "Casos de infertilidad masculina severa",
            "Pacientes con baja reserva ovárica o endometriosis",
            "Fallos previos en Inseminación Artificial"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-brand-green shrink-0 fill-brand-green" />
              <span className="text-lg font-light leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </InnerPageLayout>
  );
}
