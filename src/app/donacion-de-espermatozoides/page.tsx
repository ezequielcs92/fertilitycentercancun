import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Globe, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const reasons = [
    'Ayudas a personas y parejas a cumplir su sueño de formar una familia.',
    'Accedes a evaluaciones médicas completas sin costo.',
    'Estás respaldada por especialistas en fertilidad en todo momento.',
    'Participas en un proceso ético, confidencial y seguro.'
  ];

  const requirements = [
    'Edad entre 18 y 29 años.',
    'Buen estado de salud física y emocional.',
    'Estilo de vida saludable.',
    'Sin antecedentes genéticos relevantes.'
  ];

  const steps = [
    {
      title: 'Registro inicial',
      desc: 'Completa tu solicitud en línea de forma rápida.'
    },
    {
      title: 'Evaluación médica',
      desc: 'Realizamos estudios clínicos, hormonales y genéticos.'
    },
    {
      title: 'Acompañamiento personalizado',
      desc: 'Nuestro equipo te explica cada paso con total claridad.'
    },
    {
      title: 'Estimulación ovárica',
      desc: 'Tratamiento supervisado por especialistas en fertilidad.'
    },
    {
      title: 'Recuperación de óvulos',
      desc: 'Procedimiento ambulatorio, seguro y de corta duración.'
    }
  ];

  const formFields = [
    'Nombre completo',
    'Edad',
    'Fecha de nacimiento',
    'Peso',
    'Talla',
    'Nacionalidad',
    'Tel. WhatsApp',
    'Email'
  ];

  return (
    <InnerPageLayout
      title="Programa Donación LifeStart"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Programa Donación LifeStart', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-16 px-4 md:px-0 not-prose">
        <div className="flex-1 order-2 lg:order-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Dona vida. Transforma historias.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              En <strong>Advanced Fertility Center Cancun</strong>, hemos creado <strong>LifeStart Donors</strong>, nuestro programa de donación de óvulos en Cancún, pensado para mujeres jóvenes que desean generar un impacto real en la vida de otras personas, con el respaldo de un equipo médico especializado y un entorno seguro y profesional.
            </p>
            <p>
              Ser donante no es solo un proceso médico: <strong>es convertirte en el comienzo de una historia que alguien ha esperado toda su vida</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:donantes@afcc.com.mx?subject=Aplicaci%C3%B3n%20LifeStart%20Donors"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Aplica ahora
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/3 order-1 lg:order-2 not-prose">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 bg-slate-50 m-0">
            <Image
              src="/images/treatments/programa-donacion-lifestart-portada.jpg"
              alt="Programa Donación LifeStart"
              fill
              className="object-cover m-0 p-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Por qué ser donante de óvulos?</h2>
      <p className="text-slate-600 mb-6 leading-relaxed">
        En <strong>LifeStart Donors by Advanced Fertility Center Cancun</strong>, entendemos el valor de tu decisión. Por eso, cuidamos cada detalle para que tu experiencia sea cercana, informada y acompañada.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {reasons.map((item) => (
          <div key={item} className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Quién puede ser donante?</h2>
      <p className="text-slate-600 mb-5 leading-relaxed">
        Buscamos mujeres comprometidas, saludables y con deseo de ayudar. Puedes aplicar si cumples con:
      </p>
      <ul className="space-y-3 mb-6">
        {requirements.map((item) => (
          <li key={item} className="flex gap-3 items-center p-3 bg-brand-violet/5 rounded-lg border border-transparent hover:border-brand-violet/20 transition-colors">
            <CheckCircle className="w-5 h-5 text-brand-violet shrink-0" />
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-slate-600 mb-12 leading-relaxed">
        En Advanced Fertility Center Cancun, te guiamos paso a paso. No necesitas experiencia previa.
      </p>

      <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 mb-12">
        <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Cómo es el proceso?</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Nuestro programa de donación de óvulos está diseñado para ser claro, seguro y acompañado en cada etapa:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <article key={step.title} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center mb-3">
                {idx + 1}
              </div>
              <h3 className="text-base font-bold text-brand-violet mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <ShieldCheck className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Seguridad y confianza</h3>
          <p className="text-slate-600 text-base">
            En Advanced Fertility Center Cancun, tu bienestar es nuestra prioridad. Contamos con especialistas certificados en medicina reproductiva y protocolos médicos internacionales.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <Globe className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Tecnología y atención profesional</h3>
          <p className="text-slate-600 text-base">
            Trabajamos con tecnología avanzada en fertilidad y una atención ética, confidencial y profesional durante todo el proceso.
          </p>
        </div>
      </div>

      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <h2 className="text-3xl font-serif text-brand-violet mb-5">Una decisión con impacto</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ser donante es una decisión personal que implica tiempo, compromiso y generosidad. Como parte del programa, se contemplan apoyos y beneficios asociados al proceso, siempre dentro de un marco ético y transparente.
        </p>
        <h3 className="text-2xl font-serif text-brand-violet mb-3">Donación de óvulos en Cancún</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Como parte de Advanced Fertility Center Cancun, nuestro programa atiende a pacientes nacionales e internacionales, posicionando a Cancún como un referente en fertilidad y turismo médico.
        </p>
        <h3 className="text-2xl font-serif text-brand-violet mb-3">Sé parte de algo más grande</h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Cada donación representa una nueva historia, una oportunidad y una familia. Hoy puedes ser parte de ese comienzo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Link
            href="mailto:donantes@afcc.com.mx?subject=Aplicaci%C3%B3n%20LifeStart%20Donors"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
          >
            Aplica ahora
          </Link>
          <p className="text-slate-600 text-sm sm:text-base">
            Correo de recepción: <a className="font-semibold text-brand-violet" href="mailto:donantes@afcc.com.mx">donantes@afcc.com.mx</a>
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-serif text-brand-violet mb-4">Formulario de aplicación</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          En el cuestionario deberá contemplarse la siguiente información:
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {formFields.map((field) => (
            <div key={field} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
              <span className="text-slate-700">{field}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-600">
          El botón de envío debe dirigir la solicitud al correo <a className="font-semibold text-brand-violet" href="mailto:donantes@afcc.com.mx">donantes@afcc.com.mx</a>.
        </p>
      </div>

    </InnerPageLayout>
  );
}

