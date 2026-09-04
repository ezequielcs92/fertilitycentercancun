'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    buildFacets,
    buildRanges,
    countActiveFilters,
    filtersFromSearchParams,
    filtersToSearchParams,
    matchesFilters,
    sortDonors,
} from '@/lib/donors/filters'
import { EMPTY_FILTERS, type Donor, type DonorFilters, type DonorSort } from '@/lib/donors/types'
import DonorCard from './DonorCard'
import DonorFilterPanel from './DonorFilterPanel'
import DonorSelectionBar from './DonorSelectionBar'

/**
 * Catálogo con buscador, filtros y orden.
 *
 * Recibe el catálogo entero del servidor y filtra en memoria. Son unas 80
 * fichas por tipo, así que cabe de sobra en una respuesta y permite que marcar
 * una casilla sea instantáneo, sin ir al servidor ni pintar estados de carga.
 */

/** Fichas por tanda. Tres filas completas en escritorio. */
const PAGE_SIZE = 24

interface DonorCatalogProps {
    donors: Donor[]
    /** Query string de entrada, para poder compartir una búsqueda por enlace. */
    initialSearch: string
}

export default function DonorCatalog({ donors, initialSearch }: DonorCatalogProps) {
    const t = useTranslations('Donors')

    const initial = useMemo(() => filtersFromSearchParams(new URLSearchParams(initialSearch)), [initialSearch])

    const [filters, setFilters] = useState<DonorFilters>(initial.filters)
    const [sort, setSort] = useState<DonorSort>(initial.sort)
    const [visible, setVisible] = useState(PAGE_SIZE)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const facets = useMemo(() => buildFacets(donors), [donors])
    const ranges = useMemo(() => buildRanges(donors), [donors])

    const results = useMemo(
        () => sortDonors(donors.filter((donor) => matchesFilters(donor, filters)), sort),
        [donors, filters, sort],
    )

    const activeCount = countActiveFilters(filters)

    // La selección se refleja en la URL con `replaceState` en lugar de con el
    // router: filtrar no debe crear una entrada nueva en el historial por cada
    // casilla, pero el enlace sí tiene que poder copiarse y compartirse.
    useEffect(() => {
        const params = filtersToSearchParams(filters, sort)
        const query = params.toString()
        const next = `${window.location.pathname}${query ? `?${query}` : ''}`

        if (next !== `${window.location.pathname}${window.location.search}`) {
            window.history.replaceState(null, '', next)
        }
    }, [filters, sort])

    // El cajón de filtros ocupa toda la pantalla en móvil; con el fondo
    // desplazable se pierde la posición del listado al cerrarlo.
    useEffect(() => {
        if (!drawerOpen) return

        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setDrawerOpen(false)
        }
        window.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.overflow = previous
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [drawerOpen])

    // Cambiar los filtros con la lista ya desplegada dejaría al visitante en
    // mitad de un resultado más corto, así que cada cambio vuelve a la primera
    // tanda. Va aquí y no en un efecto: es consecuencia directa de la acción,
    // no una sincronización con nada externo.
    const updateFilters = useCallback((next: DonorFilters | ((previous: DonorFilters) => DonorFilters)) => {
        setFilters(next)
        setVisible(PAGE_SIZE)
    }, [])

    const updateSort = useCallback((next: DonorSort) => {
        setSort(next)
        setVisible(PAGE_SIZE)
    }, [])

    const reset = useCallback(() => {
        updateFilters({ ...EMPTY_FILTERS })
        updateSort('id-asc')
    }, [updateFilters, updateSort])

    const panel = (
        <DonorFilterPanel
            facets={facets}
            ranges={ranges}
            filters={filters}
            onChange={updateFilters}
            onReset={reset}
        />
    )

    return (
        <div className="not-prose">
            {/* Buscador y orden */}
            <div className="flex flex-col lg:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-violet/40 pointer-events-none" />
                    <input
                        type="search"
                        value={filters.q}
                        onChange={(event) => updateFilters((previous) => ({ ...previous, q: event.target.value }))}
                        placeholder={t('filters.search_placeholder')}
                        aria-label={t('filters.search_label')}
                        className="w-full h-14 rounded-2xl bg-slate-50 pl-14 pr-6 text-base text-brand-violet transition-all placeholder:text-slate-400 placeholder:font-light focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <label className="sr-only" htmlFor="donor-sort">
                        {t('filters.sort_label')}
                    </label>
                    <select
                        id="donor-sort"
                        value={sort}
                        onChange={(event) => updateSort(event.target.value as DonorSort)}
                        // `min-w-0` es obligatorio aquí: un elemento flex sin él
                        // no encoge por debajo del ancho de su contenido, y con
                        // las etiquetas de orden en español ese ancho no cabe en
                        // un móvil — sin esto la fila entera se salía de
                        // pantalla y aparecía scroll horizontal en toda la página.
                        className="h-14 min-w-0 flex-1 lg:flex-none rounded-2xl bg-slate-50 px-5 pr-10 text-sm text-brand-violet transition-all appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white"
                    >
                        <option value="id-asc">{t('filters.sort.id_asc')}</option>
                        <option value="id-desc">{t('filters.sort.id_desc')}</option>
                        <option value="height-asc">{t('filters.sort.height_asc')}</option>
                        <option value="height-desc">{t('filters.sort.height_desc')}</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => setDrawerOpen(true)}
                        className="lg:hidden h-14 px-6 rounded-2xl bg-brand-violet text-white text-sm font-bold inline-flex items-center gap-2 shrink-0 focus:outline-none focus:ring-4 focus:ring-brand-green/30 cursor-pointer"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {t('filters.open')}
                        {activeCount > 0 && (
                            <span className="inline-flex items-center justify-center bg-brand-green text-brand-violet rounded-full min-w-5 h-5 px-1.5 text-[10px]">
                                {activeCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Filtros en escritorio */}
                <aside className="hidden lg:block w-72 xl:w-80 shrink-0 lg:sticky lg:top-28">{panel}</aside>

                <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <p className="text-sm text-slate-500 font-light">
                            {activeCount > 0
                                ? t('catalog.results_filtered', { count: results.length, total: donors.length })
                                : t('catalog.results', { count: results.length })}
                        </p>

                        {activeCount > 0 && (
                            <button
                                type="button"
                                onClick={reset}
                                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-violet/60 hover:text-brand-violet transition-colors shrink-0 cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                {t('filters.clear_all')}
                            </button>
                        )}
                    </div>

                    {results.length === 0 ? (
                        <div className="bg-slate-50 rounded-3xl p-12 text-center">
                            <h3 className="text-2xl font-serif text-brand-violet mb-3">{t('catalog.empty_title')}</h3>
                            <p className="text-slate-500 font-light mb-8 max-w-md mx-auto">
                                {t('catalog.empty_description')}
                            </p>
                            <button
                                type="button"
                                onClick={reset}
                                className="inline-flex items-center gap-2 bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-violet hover:text-white transition-colors cursor-pointer"
                            >
                                {t('catalog.empty_reset')}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                                {results.slice(0, visible).map((donor, index) => (
                                    <DonorCard key={donor.id} donor={donor} priority={index < 4} />
                                ))}
                            </div>

                            {visible < results.length && (
                                <div className="flex flex-col items-center gap-3 mt-12">
                                    <button
                                        type="button"
                                        onClick={() => setVisible((value) => value + PAGE_SIZE)}
                                        className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold transition-all duration-300 bg-brand-green text-brand-violet hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-brand-green/30 cursor-pointer"
                                    >
                                        {t('catalog.load_more')}
                                    </button>
                                    <p className="text-xs text-slate-400 font-light">
                                        {t('catalog.showing', { shown: visible, total: results.length })}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Filtros en móvil */}
            {drawerOpen && (
                <div className="fixed inset-0 z-[90] lg:hidden">
                    <div
                        className="absolute inset-0 bg-brand-violet/40 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('filters.title')}
                        className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between gap-4 p-5 border-b border-slate-100 shrink-0">
                            <span className="text-lg font-serif text-brand-violet">{t('filters.title')}</span>
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label={t('filters.close')}
                                className="w-10 h-10 rounded-xl bg-slate-50 text-brand-violet flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5">{panel}</div>

                        <div className="p-5 border-t border-slate-100 shrink-0">
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                className={cn(
                                    'w-full inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold cursor-pointer',
                                    'bg-brand-green text-brand-violet transition-all focus:outline-none focus:ring-4 focus:ring-brand-green/30',
                                )}
                            >
                                {t('filters.apply')} ({results.length})
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DonorSelectionBar />
        </div>
    )
}
