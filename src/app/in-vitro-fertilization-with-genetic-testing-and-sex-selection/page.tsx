import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Activity, Baby, CheckCircle2, MessageCircle, Microscope, Sparkles } from 'lucide-react';

export default function Page() {
  const steps = [
    {
      title: 'Ovarian Stimulation',
      desc: 'Medication is used to stimulate ovarian follicles in order to obtain the highest possible number of high-quality eggs.',
      image: 'https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Medicamentos.jpg'
    },
    {
      title: 'Egg Retrieval',
      desc: 'Eggs are collected through ultrasound-guided aspiration in our specialized operating room under light sedation.',
      image: 'https://fertilitycentercancun.com/wp-content/uploads/2025/10/WEB-2.-Quirofano001.jpg'
    },
    {
      title: 'Sperm Preparation',
      desc: 'Sperm is processed in the lab to select the best motility and morphology before fertilization.',
      image: 'https://fertilitycentercancun.com/wp-content/uploads/2025/10/esperma-se-capacita-003.jpg'
    },
    {
      title: 'Fertilization (IVF/ICSI)',
      desc: 'Oocytes are fertilized in the laboratory using conventional IVF or Intracytoplasmic Sperm Injection (ICSI).',
      image: 'https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-2.-Inyeccion.jpg'
    },
    {
      title: 'Blastocyst Biopsy',
      desc: 'A biopsy from the embryo outer layer (day 5-6) is analyzed to assess chromosomal status without compromising viability.',
      image: 'https://fertilitycentercancun.com/wp-content/uploads/2025/10/biopsia-001.jpg'
    },
    {
      title: 'Vitrification and PGT',
      desc: 'Embryos are vitrified while genetic results are processed to plan a safer, more effective transfer.',
      image: 'https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-5.-Se-congelan.jpg'
    }
  ];

  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="IVF with Genetic Testing and Sex Selection"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IVF + PGT-A', href: '#' }
        ]}
      />

      <Container className="pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <h2 className="text-4xl font-serif text-brand-violet mb-6">Greater Precision, Better Results</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-6">
              The combination of <strong>In Vitro Fertilization (IVF)</strong> with <strong>Preimplantation Genetic Testing for Aneuploidy (PGT-A)</strong> helps identify chromosomally normal embryos before transfer.
            </p>
            <div className="bg-brand-gray p-8 rounded-[2.5rem] border border-brand-violet/5 mb-8">
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                This test can determine embryo sex and detect chromosomal conditions such as <strong>Down</strong>, <strong>Patau</strong>, <strong>Edwards</strong> and <strong>Klinefelter</strong> syndromes.
              </p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=5219983050373&text=I%20visited%20your%20website%20and%20would%20like%20to%20schedule%20my%20free%20video%20call."
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-3 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              Book your free video call
            </a>
          </div>

          <div className="not-prose relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 border border-slate-100">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/10/biopsia-001.jpg"
              alt="Genetic embryo biopsy in IVF laboratory"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="not-prose relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl mb-24 bg-slate-100">
          <Image
            src="https://fertilitycentercancun.com/wp-content/uploads/2025/06/Etapas-del-FIV-2-ENG.jpg"
            alt="IVF with PGT-A process timeline"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <h2 className="text-3xl font-serif text-brand-violet text-center mb-12">Step-by-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:border-brand-violet/20 transition-all hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center font-bold text-brand-violet shadow-sm">
                  {i + 1}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-brand-violet mb-3">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-brand-violet rounded-[3rem] p-10 text-white shadow-xl">
            <h3 className="text-3xl font-serif mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-brand-green" />
              Benefits of PGT-A
            </h3>
            <ul className="space-y-4 list-none p-0">
              {[
                'Higher pregnancy rates per transfer',
                'Lower miscarriage risk',
                'Fewer IVF cycles needed',
                'Supports single embryo transfer (lower multiple pregnancy risk)',
                'Chromosomal screening and optional sex selection'
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" />
                  <span className="text-lg font-light opacity-90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-gray rounded-[3rem] p-10 shadow-inner border border-brand-violet/5">
            <h3 className="text-3xl font-serif text-brand-violet mb-8 flex items-center gap-3">
              <Activity className="w-8 h-8 text-brand-violet" />
              Who is it recommended for?
            </h3>
            <ul className="space-y-4 list-none p-0">
              {[
                'Women over 35 years old',
                'History of recurrent miscarriage',
                'Previous IVF failures',
                'Family history of genetic disorders',
                'Patients who want to avoid chromosomally abnormal transfers'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-2.5 shrink-0" />
                  <span className="text-lg text-slate-700 font-light leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-brand-violet p-12 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Microscope className="w-32 h-32 text-brand-violet" />
          </div>
          <h2 className="text-3xl font-serif text-brand-violet mb-6 relative z-10">Experts in reproductive genetics</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-light relative z-10">
            Our embryology and genetics team uses advanced technology to improve your chances of a healthy pregnancy.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5219983050373&text=I%20visited%20your%20website%20and%20would%20like%20to%20schedule%20my%20free%20video%20call."
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-3 bg-brand-violet text-white px-10 py-5 rounded-full font-bold hover:bg-brand-violet/90 transition-all hover:scale-105 shadow-xl"
          >
            <Baby className="w-6 h-6" />
            Contact a specialist
          </a>
        </div>
      </Container>
    </main>
  );
}
