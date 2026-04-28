import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Calendar, CheckCircle, Activity, Star } from 'lucide-react';

export default function Page() {
  return (
    <InnerPageLayout
      title="Embryo Transfer"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'Embryo Transfer', href: '#' }
      ]}
    >
      <p className="lead text-2xl font-serif text-brand-violet italic mb-8">
        The most anticipated moment: the meeting between your baby and you.
      </p>
      <p className="text-lg text-slate-600 font-light mb-8">
        <strong>Embryo transfer</strong> is the culminating stage of In Vitro Fertilization (IVF). It involves carefully depositing the embryos (usually at the blastocyst stage, day 5) inside the maternal uterus. It is a painless, quick, and emotionally charged procedure, performed under ultrasound guidance to ensure maximum precision.
      </p>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
        <Image
          src="/images/treatments/IVF.jpg"
          alt="Embryo transfer"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Endometrial Preparation</h2>
      <div className="bg-brand-gray p-8 rounded-3xl border border-brand-violet/5 mb-12">
        <p className="text-slate-700 mb-6">
          For the embryo to implant, the &ldquo;nest&rdquo; (endometrium) must be in optimal condition. We personalize this process according to your body:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-6 h-6 text-brand-green" />
              <h3 className="font-bold text-brand-violet text-lg">Natural Cycle</h3>
            </div>
            <p className="text-base text-slate-600">
              We take advantage of your natural ovulatory cycle. Ideal for women with regular periods. Less medication and monitoring of the natural endometrial development.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-brand-green" />
              <h3 className="font-bold text-brand-violet text-lg">Substituted Cycle</h3>
            </div>
            <p className="text-base text-slate-600">
              We use hormones (estrogens and progesterone) to prepare the uterus in a controlled manner. Ideal for women with irregular cycles or for greater scheduling flexibility.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">What Happens Afterwards?</h2>
      <div className="space-y-4">
        {[
          "Relative rest for 20-30 minutes at the clinic after the procedure.",
          "You can resume your normal daily activities (avoiding intense physical exertion).",
          "Continuation of hormonal support (progesterone) as prescribed by the doctor.",
          "The pregnancy test (beta-hCG) is performed 10-12 days later."
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-center">
            <CheckCircle className="w-5 h-5 text-brand-violet shrink-0" />
            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>

    </InnerPageLayout>
  );
}

