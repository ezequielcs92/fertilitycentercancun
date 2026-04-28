import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { CheckCircle, Play, ArrowRight, Award, ShieldCheck, Microscope, Users, Star, Globe, Building2, Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function Page() {
  const reasons = [
    { id: 1, title: 'Equipo médico con experiencia', description: 'Con más de 20 años en reproducción asistida, nuestro equipo de ginecólogos, embriólogos y coordinadores está dedicado a tu proceso.' },
    { id: 2, title: 'Tecnología de vanguardia', description: 'Laboratorios de FIV y quirófanos completamente equipados con los avances más recientes en tecnología para fertilidad.' },
    { id: 3, title: 'Excelentes tasas de éxito', description: 'Protocolos rigurosos y tecnología avanzada que se traducen en excelentes resultados en todos nuestros procedimientos.' },
    { id: 4, title: 'Atención personalizada', description: 'Cada paciente recibe atención individualizada, caracterizada por la empatía, el compromiso y la cercanía humana.' },
    { id: 5, title: 'Instalaciones de primer nivel', description: 'Espacios modernos diseñados para brindar comodidad, seguridad y privacidad integral.' },
    { id: 6, title: 'Compromiso con la inclusión', description: 'Todas las personas son bienvenidas: mujeres y hombres solteros, parejas heterosexuales y comunidad LGBT+.' },
    { id: 7, title: 'Testimonios de éxito', description: 'Cientos de familias formadas avalan la confianza, el cuidado y los resultados que ofrecemos día a día.' },
    { id: 8, title: 'Opciones internacionales', description: 'Atencíon bilingüe y coordinación logística para pacientes de todo el mundo que buscan fertilidad en Cancún.' },
    { id: 9, title: 'Servicio integral', description: 'Diagnóstico y tratamiento en un solo lugar, asegurando atención continua sin traslados innecesarios.' },
    { id: 10, title: 'Destino paradisíaco', description: 'Recibe atención médica de calidad en el entorno relajante y hermoso que ofrece Cancún.' },
  ];

  const partners = [
    {
      name: "Dr. Masashigue Kuwayama",
      role: "Padre de la vitrificación",
      image: "/images/dr-masashigue.jpg",
      description: "Inventor del método de vitrificación utilizado globalmente. Capacita continuamente a nuestro equipo de embriología."
    },
    {
      name: "Dr. Gabriel Dalvit",
      role: "Especialista en Medios Osmolares",
      image: "/images/dr-dalvit.jpg",
      description: "Colaborador clave en la creación de medios de vitrificación de alta eficiencia."
    },
    {
      name: "Dr. José Gaytán Melicoff",
      role: "Fundador de AFCC",
      image: "/images/dr-gaytan.jpg",
      description: "Más de 30 años de experiencia. Pionero formado en el Instituto Valenciano de Infertilidad."
    }
  ];

  return (
    <InnerPageLayout
      title="¿Por qué AFCC?"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Sobre Nosotros', href: '#' },
        { label: '¿Por qué elegirnos?', href: '#' }
      ]}
    >
      <div className="space-y-20">
        {/* Introduction */}
        <section>
          <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
            En <strong className="text-brand-violet font-bold">Advanced Fertility Center Cancún (AFCC)</strong>, ofrecemos instalaciones de primer nivel con tecnología de vanguardia. Nuestra calidad está respaldada por organizaciones internacionales como <strong className="text-brand-violet font-bold">ASRM, RedLARA, ESHRE</strong> y más.
          </p>

          <h2 className="text-4xl font-serif text-brand-violet mb-12 text-center">
            El TOP 10 del por qué elegir <br />
            <span className="text-brand-green italic">Advanced Fertility Center Cancún</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {reasons.map((reason) => (
              <div key={reason.id} className="group flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-500">
                <div className="text-5xl font-serif font-bold text-brand-green/20 group-hover:text-brand-green transition-colors duration-500 shrink-0 tabular-nums">
                  {reason.id.toString().padStart(2, '0')}
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-violet mb-3 uppercase tracking-wide leading-tight">{reason.title}</h4>
                  <p className="text-slate-500 text-sm font-light leading-snug italic">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Final CTA */}
        <section className="bg-brand-violet rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="!text-white !mt-0 text-3xl md:text-5xl font-serif mb-6 leading-tight">¿Listo/a para dar el <span className="text-brand-green italic underline underline-offset-8 decoration-white/20">primer paso</span>?</h3>
            <p className="!text-white/90 text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto">Solicita una videollamada con nuestro equipo. Estaremos encantados de orientarte y resolver todas tus dudas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contacto" className="bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold text-base shadow-xl hover:bg-white transition-all hover:-translate-y-1 whitespace-nowrap w-full sm:w-auto flex items-center justify-center">
                Agendar videollamada
              </a>
              <a href="tel:+529988035530" className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
                <Phone className="w-5 h-5" /> Llamar ahora
              </a>
            </div>
          </div>
        </section>
      </div>
    </InnerPageLayout>
  );
}

function Phone({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
