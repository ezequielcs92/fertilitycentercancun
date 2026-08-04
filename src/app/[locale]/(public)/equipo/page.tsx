import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildRouteMetadata({
    locale,
    es: {
      path: 'equipo',
      title: 'Nuestro Equipo Médico',
      description: 'Conoce a los ginecólogos, embriólogos y coordinadores especializados en reproducción asistida que acompañarán tu tratamiento en Cancún.',
    },
    en: {
      path: 'equipo',
      title: 'Our Medical Team',
      description: 'Meet the gynecologists, embryologists and coordinators specialized in assisted reproduction who will guide your treatment in Cancun.',
    },
  });
}

const specialists = [
  {
    name: 'Dra. Azul Estefanía Torres Rivera',
    roleEs: 'Directora Médica · Especialista en Reproducción Asistida',
    roleEn: 'Medical Director · Assisted Reproduction Specialist',
    image: '/images/team/azul-torres.jpg',
  },
  {
    name: 'Dr. Eduardo Emanuel Espadas Reyes',
    roleEs: 'Especialista en Reproducción Asistida',
    roleEn: 'Assisted Reproduction Specialist',
    image: '/dr-eduardo-espadas.jpg',
  },
  {
    name: 'Dr. Everardo Treviño Ortiz',
    roleEs: 'Especialista en Reproducción Asistida',
    roleEn: 'Assisted Reproduction Specialist',
    image: '/dr-everardo-trevino.jpg',
  },
  {
    name: 'Dra. Esther Iyune Cojab',
    roleEs: 'Especialista en Reproducción Asistida',
    roleEn: 'Assisted Reproduction Specialist',
    image: '/dra-esther-iyune.jpg',
  },
  {
    name: 'Dr. Rodolfo González Hovelman',
    roleEs: 'Especialista en Reproducción Asistida',
    roleEn: 'Assisted Reproduction Specialist',
    image: '/images/team/rodolfo-gonzalez.png',
  },
];

const supportTeam = [
  {
    name: 'Carolina González Cortés',
    roleEs: 'Jefa de Andrología',
    roleEn: 'Head of Andrology',
    image: '/images/team/carolina-gonzalez.jpg',
  },
  {
    name: 'Beatriz Martínez Manzanares',
    roleEs: 'Jefa de Laboratorio de Embriología',
    roleEn: 'Head of Embryology Laboratory',
    image: '/images/team/beatriz-martinez.jpg',
  },
  {
    name: 'Luz Clarita Domínguez Millares',
    roleEs: 'Jefa de Laboratorio Clínico',
    roleEn: 'Head of Clinical Laboratory',
    image: '/images/team/luz-dominguez.jpg',
  },
  {
    name: 'Wendy Isabel Montes Morales',
    roleEs: 'Jefa de Enfermería',
    roleEn: 'Head of Nursing',
    image: '/images/team/wendy-montes.jpg',
  },
  {
    name: 'Inda Inés Estrada Ramos',
    roleEs: 'Coordinadora Clínica',
    roleEn: 'Clinical Coordinator',
    image: '/images/team/inda-estrada.jpg',
  },
  {
    name: 'Elisheva Vianey García Ticante',
    roleEs: 'Coordinadora de Ciclos',
    roleEn: 'Cycle Coordinator',
    image: '/images/team/vianey-garcia.jpg',
  },
  {
    name: 'Yhadira Sarai Serrano Díaz',
    roleEs: 'Coordinadora de Donantes',
    roleEn: 'Donor Coordinator',
    image: '/images/team/yhadira-serrano.jpg',
  },
  {
    name: 'Luis Iván Hernández Fuentes',
    roleEs: 'Director Comercial',
    roleEn: 'Commercial Director',
    image: '/images/team/luis-hernandez.jpg',
  },
];

function MemberCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="not-prose bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="relative aspect-[4/5] bg-slate-100">
        <Image src={image} alt={name} fill className="object-cover object-top" />
      </div>
      <div className="p-5">
        <h3 className="text-base font-serif text-brand-violet mb-1 leading-snug">{name}</h3>
        <p className="text-slate-500 text-sm font-light leading-snug">{role}</p>
      </div>
    </div>
  );
}

export default async function MedicalTeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <InnerPageLayout
      title={isEs ? 'Nuestro Equipo Médico' : 'Our Medical Team'}
      breadcrumb={[
        { label: isEs ? 'Inicio' : 'Home', href: '/' },
        { label: isEs ? 'Nosotros' : 'About Us', href: '#' },
        { label: isEs ? 'Equipo Médico' : 'Medical Team', href: '#' },
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-12">
        {isEs
          ? 'Un equipo multidisciplinario de especialistas en fertilidad, comprometidos con tu cuidado, seguridad y el éxito de tu tratamiento.'
          : 'A multidisciplinary team of fertility specialists, committed to your care, safety, and the success of your treatment.'}
      </p>

      {/* Specialists */}
      <h2 className="text-2xl font-serif text-brand-violet mb-8">
        {isEs ? 'Especialistas en Reproducción Asistida' : 'Assisted Reproduction Specialists'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
        {specialists.map((member) => (
          <MemberCard key={member.name} name={member.name} role={isEs ? member.roleEs : member.roleEn} image={member.image} />
        ))}
      </div>

      {/* Support team */}
      <h2 className="text-2xl font-serif text-brand-violet mb-8">
        {isEs ? 'Equipo de Apoyo Clínico' : 'Clinical Support Team'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {supportTeam.map((member) => (
          <MemberCard key={member.name} name={member.name} role={isEs ? member.roleEs : member.roleEn} image={member.image} />
        ))}
      </div>

      <div className="bg-brand-violet rounded-[2.5rem] p-10 text-white shadow-xl">
        <h2 className="!text-white text-3xl font-serif mb-4">
          {isEs ? 'Atención centrada en el paciente' : 'Patient-Centered Care'}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
          {(isEs ? [
            'Atención bilingüe y seguimiento personalizado',
            'Protocolos clínicos basados en evidencia',
            'Tecnología reproductiva de vanguardia',
            'Apoyo empático durante todo el proceso',
          ] : [
            'Bilingual care and personalized follow-up',
            'Evidence-based clinical protocols',
            'Cutting-edge reproductive technology',
            'Empathetic support throughout the process',
          ]).map((item) => (
            <li key={item} className="flex items-start gap-2 text-white/90">
              <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href={isEs ? '/contacto' : '/en/contact-ivf-doctors'}
            className="inline-block bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold text-base hover:bg-white transition-colors shadow-lg"
          >
            {isEs ? 'Agendar consulta' : 'Book a consultation'}
          </Link>
        </div>
      </div>
    </InnerPageLayout>
  );
}
