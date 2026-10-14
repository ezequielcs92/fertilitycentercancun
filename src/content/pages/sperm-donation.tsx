import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Sperm Donation"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Sperm Donation', href: '#' },
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
        Treatment for patients who need donor sperm.
      </p>
      <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
        <p>
          Sperm donation at <strong>Advanced Fertility Center Cancun</strong> is a patient treatment.
          Donor sperm is used for intrauterine insemination or in vitro fertilization, depending on
          the medical assessment of each case.
        </p>
        <p>
          This page is not the egg-donor recruitment program. Women who want to donate eggs should
          use{' '}
          <Link href="/en/lifestart-donation-program" className="font-semibold text-brand-violet underline">
            LifeStart
          </Link>
          .
        </p>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Who it is for</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Couples whose male factor means the partner’s sample cannot be used',
          'Single women planning a pregnancy with donor sperm',
          'Female couples',
          'Patients whose workup shows that a donor sample is the right next step',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Users className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">How the sample is used</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          'Intrauterine insemination, when the medical team considers it appropriate',
          'In vitro fertilization, when the treatment plan requires it',
          'The sample is prepared in the andrology laboratory',
          'The number of visits and the tests are decided in consultation',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 p-5 bg-brand-violet/5 rounded-2xl border border-brand-violet/10">
            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <h2 className="text-3xl font-serif text-brand-violet mb-5">Catalog, anonymity and selection</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          You can review the sperm donor catalog and discuss the options with the medical team. The
          donor’s identity is not shared with the patient. Acceptance criteria follow the clinic
          protocol and are explained in consultation, not on this page.
        </p>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
          <p className="text-slate-700">
            The next step is a consultation. That visit confirms whether donor sperm is the right
            treatment and how it will be organized.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/en/sperm-donor-catalog"
          className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg"
        >
          View the donor catalog
        </Link>
        <Link
          href="/en/contact-ivf-doctors"
          className="inline-flex items-center justify-center px-8 py-4 bg-brand-green text-brand-violet rounded-full font-bold hover:bg-brand-violet hover:text-white transition-all"
        >
          Book a consultation
        </Link>
      </div>
    </InnerPageLayout>
  );
}
