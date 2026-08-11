'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import {
  Stethoscope,
  ClipboardCheck,
  MessageSquare,
  Microscope,
  Heart,
  Calendar,
  Wallet,
  Video,
  Quote,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TestimonialModal } from '@/components/testimonials/TestimonialModal';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="bg-white pb-24 overflow-x-hidden">
      <PageHeader
        title="First Visit"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'First Visit', href: '#' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-brand-violet/5 to-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-violet mb-6 leading-tight">
                Your first step toward <span className="text-brand-green italic">Assisted Reproduction</span>
              </h1>
              <div className="space-y-4 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  If you have been trying to conceive for more than a year without success, <strong className="font-semibold text-brand-violet">it&apos;s time to see the fertility experts at Advanced Fertility Center Cancun.</strong>
                </p>
                <p>
                  Our team is made up of highly specialized physicians in assisted reproduction, trained in Mexico and Europe, committed to helping you fulfill your dream of becoming a parent.
                </p>
                <p>
                  The first step in addressing infertility is understanding its causes and factors. At our clinic, we guide you through this process with a comprehensive and personalized approach.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-md mx-auto lg:ml-auto"
            >
              <div className="absolute -inset-4 bg-brand-green/20 rounded-[3rem] -rotate-2 blur-2xl" />
              <img
                src="https://fertilitycentercancun.com/wp-content/uploads/2025/10/reproduccion-asistida-001-801x1024.jpg"
                alt="Assisted Reproduction"
                className="relative rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/5]"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What to expect */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-6">What Can You Expect from Your First Consultation?</h2>
            <p className="text-lg text-slate-600 font-light">
              We know that taking this step can generate uncertainty, but there is nothing to worry about. Your first consultation will be like any other medical visit, in a warm and trusting environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ClipboardCheck className="w-8 h-8" />,
                title: "Medical History",
                desc: "We will review your medical and reproductive history to better understand your situation."
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Specific Questions",
                desc: "Questions about your health, lifestyle, and family history for an accurate diagnosis."
              },
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Initial Studies",
                desc: "Hormonal tests, ultrasounds, or sperm analysis may be requested, depending on the case."
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Explanation of Causes",
                desc: "We will explain the possible causes of infertility and discuss treatment options."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-violet/10 group text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-violet mb-6 mx-auto shadow-sm group-hover:bg-brand-violet group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif text-brand-violet mb-4">{item.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="mt-20 rounded-[3rem] overflow-hidden shadow-2xl bg-brand-violet text-white">
            <div className="p-12 lg:p-20 flex flex-col items-center text-center max-w-4xl mx-auto">
              <h3 className="text-4xl font-serif mb-10 italic text-brand-green">How to Prepare</h3>
              <ul className="space-y-6 text-left inline-block">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-light text-xl">Bring your medical history and any previous fertility-related studies.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-light text-xl">Write down all your questions to make the most of your consultation.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-light text-xl">If attending as a couple, both should come; fertility is a joint process.</p>
                </li>
              </ul>
              <p className="mt-12 text-brand-green text-lg italic font-light">We are here to provide you with the best care and accompany you every step of the way.</p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Assessment and Diagnosis */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/3.-¿Como-prepararte-550x400-1.jpg"
                  alt="Preparation"
                  className="rounded-3xl shadow-lg w-full aspect-[4/3] object-cover"
                />
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/4.-Valoracion-y-diagnostico-550x400-1.jpg"
                  alt="Diagnosis"
                  className="rounded-3xl shadow-lg w-full aspect-[4/3] object-cover mt-12"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-6">Assessment and Diagnosis</h2>
              <p className="text-lg text-slate-600 font-light mb-8">
                After the first consultation, we follow a structured process to offer you the best fertility treatment for your specific case.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Studies and Diagnosis", text: "Hormonal analysis, ultrasounds, semen analysis, or other tests to determine the cause." },
                  { title: "Review and Planning", text: "The specialist will design a personalized treatment plan based on your results." },
                  { title: "Comprehensive Guidance", text: "Our team will provide information about the process, medications, and services." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-serif text-xl shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-brand-violet mb-2">{item.title}</h4>
                      <p className="text-slate-600 font-light leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Accompaniment and Process */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-6">Duration and Constant Support</h2>
              <div className="mb-10 p-6 bg-brand-green/5 rounded-2xl border-l-4 border-brand-green">
                <p className="text-brand-violet font-medium italic flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  Estimated time: Most treatments last between one and three months.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &ldquo;Our team will be available to answer any questions about your treatment.&rdquo;
                </div>
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &ldquo;If you are traveling from another country, we will advise you on transfers and accommodation.&rdquo;
                </div>
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &ldquo;You will receive detailed guidance if you choose to use donors.&rdquo;
                </div>
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &ldquo;Direct communication with the specialist at all times.&rdquo;
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn}>
              <div className="w-full lg:pl-12">
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/6.-Acompanamiento-550x400-1.jpg"
                  alt="Accompaniment"
                  className="rounded-[3rem] shadow-2xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Cost and Payment */}
      <section className="py-24 bg-brand-violet text-white rounded-[4rem] mx-4 mb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="relative max-w-lg mx-auto">
                <div className="absolute -inset-4 bg-brand-green/10 rounded-[3rem] rotate-2 blur-xl" />
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/8.-¿Cuanto-cuesta-550x400-1.jpg"
                  alt="Costs"
                  className="relative rounded-[3rem] shadow-2xl w-full"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn}>
              <span className="inline-block px-4 py-1 bg-brand-green/20 text-brand-green rounded-full text-sm font-bold tracking-wider mb-6">INVESTMENT</span>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">How Much Does a Treatment Cost?</h2>
              <p className="text-indigo-100 font-light text-lg mb-10 leading-relaxed">
                The cost varies depending on different factors, but we are committed to making it as accessible as possible.
              </p>

              <div className="grid gap-6">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, title: "Type of Treatment", desc: "Varies depending on the complexity of the case." },
                  { icon: <Wallet className="w-5 h-5" />, title: "Payment Options", desc: "Installment payments and flexible financing." },
                  { icon: <Heart className="w-5 h-5" />, title: "Special Discounts", desc: "Comprehensive packages and promotions." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-brand-green">{item.icon}</div>
                    <div>
                      <h4 className="font-serif text-xl mb-1">{item.title}</h4>
                      <p className="text-indigo-200 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Video Calls */}
      <section className="py-24">
        <Container>
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center text-brand-violet mb-8">
                  <Video className="w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Complimentary Video Calls</h2>
                <p className="text-slate-400 font-light text-lg mb-8 leading-relaxed">
                  For your convenience, we offer video calls for initial consultations and follow-up. Let us provide you with the best care from the very beginning, no matter where you are.
                </p>
                <button className="flex items-center gap-3 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-violet transition-colors">
                  Schedule a video call <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative max-w-lg mx-auto w-full">
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/11/AFCC_OCT_WEB-001.png"
                  alt="Video Call"
                  className="rounded-3xl shadow-xl border-4 border-white/10 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials snippet */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-brand-violet mb-4">What Our Patients Say</h2>
              <p className="text-slate-600 font-light italic">Stories of love and success</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm relative italic leading-relaxed text-slate-600 font-light">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-green/10" />
                <p className="relative z-10">
                  &ldquo;We never imagined we would be able to conceive, but the team at Advanced Fertility Center Cancun was incredible from day one. They gave us the support and confidence we needed.&rdquo;
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100 not-italic font-serif text-brand-violet">
                  Mónica and Ricardo
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm relative italic leading-relaxed text-slate-600 font-light">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-green/10" />
                <p className="relative z-10">
                  &ldquo;Thanks to the dedication and professionalism of the doctors and the entire team, we now have our baby at home. We are so grateful!&rdquo;
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100 not-italic font-serif text-brand-violet">
                  Laura and Juan
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <Container className="text-center max-w-3xl">
          <Heart className="w-16 h-16 text-brand-green mb-8 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-serif text-brand-violet mb-8">Ready to Start Your Story?</h2>
          <p className="text-xl text-slate-600 font-light mb-12 leading-relaxed">
            We are committed to accompanying you every step of this journey toward parenthood.
          </p>
          <button
            className="bg-brand-violet text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-green hover:text-brand-violet transition-all shadow-xl shadow-brand-violet/20"
          >
            Schedule your appointment today
          </button>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-brand-violet/5">
        <Container>
          <div className="bg-white rounded-[3rem] p-12 text-center max-w-4xl mx-auto border border-brand-violet/10 shadow-xl">
            <h2 className="text-3xl font-serif text-brand-violet mb-6 italic">Share Your Experience With Us!</h2>
            <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
              If you have been a patient at our clinic, tell us about your journey and what you valued most about our team&apos;s care and support. We know the path to building a family is not easy, but we are convinced that by sharing your success story, you can inspire other couples.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-violet transition-colors shadow-lg shadow-brand-green/20"
            >
              Share my story
            </button>
          </div>
        </Container>
      </section>

      <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
