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
        title="Primera Visita"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Primera visita', href: '#' }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-brand-violet/5 to-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-violet mb-6 leading-tight">
                Tu primer paso hacia la <span className="text-brand-green italic">Reproducción Asistida</span>
              </h1>
              <div className="space-y-4 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  Si has estado intentando concebir durante más de un año sin éxito, <strong className="font-semibold text-brand-violet">es momento de acudir con los expertos en fertilidad de Advanced Fertility Center Cancun.</strong>
                </p>
                <p>
                  Nuestro equipo está conformado por médicos altamente especializados en reproducción asistida, con formación en México y Europa, comprometidos en ayudarte a cumplir tu sueño de ser padre o madre.
                </p>
                <p>
                  El primer paso para abordar la infertilidad es comprender sus causas y factores. En nuestra clínica, te acompañamos en este proceso con un enfoque integral y personalizado.
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
                alt="Reproducción Asistida"
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
            <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-6">¿Qué puedes esperar de tu primera consulta?</h2>
            <p className="text-lg text-slate-600 font-light">
              Sabemos que dar este paso puede generar incertidumbre, pero no hay de qué preocuparse. Tu primera consulta será como cualquier otra visita médica, en un ambiente cálido y de confianza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ClipboardCheck className="w-8 h-8" />,
                title: "Historial Médico",
                desc: "Revisará tu historial médico y reproductivo para comprender mejor tu situación."
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Preguntas Específicas",
                desc: "Consultas sobre tu salud, estilo de vida y antecedentes familiares para un diagnóstico preciso."
              },
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Estudios Iniciales",
                desc: "Podría solicitar análisis hormonales, ultrasonidos o espermogramas, según el caso."
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Explicación de Causas",
                desc: "Explicará las posibles causas de infertilidad y discutirá las opciones de tratamiento."
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
              <h3 className="text-4xl font-serif mb-10 italic text-brand-green">Cómo prepararte</h3>
              <ul className="space-y-6 text-left inline-block">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-light text-xl">Trae tu historial médico y cualquier estudio previo relacionado con fertilidad.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-light text-xl">Anota todas tus dudas para aprovechar al máximo la consulta.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-light text-xl">Si acudes en pareja, ambos deben asistir; la fertilidad es un proceso en conjunto.</p>
                </li>
              </ul>
              <p className="mt-12 text-brand-green text-lg italic font-light">Estamos aquí para brindarte la mejor atención y acompañarte en cada paso. 💙</p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Valoración y Diagnóstico */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/3.-¿Como-prepararte-550x400-1.jpg"
                  alt="Preparación"
                  className="rounded-3xl shadow-lg w-full aspect-[4/3] object-cover"
                />
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/4.-Valoracion-y-diagnostico-550x400-1.jpg"
                  alt="Diagnóstico"
                  className="rounded-3xl shadow-lg w-full aspect-[4/3] object-cover mt-12"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-6">Valoración y Diagnóstico</h2>
              <p className="text-lg text-slate-600 font-light mb-8">
                Después de la primera consulta, seguimos un proceso estructurado para ofrecerte el mejor tratamiento de fertilidad según tu caso específico.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Estudios y Diagnóstico", text: "Análisis hormonales, ultrasonidos, seminogramas u otras pruebas para determinar la causa." },
                  { title: "Revisión y Planificación", text: "El especialista diseñará un plan de tratamiento personalizado con base en tus resultados." },
                  { title: "Asesoría Integral", text: "Nuestro equipo comercial te proporcionará información sobre el proceso, medicamentos y servicios." }
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
              <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-6">Duración y Acompañamiento constante</h2>
              <div className="mb-10 p-6 bg-brand-green/5 rounded-2xl border-l-4 border-brand-green">
                <p className="text-brand-violet font-medium italic flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  Tiempo estimado: La mayoría de los tratamientos duran entre uno y tres meses.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &quot;Nuestro equipo estará disponible para resolver cualquier duda sobre el tratamiento.&quot;
                </div>
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &quot;Si viajas desde otro país, te asesoraremos sobre traslados y alojamiento.&quot;
                </div>
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &quot;Recibirás orientación detallada en caso de optar por elección de donantes.&quot;
                </div>
                <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 italic font-light text-slate-600 leading-relaxed">
                  &quot;Comunicación directa con el especialista en todo momento.&quot;
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn}>
              <div className="w-full lg:pl-12">
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/6.-Acompanamiento-550x400-1.jpg"
                  alt="Acompañamiento"
                  className="rounded-[3rem] shadow-2xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Costo and Payment */}
      <section className="py-24 bg-brand-violet text-white rounded-[4rem] mx-4 mb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="relative max-w-lg mx-auto">
                <div className="absolute -inset-4 bg-brand-green/10 rounded-[3rem] rotate-2 blur-xl" />
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/07/8.-¿Cuanto-cuesta-550x400-1.jpg"
                  alt="Costos"
                  className="relative rounded-[3rem] shadow-2xl w-full"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn}>
              <span className="inline-block px-4 py-1 bg-brand-green/20 text-brand-green rounded-full text-sm font-bold tracking-wider mb-6">INVERSIÓN</span>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">¿Cuánto cuesta un tratamiento?</h2>
              <p className="text-indigo-100 font-light text-lg mb-10 leading-relaxed">
                El costo varía según diferentes factores, pero estamos comprometidos a que sea lo más accesible posible.
              </p>

              <div className="grid gap-6">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, title: "Tipo de tratamiento", desc: "Varía según la complejidad del caso." },
                  { icon: <Wallet className="w-5 h-5" />, title: "Opciones de Pago", desc: "Pagos fraccionados y financiamiento flexible." },
                  { icon: <Heart className="w-5 h-5" />, title: "Descuentos Especiales", desc: "Paquetes integrales y promociones." }
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
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Videollamadas de Cortesía</h2>
                <p className="text-slate-400 font-light text-lg mb-8 leading-relaxed">
                  Para tu comodidad, ofrecemos videollamadas para consultas iniciales y seguimiento. Permítenos brindarte la mejor atención desde el inicio, sin importar dónde te encuentres.
                </p>
                <button className="flex items-center gap-3 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-violet transition-colors">
                  Agendar videollamada <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative max-w-lg mx-auto w-full">
                <img
                  src="https://fertilitycentercancun.com/wp-content/uploads/2025/11/AFCC_OCT_WEB-001.png"
                  alt="Videollamada"
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
              <h2 className="text-3xl font-serif text-brand-violet mb-4">Lo que dicen nuestros pacientes</h2>
              <p className="text-slate-600 font-light italic">Historias de amor y éxito</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm relative italic leading-relaxed text-slate-600 font-light italic">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-green/10" />
                <p className="relative z-10">
                  &quot;Nunca imaginamos que lograríamos concebir, pero el equipo de Advanced Fertility Center Cancun fue increíble desde el primer día. Nos dieron el apoyo y la confianza que necesitábamos.&quot;
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100 not-italic font-serif text-brand-violet">
                  Mónica y Ricardo
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm relative italic leading-relaxed text-slate-600 font-light italic">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-green/10" />
                <p className="relative z-10">
                  &quot;Gracias a la dedicación y profesionalismo de los médicos y todo el equipo, ahora tenemos a nuestro bebé en casa. ¡Estamos muy agradecidos!&quot;
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100 not-italic font-serif text-brand-violet">
                  Laura y Juan
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
          <h2 className="text-3xl md:text-5xl font-serif text-brand-violet mb-8">¿Listo/a para comenzar tu historia?</h2>
          <p className="text-xl text-slate-600 font-light mb-12 leading-relaxed">
            Estamos comprometidos a acompañarte en cada paso de este camino hacia la maternidad o paternidad.
          </p>
          <button
            className="bg-brand-violet text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-green hover:text-brand-violet transition-all shadow-xl shadow-brand-violet/20"
          >
            Agenda tu cita hoy
          </button>
        </Container>
      </section>

      {/* Testimonial Section in Primera Visita */}
      <section className="py-24 bg-brand-violet/5">
        <Container>
          <div className="bg-white rounded-[3rem] p-12 text-center max-w-4xl mx-auto border border-brand-violet/10 shadow-xl">
            <h2 className="text-3xl font-serif text-brand-violet mb-6 italic">¡Comparte tu experiencia con nosotros!</h2>
            <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
              Si has sido paciente en nuestra clínica, cuéntanos cómo fue tu viaje y lo que más valoraste del trato y apoyo de nuestro equipo. Sabemos que el camino para formar una familia no ha sido fácil, pero estamos convencidos de que al compartir tu historia de éxito, podrás inspirar a otras parejas.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-violet transition-colors shadow-lg shadow-brand-green/20"
            >
              Compartir mi historia
            </button>
          </div>
        </Container>
      </section>

      <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
