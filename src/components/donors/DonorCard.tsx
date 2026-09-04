'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, ImageOff } from 'lucide-react'
import type { Donor } from '@/lib/donors/types'
import { donorDetailHref } from '@/lib/donors/routes'
import DonorSelectionButtons from './DonorSelectionButtons'

/**
 * Tarjeta de donante del listado.
 *
 * Muestra solo los cuatro rasgos por los que más se filtra. La ficha completa
 * tiene otros veinte campos, pero volcarlos aquí convertiría la cuadrícula en
 * una tabla y haría imposible barrer el catálogo de un vistazo.
 */

interface DonorCardProps {
    donor: Donor
    /** Prioriza la carga de las primeras imágenes visibles. */
    priority?: boolean
}

export default function DonorCard({ donor, priority = false }: DonorCardProps) {
    const t = useTranslations('Donors')
    const locale = useLocale()
    const href = donorDetailHref(donor.type, locale, donor.id)
    const cover = donor.photos[0]

    const traits: Array<{ label: string; value: string }> = []
    if (donor.nationality) traits.push({ label: t('fields.nationality'), value: donor.nationality })
    if (donor.eyeColor) traits.push({ label: t('fields.eyeColor'), value: donor.eyeColor })
    if (donor.hairColor) traits.push({ label: t('fields.hairColor'), value: donor.hairColor })
    if (donor.height) traits.push({ label: t('fields.height'), value: t('units.cm', { value: donor.height }) })

    return (
        <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                {cover ? (
                    <Image
                        src={cover}
                        alt={t('card.donor_number', { id: donor.id })}
                        fill
                        // Debe seguir a la rejilla de abajo (1 / 2 / 3 / 4 columnas).
                        // Cuando decía 50vw en móvil, donde ya solo hay una
                        // columna, el navegador se bajaba una imagen de la mitad
                        // de ancho y la estiraba: se veía borrosa.
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 46vw, 92vw"
                        priority={priority}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <ImageOff className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('card.no_photo')}</span>
                    </div>
                )}

                <DonorSelectionButtons
                    type={donor.type}
                    id={donor.id}
                    className="absolute top-3 right-3 z-10"
                />

                {donor.photos.length > 1 && (
                    <span className="absolute bottom-3 left-3 z-10 bg-brand-violet/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {t('card.photo_count', { count: donor.photos.length })}
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-serif text-brand-violet mb-3 leading-snug">
                    {t('card.donor_number', { id: donor.id })}
                </h3>

                <dl className="flex flex-col gap-1.5 mb-5 flex-1">
                    {traits.map((trait) => (
                        <div key={trait.label} className="flex items-baseline justify-between gap-3 text-sm">
                            <dt className="text-slate-600 shrink-0">{trait.label}</dt>
                            <dd className="text-brand-violet font-medium text-right">{trait.value}</dd>
                        </div>
                    ))}
                </dl>

                {/* El enlace ocupa toda la tarjeta con `after:absolute`, para que
                    se pueda pulsar en cualquier punto salvo en los botones de
                    favorito y comparar, que van por encima con `z-10`. */}
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-violet hover:text-brand-violet/70 transition-colors after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/30 rounded-full"
                >
                    {t('card.view')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    )
}
