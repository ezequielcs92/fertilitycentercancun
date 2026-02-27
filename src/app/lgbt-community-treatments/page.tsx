import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Users, Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Fertility for the LGBT+ Community"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'LGBT+ Community', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Love makes a family. We help you create it.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              At <strong>Advanced Fertility Center Cancún</strong> we celebrate diversity in all its forms. We know that the desire to become parents knows no borders or labels, which is why we have designed a safe, empathetic, and professional environment to support you every step of the way.
            </p>
            <p>
              We offer personalized and inclusive assisted reproduction solutions, backed by a multidisciplinary team that understands the importance of human warmth. Whether you are looking to form a same-sex family or are a single person, we have the medical protocols and legal support necessary to make your dream come true in the paradise of Cancún.
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
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/12/medico-de-fertilidad-en-Mexico-fertility-center-mexico-682x1024.jpg"
              alt="Happy couple"
              fill
              className="object-cover object-center m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Options for Female Couples</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-5 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-violet shadow-inner group-hover:scale-110 transition-transform shrink-0">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-brand-violet text-2xl leading-tight">ROPA Method</h3>
          </div>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            <strong>&ldquo;Shared motherhood&rdquo;</strong>. One woman provides the eggs (genetic mother) and the other carries the pregnancy (gestational mother).
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-5 group hover:border-brand-violet/20 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-violet shadow-inner group-hover:scale-110 transition-transform shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-brand-violet text-2xl leading-tight">Insemination / IVF</h3>
          </div>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Use of <strong>donor sperm</strong> (domestic or international) for artificial insemination or In Vitro Fertilization with the highest success rates.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Options for Male Couples</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-brand-violet mb-4 flex items-center gap-2">
              <Users className="w-10 h-10 text-brand-green" />
              IVF with Egg Donor + Surrogacy
            </h3>
            <p className="text-slate-600 mb-4">
              We combine the sperm of one or both fathers with eggs from a selected donor. The embryo is transferred to the uterus of a surrogate who will carry the pregnancy with all legal and medical care.
            </p>
            <ul className="text-lg text-slate-500 space-y-2">
              <li>• Rigorous egg donor selection.</li>
              <li>• Safe and transparent legal program in Mexico.</li>
              <li>• Possibility of PGT-A (genetic analysis).</li>
            </ul>
          </div>
          <div className="not-prose relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/12/Fertilizacion-In-vitro-con-estudio-genetico-y-seleccion-de-sexo-1.png"
              alt="IVF Process"
              fill
              className="object-contain p-4 m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Trans and Non-Binary Individuals</h2>
      <p className="text-slate-600 mb-6">
        We offer <strong>fertility preservation</strong> services (egg or sperm freezing) before starting hormonal therapies or gender-affirming surgeries, ensuring your possibility of forming a biological family in the future.
      </p>

    </InnerPageLayout>
  );
}
