'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Heart, Scale } from 'lucide-react'
import { donorCompareHref, donorFavoritesHref } from '@/lib/donors/routes'
import { useDonorSelection } from './useDonorSelection'

/**
 * Barra flotante de acceso a favoritos y al comparador.
 *
 * Favoritos y comparador no están en el menú principal a propósito: solo
 * significan algo una vez se ha empezado a marcar fichas. Esta barra aparece en
 * cuanto hay algo que ver y desaparece cuando se vacían las dos listas.
 */

interface DonorSelectionBarProps {
    /** Oculta el enlace a favoritos (se usa dentro de la propia página). */
    hideFavorites?: boolean
    /** Oculta el enlace al comparador (se usa dentro de la propia página). */
    hideCompare?: boolean
}

export default function DonorSelectionBar({ hideFavorites = false, hideCompare = false }: DonorSelectionBarProps) {
    const t = useTranslations('Donors.actions')
    const locale = useLocale()
    const favorites = useDonorSelection('favorites')
    const compare = useDonorSelection('compare')

    const showFavorites = !hideFavorites && favorites.count > 0
    const showCompare = !hideCompare && compare.count > 0

    if (!showFavorites && !showCompare) return null

    return (
        // `bottom-24` la deja por encima del botón de WhatsApp y de cualquier
        // widget de chat que se ancle abajo del todo; a `bottom-6` quedaban
        // pisándose. El `z-[95]` es mayor que el z-80 de WhatsApp por la misma
        // razón: si algo más llega a solaparse, que gane esta barra.
        //
        // En móvil los dos botones van en columna, cada uno a todo lo ancho:
        // meterlos en una sola píldora compartida obligaba a truncar el texto
        // («Ver favoritos» se quedaba en «Ver fav…») incluso con las etiquetas
        // más cortas del inglés. En `sm:` y hacia arriba sí cabe una fila.
        <div className="fixed bottom-24 inset-x-4 z-[95] mx-auto max-w-md pointer-events-none">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 pointer-events-auto">
                {showFavorites && (
                    <Link
                        href={donorFavoritesHref(locale)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-violet text-white rounded-full px-5 py-3.5 sm:py-3 text-xs font-bold uppercase tracking-widest shadow-2xl hover:bg-brand-violet/90 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40"
                    >
                        <Heart className="w-4 h-4 fill-current text-brand-green shrink-0" />
                        <span>{t('view_favorites', { count: favorites.count })}</span>
                    </Link>
                )}

                {showCompare && (
                    <Link
                        href={donorCompareHref(locale)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-violet text-white rounded-full px-5 py-3.5 sm:py-3 text-xs font-bold uppercase tracking-widest shadow-2xl hover:bg-brand-violet/90 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40"
                    >
                        <Scale className="w-4 h-4 text-brand-green shrink-0" />
                        <span>{t('view_compare', { count: compare.count })}</span>
                    </Link>
                )}
            </div>
        </div>
    )
}
