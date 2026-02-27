import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

const services = [
  { title: 'Fertility Diagnosis', image: '/images/wp/2025_07_Diagnostico-430x290-1.jpg' },
  { title: 'Gynecology and Obstetrics', image: '/images/wp/2025_07_Ginecologia-430x290-1.jpg' },
  { title: 'Andrology Laboratory', image: '/images/wp/2025_07_Laboratorio-de-andrologia-430x290-1.jpg' },
  { title: 'Clinical Analysis', image: '/images/wp/2025_07_Laboratorio-clinico-430x290-1.jpg' },
  { title: 'Maternal-Fetal Medicine', image: '/images/wp/2025_07_Materno-fetal-430x290-1.jpg' },
  { title: 'Emotional and Psychological Support', image: '/images/wp/2025_07_Acompanamiento-emocional-430x290-1.jpg' },
  { title: 'Acupuncture', image: '/images/wp/2025_07_Acupuntura-430x290-1.jpg' },
  { title: 'Intralipids', image: '/images/wp/2025_10_intralipidos-001.jpg' },
];

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="Laboratories and Services"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Laboratories and Services', href: '#' },
        ]}
      />

      <Container className="pt-16">
        <section className="max-w-4xl mx-auto mb-14">
          <p className="text-xl md:text-2xl text-brand-violet font-serif italic leading-relaxed">
            At <strong>Advanced Fertility Center Cancún</strong>, we provide a complete range of specialized medical services to support you through every stage of your fertility journey.
          </p>
          <p className="mt-5 text-slate-600 leading-relaxed text-base md:text-lg">
            Our state-of-the-art facilities and highly trained team deliver advanced, compassionate, and personalized care.
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
