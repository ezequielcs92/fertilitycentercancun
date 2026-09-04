import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import InnerPageLayout from '@/components/layout/InnerPageLayout'
import { getDonors } from '@/lib/donors/feed'
import { asDonorLocale } from '@/lib/donors/routes'
import type { DonorType } from '@/lib/donors/types'
import DonorCatalog from './DonorCatalog'

/**
 * Cuerpo compartido de las dos páginas de catálogo.
 *
 * Óvulos y esperma se diferencian solo en el feed que leen y en los textos, así
 * que las dos rutas montan este mismo componente y lo único que cambia es el
 * `type`.
 */

interface DonorCatalogPageProps {
    type: DonorType
    locale: string
    /** Query de entrada, para restaurar los filtros de un enlace compartido. */
    searchParams: Record<string, string | string[] | undefined>
}

/** Rehace la query string a partir de lo que Next entrega ya deserializado. */
function toSearchString(searchParams: Record<string, string | string[] | undefined>): string {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(searchParams)) {
        if (typeof value === 'string') {
            params.set(key, value)
        } else if (Array.isArray(value) && value.length > 0) {
            // Un parámetro repetido en la URL: se queda el último, que es el
            // criterio que aplica el navegador al leer un formulario.
            params.set(key, value[value.length - 1])
        }
    }

    return params.toString()
}

export default async function DonorCatalogPage({ type, locale, searchParams }: DonorCatalogPageProps) {
    const current = asDonorLocale(locale)
    const t = await getTranslations({ locale: current, namespace: 'Donors' })
    const donors = await getDonors(type, current)

    const isEs = current === 'es'

    return (
        <InnerPageLayout
            title={t(`catalog.${type}.title`)}
            breadcrumb={[
                { label: isEs ? 'Inicio' : 'Home', href: `/${current}` },
                { label: isEs ? 'Tratamientos' : 'Treatments', href: isEs ? '/es/tratamientos' : '/en/fertility-treatments' },
                { label: t(`catalog.${type}.breadcrumb`), href: '#' },
            ]}
        >
            <p className="lead text-2xl font-serif text-brand-violet italic mb-6">{t(`catalog.${type}.subtitle`)}</p>
            <p className="text-slate-600 font-light mb-12 max-w-3xl">{t('catalog.intro')}</p>

            {donors.length === 0 ? (
                <div className="not-prose bg-slate-50 rounded-3xl p-12 text-center">
                    <AlertCircle className="w-10 h-10 text-brand-violet/40 mx-auto mb-4" />
                    <h2 className="text-2xl font-serif text-brand-violet mb-3">{t('catalog.unavailable_title')}</h2>
                    <p className="text-slate-500 font-light mb-8 max-w-lg mx-auto">
                        {t('catalog.unavailable_description')}
                    </p>
                    <Link
                        href={isEs ? '/es/contacto' : '/en/contact-ivf-doctors'}
                        className="inline-flex items-center gap-2 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-violet hover:text-white transition-colors"
                    >
                        {isEs ? 'Contactar con la clínica' : 'Contact the clinic'}
                    </Link>
                </div>
            ) : (
                <DonorCatalog donors={donors} initialSearch={toSearchString(searchParams)} />
            )}
        </InnerPageLayout>
    )
}
