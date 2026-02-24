import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import teamData from '@/data/team.json';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

// Generar rutas estáticas para cada miembro del equipo
export async function generateStaticParams() {
  return teamData.map((member: any) => ({
    slug: member.slug,
  }));
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Buscar el miembro del equipo en el JSON
  const member = teamData.find((item: any) => item.slug === slug);

  if (!member) {
    return notFound();
  }

  // Lógica de imágenes (misma que en la tarjeta)
  let imageSrc = '/medical-team.jpg'; // Generic fallback
  if (member.slug === 'dr-eduardo-emanuel-espadas-reyes') imageSrc = '/dr-eduardo-espadas.jpg';
  if (member.slug === 'dr-everardo-trevino-ortiz') imageSrc = '/dr-everardo-trevino.jpg';
  if (member.slug === 'dra-esther-iyune-cojab') imageSrc = '/dra-esther-iyune.jpg';

  return (
    <main className="bg-gray-50 pb-24 min-h-screen">
      <PageHeader
        title={member.title}
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Equipo Médico', href: '/equipo' },
          { label: member.title, href: '#' }
        ]}
      />

      <Container className="pt-12 max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/equipo"
            className="inline-flex items-center text-brand-violet font-medium hover:text-brand-violet/80 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al equipo médico
          </Link>

          <Link
            href="/contacto"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-brand-violet text-white font-semibold rounded-xl hover:bg-brand-violet/90 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Agendar Cita
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Barra Lateral / Perfil Rápido */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-gray-50">
                <Image
                  src={imageSrc}
                  alt={member.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {member.title}
                  </h1>
                  <p className="text-brand-violet font-semibold mt-1">
                    {member.especialidad}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-brand-violet/10 rounded-lg text-brand-violet mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Teléfono</p>
                      <p className="text-sm text-gray-700">+52 998 803 5530</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-brand-violet/10 rounded-lg text-brand-violet mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ubicación</p>
                      <p className="text-sm text-gray-700">Cancún, Quintana Roo</p>
                    </div>
                  </div>
                </div>

                <div className="block sm:hidden pt-4">
                  <Link
                    href="/contacto"
                    className="w-full flex items-center justify-center px-6 py-3 bg-brand-violet text-white font-bold rounded-xl hover:bg-brand-violet/90 transition-all shadow-md active:scale-95"
                  >
                    Agendar Cita
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido Principal (Hoja de Vida) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Perfil Profesional */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-brand-violet/10 rounded-lg flex items-center justify-center text-brand-violet mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Perfil Profesional
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </section>

            {/* Experiencia */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-8 bg-brand-violet/10 rounded-lg flex items-center justify-center text-brand-violet mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Experiencia Profesional
              </h3>

              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-gray-100">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-brand-violet rounded-full flex items-center justify-center z-10 transition-transform hover:scale-110">
                      <div className="w-2.5 h-2.5 bg-brand-violet rounded-full"></div>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-brand-violet uppercase bg-brand-violet/5 px-2 py-1 rounded">201{item} - Presente</span>
                      <h4 className="text-lg font-bold text-gray-900 mt-2">Lorem Ipsum Specialist {item}</h4>
                      <p className="text-sm font-medium text-gray-500 mb-3">Fertility Center Cancun</p>
                      <p className="text-gray-600">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Educación */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-brand-violet/10 rounded-lg flex items-center justify-center text-brand-violet mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </span>
                Formación Académica
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((item) => (
                  <div key={item} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-violet/30 transition-all">
                    <p className="text-xs font-bold text-brand-violet mb-1 uppercase">Licenciatura / Especialidad</p>
                    <h4 className="font-bold text-gray-900 mb-2">Lorem Ipsum Academic Degree {item}</h4>
                    <p className="text-sm text-gray-500">Universidad Autónoma de Lorem Ipsum</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certificaciones */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-brand-violet/10 rounded-lg flex items-center justify-center text-brand-violet mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </span>
                Certificaciones y Alianzas
              </h3>

              <div className="flex flex-wrap gap-4">
                {['Lorem Cert 1', 'Ipsum Gold Partner', 'Fertility Expert 2024', 'Cancun Health Award'].map((cert) => (
                  <div key={cert} className="px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-xl text-sm font-semibold text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-violet rounded-full"></div>
                    {cert}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}