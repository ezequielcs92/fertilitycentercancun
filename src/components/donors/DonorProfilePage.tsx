import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import InnerPageLayout from '@/components/layout/InnerPageLayout'
import { getDonorById, getDonors } from '@/lib/donors/feed'
import { findSimilarDonors } from '@/lib/donors/filters'
import { asDonorLocale, donorCatalogHref } from '@/lib/donors/routes'
import {
    DONOR_SECTIONS,
    formatDonorAttribute,
    sectionHasData,
    type DonorAttributeKey,
} from '@/lib/donors/attributes'
import type { Donor, DonorType } from '@/lib/donors/types'
import DonorGallery from './DonorGallery'
import DonorCard from './DonorCard'
import DonorSelectionButtons from './DonorSelectionButtons'
import DonorInquiryForm from './DonorInquiryForm'
import DonorSelectionBar from './DonorSelectionBar'

/**
 * Ficha completa de un donante.
 *
 * Compartida por los dos catálogos: lo único que cambia entre óvulos y esperma
 * son los campos que trae el feed, y las secciones vacías se ocultan solas.
 */

interface DonorProfilePageProps {
    type: DonorType
    locale: string
    id: string
}

function AttributeRows({
    donor,
    fields,
    unit,
    noData,
    label,
}: {
    donor: Donor
    fields: DonorAttributeKey[]
    unit: (unit: 'cm' | 'kg', value: number) => string
    noData: string
    label: (key: DonorAttributeKey) => string
}) {
    return (
        <dl className="divide-y divide-slate-100">
            {fields.map((field) => {
                const value = formatDonorAttribute(donor, field, { unit })

                // En la ficha las filas sin dato se ocultan: una lista con diez
                // «No especificado» seguidos no informa de nada y entierra los
                // campos que sí tienen valor.
                if (value === null) return null

                return (
                    <div key={field} className="flex items-baseline justify-between gap-6 py-3">
                        <dt className="text-slate-600 text-sm shrink-0">{label(field)}</dt>
                        <dd className="text-brand-violet font-medium text-right">{value || noData}</dd>
                    </div>
                )
            })}
        </dl>
    )
}

export default async function DonorProfilePage({ type, locale, id }: DonorProfilePageProps) {
    const current = asDonorLocale(locale)
    const t = await getTranslations({ locale: current, namespace: 'Donors' })

    const donor = await getDonorById(type, current, id)
    if (!donor) notFound()

    const catalogue = await getDonors(type, current)
    const similar = findSimilarDonors(donor, catalogue)

    const isEs = current === 'es'
    const title = t(type === 'egg' ? 'detail.title_egg' : 'detail.title_sperm', { id: donor.id })
    const catalogHref = donorCatalogHref(type, current)

    const unit = (suffix: 'cm' | 'kg', value: number) => t(`units.${suffix}`, { value })
    const label = (key: DonorAttributeKey) => t(`fields.${key}`)

    return (
        <InnerPageLayout
            title={title}
            breadcrumb={[
                { label: isEs ? 'Inicio' : 'Home', href: `/${current}` },
                { label: t(`catalog.${type}.breadcrumb`), href: catalogHref },
                { label: t('card.donor_short', { id: donor.id }), href: '#' },
            ]}
        >
            <div className="not-prose">
                <Link
                    href={catalogHref}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-violet/60 hover:text-brand-violet transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('detail.back_to_catalog')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
                    <div className="lg:col-span-2">
                        <div className="lg:sticky lg:top-28">
                            <DonorGallery photos={donor.photos} alt={title} />

                            <p className="text-xs text-slate-400 font-light mt-4 leading-relaxed">
                                {t(type === 'egg' ? 'detail.photos_notice' : 'detail.photos_notice_sperm')}
                            </p>

                            <DonorSelectionButtons type={donor.type} id={donor.id} variant="full" className="mt-6" />
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-10">
                        {DONOR_SECTIONS.map((section) => {
                            // El feed de esperma no trae tallas ni notas medias:
                            // esas secciones no llegan a pintarse.
                            if (!sectionHasData(donor, section.fields)) return null

                            return (
                                <section key={section.key}>
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet/50 mb-4">
                                        {t(`sections.${section.key}`)}
                                    </h2>
                                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-6">
                                        <AttributeRows
                                            donor={donor}
                                            fields={section.fields}
                                            unit={unit}
                                            noData={t('detail.no_data')}
                                            label={label}
                                        />
                                    </div>
                                </section>
                            )
                        })}
                    </div>
                </div>

                <div className="mb-20">
                    <DonorInquiryForm donorType={donor.type} donorIds={[donor.id]} />
                </div>

                {similar.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-serif text-brand-violet mb-2">{t('detail.similar_title')}</h2>
                        <p className="text-slate-500 font-light mb-8">{t('detail.similar_description')}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                            {similar.map((candidate) => (
                                <DonorCard key={candidate.id} donor={candidate} />
                            ))}
                        </div>
                    </section>
                )}

                <DonorSelectionBar />
            </div>
        </InnerPageLayout>
    )
}
