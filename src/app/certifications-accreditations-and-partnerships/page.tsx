'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Handshake, Globe, CheckCircle2, Heart } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const certifications = [
  {
    title: 'PACAL – Analytical Excellence',
    desc: 'Quality certification granted by the Quality Assurance Program for Clinical Laboratories in Mexico.',
    image: '/images/wp/2025_10_hand-shake.png',
    areas: ['Clinical Chemistry', 'Immunology-Endocrinology', 'Hematology Cytometry']
  },
  {
    title: 'FDA Compliance',
    desc: 'Aligned with strict U.S. Food and Drug Administration regulations for handling and transport of reproductive tissues.',
    icon: <ShieldCheck className="w-12 h-12" />,
    badges: ['USA Standard', 'Cross-border']
  },
  {
    title: 'Canadian Health Council',
    desc: 'Accredited in a second evaluation cycle, ensuring standards equivalent to top North American clinics.',
    image: '/images/wp/2025_09_CEHC01.jpg',
    status: '2nd Accreditation Cycle'
  },
  {
    title: 'ESHRE Membership',
    desc: 'Members of the European Society of Human Reproduction and Embryology with science-based protocols.',
    image: '/images/wp/2025_09_eshre01.jpg'
  },
  {
    title: 'REDLARA Golden Seal',
    desc: 'Top distinction from the Latin American Network of Assisted Reproduction for quality and ethics.',
    image: '/images/wp/2025_09_redlara02.jpg'
  },
  {
    title: 'SECTUR Health Distinction',
    desc: 'Recognition from Mexico’s Ministry of Tourism for strict hygiene and safety protocols in medical tourism.',
    icon: <Award className="w-12 h-12" />
  }
];

const alliances = [
  {
    title: 'Igenomix',
    subtitle: 'Advanced Reproductive Genetics',
    desc: 'Leading collaboration for preimplantation genetic testing (PGT-A) to improve transfer success rates.',
    image: '/images/wp/2025_10_igenomix001.png'
  },
  {
    title: 'Cryotec',
    subtitle: 'Vitrification Technology',
    desc: 'Japanese ultra-fast vitrification technology with high survival rates for eggs and embryos.',
    image: '/images/wp/2025_09_cryotec-01.jpg'
  },
  {
    title: 'Fairfax Cryobank & Xytex',
    subtitle: 'International Banks',
    desc: 'Alliances with globally recognized gamete banks focused on diversity, ethics, and compliance.',
    image: '/images/wp/2025_05_logo-fairfax.png'
  },
  {
    title: 'Ferticare',
    subtitle: 'Emotional Support',
    desc: 'Specialized psychological support to protect emotional well-being during every treatment stage.',
    image: '/images/wp/2025_09_ferticare01.jpg'
  }
];

export default function Page() {
  return (
    <main className="bg-white pb-24 overflow-x-hidden">
      <PageHeader
        title="Certifications and Partnerships"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Certifications and Partnerships', href: '#' }
        ]}
      />

      <section className="pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-violet mb-8 leading-tight">
              Committed to <span className="text-brand-green italic">Global Medical Excellence</span>
            </h1>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              At Advanced Fertility Center Cancun, every certification and strategic alliance reflects our commitment to safety, ethics, and world-class quality standards.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
            <div className="max-w-2xl">
              <span className="text-brand-green font-bold tracking-widest text-sm uppercase mb-4 block">CERTIFIED QUALITY</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-violet">Accreditations and Memberships</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:border-brand-violet/10 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="h-48 mb-6 relative rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="text-brand-violet opacity-60">{item.icon}</div>
                  )}
                  {item.status && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-brand-green text-brand-violet text-[10px] font-bold rounded-full">
                      {item.status}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-serif text-brand-violet mb-4">{item.title}</h3>
                <p className="text-slate-500 font-light flex-grow leading-relaxed mb-6">{item.desc}</p>

                {item.areas && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                    {item.areas.map((area, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 bg-brand-violet/5 text-brand-violet rounded-md font-medium">{area}</span>
                    ))}
                  </div>
                )}

                {item.badges && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                    {item.badges.map((badge, i) => (
                      <span key={i} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-brand-green/10 text-brand-violet rounded-md font-bold uppercase tracking-tighter">
                        <CheckCircle2 className="w-3 h-3 text-brand-green" /> {badge}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-slate-50">
        <Container>
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <Handshake className="w-12 h-12 text-brand-green mb-6 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-serif text-brand-violet mb-6 italic">Partnerships that improve outcomes</h2>
            <p className="text-lg text-slate-600 font-light">
              Our strategic network allows us to integrate cutting-edge technology and international support into every treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {alliances.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                className="bg-white rounded-[3rem] p-10 flex flex-col md:flex-row gap-8 items-center border border-transparent hover:border-brand-violet/10 hover:shadow-xl transition-all"
              >
                <div className="w-full md:w-2/5 shrink-0 rounded-2xl overflow-hidden aspect-square bg-slate-50 flex items-center justify-center p-6">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-brand-green font-bold text-xs tracking-widest uppercase mb-2 block">{item.subtitle}</span>
                  <h3 className="text-2xl font-serif text-brand-violet mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-light leading-relaxed italic">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-violet/5 -z-10" />
        <Container>
          <div className="max-w-5xl mx-auto bg-brand-violet rounded-[4rem] p-12 lg:p-24 text-white text-center relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <Globe className="w-16 h-16 text-brand-green mb-8 mx-auto animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Quality without borders</h2>
            <p className="text-xl text-indigo-100 font-light max-w-3xl mx-auto mb-12">
              Whether you are in Mexico, the United States, or Canada, our certified structure helps ensure a safe and seamless fertility journey.
            </p>

            <div className="grid sm:grid-cols-3 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-serif text-brand-green text-3xl mb-2 italic">100%</h4>
                <p className="text-sm text-indigo-200">Ethical Compliance</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-serif text-brand-green text-3xl mb-2 italic">Global</h4>
                <p className="text-sm text-indigo-200">Safety Protocols</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-serif text-brand-green text-3xl mb-2 italic">Leaders</h4>
                <p className="text-sm text-indigo-200">Assisted Reproduction</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="text-center">
          <Heart className="w-12 h-12 text-brand-green mb-6 mx-auto" />
          <h3 className="text-2xl font-serif text-brand-violet italic mb-4">Your well-being is our strongest credential.</h3>
          <p className="text-slate-500 font-light italic leading-relaxed max-w-2xl mx-auto">
            We renew our standards year after year to offer you the best of science and compassionate care.
          </p>
        </Container>
      </section>
    </main>
  );
}
