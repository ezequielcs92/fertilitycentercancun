/**
 * Modelo de datos del catálogo de donantes.
 *
 * El origen es la exportación XML de la clínica de Moscú (altravita-ivf.ru), que
 * publica un feed por tipo de donante y por idioma. Aquí no se guarda nada en
 * Supabase: el feed es pequeño (unos 160 donantes) y se cachea en el servidor,
 * así que la única fuente de verdad sigue siendo el sitio de Moscú.
 */

export type DonorType = 'egg' | 'sperm'

export type DonorLocale = 'es' | 'en'

/**
 * Una ficha de donante ya normalizada.
 *
 * Los campos opcionales lo son de verdad: el feed de esperma no trae talla ni
 * notas académicas, y en ambos feeds hay valores «No especificado» que se
 * convierten en `null` al parsear para no pintar filtros ni filas vacías.
 */
export interface Donor {
    id: string
    type: DonorType
    /** Ficha original en el sitio de Moscú. Se conserva como referencia interna. */
    sourceUrl: string | null

    nationality: string | null
    bloodType: string | null
    rhesusFactor: string | null

    /** Centímetros. El feed usa 0 para «desconocido»; aquí es `null`. */
    height: number | null
    /** Kilogramos. Mismo criterio que `height`. */
    weight: number | null

    hairType: string | null
    hairColor: string | null
    /** Centímetros. Solo aparece en el feed de ovocitos. */
    hairLength: number | null

    eyeColor: string | null
    eyeSize: string | null
    eyeType: string | null

    faceType: string | null
    noseSize: string | null
    noseType: string | null
    foreheadType: string | null

    constitution: string | null
    handedness: string | null
    education: string | null

    /** Nota media escolar (escala rusa de 1 a 5). Solo ovocitos. */
    gpaSchool: number | null
    /** Nota media universitaria (escala rusa de 1 a 5). Solo ovocitos. */
    gpaUniversity: number | null

    /** Solo ovocitos. */
    dressSize: string | null
    shoesSize: string | null
    braSize: string | null

    photos: string[]
}

/** Estado de los filtros del catálogo. Viaja en la URL como query string. */
export interface DonorFilters {
    /** Búsqueda libre: número de donante o cualquier rasgo. */
    q: string
    nationality: string[]
    bloodType: string[]
    rhesusFactor: string[]
    hairColor: string[]
    hairType: string[]
    eyeColor: string[]
    education: string[]
    heightMin: number | null
    heightMax: number | null
    weightMin: number | null
    weightMax: number | null
    /** Solo donantes con al menos una foto. */
    withPhoto: boolean
}

export const EMPTY_FILTERS: DonorFilters = {
    q: '',
    nationality: [],
    bloodType: [],
    rhesusFactor: [],
    hairColor: [],
    hairType: [],
    eyeColor: [],
    education: [],
    heightMin: null,
    heightMax: null,
    weightMin: null,
    weightMax: null,
    withPhoto: false,
}

export type DonorSort = 'id-asc' | 'id-desc' | 'height-asc' | 'height-desc'

/** Claves de `DonorFilters` que son listas de valores seleccionables. */
export const FACET_KEYS = [
    'nationality',
    'bloodType',
    'rhesusFactor',
    'hairColor',
    'hairType',
    'eyeColor',
    'education',
] as const

export type FacetKey = (typeof FACET_KEYS)[number]

export interface FacetOption {
    value: string
    count: number
}

export type DonorFacets = Record<FacetKey, FacetOption[]>

/** Rango real de los datos, para acotar los deslizadores de altura y peso. */
export interface DonorRanges {
    height: { min: number; max: number }
    weight: { min: number; max: number }
}
