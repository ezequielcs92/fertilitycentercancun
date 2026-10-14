import { getTranslations } from 'next-intl/server'
import InnerPageLayout from '@/components/layout/InnerPageLayout'
import { buildRouteMetadata } from '@/lib/seo'
import { getDonors } from '@/lib/donors/feed'
import { asDonorLocale, DONOR_COMPARE_SLUGS } from '@/lib/donors/routes'
import DonorCompareView from '@/components/donors/DonorCompareView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const es = await getTranslations({ locale: 'es', namespace: 'Donors.compare' })
    const en = await getTranslations({ locale: 'en', namespace: 'Donors.compare' })

    return buildRouteMetadata({
        locale,
        es: { path: DONOR_COMPARE_SLUGS.es, title: es('title'), description: es('meta_description') },
        en: { path: DONOR_COMPARE_SLUGS.en, title: en('title'), description: en('meta_description') },
        // Igual que favoritos: sin selección guardada la página está vacía, así
        // que no tiene sentido que Google la indexe.
        noIndex: true,
    })
}

export default async function DonorCompareRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const current = asDonorLocale(locale)
    const t = await getTranslations({ locale: current, namespace: 'Donors.compare' })

    const [egg, sperm] = await Promise.all([getDonors('egg', current), getDonors('sperm', current)])

    return (
        <InnerPageLayout
            title={t('title')}
            breadcrumb={[
                { label: current === 'es' ? 'Inicio' : 'Home', href: `/${current}` },
                { label: t('breadcrumb'), href: '#' },
            ]}
        >
            <DonorCompareView donors={[...egg, ...sperm]} />
        </InnerPageLayout>
    )
}
