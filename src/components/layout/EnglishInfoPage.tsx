import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';

type EnglishInfoPageProps = {
  title: string;
  breadcrumbSection?: string;
  subtitle: string;
  intro: string;
  highlights: string[];
};

export default function EnglishInfoPage({
  title,
  breadcrumbSection = 'Treatments',
  subtitle,
  intro,
  highlights
}: EnglishInfoPageProps) {
  return (
    <InnerPageLayout
      title={title}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: breadcrumbSection, href: '#' },
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">{subtitle}</p>

      <div className="bg-brand-gray rounded-[2rem] p-8 mb-10 border border-brand-violet/10">
        <p className="text-lg text-slate-600 leading-relaxed">{intro}</p>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Key points</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {highlights.map((item) => (
          <div key={item} className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-violet text-white rounded-[2.5rem] p-10">
        <h3 className="text-2xl font-serif mb-3">Personalized guidance</h3>
        <p className="text-white/90">
          Our bilingual team helps you understand every step and coordinates your treatment with a clear, patient-centered plan.
        </p>
      </div>
    </InnerPageLayout>
  );
}
