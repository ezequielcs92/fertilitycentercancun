import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, ExternalLink, Globe, Instagram, Facebook, Youtube, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import SitePhoneLink, { SitePhoneText } from '@/components/ui/SitePhoneLink';

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader
        title={isEs ? 'Contacto' : 'Contact'}
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: isEs ? 'Contacto' : 'Contact', href: '#' }
        ]}
      />

      <Container className="py-20">
        {/* Sección: Texto + Formulario */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-16">
            <section>
              <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-base">{isEs ? 'Atención Personalizada' : 'Personalized Care'}</span>
              <h2 className="text-5xl font-serif text-brand-violet mt-4 mb-8 leading-tight">
                {isEs ? 'Estamos aquí para ' : 'We are here to '}
                <span className="text-brand-green italic underline decoration-brand-green/30">{isEs ? 'ayudarte' : 'help you'}</span>
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                {isEs
                  ? '¿Tienes dudas sobre tu proceso de fertilidad? Nuestro equipo de expertos está listo para acompañarte en cada paso hacia tu sueño de ser mamá.'
                  : 'Do you have questions about your fertility process? Our expert team is ready to support you at every step toward your dream of becoming a mother.'}
              </p>
            </section>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
              <ContactMethod
                icon={<Phone className="w-6 h-6 text-brand-violet" />}
                title={isEs ? 'Llámanos' : 'Call us'}
                lines={[
                  { label: isEs ? 'México:' : 'Mexico:', cell: <SitePhoneLink className="text-base text-slate-600 hover:text-brand-violet transition-colors font-medium"><SitePhoneText /></SitePhoneLink> },
                  { label: 'USA/CAN:', value: '+1 310 272 94 88', href: 'tel:+13102729488' }
                ]}
              />
              <ContactMethod
                icon={<Mail className="w-6 h-6 text-brand-violet" />}
                title={isEs ? 'Escríbenos' : 'Write to us'}
                lines={[
                  { value: 'info@fertilitycentercancun.com.mx', href: 'mailto:info@fertilitycentercancun.com.mx' }
                ]}
              />
              <ContactMethod
                icon={<MapPin className="w-6 h-6 text-brand-violet" />}
                title={isEs ? 'Visítanos' : 'Visit us'}
                lines={[
                  { value: isEs ? 'Cancún, Quintana Roo, México' : 'Cancun, Quintana Roo, Mexico' }
                ]}
              />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-violet/5 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-brand-violet" />
                  </div>
                  <h4 className="font-serif text-xl text-brand-violet font-bold">{isEs ? 'Síguenos' : 'Follow us'}</h4>
                </div>
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com" },
                    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" },
                    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com" }
                  ].map((social, i) => (
                    <Link key={i} href={social.href} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-violet hover:text-white transition-all">
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Tour Virtual Highlight */}
            <div className="bg-brand-gray rounded-[3rem] p-10 relative overflow-hidden group border border-slate-100 shadow-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-green/20 transition-colors duration-700" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-serif text-brand-violet mb-4">{isEs ? 'Tour Virtual 360°' : '360° Virtual Tour'}</h3>
                  <p className="text-slate-500 font-light text-base mb-6">{isEs ? 'Explora nuestra clínica y laboratorios de alta tecnología desde la comodidad de tu hogar.' : 'Explore our clinic and high-tech laboratories from the comfort of your home.'}</p>
                  <a
                    href="https://my.matterport.com/show/?m=KMsYvXiwCHb"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-violet text-white px-8 py-3 rounded-full hover:bg-brand-violet/90 transition-all font-bold text-base shadow-lg shadow-brand-violet/20"
                  >
                    {isEs ? 'Comenzar Tour' : 'Start Tour'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="w-32 h-32 bg-white rounded-3xl p-4 shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-brand-green opacity-20" />
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-[3rem] overflow-hidden border-8 border-brand-gray shadow-2xl h-[400px] relative group">
              <iframe
                loading="lazy"
                src="https://maps.google.com/maps?q=Advanced%20Fertility%20Center%20Cancun&t=m&z=14&output=embed&iwloc=near"
                title={isEs ? 'Ubicación AFCC' : 'AFCC Location'}
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20">
                <div className="w-10 h-10 bg-brand-violet rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-brand-violet uppercase tracking-wider">{isEs ? 'Nuestra Clínica' : 'Our Clinic'}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{isEs ? 'Cancún, Quintana Roo, México' : 'Cancun, Quintana Roo, Mexico'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-slate-50/50 rounded-[4rem] p-4">
            <div className="bg-white rounded-[3.5rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

              <div className="text-center mb-12 relative z-10">
                <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-3xl font-serif text-brand-violet leading-tight">{isEs ? 'Envíanos un mensaje' : 'Send us a message'}</h3>
                <p className="text-slate-500 mt-4 font-light text-base">{isEs ? 'Pronto nos pondremos en contacto contigo para resolver todas tus dudas.' : 'We will get in touch with you shortly to answer all your questions.'}</p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

function ContactMethod({ icon, title, lines }: { icon: React.ReactNode, title: string, lines: { label?: string, value?: string, href?: string, cell?: React.ReactNode }[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-violet/5 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <h4 className="font-serif text-xl text-brand-violet font-bold">{title}</h4>
      </div>
      <div className="space-y-2">
        {lines.map((line, idx) => (
          <div key={idx} className="group flex items-baseline gap-3">
            {line.label && <span className="text-[10px] uppercase font-black text-slate-300 tracking-widest w-14 shrink-0 mt-1">{line.label}</span>}
            {line.cell ? (
              line.cell
            ) : line.href ? (
              <a href={line.href} className="text-base text-slate-600 hover:text-brand-violet transition-colors font-medium">
                {line.value}
              </a>
            ) : (
              <span className="text-base text-slate-600 font-medium">{line.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}