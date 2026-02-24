import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Check, Heart, Stethoscope, AlertCircle, Clock, Dna } from 'lucide-react';
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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Una alternativa esperanzadora con las mayores tasas de éxito.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              La <strong>ovodonación</strong> (FIV con donante de óvulos) representa un camino lleno de luz para aquellas pacientes que, por diversas razones médicas, no pueden utilizar sus propios óvulos. En nuestro centro, este programa ofrece las tasas de éxito más altas, brindando una oportunidad real de alcanzar el sueño de la maternidad.
            </p>
            <p>
              Contamos con un riguroso proceso de selección de donantes, garantizando salud física y compatibilidad genética. Todo el proceso se realiza bajo estrictos estándares de anonimato y seguridad legal en México, proporcionándote la tranquilidad necesaria para enfocarte en lo más importante: la llegada de tu futuro bebé.
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
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Aplicacion-de-medicamentos.jpg"
              alt="Proceso de Donación de Óvulos"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">¿Cómo funciona el proceso?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">1</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Estimulación de la Donante</h4>
            <p className="text-slate-600 leading-relaxed">La donante se somete a un tratamiento de estimulación ovárica para obtener múltiples óvulos maduros de alta calidad.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">2</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Preparación de la Receptora</h4>
            <p className="text-slate-600 leading-relaxed">Simultáneamente, la paciente receptora prepara su endometrio mediante medicación para asegurar que el útero esté listo para recibir el embrión.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">3</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Fertilización y Transferencia</h4>
            <p className="text-slate-600 leading-relaxed">Los óvulos se fertilizan en el laboratorio (FIV/ICSI). Los embriones resultantes se transfieren al útero de la paciente o se pueden vitrificar para el futuro.</p>
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
          <div key={i} className="flex gap-4 items-center p-6 bg-brand-violet/5 rounded-2xl border border-brand-violet/10">
            <Check className="w-8 h-8 text-brand-green shrink-0" />
            <span className="font-bold text-lg text-slate-700">{item}</span>
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
            <span key={tag} className="px-4 py-2 bg-white rounded-full text-base font-bold text-brand-violet shadow-sm border border-slate-100">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-base text-slate-500 italic">
          Garantizamos que solo las mejores candidatas forman parte de nuestro programa.
        </p>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-12">¿Para quién está indicada?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {[
          { text: "Baja Reserva Ovárica", icon: Stethoscope },
          { text: "Fallas en FIV", icon: AlertCircle },
          { text: "Menopausia Precoz", icon: Clock },
          { text: "Riesgos Genéticos", icon: Dna },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-6 group">
            <div className="w-20 h-20 rounded-3xl bg-brand-violet/5 flex items-center justify-center text-brand-violet group-hover:bg-brand-violet group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
              <item.icon className="w-10 h-10 stroke-[1.5]" />
            </div>
            <p className="text-xl font-bold text-brand-violet leading-tight">{item.text}</p>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}
