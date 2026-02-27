import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Globe, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Sperm Donation"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Sperm Donation', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-16 px-4 md:px-0 not-prose">
        <div className="flex-1 order-2 lg:order-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            A safe, accessible, and reliable alternative to start a family.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              <strong>Sperm donation</strong> is a cutting-edge assisted reproduction technique that uses samples from carefully selected and anonymous donors. This option is essential for making the dream of starting a family possible for single women, same-sex couples, and heterosexual couples with severe male factor infertility.
            </p>
            <p>
              At our center, we work exclusively with the most reputable international sperm banks, guaranteeing samples with optimal genetic quality and rigorous health controls. We accompany you at every step of the process, from donor selection to treatment completion, under the strictest standards of ethics and confidentiality.
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

        <div className="w-full lg:w-1/3 order-1 lg:order-2 not-prose">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 bg-slate-50 m-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/10/WEB-2.-Traslados-internacionales-002.jpg"
              alt="Sperm donation and international logistics"
              fill
              className="object-cover m-0 p-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">International Sperm Bank</h2>
      <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 mb-16">
        <p className="text-slate-700 mb-10 font-light text-lg text-center max-w-3xl mx-auto">
          We have partnerships with the most prestigious cryopreservation laboratories in the world. This allows us to offer you a diverse catalog where you can select donors based on various criteria.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {["Ethnic Group", "Physical Characteristics", "Education Level", "Medical History"].map(tag => (
            <div key={tag} className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 text-center text-lg font-bold text-brand-violet hover:shadow-md transition-shadow">
              {tag}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-12 items-center justify-center">
          <div className="h-24 transition-all hover:scale-110 flex items-center">
            <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-xytex.png" alt="Xytex" width={240} height={80} className="h-full w-auto object-contain" unoptimized />
          </div>
          <div className="h-24 transition-all hover:scale-110 flex items-center">
            <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-european.png" alt="European Sperm Bank" width={240} height={80} className="h-full w-auto object-contain" unoptimized />
          </div>
          <div className="h-24 transition-all hover:scale-110 flex items-center">
            <Image src="https://fertilitycentercancun.com/wp-content/uploads/2025/05/logo-cryos.png" alt="Cryos International" width={200} height={70} className="h-full w-auto object-contain" unoptimized />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <Globe className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">International Logistics</h3>
          <p className="text-slate-600 text-base">
            We fully manage the import of samples while complying with all of Mexico&apos;s health and customs regulations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <ShieldCheck className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Guaranteed Safety</h3>
          <p className="text-slate-600 text-base">
            All donors undergo rigorous medical, genetic, and psychological screenings before being accepted into the program.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Who Is It For?</h2>
      <ul className="space-y-4">
        {[
          "Single women who wish to become mothers (Solo Motherhood).",
          "Female couples (lesbian motherhood).",
          "Couples with severe male infertility (azoospermia, genetic alterations).",
          "Risk of transmitting hereditary diseases from the father."
        ].map((item, i) => (
          <li key={i} className="flex gap-3 items-center p-3 bg-brand-violet/5 rounded-lg border border-transparent hover:border-brand-violet/20 transition-colors">
            <CheckCircle className="w-5 h-5 text-brand-violet shrink-0" />
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>

    </InnerPageLayout>
  );
}
