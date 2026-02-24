import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Heart, Users, Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Fertilidad para la Comunidad LGBT+"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Comunidad LGBT+', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        El amor hace a la familia. Nosotros te ayudamos a crearla.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        En <strong>Advanced Fertility Center Cancún</strong> celebramos la diversidad. Sabemos que cada familia es única, por eso ofrecemos soluciones de reproducción asistida personalizadas, inclusivas y llenas de calidez humana para parejas del mismo sexo y personas solteras.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2024/12/medico-de-fertilidad-en-Mexico-fertility-center-mexico-682x1024.jpg"
          alt="Pareja feliz"
          fill
          className="object-cover object-top"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Opciones para Parejas de Mujeres</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-brand-gray p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-full text-brand-violet"><Heart className="w-5 h-5" /></div>
            <h3 className="font-bold text-brand-violet text-lg">Método ROPA</h3>
          </div>
          <p className="text-base text-slate-600">
            "Maternidad compartida". Una mujer aporta los óvulos (madre genética) y la otra gesta el embarazo (madre gestante).
          </p>
        </div>
        <div className="bg-brand-gray p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-full text-brand-violet"><Sparkles className="w-5 h-5" /></div>
            <h3 className="font-bold text-brand-violet text-lg">Inseminación / FIV</h3>
          </div>
          <p className="text-base text-slate-600">
            Uso de esperma de donante (nacional o internacional) para inseminación artificial o Fertilización In Vitro.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Opciones para Parejas de Hombres</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-brand-violet mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-green" />
              FIV con Donante de Óvulos + Gestación Subrogada
            </h3>
            <p className="text-slate-600 mb-4">
              Combinamos la esperma de uno o ambos padres con óvulos de una donante seleccionada. El embrión se transfiere al útero de una gestante subrogada quien llevará el embarazo con todos los cuidados legales y médicos.
            </p>
            <ul className="text-base text-slate-500 space-y-2">
              <li>• Selección rigurosa de donantes de óvulos.</li>
              <li>• Programa legal seguro y transparente en México.</li>
              <li>• Posibilidad de PGT-A (análisis genético).</li>
            </ul>
          </div>
          <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/12/Fertilizacion-In-vitro-con-estudio-genetico-y-seleccion-de-sexo-1.png"
              alt="Proceso FIV"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Personas Trans y No Binarias</h2>
      <p className="text-slate-600 mb-6">
        Ofrecemos servicios de <strong>preservación de la fertilidad</strong> (congelación de óvulos o esperma) antes de iniciar terapias hormonales o cirugías de afirmación de género, asegurando tu posibilidad de formar una familia biológica en el futuro.
      </p>

    </InnerPageLayout>
  );
}
