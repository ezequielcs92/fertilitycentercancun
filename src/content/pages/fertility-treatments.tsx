import React from 'react';
import Link from 'next/link';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const treatments = [
  {
    title: 'IVF - In Vitro Fertilization',
    description: 'Advanced assisted reproduction with personalized protocols and high success rates.',
    href: '/ivf-in-vitro-fertilization',
    image: '/images/wp/2024_07_FIV-%E2%80%93-Fertilizacion-In-vitro.png'
  },
  {
    title: 'IVF with Genetic Testing and Sex Selection',
    description: 'Comprehensive IVF with optional preimplantation genetic testing for embryo selection.',
    href: '/in-vitro-fertilization-with-genetic-testing-and-sex-selection',
    image: '/images/wp/2024_07_Fertilizacion-In-vitro-con-estudio-genetico-y-seleccion-de-sexo.png'
  },
  {
    title: 'Mini IVF',
    description: 'Low-medication IVF alternative focused on quality and patient comfort.',
    href: '/mini-ivf',
    image: '/images/wp/2024_07_Mini-FIV.png'
  },
  {
    title: 'Natural Cycle IVF',
    description: 'A less stimulated IVF approach aligned with your natural cycle.',
    href: '/in-vitro-fertilization-in-ivf-natural-cycle',
    image: '/images/wp/2024_07_Fertilizacion-in-vitro-en-FIV-Ciclo-natural.png'
  },
  {
    title: 'Egg Donation',
    description: 'Specialized donor-egg programs for patients requiring advanced options.',
    href: '/ovodon',
    image: '/images/wp/2024_07_Donacion-de-Ovulos.png'
  },
  {
    title: 'Artificial Insemination',
    description: 'IUI treatment with careful monitoring and individualized timing.',
    href: '/artificial-insemination',
    image: '/images/wp/2024_08_Inseminacion-Artificial.png'
  },
  {
    title: 'Fertility Preservation',
    description: 'Egg, sperm, and embryo preservation plans based on your goals and timeline.',
    href: '/fertility-preservation',
    image: '/images/wp/2024_07_Preservacion-de-la-Fertilidad-1.png'
  },
  {
    title: 'Embryo Donation and Adoption',
    description: 'Comprehensive support for embryo donation and adoption pathways.',
    href: '/embryo-donation-and-adoption',
    image: '/images/wp/2024_07_Donacion-y-Adopcion-de-embriones.png'
  },
  {
    title: 'Timed Intercourse and Ovulation Induction',
    description: 'Cycle-guided treatment to improve natural conception opportunities.',
    href: '/timed-intercourse-and-ovulation-induction',
    image: '/images/wp/2024_07_Coito-programado-e-Induccion-de-Ovulo.png'
  }
];

export default function Page() {
  return (
    <InnerPageLayout
      title="Fertility Treatments"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        Personalized fertility care with advanced technology, expert specialists, and compassionate guidance.
      </p>

      <div className="bg-brand-gray rounded-[2rem] p-8 mb-12 border border-brand-violet/10">
        <p className="text-lg text-slate-600 leading-relaxed mb-4">
          At <strong>Advanced Fertility Center Cancun</strong>, every treatment plan is tailored to your medical history, goals, and timeline.
          We combine evidence-based medicine with warm, patient-centered care.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-0">
          {[
            'Specialists in reproductive medicine',
            'State-of-the-art laboratory and technology',
            'Bilingual medical and coordination team',
            'End-to-end guidance during treatment'
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-brand-violet">
              <CheckCircle2 className="w-5 h-5 text-brand-green" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {treatments.map((treatment) => (
          <article
            key={treatment.href}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={treatment.image}
                alt={treatment.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif text-brand-violet mb-3">{treatment.title}</h3>
              <p className="text-slate-600 mb-5">{treatment.description}</p>
              <Link
                href={treatment.href}
                className="inline-flex items-center gap-2 text-brand-violet font-semibold hover:text-brand-green transition-colors"
              >
                View treatment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  );
}
