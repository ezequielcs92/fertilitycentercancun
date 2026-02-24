import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import Image from 'next/image';
import { Snowflake, Clock, Shield, Baby } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Preservación de la fertilidad"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Tratamientos', href: '/tratamientos-de-fertilidad' },
        { label: 'Preservación', href: '#' }
      ]}
    >
      <div className="flex flex-col gap-12 mb-16">
        <div className="w-full">
          <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
            Cuidamos tu futuro reproductivo para que decidas cuál es el mejor momento.
          </p>
          <div className="space-y-4 text-lg text-slate-600 font-light mb-8">
            <p>
              La <strong>preservación de la fertilidad</strong> es una poderosa herramienta de empoderamiento que te permite tomar el control de tu reloj biológico. Mediante técnicas de vitrificación (congelación ultrarrápida), conservamos óvulos, esperma o embriones en su estado óptimo de juventud y vitalidad.
            </p>
            <p>
              Ya sea por motivos profesionales, personales o de salud, este procedimiento te brinda la tranquilidad de saber que la calidad de tus células reproductivas estará protegida del paso del tiempo. En nuestro centro, te acompañamos para que tu deseo de formar una familia se haga realidad justo cuando tú lo decidas, con la misma seguridad y tasas de éxito que hoy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-violet text-white rounded-full font-bold hover:bg-brand-violet/90 transition-all shadow-lg hover:-translate-y-1"
            >
              Agendar Consulta de Valoración
            </Link>
          </div>
        </div>

        <div className="w-full">
          <div className="not-prose relative aspect-video md:aspect-[21/9] rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-50">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/08/Etapas-criopreservacion-01.jpg"
              alt="Etapas de Criopreservación"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">Técnicas Disponibles</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16 not-prose">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div className="relative aspect-[5/4] overflow-hidden bg-slate-50 m-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-Medicamentos.jpg"
              alt="Vitrificación de Óvulos"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 m-0 p-0"
              unoptimized
            />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-violet mb-4">Vitrificación de Óvulos</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              Ideal para mujeres que desean posponer el embarazo. Se realiza una estimulación ovárica suave para extraer óvulos y congelarlos a -196°C, manteniendo su calidad intacta.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div className="relative aspect-[5/4] overflow-hidden bg-slate-50 m-0">
            <Image
              src="https://fertilitycentercancun.com/wp-content/uploads/2024/07/Criopreservacion-masculina-894x1024.jpg"
              alt="Criopreservación de Esperma"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 m-0 p-0"
              unoptimized
            />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-violet mb-4">Criopreservación de Esperma</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              Procedimiento sencillo y efectivo que no requiere medicación previa. Altamente recomendado antes de tratamientos médicos oncológicos o vasectomías.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Para quién es este tratamiento?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {[
          { icon: Clock, title: "Postergar Maternidad", desc: "Decide ser madre cuando estés lista personal o profesionalmente." },
          { icon: Shield, title: "Tratamientos Médicos", desc: "Conservación preventiva antes de quimioterapia o radioterapia." },
          { icon: Baby, title: "Edad Reproductiva", desc: "Mujeres que desean asegurar óvulos de buena calidad antes de los 35 años." },
          { icon: Snowflake, title: "Transición de Género", desc: "Preservación de la fertilidad antes de iniciar terapia hormonal." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all flex items-center text-left gap-5 group hover:border-brand-violet/20">
            <div className="w-14 h-14 shrink-0 bg-brand-violet/5 rounded-2xl flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
              <item.icon className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-bold text-brand-violet text-lg leading-tight mb-2">{item.title}</h4>
              <p className="text-base text-slate-500 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Por qué elegirnos?</h2>
      <p className="text-slate-600 mb-6">
        En <strong>Advanced Fertility Center Cancún</strong> contamos con un laboratorio de alta complejidad y tecnología de punta para garantizar las tasas de supervivencia más altas tras la descongelación.
      </p>

    </InnerPageLayout>
  );
}
