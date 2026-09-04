'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Heart, Trash2 } from 'lucide-react'
import { donorCatalogHref } from '@/lib/donors/routes'
import type { Donor, DonorType } from '@/lib/donors/types'
import DonorCard from './DonorCard'
import DonorSelectionBar from './DonorSelectionBar'
import { parseDonorRef, useDonorSelection, useIsHydrated } from './useDonorSelection'

/**
 * Listado de donantes marcados como favoritos.
 *
 * La selección solo existe en el navegador, así que el servidor manda los dos
 * catálogos completos y aquí se filtran las fichas guardadas. Es la única forma
 * de resolverlo sin registrar en el servidor qué mira cada visitante.
 */

interface DonorFavoritesViewProps {
    donors: Donor[]
}

export default function DonorFavoritesView({ donors }: DonorFavoritesViewProps) {
    const t = useTranslations('Donors')
    const locale = useLocale()
    const favorites = useDonorSelection('favorites')

    // Hasta que hidrata, `localStorage` no se ha leído y la lista está vacía.
    // Sin esta espera se vería un parpadeo del mensaje «no has guardado nada»
    // justo antes de aparecer las fichas.
    const hydrated = useIsHydrated()

    const groups = useMemo(() => {
        const byRef = new Map(donors.map((donor) => [`${donor.type}:${donor.id}`, donor]))
        const result: Record<DonorType, Donor[]> = { egg: [], sperm: [] }

        for (const ref of favorites.refs) {
            const parsed = parseDonorRef(ref)
            const donor = byRef.get(ref)
            // Una ficha guardada hace semanas puede haber salido del catálogo:
            // se ignora en lugar de pintar un hueco.
            if (parsed && donor) result[parsed.type].push(donor)
        }

        return result
    }, [donors, favorites.refs])

    const total = groups.egg.length + groups.sperm.length

    if (!hydrated) {
        return <div className="not-prose min-h-[40vh]" aria-hidden="true" />
    }

    if (total === 0) {
        return (
            <div className="not-prose bg-slate-50 rounded-3xl p-12 text-center">
                <Heart className="w-10 h-10 text-brand-violet/30 mx-auto mb-4" />
                <h2 className="text-2xl font-serif text-brand-violet mb-3">{t('favorites.empty_title')}</h2>
                <p className="text-slate-500 font-light mb-8 max-w-md mx-auto">{t('favorites.empty_description')}</p>

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
            <div className="flex items-center justify-between gap-4 mb-10">
                <p className="text-sm text-slate-500 font-light">{t('catalog.results', { count: total })}</p>
                <button
                    type="button"
                    onClick={favorites.clear}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-violet/60 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t('favorites.clear')}
                </button>
            </div>

            {(['egg', 'sperm'] as const).map((type) =>
                groups[type].length === 0 ? null : (
                    <section key={type} className="mb-16 last:mb-0">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet/50 mb-5">
                            {t(type === 'egg' ? 'favorites.group_egg' : 'favorites.group_sperm')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                            {groups[type].map((donor) => (
                                <DonorCard key={`${donor.type}:${donor.id}`} donor={donor} />
                            ))}
                        </div>
                    </section>
                ),
            )}

            <DonorSelectionBar hideFavorites />
        </div>
    )
}
