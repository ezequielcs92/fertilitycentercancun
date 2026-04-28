import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Check, Heart } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Artificial Insemination"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Artificial Insemination', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        An accessible and effective option for patients with mild or unexplained infertility.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        <strong>Intrauterine Insemination (IUI)</strong>, commonly known as artificial insemination, is a low-complexity assisted reproduction procedure. Its goal is to facilitate conception by placing previously prepared sperm directly into the uterus at the optimal ovulation window.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
        <Image
          src="/images/treatments/IVF.jpg"
          alt="Intrauterine insemination process"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">How does it work?</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5">
          <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/treatments/IVF.jpg"
              alt="Follicular monitoring"
              fill
              className="object-cover object-[45%_35%]"
              unoptimized
            />
          </div>
          <h3 className="text-xl font-bold text-brand-violet mb-3">1. Follicular Monitoring</h3>
          <p className="text-base text-slate-600">
            We monitor follicle development by ultrasound. Medication may be used to support follicular growth and trigger ovulation at the optimal time.
          </p>
        </div>
        <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5">
          <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/treatments/IVF.jpg"
              alt="Insemination procedure"
              fill
              className="object-contain p-2 bg-white"
              unoptimized
            />
          </div>
          <h3 className="text-xl font-bold text-brand-violet mb-3">2. Insemination</h3>
          <p className="text-base text-slate-600">
            Once the semen sample is prepared (sperm capacitation), it is gently introduced into the uterus using a thin catheter. The procedure is quick, outpatient, and usually painless.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Key Benefits</h2>
      <div className="bg-brand-violet/5 p-8 rounded-3xl mb-12">
        <ul className="space-y-4">
          {[
            'Low-complexity and lower-cost treatment.',
            'Simple outpatient procedure performed in clinic.',
            'No anesthesia or prolonged recovery required.',
            'Improves chances compared to timed intercourse alone.',
            'Lower physical and emotional stress.'
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-brand-green mt-1 shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Is it right for me?</h2>
      <p className="mb-6 text-slate-600">Artificial insemination may be recommended for:</p>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          'Mild infertility or unexplained infertility.',
          'Mild male-factor fertility issues.',
          'Cervical factors that hinder sperm passage.',
          'Single women or female couples using donor sperm.'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-white shadow-sm p-4 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-brand-violet fill-current" />
            </div>
            <span className="text-base font-medium text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </InnerPageLayout>
  );
}

