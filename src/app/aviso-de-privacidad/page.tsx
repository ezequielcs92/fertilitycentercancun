
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Shield, Book, Lock, RefreshCw, Scale } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="Aviso de Privacidad"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Aviso de Privacidad', href: '#' }
        ]}
      />
      <Container className="pt-16 pb-24">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12 mb-12 border-l-4 border-l-brand-violet">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-brand-violet shrink-0" />
              <div>
                <h2 className="text-2xl font-serif text-brand-violet mb-4">Nuestro Compromiso</h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  El presente documento constituye el Aviso de Privacidad para efectos de lo dispuesto en la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> vigente. Este Aviso aplica a la información personal recopilada sobre el Titular por <strong>Fertility Center Cancun, S.A.P.I. de C.V.</strong>, en su carácter de Responsable.
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-8">
            <section>
              <h3 className="text-2xl font-serif text-brand-violet mb-6 flex items-center gap-3">
                <Book className="w-6 h-6" />
                1. Definiciones Clave
              </h3>
              <div className="grid gap-4">
                {[
                  { title: "Aviso de Privacidad", desc: "Documento físico o electrónico generado por el responsable puesto a disposición del titular." },
                  { title: "Datos Personales", desc: "Cualquier información concerniente a una persona física identificada o identificable." },
                  { title: "Datos Percibidos Sensibles", desc: "Datos que afecten a la esfera más íntima del titular o cuya utilización indebida pueda dar origen a discriminación." },
                  { title: "Derechos ARCO", desc: "Significa los derechos de Acceso, Rectificación, Cancelación y Oposición." }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-brand-violet/20 transition-colors">
                    <h4 className="font-bold text-brand-violet mb-1">{item.title}</h4>
                    <p className="text-slate-600 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-brand-violet rounded-[3rem] p-10 text-white shadow-xl my-8">
              <h3 className="text-3xl font-serif mb-8 flex items-center gap-3">
                <Lock className="w-8 h-8 text-brand-green" />
                2. Derechos ARCO
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-brand-green mb-2">Acceso y Rectificación</h4>
                  <p className="font-light opacity-90">Usted tiene derecho a conocer qué datos personales tenemos, para qué los utilizamos y las condiciones del uso que les damos. Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta.</p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-green mb-2">Cancelación y Oposición</h4>
                  <p className="font-light opacity-90">Tiene derecho a que eliminemos su información de nuestros registros o bases de datos cuando considere que no está siendo utilizada adecuadamente. También puede oponerse al uso de sus datos personales para fines específicos.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-serif text-brand-violet mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6" />
                3. Finalidad del Tratamiento
              </h3>
              <GlassCard className="p-8">
                <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                  {[
                    "Prestación de servicios médico-hospitalarios",
                    "Estudios y análisis de información de salud",
                    "Facturación y cobranza por servicios",
                    "Análisis estadísticos y de mercado",
                    "Seguimiento a servicios futuros",
                    "Mantenimiento de expediente clínico"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                      <span className="font-light">{text}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </section>

            <section className="bg-brand-gray p-8 rounded-[2.5rem] border border-brand-violet/10 mt-8 text-center">
              <RefreshCw className="w-10 h-10 text-brand-violet mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-brand-violet mb-2">Cambios al Aviso</h3>
              <p className="text-slate-600 font-light italic">
                Nos reservamos el derecho de actualizar periódicamente el presente Aviso. Es responsabilidad del Titular revisar el contenido en nuestro sitio <a href="https://fcc.com.mx" className="text-brand-violet font-bold hover:underline">www.fcc.com.mx</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
