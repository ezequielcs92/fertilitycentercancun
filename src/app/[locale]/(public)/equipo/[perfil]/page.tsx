import React from 'react';
import { notFound } from 'next/navigation';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { Container } from '@/components/ui/Container';
import { getTeamMemberByIdentifier, type StoredExperienceEntry } from '@/lib/actions/team';
import Image from 'next/image';
import { MapPin, Mail, Phone, Award } from 'lucide-react';

export default async function TeamMemberProfilePage({
  params,
}: {
  params: Promise<{ locale: string; perfil: string }>;
}) {
  const { locale, perfil } = await params;
  const isEs = locale === 'es';

  const member = await getTeamMemberByIdentifier(perfil);

  if (!member) {
    notFound();
  }

  const imageSrc = member.foto_url || '/medical-team.jpg';

  return (
    <InnerPageLayout
      title={isEs ? member.nombre : member.nombre}
      breadcrumb={[
        { label: isEs ? 'Inicio' : 'Home', href: '/' },
        { label: isEs ? 'Nuestro equipo médico' : 'Our medical team', href: '/equipo' },
        { label: member.nombre, href: '#' },
      ]}
    >
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative aspect-[4/5] bg-slate-100">
                  <Image
                    src={imageSrc}
                    alt={member.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-md border border-gray-100">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-violet mb-3">{member.nombre}</h1>
              <p className="text-brand-violet/90 font-medium text-lg mb-8">{member.especialidad}</p>

              {member.bio && (
                <p className="text-slate-600 leading-relaxed mb-8">{member.bio}</p>
              )}

              {member.perfil_profesional && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-brand-violet mb-3">{isEs ? 'Perfil profesional' : 'Professional profile'}</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">{member.perfil_profesional}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {member.ubicacion && (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <MapPin className="w-5 h-5 text-brand-violet" />
                    <span className="text-slate-600">{member.ubicacion}</span>
                  </div>
                )}
                {member.email && (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Mail className="w-5 h-5 text-brand-violet" />
                    <span className="text-slate-600 break-all">{member.email}</span>
                  </div>
                )}
                {member.telefono && (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Phone className="w-5 h-5 text-brand-violet" />
                    <span className="text-slate-600">{member.telefono}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Award className="w-5 h-5 text-brand-violet" />
                  <span className="text-slate-600">{isEs ? 'Especialista AFCC' : 'AFCC Specialist'}</span>
                </div>
              </div>

              {Array.isArray(member.experiencia_profesional) && member.experiencia_profesional.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-brand-violet mb-4">{isEs ? 'Experiencia profesional' : 'Professional experience'}</h2>
                  <ul className="space-y-3">
                    {member.experiencia_profesional.map((item: StoredExperienceEntry, index: number) => (
                      <li key={index} className="p-4 rounded-2xl bg-brand-violet/5 border border-brand-violet/10 text-slate-700">
                        {typeof item === 'string' ? item : item?.titulo || item?.descripcion || JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </InnerPageLayout>
  );
}
