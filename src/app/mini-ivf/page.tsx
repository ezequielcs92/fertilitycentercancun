import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Pill, Zap, TrendingDown, Target, ShieldCheck } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Mini IVF"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Mini IVF', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            A more natural, accessible, and less invasive option.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              <strong>Mini IVF</strong> is an optimized variant of traditional In Vitro Fertilization, designed for patients seeking a gentler, less demanding approach for their body. This protocol uses reduced medication doses to stimulate the ovaries in a controlled and physiological manner.
            </p>
            <p>
              Our philosophy centers on <strong>quality over quantity</strong>. By avoiding overstimulation, we obtain eggs with better reproductive potential, significantly reduce pharmaceutical costs, and minimize side effects, offering a much more comfortable and friendly experience without compromising your chances of success.
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
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/07/medicamentos-1024x824.jpg"
              alt="Mini IVF Medications"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Benefits of Mini IVF</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {[
          { icon: Pill, title: "Less Medication", desc: "Reduced hormonal doses." },
          { icon: TrendingDown, title: "Lower Cost", desc: "More affordable than IVF." },
          { icon: ShieldCheck, title: "Fewer Risks", desc: "Avoids hyperstimulation." },
          { icon: Zap, title: "Less Invasive", desc: "A friendlier process." },
          { icon: Target, title: "Quality vs Quantity", desc: "High-quality eggs." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col items-center justify-center text-center aspect-square group hover:border-brand-violet/20">
            <div className="p-4 bg-brand-violet/5 rounded-2xl text-brand-green mb-4 group-hover:scale-110 transition-transform">
              <item.icon className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-brand-violet text-lg leading-tight mb-2">{item.title}</h4>
            <p className="text-base text-slate-400 leading-tight">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Who Is It For?</h2>
      <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5">
        <ul className="space-y-4">
          {[
            "Women with low ovarian reserve who don't respond to high doses.",
            "Patients who wish to avoid high hormonal loads.",
            "Young women with a good fertility prognosis.",
            "Couples looking for a more affordable alternative.",
            "Patients at risk of Ovarian Hyperstimulation Syndrome (OHSS)."
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-center">
              <div className="w-2 h-2 bg-brand-violet rounded-full shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </InnerPageLayout>
  );
}
