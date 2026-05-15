import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, HeartHandshake } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Embryo Donation and Adoption"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Embryo Adoption', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
        <div className="flex-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            A gift of life that transforms families forever.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              <strong>Embryo adoption</strong> is a hopeful and generous opportunity for those facing difficulties conceiving with their own gametes. It involves receiving embryos donated by other couples who, after successfully completing their family, decide to share them altruistically.
            </p>
            <p>
              This path is one of the noblest acts in reproductive medicine. It allows future parents to experience the full journey of pregnancy and birth, using embryos of proven quality. It is a simplified procedure that offers excellent success rates and a deep emotional connection with the life that begins.
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
          <div className="not-prose relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 p-4">
            <Image
              src="/images/treatments/donacion-adopcion-embriones-portada.png"
              alt="Endometrial preparation process"
              fill
              className="object-contain m-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-brand-gray p-8 rounded-3xl col-span-2">
          <h2 className="text-2xl font-serif text-brand-violet mb-4">How Does the Process Work?</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            It is a simpler procedure than a full IVF cycle. Patients select an embryo from our donation program. The future mother undergoes <strong>endometrial preparation</strong> (mild hormonal treatment) to condition her uterus, and then the embryo transfer is performed, similar to a Pap smear procedure.
          </p>
        </div>
        <div className="not-prose bg-brand-violet text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg border border-brand-violet">
          <HeartHandshake className="w-16 h-16 mb-4 text-brand-green" />
          <p className="font-serif text-xl leading-relaxed text-white">&ldquo;A gift of life that transforms two families forever&rdquo;</p>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Benefits of Adoption</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: "High Probability", desc: "Proven-quality embryos are used, which increases success rates." },
          { title: "Less Complexity", desc: "Does not require ovarian stimulation or follicular puncture for the recipient mother." },
          { title: "Second Chance", desc: "Allows cryopreserved embryos to fulfill their purpose of giving life." },
          { title: "Accessibility", desc: "It is usually more affordable than a full IVF cycle with egg donation." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center shrink-0 text-brand-violet group-hover:scale-110 transition-transform">
              <Gift className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-bold text-brand-violet text-lg mb-2">{item.title}</h4>
              <p className="text-base text-slate-600 leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}

