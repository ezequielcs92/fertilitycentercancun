import { getTranslations } from 'next-intl/server'
import { buildRouteMetadata } from '@/lib/seo'
import { donorCatalogSeoPath } from '@/lib/donors/routes'
import DonorProfilePage from '@/components/donors/DonorProfilePage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params
    const es = await getTranslations({ locale: 'es', namespace: 'Donors.detail' })
    const en = await getTranslations({ locale: 'en', namespace: 'Donors.detail' })

    return buildRouteMetadata({
        locale,
        es: {
            path: `${donorCatalogSeoPath('sperm', 'es')}/${id}`,
            title: es('title_sperm', { id }),
            description: es('meta_description_sperm', { id }),
        },
        en: {
            path: `${donorCatalogSeoPath('sperm', 'en')}/${id}`,
            title: en('title_sperm', { id }),
            description: en('meta_description_sperm', { id }),
        },
    })
}

export default async function SpermDonorProfileRoute({
    params,
}: {
    params: Promise<{ locale: string; id: string }>
}) {
    const { locale, id } = await params

    return <DonorProfilePage type="sperm" locale={locale} id={id} />
}
