import {
    CLINIC_ALTERNATE_NAMES,
    CLINIC_EMAIL,
    CLINIC_ID,
    CLINIC_LOCALITY,
    CLINIC_NAME,
    CLINIC_PHONE_E164,
    CLINIC_POSTAL_CODE,
    CLINIC_REGION,
    CLINIC_SAME_AS,
    CLINIC_STREET,
    DEFAULT_OG_IMAGE_PATH,
    DONOR_EMAIL,
} from '@/lib/clinic'
import { siteUrl } from '@/lib/seo'

export function clinicGraph() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'MedicalClinic',
                '@id': CLINIC_ID,
                name: CLINIC_NAME,
                alternateName: CLINIC_ALTERNATE_NAMES,
                url: `${siteUrl}/es`,
                logo: `${siteUrl}/images/logo-afcc.png`,
                image: `${siteUrl}${DEFAULT_OG_IMAGE_PATH}`,
                telephone: CLINIC_PHONE_E164,
                email: CLINIC_EMAIL,
                medicalSpecialty: 'Reproductive medicine',
                availableLanguage: ['es', 'en'],
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: CLINIC_STREET,
                    addressLocality: CLINIC_LOCALITY,
                    addressRegion: CLINIC_REGION,
                    postalCode: CLINIC_POSTAL_CODE,
                    addressCountry: 'MX',
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        opens: '08:00',
                        closes: '17:00',
                    },
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: 'Saturday',
                        opens: '09:00',
                        closes: '14:00',
                    },
                ],
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        contactType: 'patient support',
                        telephone: CLINIC_PHONE_E164,
                        email: CLINIC_EMAIL,
                        availableLanguage: ['Spanish', 'English'],
                        areaServed: 'MX',
                    },
                    {
                        '@type': 'ContactPoint',
                        contactType: 'egg donor recruitment',
                        email: DONOR_EMAIL,
                        availableLanguage: ['Spanish', 'English'],
                        url: `${siteUrl}/es/programa-donacion-lifestart`,
                    },
                ],
                sameAs: CLINIC_SAME_AS,
            },
        ],
    }
}

function breadcrumbList(items: Array<{ name: string; url: string }>) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export function breadcrumbGraph(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        ...breadcrumbList(items),
    }
}

export function contentPageGraph(input: {
    locale: 'es' | 'en'
    slug: string
    title: string
    description: string
    isTreatment?: boolean
}) {
    const url = `${siteUrl}/${input.locale}/${input.slug}`
    const home = `${siteUrl}/${input.locale}`
    const treatments =
        input.locale === 'en' ? `${siteUrl}/en/fertility-treatments` : `${siteUrl}/es/tratamientos`

    const page: Record<string, unknown> = {
        '@type': input.isTreatment ? 'MedicalWebPage' : 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: input.title,
        description: input.description,
        inLanguage: input.locale,
        isPartOf: { '@id': CLINIC_ID },
        about: input.isTreatment
            ? {
                  '@type': 'MedicalProcedure',
                  name: input.title,
                  description: input.description,
              }
            : { '@id': CLINIC_ID },
    }

    return {
        '@context': 'https://schema.org',
        '@graph': [
            page,
            breadcrumbList([
                { name: input.locale === 'en' ? 'Home' : 'Inicio', url: home },
                ...(input.isTreatment
                    ? [{ name: input.locale === 'en' ? 'Treatments' : 'Tratamientos', url: treatments }]
                    : []),
                { name: input.title, url },
            ]),
        ],
    }
}

export function faqPageGraph(locale: 'es' | 'en', items: Array<{ pregunta: string; respuesta: string }>) {
    const url = `${siteUrl}/${locale}/faqs`
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        inLanguage: locale,
        isPartOf: { '@id': CLINIC_ID },
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.pregunta,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.respuesta,
            },
        })),
    }
}

export function articleGraph(input: {
    locale: 'es' | 'en'
    slug: string
    title: string
    description: string
    publishedAt?: string | null
    image?: string | null
}) {
    const url = `${siteUrl}/${input.locale}/blog/${input.slug}`
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: input.title,
        description: input.description,
        datePublished: input.publishedAt || undefined,
        dateModified: input.publishedAt || undefined,
        inLanguage: input.locale,
        image: input.image || `${siteUrl}${DEFAULT_OG_IMAGE_PATH}`,
        mainEntityOfPage: url,
        author: {
            '@type': 'Organization',
            name: CLINIC_NAME,
            url: siteUrl,
        },
        publisher: { '@id': CLINIC_ID },
    }
}

export function physicianGraph(
    locale: 'es' | 'en',
    people: Array<{ name: string; jobTitle: string; image?: string }>,
) {
    return {
        '@context': 'https://schema.org',
        '@graph': people.map((person) => ({
            '@type': 'Physician',
            name: person.name,
            jobTitle: person.jobTitle,
            image: person.image ? `${siteUrl}${person.image}` : undefined,
            medicalSpecialty: 'Reproductive medicine',
            worksFor: { '@id': CLINIC_ID },
            url: `${siteUrl}/${locale}/equipo`,
        })),
    }
}

export function contactPageGraph(locale: 'es' | 'en') {
    const path = locale === 'en' ? 'contact-ivf-doctors' : 'contacto'
    const url = `${siteUrl}/${locale}/${path}`
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${url}#contact`,
        url,
        name: locale === 'en' ? 'Contact' : 'Contacto',
        inLanguage: locale,
        mainEntity: { '@id': CLINIC_ID },
    }
}
