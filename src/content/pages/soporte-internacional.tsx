
import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import partnersData from '@/data/partners.json';

const InternationalSupportPage = () => {
  return (
    <InnerPageLayout
      title="Soporte Internacional"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Soporte Internacional', href: '#' },
      ]}
    >
      {/* Intro Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-violet mb-6 leading-tight">
                Alianzas Globales para <br />
                <span className="text-brand-green">Resultados Excepcionales</span>
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  En Advanced Fertility Center Cancun, nos sentimos muy orgullosos de contar con el soporte médico de grandes especialistas internacionales que comparten sus investigaciones y descubrimientos sobre las técnicas más avanzadas en fertilidad.
                </p>
                <p>
                  Nuestro equipo es constantemente capacitado por médicos de renombre mundial, asegurando que cada paciente reciba atención de nivel internacional en el corazón de Cancún.
                </p>
              </div>
            </div>
            <div className="not-prose lg:w-1/2 relative aspect-[4/5] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="/medical-team.jpg"
                alt="Soporte Médico Internacional"
                fill
                className="object-cover m-0"
              />
              <div className="absolute inset-0 bg-brand-violet/10 mix-blend-multiply" />
            </div>
          </div>
        </Container>
      </section>

      {/* Advisory Board Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-violet mb-4">Consejo Asesor Médico</h2>
            <div className="w-20 h-1 bg-brand-green mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contamos con la colaboración y respaldo técnico de líderes de opinión en medicina reproductiva de Japón, Rusia y México.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnersData.map((partner: any) => (
              <div
                key={partner.id}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="text-center flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-brand-violet font-semibold text-base mb-1">{partner.role}</p>
                  <p className="text-gray-500 text-base mb-4 uppercase tracking-wider">{partner.institution}</p>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-50 flex gap-4 justify-center mt-auto">
                  {partner.videoUrl && (
                    <button className="flex items-center text-brand-violet font-bold text-base hover:text-brand-green transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Ver Video
                    </button>
                  )}
                  {partner.website && (
                    <Link
                      href={partner.website}
                      target="_blank"
                      className="flex items-center text-brand-violet font-bold text-base hover:text-brand-green transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Sitio Web
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* International Patients CTA */}
      <section className="py-24 bg-brand-violet relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/20 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">¿Vives fuera de México?</h2>
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Ofrecemos video-consultas iniciales para coordinar tu tratamiento antes de viajar,
            asegurando una experiencia fluida y sin contratiempos.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contacto"
              className="bg-brand-green text-brand-violet px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl hover:-translate-y-1 inline-block"
            >
              Agendar Video Llamada
            </Link>
          </div>
        </Container>
      </section>
    </InnerPageLayout>
  );
};

export default InternationalSupportPage;
