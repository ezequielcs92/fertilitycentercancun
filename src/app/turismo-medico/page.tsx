import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { Plane, MapPin, Sun, Hotel, HeartHandshake, Languages, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Turismo Médico en Cancún"
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Pacientes Internacionales', href: '#' },
        { label: 'Turismo Médico', href: '#' }
      ]}
    >
      <div className="mb-12">
        <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
          ¿Por qué Cancún? El paraíso donde comienza tu sueño.
        </p>
        <p className="text-lg text-slate-600 font-light">
          Ubicada en el corazón del Caribe Mexicano, <strong>Cancún</strong> es mucho más que un destino turístico: es el lugar perfecto para iniciar tu tratamiento de fertilidad. Rodeado por las aguas turquesa más hermosas del mundo, aquí encontrarás un entorno de paz, bienestar y accesibilidad que te permitirá enfocarte en lo más importante: tu salud y tu futuro.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <BenefitCard
          icon={<Plane className="w-8 h-8 text-white" />}
          title="Conectividad Global"
          description="El Aeropuerto Internacional de Cancún ofrece vuelos directos a más de 40 ciudades en Estados Unidos y 20 en Europa."
        />
        <BenefitCard
          icon={<MapPin className="w-8 h-8 text-white" />}
          title="Ubicación Estratégica"
          description="Nuestra clínica se encuentra a solo 15 minutos del aeropuerto, facilitando tu traslado y logística de viaje."
        />
        <BenefitCard
          icon={<Sun className="w-8 h-8 text-white" />}
          title="Entorno Relajante"
          description="El clima cálido y la brisa del mar crean una atmósfera tranquila, clave para reducir el estrés durante tu tratamiento."
        />
        <BenefitCard
          icon={<Hotel className="w-8 h-8 text-white" />}
          title="Infraestructura Turística"
          description="Convenios con hoteles y resorts de primer nivel cercanos a la clínica para una estancia cómoda y placentera."
        />
        <BenefitCard
          icon={<Languages className="w-8 h-8 text-white" />}
          title="Atención Bilingüe"
          description="Todo nuestro personal habla inglés y español, eliminando barreras de comunicación para que te sientas en casa."
        />
        <BenefitCard
          icon={<HeartHandshake className="w-8 h-8 text-white" />}
          title="Calidez Humana"
          description="Un trato empático y personalizado que distingue a la hospitalidad mexicana y a nuestro equipo médico."
        />
      </div>

      <div className="bg-brand-gray rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-serif text-brand-violet mb-6">¿Necesitas ayuda con tu viaje?</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Contamos con coordinadores de pacientes internacionales que pueden ayudarte a planear tu visita, sugerir hospedaje y coordinar tus citas médicas para optimizar tu tiempo en Cancún.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contacto" className="inline-flex items-center justify-center gap-2 bg-brand-violet text-white px-8 py-3 rounded-full hover:bg-brand-violet/90 transition-colors font-medium">
            Contactar Coordinador
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </InnerPageLayout>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-brand-green/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-violet mb-3">{title}</h3>
      <p className="text-base text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
