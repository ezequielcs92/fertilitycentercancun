import React from 'react';
import Image from 'next/image';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { CheckCircle2, HeartHandshake } from 'lucide-react';

const team = [
  {
    name: 'Dr. Eduardo Emanuel Espadas Reyes',
    role: 'Gynecology and Obstetrics / Reproductive Biology',
    image: '/dr-eduardo-espadas.jpg'
  },
  {
    name: 'Dr. Everardo Treviño',
    role: 'Gynecology and Obstetrics / Reproductive Biology',
    image: '/dr-everardo-trevino.jpg'
  },
  {
    name: 'Dr. Esther Iyune Cojab',
    role: 'Gynecology and Obstetrics / Reproductive Biology',
    image: '/dra-esther-iyune.jpg'
  }
];

export default function Page() {
  return (
    <InnerPageLayout
      title="Our Medical Team"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about-fertility-center' },
        { label: 'Medical Team', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        A multidisciplinary team of fertility specialists committed to your care, safety, and treatment success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {team.map((member) => (
          <article key={member.name} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="relative aspect-[4/5] bg-slate-100">
              <Image src={member.image} alt={member.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-brand-violet mb-2">{member.name}</h3>
              <p className="text-slate-600">{member.role}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-brand-violet rounded-[2.5rem] p-10 text-white shadow-xl">
        <HeartHandshake className="w-10 h-10 text-brand-green mb-4" />
        <h2 className="text-3xl font-serif mb-4">Patient-centered fertility care</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
          {[
            'Bilingual care and close follow-up',
            'Evidence-based clinical protocols',
            'Advanced reproductive technology',
            'Compassionate support throughout your journey'
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-white/90">
              <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </InnerPageLayout>
  );
}
