import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Check, Heart, Stethoscope, AlertCircle, Clock, Dna } from 'lucide-react';
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
              <strong>Egg donation</strong> (IVF with donor eggs) represents a path full of hope for patients who, for various medical reasons, cannot use their own eggs. At our center, this program offers the highest success rates, providing a real opportunity to achieve the dream of motherhood.
            </p>
            <p>
              We have a rigorous donor selection process, ensuring physical health and genetic compatibility. The entire process is carried out under strict anonymity and legal safety standards in Mexico, giving you the peace of mind needed to focus on what matters most: the arrival of your future baby.
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
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Aplicacion-de-medicamentos.jpg"
              alt="Egg Donation Process"
              fill
              className="object-cover m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-8">How Does the Process Work?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">1</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Donor Stimulation</h4>
            <p className="text-slate-600 leading-relaxed">The donor undergoes ovarian stimulation treatment to obtain multiple high-quality mature eggs.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">2</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Recipient Preparation</h4>
            <p className="text-slate-600 leading-relaxed">Simultaneously, the recipient patient prepares her endometrium through medication to ensure the uterus is ready to receive the embryo.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-violet flex items-center justify-center shrink-0 font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">3</div>
          <div>
            <h4 className="text-xl font-bold text-brand-violet mb-3">Fertilization and Transfer</h4>
            <p className="text-slate-600 leading-relaxed">The eggs are fertilized in the laboratory (IVF/ICSI). The resulting embryos are transferred to the patient&apos;s uterus or can be vitrified for the future.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Advantages of Egg Donation</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          "High success rates (up to 70-80%).",
          "Independent of the patient's age.",
          "Rigorously selected donors.",
          "Anonymous and confidential process.",
          "Full pregnancy experience.",
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-center p-6 bg-brand-violet/5 rounded-2xl border border-brand-violet/10">
            <Check className="w-8 h-8 text-brand-green shrink-0" />
            <span className="font-bold text-lg text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Our Donors</h2>
      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <p className="mb-6 text-slate-700 leading-relaxed">
          At <strong>Advanced Fertility Center Cancún</strong>, we have our own egg bank and a strict donor selection process. All our candidates undergo thorough evaluations:
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {["Medical", "Genetic", "Psychological", "Legal"].map(tag => (
            <span key={tag} className="px-4 py-2 bg-white rounded-full text-base font-bold text-brand-violet shadow-sm border border-slate-100">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-base text-slate-500 italic">
          We guarantee that only the best candidates are part of our program.
        </p>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-12">Who Is It For?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {[
          { text: "Low Ovarian Reserve", icon: Stethoscope },
          { text: "IVF Failures", icon: AlertCircle },
          { text: "Early Menopause", icon: Clock },
          { text: "Genetic Risks", icon: Dna },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-6 group">
            <div className="w-20 h-20 rounded-3xl bg-brand-violet/5 flex items-center justify-center text-brand-violet group-hover:bg-brand-violet group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
              <item.icon className="w-10 h-10 stroke-[1.5]" />
            </div>
            <p className="text-xl font-bold text-brand-violet leading-tight">{item.text}</p>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}
