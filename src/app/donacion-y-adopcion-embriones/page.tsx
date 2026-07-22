import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, HeartHandshake, Smile } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Donación y Adopción de Embriones"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Adopción de Embriones', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Un regalo de vida que transforma familias para siempre.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              La <strong>adopción de embriones</strong> es una oportunidad llena de esperanza y generosidad para quienes enfrentan dificultades para concebir con sus propios gametos. Consiste en recibir embriones donados por otras parejas que, tras completar su familia con éxito, deciden compartirlos altruistamente.
            </p>
            <p>
              Este camino es uno de los actos más nobles de la medicina reproductiva. Permite a los futuros padres vivir la experiencia completa del embarazo y el parto, utilizando embriones de alta calidad probada. Es un procedimiento simplificado que ofrece excelentes tasas de éxito y una conexión emocional profunda con la vida que comienza.
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
          <div className="not-prose relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/treatments/donacion-adopcion-embriones-portada.png"
              alt="Proceso de preparación endometrial"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-brand-gray p-8 rounded-3xl col-span-2">
          <h2 className="text-2xl font-serif text-brand-violet mb-4">¿Cómo funciona el proceso?</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            Es un procedimiento más sencillo que una FIV completa. Los pacientes seleccionan un embrión de nuestro programa de donación. La futura madre se somete a una <strong>preparación endometrial</strong> (tratamiento hormonal suave) para acondicionar su útero, y posteriormente se realiza la transferencia embrionaria, similar a una prueba de Papanicolaou.
          </p>
        </div>
        <div className="not-prose bg-brand-violet text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg border border-brand-violet">
          <HeartHandshake className="w-16 h-16 mb-4 text-brand-green" />
          <p className="font-serif text-xl leading-relaxed text-white">"Un regalo de vida que transforma dos familias para siempre"</p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Beneficios de la Adopción</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: "Alta Probabilidad", desc: "Se utilizan embriones de calidad probada, lo que incrementa las tasas de éxito." },
          { title: "Menor Complejidad", desc: "No requiere estimulación ovárica ni punción folicular para la madre receptora." },
          { title: "Segunda Oportunidad", desc: "Permite a embriones criopreservados cumplir su propósito de dar vida." },
          { title: "Accesibilidad", desc: "Suele ser más económico que un ciclo completo de FIV con donación de óvulos." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center shrink-0 text-brand-violet group-hover:scale-110 transition-transform">
              <Gift className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-bold text-brand-violet text-lg mb-2">{item.title}</h4>
              <p className="text-base text-slate-600 leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}

