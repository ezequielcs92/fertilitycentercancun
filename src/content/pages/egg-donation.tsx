import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { CheckCircle2, Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Egg Donation"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Egg Donation', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            A hopeful alternative with the highest success rates.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              At <strong>Advanced Fertility Center Cancun</strong>, egg donation (IVF with donor eggs) is one of the treatments with the highest probability of success in reproductive medicine. It represents a strong and hopeful option for women and families who, for various medical reasons, cannot use their own eggs.
            </p>
            <p>
              Today, thanks to advances in assisted reproduction, this treatment offers success rates that can exceed <strong>60%–70% per embryo transfer</strong>, depending on each case, making it one of the most effective alternatives for achieving pregnancy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact-ivf-doctors"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Schedule consultation
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="not-prose relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="/images/treatments/DONANTES.png"
              alt="Ovodon treatment"
              fill
              className="object-cover object-center m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">A real path to motherhood and fatherhood</h2>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Egg donation is not only a medical solution. It is a tangible opportunity to build a family. At our center, we support:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Women with low ovarian reserve',
          'Patients with previous IVF failures',
          'Women of advanced reproductive age',
          'Diverse families, including same-sex couples and single individuals'
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Users className="w-5 h-5 text-brand-green shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <h2 className="text-3xl font-serif text-brand-violet mb-5">Strict selection, better outcomes</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          We understand that egg quality is critical for treatment success. That is why we follow a highly strict donor selection process aligned with international standards. Only a small percentage of candidates (<strong>approx. 10%–15%</strong>) are accepted into our program.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Comprehensive medical evaluation',
            'Advanced genetic testing',
            'Hormonal and fertility analysis',
            'Psychological evaluation',
            'Detailed family history'
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100">
              <Sparkles className="w-4 h-4 text-brand-green shrink-0" />
              <span className="text-slate-700 text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Safety, anonymity, and legal support</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Anonymity between donor and recipient',
          'Safe, supervised clinical protocols',
          'Compliance with international medical standards',
          'Continuous guidance from specialists'
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-5 bg-brand-violet/5 rounded-2xl border border-brand-violet/10">
            <ShieldCheck className="w-5 h-5 text-brand-green shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Why choose egg donation?</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          'Up to 70% success per transfer under optimal conditions',
          'Higher embryo quality using eggs from young donors',
          'Significant reduction in risks associated with ovarian age',
          'Ideal alternative after multiple failed attempts'
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-12">
        <h2 className="text-3xl font-serif text-brand-violet mb-4">Cancun as a fertility destination</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          We care for patients from Mexico, the United States, Canada, and beyond, positioning Cancun as a key destination in fertility and medical tourism.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {['Advanced technology', 'Personalized care', 'International expertise'].map((item) => (
            <div key={item} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-violet/5 border border-brand-violet/10">
              <Globe2 className="w-4 h-4 text-brand-green" />
              <span className="text-brand-violet font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-4">Building families, without limits</h2>
      <p className="text-slate-600 leading-relaxed mb-6">
        We believe in inclusive, modern, and human-centered reproductive medicine. Egg donation is an option for all types of families, offering a real opportunity to those who wish to experience parenthood.
      </p>

      <div className="bg-brand-violet text-white p-8 rounded-3xl">
        <h3 className="text-2xl font-serif mb-3">Take the next step</h3>
        <p className="text-white/85 mb-5 leading-relaxed">
          We are ready to guide you through this journey and help you discover if egg donation is the best option for you.
        </p>
        <Link
          href="/contact-ivf-doctors"
          className="inline-flex items-center justify-center px-7 py-3 bg-brand-green text-brand-violet rounded-full font-bold hover:bg-white transition-colors"
        >
          Schedule consultation
        </Link>
      </div>

    </InnerPageLayout>
  );
}

