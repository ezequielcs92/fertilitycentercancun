import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Users, Sparkles, Rainbow } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Construyendo Familias"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Construyendo Familias', href: '#' }
      ]}
    >
      <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-brand-violet/5 px-5 py-2 border border-brand-violet/10">
        <Rainbow className="w-5 h-5 text-brand-green" />
        <span className="text-sm md:text-base font-semibold text-brand-violet">Programa de Fertilidad Inclusivo</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            El amor hace a la familia. Nosotros te ayudamos a crearla.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              En <strong>Advanced Fertility Center Cancún</strong> celebramos la diversidad en todas sus formas. Sabemos que el deseo de ser padres no conoce fronteras ni etiquetas, por lo que hemos diseñado un entorno seguro, empático y profesional para apoyarte en cada paso.
            </p>
            <p>
              Ofrecemos soluciones de reproducción asistida personalizadas e inclusivas, respaldadas por un equipo multidisciplinario que entiende la importancia de la calidez humana. Ya sea que busques formar una familia homoparental o seas una persona soltera, contamos con los protocolos médicos y el soporte legal necesario para hacer realidad tu sueño en el paraíso de Cancún.
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
              src="/images/treatments/construyendo-familias-portada.png"
              alt="Pareja feliz"
              fill
              className="object-cover object-center m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Opciones para Parejas de Mujeres</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-5 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-violet shadow-inner group-hover:scale-110 transition-transform shrink-0">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-brand-violet text-2xl leading-tight">Método ROPA</h3>
          </div>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            <strong>"Maternidad compartida"</strong>. Una mujer aporta los óvulos (madre genética) y la otra gesta el embarazo (madre gestante).
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-5 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-violet shadow-inner group-hover:scale-110 transition-transform shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-brand-violet text-2xl leading-tight">Inseminación / FIV</h3>
          </div>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Uso de <strong>esperma de donante</strong> (nacional o internacional) para inseminación artificial o Fertilización In Vitro con las mejores tasas de éxito.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Opciones para Parejas de Hombres</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-brand-violet mb-4 flex items-center gap-2">
              <Users className="w-10 h-10 text-brand-green" />
              FIV con Donante de Óvulos + Gestación Subrogada
            </h3>
            <p className="text-slate-600 mb-4">
              Combinamos la esperma de uno o ambos padres con óvulos de una donante seleccionada. El embrión se transfiere al útero de una gestante subrogada quien llevará el embarazo con todos los cuidados legales y médicos.
            </p>
            <ul className="text-lg text-slate-500 space-y-2">
              <li>• Selección rigurosa de donantes de óvulos.</li>
              <li>• Programa legal seguro y transparente en México.</li>
              <li>• Posibilidad de PGT-A (análisis genético).</li>
            </ul>
          </div>
          <div className="not-prose relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
            <Image
              src="/images/treatments/construyendo-familias-portada.png"
              alt="Proceso FIV"
              fill
              className="object-contain p-4 m-0"
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


