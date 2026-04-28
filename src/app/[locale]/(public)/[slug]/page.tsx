import React from 'react'
import { notFound, redirect } from 'next/navigation'

type PageModule = {
  default: React.ComponentType<any>
}

const pageLoaders: Record<string, () => Promise<PageModule>> = {
  'about-fertility-center': () => import('@/app/about-fertility-center/page'),
  'add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad': () => import('@/app/add-ons-complementos-para-optimizar-tu-tratamiento-de-fertilidad/page'),
  'add-ons-enhancements-to-optimize-your-fertility-treatment': () => import('@/app/add-ons-enhancements-to-optimize-your-fertility-treatment/page'),
  'alejandra-macip-magana': () => import('@/app/alejandra-macip-magana/page'),
  'artificial-insemination': () => import('@/app/artificial-insemination/page'),
  'aviso-de-privacidad': () => import('@/app/aviso-de-privacidad/page'),
  'certificaciones-acreditaciones-y-alianzas': () => import('@/app/certificaciones-acreditaciones-y-alianzas/page'),
  'certifications-accreditations-and-partnerships': () => import('@/app/certifications-accreditations-and-partnerships/page'),
  'coito-programado-e-induccion-de-ovulacion': () => import('@/app/coito-programado-e-induccion-de-ovulacion/page'),
  'comunidad-lgbt-tratamiento': () => import('@/app/comunidad-lgbt-tratamiento/page'),
  'contact-ivf-doctors': () => import('@/app/contact-ivf-doctors/page'),
  'contacto-annecy-aguirre': () => import('@/app/contacto-annecy-aguirre/page'),
  'contacto-tere-anguiano': () => import('@/app/contacto-tere-anguiano/page'),
  'doble-acumulacion': () => import('@/app/doble-acumulacion/page'),
  'donacion-de-espermatozoides': () => import('@/app/donacion-de-espermatozoides/page'),
  'donacion-de-ovulos': () => import('@/app/donacion-de-ovulos/page'),
  'donacion-y-adopcion-embriones': () => import('@/app/donacion-y-adopcion-embriones/page'),
  'double-accumulation-back-to-back-or-duo-stim': () => import('@/app/double-accumulation-back-to-back-or-duo-stim/page'),
  'dra-azul-estefania-torres-contacto': () => import('@/app/dra-azul-estefania-torres-contacto/page'),
  'egg-donation': () => import('@/app/egg-donation/page'),
  'embryo-donation-and-adoption': () => import('@/app/embryo-donation-and-adoption/page'),
  'embryo-transfer-and-endometrial-preparation': () => import('@/app/embryo-transfer-and-endometrial-preparation/page'),
  'estudios-geneticos': () => import('@/app/estudios-geneticos/page'),
  'faqs': () => import('@/app/faqs/page'),
  'fertility-preservation': () => import('@/app/fertility-preservation/page'),
  'fertility-treatments': () => import('@/app/fertility-treatments/page'),
  'fertilizacion-in-vitro-en-fiv-ciclo-natural': () => import('@/app/fertilizacion-in-vitro-en-fiv-ciclo-natural/page'),
  'fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo': () => import('@/app/fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo/page'),
  'first-visit': () => import('@/app/first-visit/page'),
  'fiv-fertilizacion-in-vitro': () => import('@/app/fiv-fertilizacion-in-vitro/page'),
  'genetic-studies': () => import('@/app/genetic-studies/page'),
  'gracias': () => import('@/app/gracias/page'),
  'in-vitro-fertilization-in-ivf-natural-cycle': () => import('@/app/in-vitro-fertilization-in-ivf-natural-cycle/page'),
  'in-vitro-fertilization-with-genetic-testing-and-sex-selection': () => import('@/app/in-vitro-fertilization-with-genetic-testing-and-sex-selection/page'),
  'instalaciones': () => import('@/app/instalaciones/page'),
  'clinic-tour': () => import('@/app/clinic-tour/page'),
  'inseminacion-artificial': () => import('@/app/inseminacion-artificial/page'),
  'international-patients': () => import('@/app/international-patients/page'),
  'international-support': () => import('@/app/international-support/page'),
  'ivf-in-vitro-fertilization': () => import('@/app/ivf-in-vitro-fertilization/page'),
  'ivf-team': () => import('@/app/ivf-team/page'),
  'ixchel': () => import('@/app/ixchel/page'),
  'laboratories-and-services': () => import('@/app/laboratories-and-services/page'),
  'laboratorios-y-servicios': () => import('@/app/laboratorios-y-servicios/page'),
  'lgbt-community-treatments': () => import('@/app/lgbt-community-treatments/page'),
  'metodo-ropa': () => import('@/app/metodo-ropa/page'),
  'mini-fiv': () => import('@/app/mini-fiv/page'),
  'mini-ivf': () => import('@/app/mini-ivf/page'),
  'podcast': () => import('@/app/podcast/page'),
  'preservacion-de-la-fertilidad': () => import('@/app/preservacion-de-la-fertilidad/page'),
  'primera-visita-a-nuestra-clinica-de-fertilidad': () => import('@/app/primera-visita-a-nuestra-clinica-de-fertilidad/page'),
  'privacy-notice': () => import('@/app/privacy-notice/page'),
  'programa-de-referidos': () => import('@/app/programa-de-referidos/page'),
  'referral-program': () => import('@/app/referral-program/page'),
  'ropa-method': () => import('@/app/ropa-method/page'),
  'sperm-donation': () => import('@/app/sperm-donation/page'),
  'terminos-y-condiciones': () => import('@/app/terminos-y-condiciones/page'),
  'testimonials': () => import('@/app/testimonials/page'),
  'testimonios': () => import('@/app/testimonios/page'),
  'thanks-your': () => import('@/app/thanks-your/page'),
  'timed-intercourse-and-ovulation-induction': () => import('@/app/timed-intercourse-and-ovulation-induction/page'),
  'transferencia-de-embriones-congelados': () => import('@/app/transferencia-de-embriones-congelados/page'),
  'transferencia-de-embriones-y-preparacion-endometrial': () => import('@/app/transferencia-de-embriones-y-preparacion-endometrial/page'),
  'turismo-medico': () => import('@/app/turismo-medico/page'),
  'why-afcc': () => import('@/app/why-afcc/page')
}

const esToEnSlugMap: Record<string, string> = {
  'sobre-fertility-center-cancun': 'about-fertility-center',
  'turismo-medico': 'international-patients',
  'instalaciones': 'clinic-tour',
  'laboratorios-y-servicios': 'laboratories-and-services',
  'equipo': 'ivf-team',
  'certificaciones-acreditaciones-y-alianzas': 'certifications-accreditations-and-partnerships',
  'tratamientos': 'fertility-treatments',
  'fiv-fertilizacion-in-vitro': 'ivf-in-vitro-fertilization',
  'fertilizacion-in-vitro-estudio-genetico-seleccion-de-sexo': 'in-vitro-fertilization-with-genetic-testing-and-sex-selection',
  'mini-fiv': 'mini-ivf',
  'inseminacion-artificial': 'artificial-insemination',
  'donacion-de-ovulos': 'egg-donation',
  'donacion-de-espermatozoides': 'sperm-donation',
  'donacion-y-adopcion-embriones': 'embryo-donation-and-adoption',
  'metodo-ropa': 'ropa-method',
  'preservacion-de-la-fertilidad': 'fertility-preservation',
  'coito-programado-e-induccion-de-ovulacion': 'timed-intercourse-and-ovulation-induction',
  'transferencia-de-embriones-y-preparacion-endometrial': 'embryo-transfer-and-endometrial-preparation',
  'comunidad-lgbt-tratamiento': 'lgbt-community-treatments',
  'estudios-geneticos': 'genetic-studies',
  'fertilizacion-in-vitro-en-fiv-ciclo-natural': 'in-vitro-fertilization-in-ivf-natural-cycle',
  'doble-acumulacion': 'double-accumulation-back-to-back-or-duo-stim',
  'primera-visita-a-nuestra-clinica-de-fertilidad': 'first-visit',
  'testimonios': 'testimonials',
  'contacto': 'contact-ivf-doctors',
  'aviso-de-privacidad': 'privacy-notice',
  'programa-de-referidos': 'referral-program'
}

const enToEsSlugMap = Object.fromEntries(
  Object.entries(esToEnSlugMap).map(([esSlug, enSlug]) => [enSlug, esSlug])
)

export default async function LegacyPublicPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  if (locale === 'en' && esToEnSlugMap[slug]) {
    redirect(`/en/${esToEnSlugMap[slug]}`)
  }

  if (locale === 'es' && enToEsSlugMap[slug]) {
    redirect(`/es/${enToEsSlugMap[slug]}`)
  }

  const loader = pageLoaders[slug]

  if (!loader) {
    notFound()
  }

  const module = await loader()
  const PageComponent = module.default

  return <PageComponent />
}
