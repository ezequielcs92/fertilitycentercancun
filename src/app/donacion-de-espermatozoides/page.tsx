import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Globe, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Donación de esperma"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Donación de esperma', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-16 px-4 md:px-0 not-prose">
        <div className="flex-1 order-2 lg:order-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Una alternativa segura, accesible y confiable para formar una familia.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              La <strong>donación de esperma</strong> es una técnica de reproducción asistida de vanguardia que utiliza muestras de donantes cuidadosamente seleccionados y anónimos. Esta opción es fundamental para permitir que el sueño de formar una familia sea posible para mujeres solteras, parejas del mismo sexo y parejas heterosexuales con factor masculino severo.
            </p>
            <p>
              En nuestro centro, trabajamos exclusivamente con bancos de esperma internacionales de la más alta reputación, garantizando muestras con óptima calidad genética y rigurosos controles de salud. Te acompañamos en cada paso del proceso, desde la selección del donante hasta la realización del tratamiento, bajo los más estrictos estándares de ética y confidencialidad.
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

        <div className="w-full lg:w-1/3 order-1 lg:order-2 not-prose">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 bg-slate-50 m-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/10/WEB-2.-Traslados-internacionales-002.jpg"
              alt="Donación de esperma y logística internacional"
              fill
              className="object-cover m-0 p-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Banco de Esperma Internacional</h2>
      <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 mb-16">
        <p className="text-slate-700 mb-10 font-light text-lg text-center max-w-3xl mx-auto">
          Contamos con alianzas con los laboratorios de criopreservación más prestigiosos del mundo. Esto nos permite ofrecerte un catálogo diverso donde puedes seleccionar donantes basándote en diversos criterios.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {["Grupo Étnico", "Características Físicas", "Nivel Educativo", "Historial Médico"].map(tag => (
            <div key={tag} className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 text-center text-lg font-bold text-brand-violet hover:shadow-md transition-shadow">
              {tag}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-12 items-center justify-center">
          <div className="h-24 transition-all hover:scale-110 flex items-center">
            <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-xytex.png" alt="Xytex" width={240} height={80} className="h-full w-auto object-contain" unoptimized />
          </div>
          <div className="h-24 transition-all hover:scale-110 flex items-center">
            <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-european.png" alt="European Sperm Bank" width={240} height={80} className="h-full w-auto object-contain" unoptimized />
          </div>
          <div className="h-24 transition-all hover:scale-110 flex items-center">
            <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-cryos.png" alt="Cryos International" width={200} height={70} className="h-full w-auto object-contain" unoptimized />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <Globe className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Logística Internacional</h3>
          <p className="text-slate-600 text-base">
            Gestionamos integralmente la importación de muestras cumpliendo todas las regulaciones sanitarias y aduanales de México.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <ShieldCheck className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Seguridad Garantizada</h3>
          <p className="text-slate-600 text-base">
            Todos los donantes pasan por rigurosos filtros médicos, genéticos y psicológicos antes de ser aceptados en el programa.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién es?</h2>
      <ul className="space-y-4">
        {[
          "Mujeres solteras que desean ser madres (Maternidad en Solitario).",
          "Parejas de mujeres (lesbomaternidad).",
          "Parejas con infertilidad masculina severa (azoospermia, alteraciones genéticas).",
          "Riesgo de transmitir enfermedades hereditarias por parte del padre."
        ].map((item, i) => (
          <li key={i} className="flex gap-3 items-center p-3 bg-brand-violet/5 rounded-lg border border-transparent hover:border-brand-violet/20 transition-colors">
            <CheckCircle className="w-5 h-5 text-brand-violet shrink-0" />
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>

    </InnerPageLayout>
  );
}
