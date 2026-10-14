'use client'

import { Heart, Scale } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import type { DonorType } from '@/lib/donors/types'
import { MAX_COMPARE, useDonorSelection } from './useDonorSelection'

/**
 * Botones de «favorito» y «comparar» de una ficha.
 *
 * Se montan tanto en las tarjetas del listado como en la ficha completa, y
 * comparten estado a través de `useDonorSelection`: marcar un donante en el
 * listado deja el corazón relleno también en su ficha, sin recargar.
 */

interface DonorSelectionButtonsProps {
    type: DonorType
    id: string
    /** `compact` es la variante que va superpuesta sobre la foto de la tarjeta. */
    variant?: 'compact' | 'full'
    className?: string
}

export default function DonorSelectionButtons({
    type,
    id,
    variant = 'compact',
    className,
}: DonorSelectionButtonsProps) {
    const t = useTranslations('Donors.actions')
    const favorites = useDonorSelection('favorites')
    const compare = useDonorSelection('compare')

    const isFavorite = favorites.has(type, id)
    const isComparing = compare.has(type, id)
    // El comparador está lleno y esta ficha no está dentro: el botón se deja
    // visible pero desactivado, con el motivo en el `title`. Ocultarlo dejaría
    // al visitante sin saber por qué unas tarjetas lo tienen y otras no.
    const canCompare = compare.canAdd(type, id)

    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                <button
                    type="button"
                    onClick={() => favorites.toggle(type, id)}
                    aria-pressed={isFavorite}
                    title={isFavorite ? t('remove_favorite') : t('add_favorite')}
                    aria-label={isFavorite ? t('remove_favorite') : t('add_favorite')}
                    className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer',
                        'focus:outline-none focus:ring-4 focus:ring-brand-green/30',
                        isFavorite
                            ? 'bg-brand-violet text-white hover:bg-brand-violet/90'
                            : 'bg-white/90 text-brand-violet hover:bg-white hover:scale-105',
                    )}
                >
                    <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
                </button>

                <button
                    type="button"
                    onClick={() => compare.toggle(type, id)}
                    disabled={!canCompare}
                    aria-pressed={isComparing}
                    title={
                        !canCompare
                            ? t('compare_full', { max: MAX_COMPARE })
                            : isComparing
                              ? t('remove_compare')
                              : t('add_compare')
                    }
                    aria-label={isComparing ? t('remove_compare') : t('add_compare')}
                    className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer',
                        'focus:outline-none focus:ring-4 focus:ring-brand-green/30',
                        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
                        isComparing
                            ? 'bg-brand-green text-brand-violet hover:bg-brand-green/90'
                            : 'bg-white/90 text-brand-violet hover:bg-white hover:scale-105',
                    )}
                >
                    <Scale className="w-4 h-4" />
                </button>
            </div>
        )
    }

    return (
        <div className={cn('flex flex-wrap items-center gap-3', className)}>
            <button
                type="button"
                onClick={() => favorites.toggle(type, id)}
                aria-pressed={isFavorite}
                className={cn(
                    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all cursor-pointer',
                    'focus:outline-none focus:ring-4 focus:ring-brand-green/30',
                    isFavorite
                        ? 'bg-brand-violet text-white hover:bg-brand-violet/90'
                        : 'bg-white text-brand-violet border-2 border-brand-violet/20 hover:border-brand-violet/50',
                )}
            >
                <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
                {isFavorite ? t('remove_favorite') : t('add_favorite')}
            </button>

            <button
                type="button"
                onClick={() => compare.toggle(type, id)}
                disabled={!canCompare}
                aria-pressed={isComparing}
                title={!canCompare ? t('compare_full', { max: MAX_COMPARE }) : undefined}
                className={cn(
                    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all cursor-pointer',
                    'focus:outline-none focus:ring-4 focus:ring-brand-green/30',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                    isComparing
                        ? 'bg-brand-green text-brand-violet hover:bg-brand-green/90'
                        : 'bg-white text-brand-violet border-2 border-brand-violet/20 hover:border-brand-violet/50',
                )}
            >
                <Scale className="w-4 h-4" />
                {isComparing ? t('remove_compare') : t('add_compare')}
            </button>
        </div>
    )
}
