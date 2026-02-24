import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
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
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Un camino lleno de generosidad y amor para cumplir el sueño de ser padres.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        La <strong>adopción de embriones</strong> es una oportunidad llena de esperanza para quienes enfrentan dificultades para concebir con sus propios gametos. Consiste en recibir embriones donados por otras parejas que, tras completar su familia, deciden compartirlos altruistamente para dar a otros la posibilidad de vivir la paternidad.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Proceso-de-preparacion-endometrial.jpg"
          alt="Esperanza de vida"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-brand-gray p-8 rounded-3xl col-span-2">
          <h2 className="text-2xl font-serif text-brand-violet mb-4">¿Cómo funciona el proceso?</h2>
          <p className="text-slate-600 leading-relaxed">
            Es un procedimiento más sencillo que una FIV completa. Los pacientes seleccionan un embrión de nuestro programa de donación. La futura madre se somete a una <strong>preparación endometrial</strong> (tratamiento hormonal suave) para acondicionar su útero, y posteriormente se realiza la transferencia embrionaria, similar a una prueba de Papanicolaou.
          </p>
        </div>
        <div className="bg-brand-violet text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center">
          <HeartHandshake className="w-16 h-16 mb-4 text-brand-green" />
          <p className="font-serif text-xl">"Un regalo de vida que transforma dos familias para siempre"</p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Beneficios de la Adopción</h2>
      <div className="space-y-4 mb-12">
        {[
          { title: "Alta Probabilidad", desc: "Se utilizan embriones de calidad probada, lo que incrementa las tasas de éxito." },
          { title: "Menor Complejidad", desc: "No requiere estimulación ovárica ni punción folicular para la madre receptora." },
          { title: "Segunda Oportunidad", desc: "Permite a embriones criopreservados cumplir su propósito de dar vida." },
          { title: "Accesibilidad", desc: "Suele ser más económico que un ciclo completo de FIV con donación de óvulos." }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 text-brand-violet">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-brand-violet">{item.title}</h4>
              <p className="text-base text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}
