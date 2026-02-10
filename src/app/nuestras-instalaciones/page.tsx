import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { ExternalLink, Globe, CheckCircle, ShieldCheck, Microscope, Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function Page() {
  const gallery = [
    {
      src: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2024/01/afcc-foto-edificio.jpg",
      alt: "Edificio Advanced Fertility Center Cancún",
      title: "Nuestra Fachada"
    },
    {
      src: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Instalaciones-clinica-de-fertilidad.jpg",
      alt: "Lobby y Recepción",
      title: "Recepción Premium"
    },
    {
      src: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2024/01/equipo-medico-AFCC-03.jpg",
      alt: "Equipo Médico en Laboratorio",
      title: "Laboratorios Propios"
    },
    {
      src: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Especialistas-en-fertilidad.jpg",
      alt: "Especialistas trabajando",
      title: "Vanguardia Médica"
    },
    {
      src: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Fertility-clinic.jpg",
      alt: "Áreas de Consulta",
      title: "Consultorios Privados"
    },
    {
      src: "https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Recepcion-clinica-de-fertilidad.jpg",
      alt: "Sala de Espera",
      title: "Confort y Privacidad"
    }
  ];

  return (
    <InnerPageLayout
      title="Nuestras Instalaciones"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Instalaciones', href: '#' }
      ]}
    >
      <div className="space-y-20">
        {/* Intro Section */}
        <section>
          <h2 className="text-4xl font-serif text-brand-violet mb-8">
            Clínica de fertilidad en <span className="text-brand-green italic">Cancún</span>
          </h2>
          <div className="prose prose-lg prose-violet max-w-none text-slate-600 font-light leading-relaxed space-y-6">
            <p>
              En <strong className="text-brand-violet font-bold">Advanced Fertility Center Cancún</strong>, contamos con tecnología de última generación y un equipo médico altamente especializado para ofrecerte una atención de excelencia desde el primer día.
            </p>
            <p>
              Nuestras instalaciones han sido diseñadas para brindarte calidad, seguridad y confort en cada etapa de tu tratamiento. Disponemos de quirófano, laboratorios de análisis clínicos, andrología y fertilización In Vitro (FIV), todos equipados con tecnología de vanguardia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, text: "Máxima Seguridad Biológica" },
              { icon: <Microscope className="w-5 h-5" />, text: "Tecnología ISO-7" },
              { icon: <Heart className="w-5 h-5" />, text: "Atención Inclusiva y Empática" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-brand-green">{item.icon}</div>
                <span className="text-brand-violet font-bold text-sm uppercase tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section>
          <div className="mb-12">
            <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-xs">Recorrido Visual</span>
            <h3 className="text-3xl font-serif text-brand-violet mt-2">Tecnología al servicio de <span className="text-brand-green italic">tu sueño</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item, i) => (
              <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/90 via-brand-violet/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-8 left-8 right-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white text-xl font-serif">{item.title}</h4>
                  <p className="text-white/70 text-xs font-light mt-2 uppercase tracking-widest">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Virtual Tour CTA - More prominent here */}
        <section className="bg-brand-gray rounded-[4rem] p-12 md:p-20 relative overflow-hidden group border border-slate-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-green/10 transition-colors duration-700" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <Globe className="w-10 h-10 text-brand-green" />
            </div>
            <h3 className="text-4xl font-serif text-brand-violet mb-6">Explora nuestra clínica en <span className="text-brand-green italic">360°</span></h3>
            <p className="text-slate-500 text-lg font-light mb-12 max-w-xl">
              Realiza un recorrido virtual por nuestras salas de recuperación, laboratorios y quirófanos de alta tecnología.
            </p>
            <a
              href="https://my.matterport.com/show/?m=XtokPdzLfrQ"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-violet text-white px-12 py-5 rounded-full hover:bg-brand-violet/90 transition-all font-bold text-sm tracking-widest shadow-2xl shadow-brand-violet/20 group/btn"
            >
              INICIAR TOUR VIRTUAL
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      </div>
    </InnerPageLayout>
  );
}
