import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { CheckCircle2, Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Ovodón"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Ovodón', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Una alternativa esperanzadora con las mayores tasas de éxito.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              En <strong>Advanced Fertility Center Cancun</strong>, la ovodonación (FIV con donante de óvulos) es uno de los tratamientos con mayor probabilidad de éxito en medicina reproductiva. Representa una opción sólida y esperanzadora para mujeres y familias que, por diferentes razones médicas, no pueden utilizar sus propios óvulos.
            </p>
            <p>
              Hoy, gracias a los avances en reproducción asistida, este tratamiento ofrece tasas de éxito que pueden superar el <strong>60%–70% por transferencia embrionaria</strong>, dependiendo de cada caso, posicionándose como una de las alternativas más efectivas para lograr un embarazo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="not-prose relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="/images/treatments/DONANTES.png"
              alt="Tratamiento Ovodón"
              fill
              className="object-cover object-center m-0"
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Un camino real hacia la maternidad y la paternidad</h2>
      <p className="text-slate-600 mb-6 leading-relaxed">
        La ovodonación no solo es una solución médica, es una oportunidad tangible de construir una familia. En nuestro centro, acompañamos a:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Mujeres con baja reserva ovárica',
          'Pacientes con fallas previas en FIV',
          'Mujeres de edad reproductiva avanzada',
          'Familias diversas, incluyendo parejas del mismo sexo y personas solteras'
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Users className="w-5 h-5 text-brand-green shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <h2 className="text-3xl font-serif text-brand-violet mb-5">Selección estricta, mejores resultados</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          Entendemos que la calidad de los óvulos es determinante para el éxito. Por ello, contamos con un proceso de selección de donantes altamente estricto y alineado a estándares internacionales. Solo un pequeño porcentaje de candidatas (<strong>aprox. 10%–15%</strong>) logra ser aceptado en nuestro programa.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Evaluación médica integral',
            'Estudios genéticos avanzados',
            'Análisis hormonal y de fertilidad',
            'Evaluación psicológica',
            'Historial familiar detallado'
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100">
              <Sparkles className="w-4 h-4 text-brand-green shrink-0" />
              <span className="text-slate-700 text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Seguridad, anonimato y respaldo legal</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Anonimato entre donante y receptora',
          'Protocolos clínicos seguros y supervisados',
          'Cumplimiento de normativas médicas internacionales',
          'Acompañamiento continuo por especialistas'
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-5 bg-brand-violet/5 rounded-2xl border border-brand-violet/10">
            <ShieldCheck className="w-5 h-5 text-brand-green shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Por qué elegir ovodonación?</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Hasta 70% de éxito por transferencia en condiciones óptimas',
          'Mayor calidad embrionaria al utilizar óvulos de donantes jóvenes',
          'Reducción significativa en riesgos asociados a la edad ovárica',
          'Alternativa ideal tras múltiples intentos fallidos'
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-12">
        <h2 className="text-3xl font-serif text-brand-violet mb-4">Cancún, destino clave en fertilidad</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Atendemos pacientes de México, Estados Unidos, Canadá y otros países, posicionando a Cancún como un destino clave en fertilidad y turismo médico.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {['Tecnología avanzada', 'Atención personalizada', 'Experiencia internacional'].map((item) => (
            <div key={item} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-violet/5 border border-brand-violet/10">
              <Globe2 className="w-4 h-4 text-brand-green" />
              <span className="text-brand-violet font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-4">Construyendo familias, sin límites</h2>
      <p className="text-slate-600 leading-relaxed mb-6">
        Creemos en una medicina reproductiva inclusiva, moderna y humana. La ovodonación es una opción para todas las formas de familia, brindando una oportunidad real a quienes desean vivir la experiencia de tener un hijo.
      </p>

      <div className="bg-brand-violet text-white p-8 rounded-3xl">
        <h3 className="text-2xl font-serif mb-3">Da el siguiente paso</h3>
        <p className="text-white/85 mb-5 leading-relaxed">
          Estamos listos para acompañarte en este camino y ayudarte a determinar si la ovodonación es la mejor opción para ti.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center px-7 py-3 bg-brand-green text-brand-violet rounded-full font-bold hover:bg-white transition-colors"
        >
          Agendar consulta
        </Link>
      </div>

    </InnerPageLayout>
  );
}

