import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildRouteMetadata({
    locale,
    es: {
      path: 'tratamientos',
      title: 'Tratamientos de Fertilidad',
      description: 'FIV, inseminación artificial, ovodonación, método ROPA, preservación de la fertilidad y más. Encuentra el tratamiento adecuado para tu caso.',
    },
    en: {
      path: 'tratamientos',
      title: 'Fertility Treatments',
      description: 'IVF, artificial insemination, egg donation, ROPA method, fertility preservation and more. Find the right treatment for your situation.',
    },
  });
}

const treatmentsEs = [
  { title: 'FIV – Fertilización In vitro', href: '/fiv-fertilizacion-in-vitro', image: '/images/treatments/ivf-portada.png', description: 'Tratamiento líder mundial con las más altas tasas de éxito para diversas causas de infertilidad.' },
  { title: 'FIV con Estudio Genético y Selección de Sexo', href: '/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo', image: '/images/treatments/fiv-estudio-genetico-portada.png', description: 'Asegura la salud genética de tu bebé y planifica tu familia con precisión médica.' },
  { title: 'Mini FIV', href: '/mini-fiv', image: '/images/treatments/mini-fiv-portada.png', description: 'Estimulación ovárica suave para una opción más natural y menos invasiva.' },
  { title: 'FIV Ciclo Natural', href: '/fertilizacion-in-vitro-en-fiv-ciclo-natural', image: '/images/treatments/ivf-portada.png', description: 'Aprovecha tu ciclo menstrual natural sin medicación hormonal estimulante.' },
  { title: 'Transferencia de Embriones Congelados', href: '/transferencia-de-embriones-y-preparacion-endometrial', image: '/images/treatments/transferencia-embriones-portada.png', description: 'Preparamos tu endometrio de forma óptima para recibir embriones preservados.' },
  { title: 'Ovodón', href: '/ovodon', image: '/images/treatments/DONANTES.png', description: 'Ovulos de donantes sanas y rigurosamente seleccionadas para lograr tu embarazo.' },
  { title: 'Inseminación Artificial', href: '/inseminacion-artificial', image: '/images/treatments/inseminacion-artificial-portada.png', description: 'Tratamiento de baja complejidad ideal como primer abordaje terapéutico.' },
  { title: 'Preservación de la Fertilidad', href: '/preservacion-de-la-fertilidad', image: '/images/treatments/preservacion-fertilidad-portada.png', description: 'Congela tus óvulos o espermatozoides y decide cuándo es el mejor momento para ser padre o madre.' },
  { title: 'Donación y Adopción de Embriones', href: '/donacion-y-adopcion-embriones', image: '/images/treatments/donacion-adopcion-embriones-portada.png', description: 'La oportunidad de dar vida a un embrión previamente criopreservado.' },
  { title: 'Coito Programado', href: '/coito-programado-e-induccion-de-ovulacion', image: '/images/treatments/coito-programado-portada.png', description: 'Monitoreo ecográfico y hormonal para maximizar las probabilidades naturales.' },
  { title: 'Programa Donación LifeStart', href: '/programa-donacion-lifestart', image: '/images/treatments/programa-donacion-lifestart-portada.jpg', description: 'Programa de donación de óvulos para mujeres jóvenes que desean generar un impacto real.' },
  { title: 'Doble Acumulación', href: '/doble-acumulacion', image: '/images/treatments/ivf-portada.png', description: 'Estrategia de estimulación dual (DuoStim) para obtener más óvulos en menos tiempo.' },
  { title: 'Método ROPA', href: '/metodo-ropa', image: '/images/treatments/ropa-portada.png', description: 'Maternidad compartida para parejas de mujeres donde ambas participan en el proceso.' },
  { title: 'Add Ons', href: '/add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad', image: '/images/treatments/ivf-portada.png', description: 'Tecnologías complementarias para potenciar y optimizar tu tratamiento base.' },
];

const treatmentsEn = [
  { title: 'IVF – In Vitro Fertilization', href: '/fiv-fertilizacion-in-vitro', image: '/images/treatments/ivf-portada.png', description: 'World-leading treatment with the highest success rates for various causes of infertility.' },
  { title: 'IVF with Genetic Testing & Sex Selection', href: '/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo', image: '/images/treatments/fiv-estudio-genetico-portada.png', description: 'Ensure your baby\'s genetic health and plan your family with medical precision.' },
  { title: 'Mini IVF', href: '/mini-fiv', image: '/images/treatments/mini-fiv-portada.png', description: 'Gentle ovarian stimulation for a more natural, less invasive option.' },
  { title: 'Natural Cycle IVF', href: '/fertilizacion-in-vitro-en-fiv-ciclo-natural', image: '/images/treatments/ivf-portada.png', description: 'Take advantage of your natural menstrual cycle without stimulating hormonal medication.' },
  { title: 'Frozen Embryo Transfer', href: '/transferencia-de-embriones-y-preparacion-endometrial', image: '/images/treatments/transferencia-embriones-portada.png', description: 'We optimally prepare your endometrium to receive preserved embryos.' },
  { title: 'Egg Donation', href: '/ovodon', image: '/images/treatments/DONANTES.png', description: 'Eggs from healthy, rigorously selected donors to achieve your pregnancy.' },
  { title: 'Artificial Insemination', href: '/inseminacion-artificial', image: '/images/treatments/inseminacion-artificial-portada.png', description: 'Low-complexity treatment ideal as a first therapeutic approach.' },
  { title: 'Fertility Preservation', href: '/preservacion-de-la-fertilidad', image: '/images/treatments/preservacion-fertilidad-portada.png', description: 'Freeze your eggs or sperm and decide when the right time is to become a parent.' },
  { title: 'Embryo Donation & Adoption', href: '/donacion-y-adopcion-embriones', image: '/images/treatments/donacion-adopcion-embriones-portada.png', description: 'The opportunity to give life to a previously cryopreserved embryo.' },
  { title: 'Timed Intercourse', href: '/coito-programado-e-induccion-de-ovulacion', image: '/images/treatments/coito-programado-portada.png', description: 'Ultrasound and hormonal monitoring to maximize natural probabilities.' },
  { title: 'LifeStart Donation Program', href: '/programa-donacion-lifestart', image: '/images/treatments/programa-donacion-lifestart-portada.jpg', description: 'Egg donation program for young women who want to make a meaningful impact.' },
  { title: 'Double Stimulation (DuoStim)', href: '/doble-acumulacion', image: '/images/treatments/ivf-portada.png', description: 'Dual stimulation strategy to obtain more eggs in less time.' },
  { title: 'ROPA Method', href: '/metodo-ropa', image: '/images/treatments/ropa-portada.png', description: 'Shared motherhood for female couples where both partners participate in the process.' },
  { title: 'Add-Ons', href: '/add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad', image: '/images/treatments/ivf-portada.png', description: 'Complementary technologies to enhance and optimize your base treatment.' },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const treatments = isEs ? treatmentsEs : treatmentsEn;

  return (
    <main className="bg-brand-slate pb-24 min-h-screen">
      <PageHeader
        title={isEs ? 'Tratamientos de Fertilidad' : 'Fertility Treatments'}
        breadcrumb={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: isEs ? 'Tratamientos' : 'Treatments', href: '#' }
        ]}
      />

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-violet mb-8">
              {isEs ? 'Tu Familia Comienza Aquí' : 'Your Family Starts Here'}
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              {isEs ? (
                <>En <strong className="text-brand-violet">Advanced Fertility Center Cancún</strong>, entendemos lo importante que es el camino hacia la paternidad. Ofrecemos una gama completa de tratamientos de fertilidad diseñados para satisfacer las necesidades individuales de cada paciente y pareja.</>
              ) : (
                <>At <strong className="text-brand-violet">Advanced Fertility Center Cancún</strong>, we understand how important the path to parenthood is. We offer a complete range of fertility treatments designed to meet the individual needs of each patient and couple.</>
              )}
            </p>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              {isEs
                ? 'Nuestro equipo médico, conformado por especialistas en fertilidad y reproducción asistida está altamente capacitado y contamos con instalaciones de vanguardia que están a tu disposición para brindarte los mejores cuidados y las mayores probabilidades de éxito.'
                : 'Our medical team, made up of fertility and assisted reproduction specialists, is highly trained and our state-of-the-art facilities are at your disposal to provide you with the best care and the highest chances of success.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Treatments Grid */}
      <section className="py-24">
        <Container>
          <div className="flex items-center gap-3 mb-16 justify-center">
            <Sparkles className="w-6 h-6 text-brand-green" />
            <h3 className="text-2xl md:text-3xl font-serif text-brand-violet text-center">
              {isEs ? 'Programas y Tratamientos Personalizados' : 'Personalized Programs and Treatments'}
            </h3>
            <Sparkles className="w-6 h-6 text-brand-green" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {treatments.map((treatment, index) => (
              <Link
                href={treatment.href}
                key={index}
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
              >
                <div className="relative aspect-[4/3] w-full bg-brand-violet/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-brand-violet/10" />
                  </div>
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="relative w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 z-10"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/10 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                <div className="p-8 flex flex-col flex-1 relative bg-white">
                  <div className="w-12 h-1 bg-brand-green mb-6 rounded-full group-hover:w-full transition-all duration-500" />
                  <h4 className="text-xl font-serif text-brand-violet mb-4 leading-snug group-hover:text-brand-green transition-colors">
                    {treatment.title}
                  </h4>
                  <p className="text-slate-500 text-base leading-relaxed mb-8 flex-1">
                    {treatment.description}
                  </p>

                  <div className="flex items-center gap-2 text-brand-green font-bold text-base uppercase tracking-widest mt-auto">
                    <span>{isEs ? 'Conocer más' : 'Learn more'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}