import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Heart, Users, Star, Smile, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="ROPA Method"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'ROPA Method', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            A unique and special way to share motherhood.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              At <strong>Advanced Fertility Center Cancún</strong> we support and celebrate family diversity. The <strong>ROPA Method</strong> (Reception of Oocytes from Partner) is much more than a medical treatment; it is a deeply emotional experience designed for female couples who wish to actively participate in creating their family.
            </p>
            <p>
              This technique allows both partners to biologically share the process: one contributing the genetic heritage and the other carrying the life in her womb. It is a path of love and equality that strengthens the family bond from the very first moment, giving them the opportunity to live a shared motherhood in an environment of total respect and professional support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact-ivf-doctors"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="not-prose relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-%C2%BFEn-que-consiste-.jpg"
              alt="ROPA Method couple"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">What Does the ROPA Method Consist Of?</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
        <p className="text-slate-600 mb-6 leading-relaxed">
          This treatment allows both women to actively participate:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-brand-violet/5 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-violet">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-violet text-lg mb-2">Genetic Mother</h3>
            <p className="text-base text-slate-600">Provides her eggs, which are extracted and fertilized in the laboratory with donor sperm.</p>
          </div>
          <div className="bg-brand-green/20 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-green">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-violet text-lg mb-2">Gestational Mother</h3>
            <p className="text-base text-slate-600">Receives the embryo in her uterus to carry the pregnancy, birth, and breastfeeding.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Advantages of the ROPA Method</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {[
          { icon: Heart, label: "Shared biological motherhood" },
          { icon: Smile, label: "Strengthens the emotional bond" },
          { icon: Zap, label: "High success rate with IVF" },
          { icon: ShieldCheck, label: "Legally recognized process" },
          { icon: Users, label: "Inclusive and respectful" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-4 items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm aspect-square text-center group hover:border-brand-violet/20 hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-brand-violet/5 rounded-2xl flex items-center justify-center text-brand-violet group-hover:scale-110 transition-transform">
              <item.icon className="w-10 h-10" />
            </div>
            <span className="text-slate-700 font-bold text-lg leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Who Is It For?</h2>
      <div className="space-y-4">
        {[
          "Female couples who both want to be biological mothers.",
          "Women who want to provide eggs but cannot carry a pregnancy for medical reasons.",
          "Couples seeking an equal motherhood experience.",
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}
