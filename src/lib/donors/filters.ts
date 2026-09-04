import { compareDonorIds } from './feed'
import {
    EMPTY_FILTERS,
    FACET_KEYS,
    type Donor,
    type DonorFacets,
    type DonorFilters,
    type DonorRanges,
    type DonorSort,
    type FacetKey,
} from './types'

/**
 * Búsqueda, filtrado y «donantes parecidos».
 *
 * Todo se resuelve en memoria: el catálogo entero son unas 160 fichas, así que
 * filtrar en el cliente es instantáneo y evita un viaje al servidor por cada
 * casilla que se marca.
 */

/** Campo del donante del que sale cada faceta. */
const FACET_FIELDS: Record<FacetKey, keyof Donor> = {
    nationality: 'nationality',
    bloodType: 'bloodType',
    rhesusFactor: 'rhesusFactor',
    hairColor: 'hairColor',
    hairType: 'hairType',
    eyeColor: 'eyeColor',
    education: 'education',
}

/**
 * Normaliza texto para comparar: sin acentos, sin mayúsculas.
 *
 * Sin esto, buscar «castano» no encontraría «Castaño» y el buscador parecería
 * roto para cualquiera que escriba sin acentos, que es la mayoría.
 */
export function normalizeText(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

/** Texto sobre el que corre la búsqueda libre de una ficha. */
function searchableText(donor: Donor): string {
    return normalizeText(
        [
            donor.id,
            donor.nationality,
            donor.bloodType,
            donor.rhesusFactor,
            donor.hairType,
            donor.hairColor,
            donor.eyeColor,
            donor.eyeType,
            donor.faceType,
            donor.education,
            donor.constitution,
            donor.height ? `${donor.height}` : null,
            donor.weight ? `${donor.weight}` : null,
        ]
            .filter(Boolean)
            .join(' '),
    )
}

export function matchesFilters(donor: Donor, filters: DonorFilters): boolean {
    for (const key of FACET_KEYS) {
        const selected = filters[key]
        if (selected.length === 0) continue

        const value = donor[FACET_FIELDS[key]]
        if (typeof value !== 'string' || !selected.includes(value)) return false
    }

    // Una ficha sin altura no puede afirmarse que esté en el rango pedido, así
    // que se excluye en cuanto se acota: mostrarla sería mentir sobre el dato.
    if (filters.heightMin !== null && (donor.height === null || donor.height < filters.heightMin)) return false
    if (filters.heightMax !== null && (donor.height === null || donor.height > filters.heightMax)) return false
    if (filters.weightMin !== null && (donor.weight === null || donor.weight < filters.weightMin)) return false
    if (filters.weightMax !== null && (donor.weight === null || donor.weight > filters.weightMax)) return false

    if (filters.withPhoto && donor.photos.length === 0) return false

    const query = normalizeText(filters.q)
    if (query) {
        const haystack = searchableText(donor)
        // Todas las palabras deben aparecer: «rubio azules» debe cruzar los dos
        // rasgos, no devolver todo lo que sea rubio O tenga ojos azules.
        if (!query.split(/\s+/).every((word) => haystack.includes(word))) return false
    }

    return true
}

export function sortDonors(donors: Donor[], sort: DonorSort): Donor[] {
    const sorted = [...donors]

    switch (sort) {
        case 'id-desc':
            return sorted.sort((a, b) => compareDonorIds(b.id, a.id))
        case 'height-asc':
        case 'height-desc': {
            const direction = sort === 'height-asc' ? 1 : -1
            return sorted.sort((a, b) => {
                // Las fichas sin altura van siempre al final, se ordene como se
                // ordene: son las menos informativas de la lista.
                if (a.height === null && b.height === null) return compareDonorIds(a.id, b.id)
                if (a.height === null) return 1
                if (b.height === null) return -1
                const diff = (a.height - b.height) * direction
                return diff !== 0 ? diff : compareDonorIds(a.id, b.id)
            })
        }
        case 'id-asc':
        default:
            return sorted.sort((a, b) => compareDonorIds(a.id, b.id))
    }
}

/**
 * Cuenta los valores disponibles de cada faceta.
 *
 * Los recuentos se calculan sobre el catálogo completo y no sobre el resultado
 * filtrado: si menguaran al filtrar, las opciones irían desapareciendo del
 * panel y no habría forma de ampliar la selección.
 */
export function buildFacets(donors: Donor[]): DonorFacets {
    const facets = {} as DonorFacets

    for (const key of FACET_KEYS) {
        const counts = new Map<string, number>()

        for (const donor of donors) {
            const value = donor[FACET_FIELDS[key]]
            if (typeof value !== 'string') continue
            counts.set(value, (counts.get(value) ?? 0) + 1)
        }

        facets[key] = [...counts.entries()]
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    }

    return facets
}

export function buildRanges(donors: Donor[]): DonorRanges {
    const spread = (values: number[], fallback: { min: number; max: number }) =>
        values.length > 0 ? { min: Math.min(...values), max: Math.max(...values) } : fallback

    return {
        height: spread(
            donors.map((donor) => donor.height).filter((value): value is number => value !== null),
            { min: 140, max: 200 },
        ),
        weight: spread(
            donors.map((donor) => donor.weight).filter((value): value is number => value !== null),
            { min: 40, max: 120 },
        ),
    }
}

export function countActiveFilters(filters: DonorFilters): number {
    let total = FACET_KEYS.reduce((sum, key) => sum + filters[key].length, 0)

    if (filters.q.trim()) total += 1
    if (filters.heightMin !== null || filters.heightMax !== null) total += 1
    if (filters.weightMin !== null || filters.weightMax !== null) total += 1
    if (filters.withPhoto) total += 1

    return total
}

/**
 * Puntúa el parecido entre dos donantes para el bloque «donantes parecidos».
 *
 * Los pesos ordenan los rasgos por lo que de verdad se busca al comparar
 * fichas: primero lo visible (ojos, pelo), luego el origen, y por último los
 * datos médicos y físicos. La altura puntúa de forma decreciente hasta 10 cm
 * porque un salto de 2 cm no significa lo mismo que uno de 9.
 */
function similarityScore(donor: Donor, candidate: Donor): number {
    const sameText = (a: string | null, b: string | null, weight: number) =>
        a !== null && b !== null && a === b ? weight : 0

    let score = 0

    score += sameText(donor.eyeColor, candidate.eyeColor, 5)
    score += sameText(donor.hairColor, candidate.hairColor, 4)
    score += sameText(donor.hairType, candidate.hairType, 2)
    score += sameText(donor.nationality, candidate.nationality, 4)
    score += sameText(donor.bloodType, candidate.bloodType, 2)
    score += sameText(donor.rhesusFactor, candidate.rhesusFactor, 1)
    score += sameText(donor.education, candidate.education, 2)
    score += sameText(donor.faceType, candidate.faceType, 1)

    if (donor.height !== null && candidate.height !== null) {
        const difference = Math.abs(donor.height - candidate.height)
        if (difference <= 10) score += 3 * (1 - difference / 10)
    }

    if (donor.weight !== null && candidate.weight !== null) {
        const difference = Math.abs(donor.weight - candidate.weight)
        if (difference <= 10) score += 2 * (1 - difference / 10)
    }

    // A igualdad de parecido gana quien tenga fotos: es la ficha que aporta más
    // al visitante que ha llegado hasta aquí comparando caras.
    if (candidate.photos.length > 0) score += 0.5

    return score
}

export function findSimilarDonors(donor: Donor, catalogue: Donor[], limit = 4): Donor[] {
    return catalogue
        .filter((candidate) => candidate.id !== donor.id)
        .map((candidate) => ({ candidate, score: similarityScore(donor, candidate) }))
        .sort((a, b) => b.score - a.score || compareDonorIds(a.candidate.id, b.candidate.id))
        .slice(0, limit)
        .map((entry) => entry.candidate)
}

/* -------------------------------------------------------------------------- */
/*  Serialización de los filtros en la URL                                     */
/* -------------------------------------------------------------------------- */

/**
 * Los filtros viven en la query string para que una búsqueda se pueda compartir
 * o guardar en marcadores, y para que el botón «atrás» del navegador devuelva
 * al visitante a la selección que tenía, no al catálogo entero.
 */

const RANGE_KEYS = ['heightMin', 'heightMax', 'weightMin', 'weightMax'] as const

export function filtersToSearchParams(filters: DonorFilters, sort: DonorSort): URLSearchParams {
    const params = new URLSearchParams()

    if (filters.q.trim()) params.set('q', filters.q.trim())

    for (const key of FACET_KEYS) {
        // Un solo parámetro con valores separados por «|»: con un parámetro
        // repetido por valor la URL se vuelve ilegible en cuanto se marcan
        // cuatro nacionalidades.
        if (filters[key].length > 0) params.set(key, filters[key].join('|'))
    }

    for (const key of RANGE_KEYS) {
        const value = filters[key]
        if (value !== null) params.set(key, String(value))
    }

    if (filters.withPhoto) params.set('withPhoto', '1')
    if (sort !== 'id-asc') params.set('sort', sort)

    return params
}

const SORT_VALUES: DonorSort[] = ['id-asc', 'id-desc', 'height-asc', 'height-desc']

export function filtersFromSearchParams(params: URLSearchParams): {
    filters: DonorFilters
    sort: DonorSort
} {
    const filters: DonorFilters = { ...EMPTY_FILTERS }

    filters.q = params.get('q') ?? ''

    for (const key of FACET_KEYS) {
        const raw = params.get(key)
        filters[key] = raw ? raw.split('|').filter(Boolean) : []
    }

    for (const key of RANGE_KEYS) {
        const raw = params.get(key)
        const parsed = raw === null ? Number.NaN : Number(raw)
        filters[key] = Number.isFinite(parsed) ? parsed : null
    }

    filters.withPhoto = params.get('withPhoto') === '1'

    const rawSort = params.get('sort')
    const sort = SORT_VALUES.includes(rawSort as DonorSort) ? (rawSort as DonorSort) : 'id-asc'

    return { filters, sort }
}
