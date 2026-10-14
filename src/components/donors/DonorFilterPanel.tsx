'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { countActiveFilters } from '@/lib/donors/filters'
import { FACET_KEYS, type DonorFacets, type DonorFilters, type DonorRanges, type FacetKey } from '@/lib/donors/types'

/**
 * Panel de filtros del catálogo.
 *
 * Es un componente controlado: el estado vive en `DonorCatalog`, que es quien
 * lo sincroniza con la URL. Aquí solo se pinta y se avisa de los cambios.
 */

/** Valores visibles antes de plegar el resto de una faceta. */
const VISIBLE_OPTIONS = 6

interface DonorFilterPanelProps {
    facets: DonorFacets
    ranges: DonorRanges
    filters: DonorFilters
    onChange: (filters: DonorFilters) => void
    onReset: () => void
}

function FacetGroup({
    facetKey,
    options,
    selected,
    onToggle,
}: {
    facetKey: FacetKey
    options: DonorFacets[FacetKey]
    selected: string[]
    onToggle: (value: string) => void
}) {
    const t = useTranslations('Donors.filters')
    const [expanded, setExpanded] = useState(false)
    const [open, setOpen] = useState(true)

    if (options.length === 0) return null

    // Una faceta con un único valor no filtra nada: todas las fichas lo
    // comparten. Se oculta para no dar la impresión de que se puede acotar.
    if (options.length === 1 && selected.length === 0) return null

    const visible = expanded ? options : options.slice(0, VISIBLE_OPTIONS)

    return (
        <div className="border-b border-slate-100 py-5 last:border-b-0">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/30 rounded-lg cursor-pointer"
            >
                <span className="text-xs font-bold uppercase tracking-widest text-brand-violet">
                    {t(`groups.${facetKey}`)}
                    {selected.length > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center bg-brand-green text-brand-violet rounded-full px-2 py-0.5 text-[10px]">
                            {selected.length}
                        </span>
                    )}
                </span>
                <ChevronDown
                    className={cn('w-4 h-4 text-brand-violet/50 transition-transform shrink-0', open && 'rotate-180')}
                />
            </button>

            {open && (
                <div className="mt-4 flex flex-col gap-2.5">
                    {visible.map((option) => {
                        const checked = selected.includes(option.value)
                        return (
                            <label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer group/option"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => onToggle(option.value)}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-violet accent-brand-violet focus:ring-4 focus:ring-brand-green/20 cursor-pointer shrink-0"
                                />
                                <span
                                    className={cn(
                                        'flex-1 text-sm transition-colors',
                                        checked ? 'text-brand-violet font-medium' : 'text-slate-600 font-light group-hover/option:text-brand-violet',
                                    )}
                                >
                                    {option.value}
                                </span>
                                <span className="text-xs text-slate-400 font-light tabular-nums shrink-0">{option.count}</span>
                            </label>
                        )
                    })}

                    {options.length > VISIBLE_OPTIONS && (
                        <button
                            type="button"
                            onClick={() => setExpanded((value) => !value)}
                            className="self-start text-xs font-bold uppercase tracking-widest text-brand-violet/60 hover:text-brand-violet transition-colors mt-1 cursor-pointer"
                        >
                            {expanded ? t('show_less') : t('show_more', { count: options.length - VISIBLE_OPTIONS })}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

function RangeRow({
    label,
    range,
    min,
    max,
    onChange,
}: {
    label: string
    range: { min: number; max: number }
    min: number | null
    max: number | null
    onChange: (next: { min: number | null; max: number | null }) => void
}) {
    const t = useTranslations('Donors.filters')

    // Un campo vacío es «sin límite», no cero: `Number('')` da 0 y filtraría
    // por «peso mínimo 0 kg» en cuanto se borrara el contenido.
    const parse = (value: string): number | null => {
        const trimmed = value.trim()
        if (!trimmed) return null
        const parsed = Number(trimmed)
        return Number.isFinite(parsed) ? parsed : null
    }

    const inputClass =
        'w-full h-11 rounded-xl bg-slate-50 px-3 text-sm text-brand-violet transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white'

    return (
        <div className="border-b border-slate-100 py-5 last:border-b-0">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-violet mb-4">{label}</span>
            <div className="flex items-center gap-3">
                <input
                    type="number"
                    inputMode="numeric"
                    value={min ?? ''}
                    min={range.min}
                    max={range.max}
                    placeholder={`${t('min')} ${range.min}`}
                    aria-label={`${label} — ${t('min')}`}
                    onChange={(event) => onChange({ min: parse(event.target.value), max })}
                    className={inputClass}
                />
                <span className="text-slate-300 shrink-0">—</span>
                <input
                    type="number"
                    inputMode="numeric"
                    value={max ?? ''}
                    min={range.min}
                    max={range.max}
                    placeholder={`${t('max')} ${range.max}`}
                    aria-label={`${label} — ${t('max')}`}
                    onChange={(event) => onChange({ min, max: parse(event.target.value) })}
                    className={inputClass}
                />
            </div>
        </div>
    )
}

export default function DonorFilterPanel({ facets, ranges, filters, onChange, onReset }: DonorFilterPanelProps) {
    const t = useTranslations('Donors.filters')
    const activeCount = countActiveFilters(filters)

    const toggleFacet = (key: FacetKey, value: string) => {
        const selected = filters[key]
        onChange({
            ...filters,
            [key]: selected.includes(value) ? selected.filter((entry) => entry !== value) : [...selected, value],
        })
    }

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-serif text-brand-violet">{t('title')}</h2>
                {activeCount > 0 && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-violet/60 hover:text-brand-violet transition-colors cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {t('clear')}
                    </button>
                )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer py-5 border-b border-slate-100">
                <input
                    type="checkbox"
                    checked={filters.withPhoto}
                    onChange={(event) => onChange({ ...filters, withPhoto: event.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 accent-brand-violet focus:ring-4 focus:ring-brand-green/20 cursor-pointer shrink-0"
                />
                <span
                    className={cn(
                        'text-sm transition-colors',
                        filters.withPhoto ? 'text-brand-violet font-medium' : 'text-slate-600 font-light',
                    )}
                >
                    {t('with_photo')}
                </span>
            </label>

            {FACET_KEYS.map((key) => (
                <FacetGroup
                    key={key}
                    facetKey={key}
                    options={facets[key]}
                    selected={filters[key]}
                    onToggle={(value) => toggleFacet(key, value)}
                />
            ))}

            <RangeRow
                label={t('height')}
                range={ranges.height}
                min={filters.heightMin}
                max={filters.heightMax}
                onChange={({ min, max }) => onChange({ ...filters, heightMin: min, heightMax: max })}
            />

            <RangeRow
                label={t('weight')}
                range={ranges.weight}
                min={filters.weightMin}
                max={filters.weightMax}
                onChange={({ min, max }) => onChange({ ...filters, weightMin: min, weightMax: max })}
            />
        </div>
    )
}
