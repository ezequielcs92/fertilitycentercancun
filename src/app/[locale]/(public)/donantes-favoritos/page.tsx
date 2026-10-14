import { getTranslations } from 'next-intl/server'
import InnerPageLayout from '@/components/layout/InnerPageLayout'
import { buildRouteMetadata } from '@/lib/seo'
import { getDonors } from '@/lib/donors/feed'
import { asDonorLocale, DONOR_FAVORITES_SLUGS } from '@/lib/donors/routes'
import DonorFavoritesView from '@/components/donors/DonorFavoritesView'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const es = await getTranslations({ locale: 'es', namespace: 'Donors.favorites' })
    const en = await getTranslations({ locale: 'en', namespace: 'Donors.favorites' })

    return buildRouteMetadata({
        locale,
        es: { path: DONOR_FAVORITES_SLUGS.es, title: es('title'), description: es('meta_description') },
        en: { path: DONOR_FAVORITES_SLUGS.en, title: en('title'), description: en('meta_description') },
        // La página no tiene contenido propio: lo que muestra depende de lo que
        // cada visitante haya guardado en su navegador. Indexarla solo colocaría
        // una página vacía en los resultados.
        noIndex: true,
    })
}

export default async function DonorFavoritesRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const current = asDonorLocale(locale)
    const t = await getTranslations({ locale: current, namespace: 'Donors.favorites' })

    // No se sabe qué fichas ha guardado el visitante hasta que monta el
    // componente en el navegador, así que se mandan los dos catálogos y allí se
    // eligen las suyas.
    const [egg, sperm] = await Promise.all([getDonors('egg', current), getDonors('sperm', current)])

    return (
        <InnerPageLayout
            title={t('title')}
            breadcrumb={[
                { label: current === 'es' ? 'Inicio' : 'Home', href: `/${current}` },
                { label: t('breadcrumb'), href: '#' },
            ]}
        >
            <p className="lead text-xl font-light text-slate-600 mb-12">{t('description')}</p>

            <DonorFavoritesView donors={[...egg, ...sperm]} />
        </InnerPageLayout>
    )
}
