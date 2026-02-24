import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Globe, ShieldCheck, CheckCircle } from 'lucide-react';

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
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Una alternativa segura, accesible y confiable para formar una familia.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        La donación de esperma es una técnica de reproducción asistida que utiliza muestras de donantes anónimos para lograr el embarazo. Es una opción fundamental para mujeres solteras, parejas del mismo sexo y parejas heterosexuales con factor masculino severo.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="https://fertilitycentercancun.com/wp-content/uploads/2025/10/WEB-2.-Traslados-internacionales-002.jpg"
          alt="Muestras de laboratorio"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Banco de Esperma Internacional</h2>
      <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5 mb-12">
        <p className="text-slate-700 mb-6 font-light">
          Contamos con alianzas con los bancos de esperma más prestigiosos del mundo. Esto nos permite ofrecerte un catálogo diverso donde puedes seleccionar donantes basándote en:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["Grupo Étnico", "Características Físicas", "Nivel Educativo", "Historial Médico"].map(tag => (
            <div key={tag} className="bg-white px-4 py-3 rounded-xl shadow-sm text-center text-base font-bold text-brand-violet">
              {tag}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-8 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-xytex.png" alt="Xytex" width={120} height={50} className="object-contain" unoptimized />
          <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-european.png" alt="European Sperm Bank" width={120} height={50} className="object-contain" unoptimized />
          <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-cryos.png" alt="Cryos International" width={100} height={40} className="object-contain" unoptimized />
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
