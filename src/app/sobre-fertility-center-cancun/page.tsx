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
      image: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2024/08/Dr.-Masashigue-Kuwayama-1.jpg",
      description: "Inventor del método de vitrificación utilizado globalmente. Capacita continuamente a nuestro equipo de embriología."
    },
    {
      name: "Dr. Gabriel Dalvit",
      role: "Especialista en Medios Osmolares",
      image: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2024/08/Dr.-Gabriel-Dalvit1-.jpg",
      description: "Colaborador clave en la creación de medios de vitrificación de alta eficiencia."
    },
    {
      name: "Dr. José Gaytán Melicoff",
      role: "Fundador de AFCC",
      image: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2024/03/gaytan-1.jpg",
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

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {reasons.map((reason) => (
              <div key={reason.id} className="group flex gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-colors duration-500">
                <div className="text-5xl font-serif font-bold text-brand-green/20 group-hover:text-brand-green transition-colors duration-500 shrink-0 tabular-nums">
                  {reason.id.toString().padStart(2, '0')}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-violet mb-2 uppercase tracking-wide">{reason.title}</h4>
                  <p className="text-slate-500 text-sm font-light leading-relaxed italic">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* International Science */}
        <section>
          <div className="text-center mb-16">
            <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-xs">Vanguardia Mundial</span>
            <h2 className="text-4xl font-serif text-brand-violet mt-4">Respaldo Científico <span className="text-brand-green italic">Internacional</span></h2>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto font-light">
              Nuestros socios son referentes globales que garantizan que nuestros tratamientos cumplan con los más altos estándares de calidad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {partners.map((partner, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl mb-8 border-4 border-white group-hover:scale-[1.02] transition-transform duration-700">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="text-center px-4">
                  <h4 className="text-2xl font-serif text-brand-violet mb-1">{partner.name}</h4>
                  <span className="text-brand-green font-bold uppercase tracking-widest text-[10px] block mb-4">{partner.role}</span>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{partner.description}</p>

                  <button className="mt-8 inline-flex items-center gap-2 text-brand-violet font-bold text-xs uppercase tracking-widest hover:text-brand-green transition-colors group/btn">
                    <div className="w-8 h-8 rounded-full bg-brand-violet group-hover/btn:bg-brand-green flex items-center justify-center transition-colors">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                    Ver Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Final CTA */}
        <section className="bg-brand-violet rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-4xl font-serif mb-6 leading-tight">¿Estás lista para dar el <span className="text-brand-green italic underline underline-offset-8 decoration-white/20">primer paso</span>?</h3>
            <p className="text-white/60 text-lg mb-12 font-light">Solicita una videollamada con nuestro equipo. Estaremos encantados de orientarte y resolver todas tus dudas.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contacto" className="bg-brand-green text-brand-violet px-10 py-5 rounded-full font-bold text-sm tracking-widest shadow-xl hover:bg-white transition-all hover:-translate-y-1">
                AGENDAR VIDEOLLAMADA
              </a>
              <a href="tel:+529988035530" className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> LLAMAR AHORA
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
