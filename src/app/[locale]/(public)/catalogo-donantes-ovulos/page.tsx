import { getTranslations } from 'next-intl/server'
import { buildRouteMetadata } from '@/lib/seo'
import { donorCatalogSeoPath } from '@/lib/donors/routes'
import DonorCatalogPage from '@/components/donors/DonorCatalogPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const es = await getTranslations({ locale: 'es', namespace: 'Donors.catalog.egg' })
    const en = await getTranslations({ locale: 'en', namespace: 'Donors.catalog.egg' })

    return buildRouteMetadata({
        locale,
        es: {
            path: donorCatalogSeoPath('egg', 'es'),
            title: es('meta_title'),
            description: es('meta_description'),
        },
        en: {
            path: donorCatalogSeoPath('egg', 'en'),
            title: en('meta_title'),
            description: en('meta_description'),
        },
    })
}

export default async function EggDonorCatalogRoute({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
    const { locale } = await params

    return <DonorCatalogPage type="egg" locale={locale} searchParams={await searchParams} />
}
