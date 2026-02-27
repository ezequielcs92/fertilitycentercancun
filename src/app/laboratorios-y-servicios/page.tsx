import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

const services = [
  { title: 'Diagnóstico de Fertilidad', image: '/images/wp/2025_07_Diagnostico-430x290-1.jpg' },
  { title: 'Ginecología y Obstetricia', image: '/images/wp/2025_07_Ginecologia-430x290-1.jpg' },
  { title: 'Laboratorio de Andrología', image: '/images/wp/2025_07_Laboratorio-de-andrologia-430x290-1.jpg' },
  { title: 'Análisis Clínicos', image: '/images/wp/2025_07_Laboratorio-clinico-430x290-1.jpg' },
  { title: 'Medicina Materno-Fetal', image: '/images/wp/2025_07_Materno-fetal-430x290-1.jpg' },
  { title: 'Acompañamiento Emocional y Psicológico', image: '/images/wp/2025_07_Acompanamiento-emocional-430x290-1.jpg' },
  { title: 'Acupuntura', image: '/images/wp/2025_07_Acupuntura-430x290-1.jpg' },
  { title: 'Intralípidos', image: '/images/wp/2025_10_intralipidos-001.jpg' },
];

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="Laboratorios y Servicios"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Laboratorios y Servicios', href: '#' },
        ]}
      />

      <Container className="pt-16">
        <section className="max-w-4xl mx-auto mb-14">
          <p className="text-xl md:text-2xl text-brand-violet font-serif italic leading-relaxed">
            En <strong>Advanced Fertility Center Cancún</strong>, ofrecemos una gama completa de servicios médicos especializados para acompañarte en cada paso de tu camino hacia la maternidad y paternidad.
          </p>
          <p className="mt-5 text-slate-600 leading-relaxed text-base md:text-lg">
            Contamos con instalaciones de vanguardia y un equipo de profesionales altamente capacitados para brindarte una atención avanzada, humana y personalizada.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-violet leading-snug">{service.title}</h3>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
