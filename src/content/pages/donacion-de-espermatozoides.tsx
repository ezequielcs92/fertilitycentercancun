import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Donación de espermatozoides"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos' },
        { label: 'Donación de espermatozoides', href: '#' },
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
        Un tratamiento para pacientes que necesitan semen de donante.
      </p>
      <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
        <p>
          La donación de espermatozoides en <strong>Advanced Fertility Center Cancún</strong> es un
          tratamiento para pacientes. Se usa semen de un donante en una inseminación intrauterina o
          en una fertilización in vitro, según la valoración médica de cada caso.
        </p>
        <p>
          Esta página no es el programa de captación de donantes de óvulos. Si quieres ser donante
          de óvulos, el programa es{' '}
          <Link href="/es/programa-donacion-lifestart" className="font-semibold text-brand-violet underline">
            LifeStart
          </Link>
          .
        </p>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién es?</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Parejas en las que el factor masculino no permite usar la muestra de la pareja',
          'Mujeres solteras que buscan un embarazo con semen de donante',
          'Parejas de mujeres',
          'Pacientes que, tras la valoración, necesitan una muestra de donante',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Users className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Cómo se usa la muestra</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          'Inseminación intrauterina, cuando el equipo médico la considera adecuada',
          'Fertilización in vitro, cuando el tratamiento lo requiere',
          'La muestra se prepara en el laboratorio de andrología',
          'El plan, el número de visitas y los estudios se definen en la consulta',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 p-5 bg-brand-violet/5 rounded-2xl border border-brand-violet/10">
            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <h2 className="text-3xl font-serif text-brand-violet mb-5">Catálogo, anonimato y selección</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          Puedes revisar el catálogo de donantes de esperma y comentar las opciones con el equipo
          médico. La identidad del donante no se comparte con la paciente. Los criterios de
          aceptación los define el protocolo de la clínica en la consulta, no esta página.
        </p>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
          <p className="text-slate-700">
            El siguiente paso es una consulta: ahí se confirma si la donación de espermatozoides es
            el tratamiento indicado y cómo se organiza.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/es/catalogo-de-donantes-de-esperma"
          className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg"
        >
          Ver catálogo de donantes
        </Link>
        <Link
          href="/es/contacto"
          className="inline-flex items-center justify-center px-8 py-4 bg-brand-green text-brand-violet rounded-full font-bold hover:bg-brand-violet hover:text-white transition-all"
        >
          Agendar consulta
        </Link>
      </div>
    </InnerPageLayout>
  );
}
