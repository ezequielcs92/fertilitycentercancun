import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Globe, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const reasons = [
    'Help individuals and couples achieve their dream of building a family.',
    'Receive comprehensive medical evaluations at no cost.',
    'Be supported by fertility specialists at all times.',
    'Participate in a safe, ethical, and confidential process.'
  ];

  const requirements = [
    'Between 18 and 29 years old.',
    'Good physical and emotional health.',
    'Healthy lifestyle.',
    'No significant genetic conditions.'
  ];

  const steps = [
    {
      title: 'Initial Registration',
      desc: 'Complete your online application quickly and easily.'
    },
    {
      title: 'Medical Evaluation',
      desc: 'We conduct clinical, hormonal, and genetic testing.'
    },
    {
      title: 'Personalized Guidance',
      desc: 'Our team explains each step and answers all your questions.'
    },
    {
      title: 'Ovarian Stimulation',
      desc: 'A carefully monitored treatment led by fertility specialists.'
    },
    {
      title: 'Egg Retrieval',
      desc: 'A safe, outpatient procedure with a short recovery time.'
    }
  ];

  const formFields = [
    'Full Name',
    'Age',
    'Date of Birth',
    'Weight',
    'Height',
    'Nationality',
    'WhatsApp Number',
    'Email Address'
  ];

  return (
    <InnerPageLayout
      title="LifeStart Donation Program"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Treatments', href: '/fertility-treatments' },
        { label: 'LifeStart Donation Program', href: '#' }
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-16 px-4 md:px-0 not-prose">
        <div className="flex-1 order-2 lg:order-1">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Give life. Transform stories.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              At <strong>Advanced Fertility Center Cancun</strong>, we created <strong>LifeStart Donors</strong>, our egg donation program in Cancun, designed for young women who want to make a meaningful impact in the lives of others, supported by a specialized medical team in a safe and professional environment.
            </p>
            <p>
              Becoming a donor is not just a medical process: <strong>it means becoming the beginning of a story someone has been waiting for their entire life</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:donantes@afcc.com.mx?subject=LifeStart%20Donors%20Application"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Apply now
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/3 order-1 lg:order-2 not-prose">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 bg-slate-50 m-0">
            <Image
              src="/images/treatments/programa-donacion-lifestart-portada.jpg"
              alt="LifeStart Donation Program"
              fill
              className="object-cover m-0 p-0"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Why become an egg donor?</h2>
      <p className="text-slate-600 mb-6 leading-relaxed">
        At <strong>LifeStart Donors by Advanced Fertility Center Cancun</strong>, we understand the importance of your decision. That is why we ensure your experience is supportive, informed, and carefully guided every step of the way.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {reasons.map((item) => (
          <div key={item} className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Who can become a donor?</h2>
      <p className="text-slate-600 mb-5 leading-relaxed">
        We are looking for committed, healthy women who want to make a difference. You may apply if you meet the following criteria:
      </p>
      <ul className="space-y-3 mb-6">
        {requirements.map((item) => (
          <li key={item} className="flex gap-3 items-center p-3 bg-brand-violet/5 rounded-lg border border-transparent hover:border-brand-violet/20 transition-colors">
            <CheckCircle className="w-5 h-5 text-brand-violet shrink-0" />
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-slate-600 mb-12 leading-relaxed">
        At Advanced Fertility Center Cancun, we guide you step by step. No prior experience is needed.
      </p>

      <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 mb-12">
        <h2 className="text-3xl font-serif text-brand-violet mb-6">What is the process like?</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Our egg donation program is designed to be clear, safe, and fully supported at every stage:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <article key={step.title} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-brand-violet text-white font-bold flex items-center justify-center mb-3">
                {idx + 1}
              </div>
              <h3 className="text-base font-bold text-brand-violet mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <ShieldCheck className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Safety and Trust</h3>
          <p className="text-slate-600 text-base">
            At Advanced Fertility Center Cancun, your well-being is our priority. We offer board-certified fertility specialists and international medical protocols.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <Globe className="w-10 h-10 text-brand-green mb-4" />
          <h3 className="text-xl font-bold text-brand-violet mb-2">Advanced and Ethical Care</h3>
          <p className="text-slate-600 text-base">
            We provide advanced reproductive technology and ethical, confidential, and professional care throughout the process.
          </p>
        </div>
      </div>

      <div className="bg-brand-gray p-8 rounded-3xl mb-12 border border-brand-violet/5">
        <h2 className="text-3xl font-serif text-brand-violet mb-5">A decision with impact</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Becoming a donor is a personal decision that involves time, commitment, and generosity. As part of the program, support and benefits related to the process are provided, always within an ethical and transparent framework.
        </p>
        <h3 className="text-2xl font-serif text-brand-violet mb-3">Egg donation in Cancun</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          As part of Advanced Fertility Center Cancun, our program serves both national and international patients, positioning Cancun as a leading destination in fertility care and medical tourism.
        </p>
        <h3 className="text-2xl font-serif text-brand-violet mb-3">Be part of something greater</h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Every donation represents a new story, a new opportunity, and a new family. Today, you can be part of that beginning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Link
            href="mailto:donantes@afcc.com.mx?subject=LifeStart%20Donors%20Application"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
          >
            Apply now
          </Link>
          <p className="text-slate-600 text-sm sm:text-base">
            Application inbox: <a className="font-semibold text-brand-violet" href="mailto:donantes@afcc.com.mx">donantes@afcc.com.mx</a>
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-serif text-brand-violet mb-4">Application Form</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Please complete the following information:
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {formFields.map((field) => (
            <div key={field} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
              <span className="text-slate-700">{field}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-600">
          The submit button should send applications to <a className="font-semibold text-brand-violet" href="mailto:donantes@afcc.com.mx">donantes@afcc.com.mx</a>.
        </p>
      </div>

    </InnerPageLayout>
  );
}

