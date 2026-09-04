'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Galería de fotografías de la ficha.
 *
 * Sin librería de carrusel: son cuatro fotos como mucho, así que basta con
 * mantener el índice visible y precargar todas. Cualquier carrusel del mercado
 * pesaría más que las propias imágenes.
 */

interface DonorGalleryProps {
    photos: string[]
    alt: string
}

export default function DonorGallery({ photos, alt }: DonorGalleryProps) {
    const t = useTranslations('Donors')
    const [index, setIndex] = useState(0)

    if (photos.length === 0) {
        return (
            <div className="relative aspect-[3/4] rounded-3xl bg-slate-100 flex flex-col items-center justify-center gap-3 text-slate-400">
                <ImageOff className="w-10 h-10" />
                <span className="text-xs font-bold uppercase tracking-widest">{t('card.no_photo')}</span>
            </div>
        )
    }

    const current = Math.min(index, photos.length - 1)
    const move = (delta: number) => setIndex((value) => (value + delta + photos.length) % photos.length)

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 shadow-lg">
                <Image
                    src={photos[current]}
                    alt={`${alt} — ${current + 1}/${photos.length}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    priority
                    className="object-cover"
                />

                {photos.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => move(-1)}
                            aria-label={t('detail.gallery_previous')}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-brand-violet flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => move(1)}
                            aria-label={t('detail.gallery_next')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-brand-violet flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <span className="absolute bottom-3 right-3 bg-brand-violet/85 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full tabular-nums">
                            {current + 1} / {photos.length}
                        </span>
                    </>
                )}
            </div>

            {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {photos.map((photo, position) => (
                        <button
                            key={photo}
                            type="button"
                            onClick={() => setIndex(position)}
                            aria-label={t('detail.gallery_thumb', { index: position + 1 })}
                            aria-current={position === current}
                            className={cn(
                                'relative aspect-square rounded-2xl overflow-hidden bg-slate-100 transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40',
                                position === current
                                    ? 'ring-3 ring-brand-violet ring-offset-2'
                                    : 'opacity-60 hover:opacity-100',
                            )}
                        >
                            <Image
                                src={photo}
                                alt=""
                                fill
                                sizes="120px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
