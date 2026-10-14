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
            path: `${donorCatalogSeoPath('egg', 'es')}/${id}`,
            title: es('title_egg', { id }),
            description: es('meta_description_egg', { id }),
        },
        en: {
            path: `${donorCatalogSeoPath('egg', 'en')}/${id}`,
            title: en('title_egg', { id }),
            description: en('meta_description_egg', { id }),
        },
    })
}

export default async function EggDonorProfileRoute({
    params,
}: {
    params: Promise<{ locale: string; id: string }>
}) {
    const { locale, id } = await params

    return <DonorProfilePage type="egg" locale={locale} id={id} />
}
