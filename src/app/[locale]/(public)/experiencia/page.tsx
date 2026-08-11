import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { ExternalLink, Globe, ShieldCheck, Microscope, Heart } from 'lucide-react';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildRouteMetadata({
    locale,
    es: {
      path: 'experiencia',
      title: 'La Experiencia AFCC',
      description: 'Recorre nuestras instalaciones, laboratorios de FIV y áreas de atención. Descubre cómo es vivir tu tratamiento de fertilidad en Cancún.',
    },
    en: {
      path: 'experiencia',
      title: 'The AFCC Experience',
      description: 'Take a look at our facilities, IVF laboratories and patient areas. Discover what going through fertility treatment in Cancun feels like.',
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const gallery = isEs ? [
    { src: "/images/wp/2024_01_afcc-foto-edificio.jpg", alt: "Edificio Advanced Fertility Center Cancún", title: "Nuestra Fachada" },
    { src: "/images/wp/2025_06_Instalaciones-clinica-de-fertilidad.jpg", alt: "Lobby y Recepción", title: "Recepción Premium" },
    { src: "/images/wp/2024_01_equipo-medico-AFCC-03.jpg", alt: "Equipo Médico en Laboratorio", title: "Laboratorios Propios" },
    { src: "/images/wp/2025_06_Especialistas-en-fertilidad.jpg", alt: "Especialistas trabajando", title: "Vanguardia Médica" },
    { src: "/images/wp/2025_06_Fertility-clinic.jpg", alt: "Áreas de Consulta", title: "Consultorios Privados" },
    { src: "/images/wp/2025_06_Recepcion-clinica-de-fertilidad.jpg", alt: "Sala de Espera", title: "Confort y Privacidad" },
  ] : [
    { src: "/images/wp/2024_01_afcc-foto-edificio.jpg", alt: "Advanced Fertility Center Cancún Building", title: "Our Facade" },
    { src: "/images/wp/2025_06_Instalaciones-clinica-de-fertilidad.jpg", alt: "Lobby and Reception", title: "Premium Reception" },
    { src: "/images/wp/2024_01_equipo-medico-AFCC-03.jpg", alt: "Medical Team in the Laboratory", title: "In-house Laboratories" },
    { src: "/images/wp/2025_06_Especialistas-en-fertilidad.jpg", alt: "Specialists at work", title: "Medical Innovation" },
    { src: "/images/wp/2025_06_Fertility-clinic.jpg", alt: "Consultation Areas", title: "Private Consultation Rooms" },
    { src: "/images/wp/2025_06_Recepcion-clinica-de-fertilidad.jpg", alt: "Waiting Room", title: "Comfort and Privacy" },
  ];

  return (
    <InnerPageLayout
      title={isEs ? 'Nuestras Instalaciones' : 'Our Facilities'}
      breadcrumb={[
        { label: isEs ? 'Inicio' : 'Home', href: '/' },
        { label: isEs ? 'Sobre Nosotros' : 'About Us', href: '#' },
        { label: isEs ? 'Instalaciones' : 'Facilities', href: '#' }
      ]}
    >
      <div className="space-y-20">
        {/* Intro Section */}
        <section>
          <h2 className="text-4xl font-serif text-brand-violet mb-8">
            {isEs ? <>Clínica de fertilidad en <span className="text-brand-green italic">Cancún</span></> : <>Fertility clinic in <span className="text-brand-green italic">Cancún</span></>}
          </h2>
          <div className="prose prose-lg prose-violet max-w-none text-slate-600 font-light leading-relaxed space-y-6">
            <p>
              {isEs ? (
                <>En <strong className="text-brand-violet font-bold">Advanced Fertility Center Cancún</strong>, contamos con tecnología de última generación y un equipo médico altamente especializado para ofrecerte una atención de excelencia desde el primer día.</>
              ) : (
                <>At <strong className="text-brand-violet font-bold">Advanced Fertility Center Cancún</strong>, we have state-of-the-art technology and a highly specialized medical team to provide you with excellent care from day one.</>
              )}
            </p>
            <p>
              {isEs
                ? 'Nuestras instalaciones han sido diseñadas para brindarte calidad, seguridad y confort en cada etapa de tu tratamiento. Disponemos de quirófano, laboratorios de análisis clínicos, andrología y fertilización In Vitro (FIV), todos equipados con tecnología de vanguardia.'
                : 'Our facilities have been designed to provide you with quality, safety and comfort at every stage of your treatment. We have an operating room, clinical analysis laboratories, andrology and In Vitro Fertilization (IVF) labs, all equipped with cutting-edge technology.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {(isEs ? [
              { icon: <ShieldCheck className="w-5 h-5" />, text: "Máxima Seguridad Biológica" },
              { icon: <Microscope className="w-5 h-5" />, text: "Tecnología ISO-7" },
              { icon: <Heart className="w-5 h-5" />, text: "Atención Inclusiva y Empática" }
            ] : [
              { icon: <ShieldCheck className="w-5 h-5" />, text: "Maximum Biological Safety" },
              { icon: <Microscope className="w-5 h-5" />, text: "ISO-7 Technology" },
              { icon: <Heart className="w-5 h-5" />, text: "Inclusive and Empathetic Care" }
            ]).map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-brand-green">{item.icon}</div>
                <span className="text-brand-violet font-bold text-base uppercase tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section>
          <div className="mb-12">
            <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-base">{isEs ? 'Recorrido Visual' : 'Visual Tour'}</span>
            <h3 className="text-3xl font-serif text-brand-violet mt-2">
              {isEs ? <>Tecnología al servicio de <span className="text-brand-green italic">tu sueño</span></> : <>Technology at the service of <span className="text-brand-green italic">your dream</span></>}
            </h3>
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
                  <div className="!text-white/80 text-base font-light mt-2 uppercase tracking-widest leading-snug">{item.alt}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Virtual Tour CTA */}
        <section className="bg-brand-gray rounded-[4rem] p-12 md:p-20 relative overflow-hidden group border border-slate-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-green/10 transition-colors duration-700" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <Globe className="w-10 h-10 text-brand-green" />
            </div>
            <h3 className="text-4xl font-serif text-brand-violet mb-6">
              {isEs ? <>Explora nuestra clínica en <span className="text-brand-green italic">360°</span></> : <>Explore our clinic in <span className="text-brand-green italic">360°</span></>}
            </h3>
            <p className="text-slate-500 text-lg font-light mb-12 max-w-xl">
              {isEs
                ? 'Realiza un recorrido virtual por nuestras salas de recuperación, laboratorios y quirófanos de alta tecnología.'
                : 'Take a virtual tour of our recovery rooms, laboratories and high-tech operating theaters.'}
            </p>
            <a
              href="https://tinyurl.com/advancedfertilitycentercancun"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-violet text-white px-12 py-5 rounded-full hover:bg-brand-violet/90 transition-all font-bold text-base tracking-widest shadow-2xl shadow-brand-violet/20 group/btn"
            >
              {isEs ? 'INICIAR TOUR VIRTUAL' : 'START VIRTUAL TOUR'}
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      </div>
    </InnerPageLayout>
  );
}
