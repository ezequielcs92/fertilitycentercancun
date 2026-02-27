import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Snowflake, Clock, Shield, Baby } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Fertility Preservation"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Preservation', href: '#' }
      ]}
    >
      <div className="flex flex-col gap-12 mb-16">
        <div className="w-full">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            We protect your reproductive future so you can decide the best time.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              <strong>Fertility preservation</strong> is a powerful empowerment tool that allows you to take control of your biological clock. Through vitrification techniques (ultra-rapid freezing), we preserve eggs, sperm, or embryos in their optimal state of youth and vitality.
            </p>
            <p>
              Whether for professional, personal, or health reasons, this procedure gives you the peace of mind of knowing that the quality of your reproductive cells will be protected from the passage of time. At our center, we accompany you so that your desire to start a family comes true exactly when you decide, with the same safety and success rates as today.
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

        <div className="w-full">
          <div className="not-prose relative aspect-video md:aspect-[21/9] rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-50">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/08/Etapas-criopreservacion-01.jpg"
              alt="Cryopreservation Stages"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6 text-center">Available Techniques</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16 not-prose">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div className="relative aspect-[5/4] overflow-hidden bg-slate-50 m-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Medicamentos.jpg"
              alt="Egg Vitrification"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 m-0 p-0"
              unoptimized
            />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-violet mb-4">Egg Vitrification</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              Ideal for women who wish to postpone pregnancy. A gentle ovarian stimulation is performed to extract eggs and freeze them at -196°C, maintaining their quality intact.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div className="relative aspect-[5/4] overflow-hidden bg-slate-50 m-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/07/Criopreservacion-masculina-894x1024.jpg"
              alt="Sperm Cryopreservation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 m-0 p-0"
              unoptimized
            />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-violet mb-4">Sperm Cryopreservation</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              A simple and effective procedure that does not require prior medication. Highly recommended before oncological medical treatments or vasectomies.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Who Is This Treatment For?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {[
          { icon: Clock, title: "Postpone Motherhood", desc: "Decide to become a mother when you are personally or professionally ready." },
          { icon: Shield, title: "Medical Treatments", desc: "Preventive preservation before chemotherapy or radiation therapy." },
          { icon: Baby, title: "Reproductive Age", desc: "Women who wish to secure good-quality eggs before age 35." },
          { icon: Snowflake, title: "Gender Transition", desc: "Fertility preservation before starting hormonal therapy." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all flex items-center text-left gap-5 group hover:border-brand-violet/20">
            <div className="w-14 h-14 shrink-0 bg-brand-violet/5 rounded-2xl flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
              <item.icon className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-bold text-brand-violet text-lg leading-tight mb-2">{item.title}</h4>
              <p className="text-base text-slate-500 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Why Choose Us?</h2>
      <p className="text-slate-600 mb-6">
        At <strong>Advanced Fertility Center Cancún</strong> we have a high-complexity laboratory and cutting-edge technology to guarantee the highest survival rates after thawing.
      </p>

    </InnerPageLayout>
  );
}
