'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ImageOff, Scale, Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { donorCatalogHref, donorDetailHref } from '@/lib/donors/routes'
import { DONOR_ATTRIBUTE_ORDER, formatDonorAttribute } from '@/lib/donors/attributes'
import type { Donor } from '@/lib/donors/types'
import DonorInquiryForm from './DonorInquiryForm'
import DonorSelectionBar from './DonorSelectionBar'
import { MAX_COMPARE, useDonorSelection, useIsHydrated } from './useDonorSelection'

/**
 * Tabla comparativa de las fichas seleccionadas.
 *
 * A diferencia de la ficha individual, aquí las filas sin dato NO se ocultan:
 * en una comparación, que un donante no tenga un dato que los demás sí tienen
 * es en sí mismo información, y suprimir la fila desalinearía las columnas.
 *
 * Solo se ocultan las filas en las que ningún donante tiene valor.
 */

interface DonorCompareViewProps {
    donors: Donor[]
}

export default function DonorCompareView({ donors }: DonorCompareViewProps) {
    const t = useTranslations('Donors')
    const locale = useLocale()
    const compare = useDonorSelection('compare')

    const hydrated = useIsHydrated()

    const selected = useMemo(() => {
        const byRef = new Map(donors.map((donor) => [`${donor.type}:${donor.id}`, donor]))

        return compare.refs
            .map((ref) => byRef.get(ref))
            .filter((donor): donor is Donor => donor !== undefined)
    }, [donors, compare.refs])

    const rows = useMemo(() => {
        const unit = (suffix: 'cm' | 'kg', value: number) => t(`units.${suffix}`, { value })

        return DONOR_ATTRIBUTE_ORDER.map((key) => ({
            key,
            label: t(`fields.${key}`),
            values: selected.map((donor) => formatDonorAttribute(donor, key, { unit })),
        })).filter((row) => row.values.some((value) => value !== null))
    }, [selected, t])

    // Con óvulos y esperma mezclados hay filas que solo aplican a una parte de
    // las columnas (tallas, notas medias). Se avisa en lugar de esconderlas.
    const mixedTypes = useMemo(() => new Set(selected.map((donor) => donor.type)).size > 1, [selected])

    const sharedType = selected.length > 0 && !mixedTypes ? selected[0].type : null

    if (!hydrated) {
        return <div className="not-prose min-h-[40vh]" aria-hidden="true" />
    }

    if (selected.length === 0) {
        return (
            <div className="not-prose bg-slate-50 rounded-3xl p-12 text-center">
                <Scale className="w-10 h-10 text-brand-violet/30 mx-auto mb-4" />
                <h2 className="text-2xl font-serif text-brand-violet mb-3">{t('compare.empty_title')}</h2>
                <p className="text-slate-500 font-light mb-8 max-w-md mx-auto">{t('compare.empty_description')}</p>

                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        href={donorCatalogHref('egg', locale)}
                        className="inline-flex items-center gap-2 bg-brand-green text-brand-violet px-6 py-3.5 rounded-full font-bold text-sm hover:bg-brand-violet hover:text-white transition-colors"
                    >
                        {t('favorites.browse_egg')}
                    </Link>
                    <Link
                        href={donorCatalogHref('sperm', locale)}
                        className="inline-flex items-center gap-2 bg-white text-brand-violet border-2 border-brand-violet/20 px-6 py-3.5 rounded-full font-bold text-sm hover:border-brand-violet/50 transition-colors"
                    >
                        {t('favorites.browse_sperm')}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="not-prose">
            <div className="flex items-center justify-between gap-4 mb-8">
                <p className="text-sm text-slate-500 font-light">
                    {t('compare.description', { max: MAX_COMPARE })}
                </p>
                <button
                    type="button"
                    onClick={compare.clear}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-violet/60 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t('compare.clear')}
                </button>
            </div>

            {mixedTypes && (
                <p className="mb-8 rounded-2xl bg-brand-green/10 border border-brand-green/30 px-5 py-4 text-sm text-brand-violet">
                    {t('compare.mixed_types_notice')}
                </p>
            )}

            {/* La tabla se desborda en horizontal dentro de su propio contenedor:
                con cuatro columnas no cabe en móvil, y hacer que la página
                entera se desplace de lado rompería el resto del sitio. */}
            <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                {/* `table-fixed` reparte el ancho a partes iguales entre las
                    columnas de donante. Con el reparto automático, la columna
                    con la foto más ancha o el texto más largo se comía el
                    espacio de las demás y las fichas dejaban de alinearse. */}
                <table className="w-full min-w-[640px] table-fixed border-collapse">
                    <caption className="sr-only">{t('compare.title')}</caption>
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="text-left align-bottom p-3 w-40 text-xs font-bold uppercase tracking-widest text-brand-violet/50"
                            >
                                {t('compare.characteristic')}
                            </th>
                            {selected.map((donor) => (
                                <th key={`${donor.type}:${donor.id}`} scope="col" className="p-3 align-bottom">
                                    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => compare.remove(donor.type, donor.id)}
                                            aria-label={t('compare.remove')}
                                            title={t('compare.remove')}
                                            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-brand-violet flex items-center justify-center shadow hover:bg-white hover:text-red-600 transition-colors cursor-pointer"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        <div className="relative aspect-[3/4] bg-slate-100">
                                            {donor.photos[0] ? (
                                                <Image
                                                    src={donor.photos[0]}
                                                    alt={t('card.donor_number', { id: donor.id })}
                                                    fill
                                                    sizes="200px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                    <ImageOff className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-3">
                                            <Link
                                                href={donorDetailHref(donor.type, locale, donor.id)}
                                                className="block text-sm font-serif text-brand-violet hover:text-brand-violet/70 transition-colors"
                                            >
                                                {t('card.donor_number', { id: donor.id })}
                                            </Link>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={row.key} className={cn(index % 2 === 1 && 'bg-slate-50/70')}>
                                <th
                                    scope="row"
                                    className="text-left p-3 text-sm text-slate-600 align-top rounded-l-xl"
                                >
                                    {row.label}
                                </th>
                                {row.values.map((value, column) => (
                                    <td
                                        key={`${row.key}-${selected[column].type}:${selected[column].id}`}
                                        className={cn(
                                            'p-3 text-sm text-center align-top last:rounded-r-xl',
                                            value === null ? 'text-slate-300' : 'text-brand-violet font-medium',
                                        )}
                                    >
                                        {value ?? '—'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Una consulta solo puede ir a un buzón de AltraVita, así que el
                formulario se ofrece cuando todas las fichas son del mismo tipo. */}
            {sharedType && (
                <div className="mt-16">
                    <DonorInquiryForm donorType={sharedType} donorIds={selected.map((donor) => donor.id)} />
                </div>
            )}

            <DonorSelectionBar hideCompare />
        </div>
    )
}
