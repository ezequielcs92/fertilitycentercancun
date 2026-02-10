
import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import teamData from '@/data/team.json';

const MedicalTeamPage = () => {
  return (
    <InnerPageLayout
      title="Nuestro equipo médico"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Nuestro equipo médico', href: '#' },
      ]}
    >
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-violet mb-6">
              Expertos comprometidos con tu sueño
            </h2>
            <p className="text-lg text-gray-600">
              Nuestro equipo está conformado por especialistas de renombre internacional,
              dedicados a brindar la mejor atención y tecnología en medicina reproductiva.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamData.map((member: any) => {
              // Image resolution logic
              let imageSrc = '/medical-team.jpg'; // Generic fallback

              // Map specific slugs to available images in public/
              if (member.slug === 'dr-eduardo-emanuel-espadas-reyes') imageSrc = '/dr-eduardo-espadas.jpg';
              if (member.slug === 'dr-everardo-trevino-ortiz') imageSrc = '/dr-everardo-trevino.jpg';
              if (member.slug === 'dra-esther-iyune-cojab') imageSrc = '/dra-esther-iyune.jpg';

              return (
                <Link
                  key={member.id}
                  href={`/equipo/${member.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={member.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-violet transition-colors">
                      {member.title}
                    </h3>
                    <p className="text-brand-green font-medium text-sm mb-4 line-clamp-2">
                      {member.especialidad}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-brand-violet font-semibold text-sm">
                      Ver perfil completo
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-violet text-white">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            ¿Listo para iniciar tu proceso?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Agenda una cita con nuestros especialistas y da el primer paso hacia tu nueva familia.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-brand-green text-brand-violet px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors shadow-lg"
          >
            Agendar Consulta
          </Link>
        </Container>
      </section>
    </InnerPageLayout>
  );
};

export default MedicalTeamPage;
