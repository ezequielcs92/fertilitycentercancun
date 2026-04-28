
import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Heart, MessageCircle } from 'lucide-react';

export default function Page() {
  const steps = [
    {
      title: "Ovarian Stimulation",
      desc: "Medications are used to stimulate the ovarian follicles with the goal of obtaining the highest number of high-quality eggs.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Egg Retrieval",
      desc: "Eggs are retrieved through ultrasound-guided aspiration in our specialized operating room under light sedation.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Sperm Processing",
      desc: "The sperm is processed in the laboratory to select the spermatozoa with the best motility and morphology for fertilization.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Laboratory and Fertilization",
      desc: "The oocytes are fertilized in the laboratory (IVF or ICSI) and embryos are cultured under constant monitoring by our embryologists.",
      image: "/images/treatments/IVF.jpg"
    },
    {
      title: "Transfer or Vitrification",
      desc: "Embryos can be transferred to the uterus or vitrified (frozen) for storage and future transfer.",
      image: "/images/treatments/IVF.jpg"
    }
  ];

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="IVF – In Vitro Fertilization"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/fertility-treatments' },
          { label: 'IVF – In Vitro Fertilization', href: '#' }
        ]}
      />

      <Container className="pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl font-serif text-brand-violet mb-6">An advanced solution to overcome fertility problems, with high success rates.</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-8">
              <strong>In Vitro Fertilization (IVF)</strong> is an advanced assisted reproduction treatment to solve fertility problems. This process involves fertilizing an egg with sperm in the laboratory and transferring the embryo to the woman&apos;s uterus.
            </p>

            <div className="bg-brand-gray p-8 rounded-[2.5rem] border border-brand-violet/5 mb-8">
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                We use the <strong>latest embryology technology</strong> and a specialized laboratory to ensure the highest probability of success in each cycle.
              </p>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=5219983050373&text=I%20visited%20your%20website%20and%20would%20like%20to%20schedule%20my%20free%20video%20call."
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-3 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              Schedule your free video call
            </a>
          </div>

          <div className="not-prose relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="/images/treatments/RODOLFO.png"
              alt="IVF Treatment"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <h2 className="text-3xl font-serif text-brand-violet text-center mb-12">The Step-by-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:border-brand-violet/20 transition-all hover:shadow-xl">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-sm text-brand-violet flex items-center justify-center font-bold text-xl shadow-sm">
                  {i + 1}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-brand-violet mb-3">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-3xl font-serif text-brand-violet mb-8">Key Benefits</h2>
            <ul className="grid grid-cols-1 gap-4 list-none p-0 font-medium">
              {[
                "High success rates per cycle",
                "100% personalized treatment",
                "State-of-the-art technology",
                "Optional preimplantation genetic diagnosis",
                "Bilingual medical guidance",
                "ISO-7 certified laboratory"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-brand-gray p-5 rounded-2xl border border-brand-violet/5">
                  <div className="w-3 h-3 rounded-full bg-brand-green shrink-0" />
                  <span className="text-brand-violet text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-serif text-brand-violet mb-8">Who Are Candidates?</h2>
            <div className="bg-brand-violet rounded-[2.5rem] p-10 text-white shadow-xl h-full">
              <ul className="grid grid-cols-1 gap-y-6 list-none p-0">
                {[
                  "Women with blocked or damaged fallopian tubes",
                  "Couples with unexplained infertility",
                  "Cases of severe male infertility",
                  "Patients with low ovarian reserve or endometriosis",
                  "Previous failures in Artificial Insemination"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-brand-green shrink-0 fill-brand-green mt-1" />
                    <span className="text-lg font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


