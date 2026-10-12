import type { Donor } from './types'

/**
 * Qué campos se muestran, en qué orden y agrupados cómo.
 *
 * Lo comparten la ficha del donante y la tabla del comparador para que las dos
 * enseñen exactamente los mismos datos en el mismo orden: si divergieran, una
 * ficha y su columna en el comparador dirían cosas distintas.
 */

/** Campos del donante que se pintan como fila de «característica → valor». */
export type DonorAttributeKey =
    | 'eggsAvailable'
    | 'nationality'
    | 'bloodType'
    | 'rhesusFactor'
    | 'height'
    | 'weight'
    | 'constitution'
    | 'handedness'
    | 'hairColor'
    | 'hairType'
    | 'hairLength'
    | 'eyeColor'
    | 'eyeSize'
    | 'eyeType'
    | 'faceType'
    | 'noseSize'
    | 'noseType'
    | 'foreheadType'
    | 'education'
    | 'gpaSchool'
    | 'gpaUniversity'
    | 'dressSize'
    | 'shoesSize'
    | 'braSize'

export type DonorSectionKey = 'general' | 'appearance' | 'education' | 'measurements'

export const DONOR_SECTIONS: Array<{ key: DonorSectionKey; fields: DonorAttributeKey[] }> = [
    {
        key: 'general',
        // Las existencias van primero: es el dato que decide una compra, y en
        // esperma el feed no lo trae, así que la fila ni se pinta.
        fields: [
            'eggsAvailable',
            'nationality',
            'bloodType',
            'rhesusFactor',
            'height',
            'weight',
            'constitution',
            'handedness',
        ],
    },
    {
        key: 'appearance',
        fields: [
            'hairColor',
            'hairType',
            'hairLength',
            'eyeColor',
            'eyeSize',
            'eyeType',
            'faceType',
            'noseSize',
            'noseType',
            'foreheadType',
        ],
    },
    { key: 'education', fields: ['education', 'gpaSchool', 'gpaUniversity'] },
    // Solo el feed de ovocitos trae tallas; en esperma la sección entera se
    // queda vacía y no llega a pintarse.
    { key: 'measurements', fields: ['dressSize', 'shoesSize', 'braSize'] },
]

/** Todos los campos en orden, aplanados. Es el orden de filas del comparador. */
export const DONOR_ATTRIBUTE_ORDER: DonorAttributeKey[] = DONOR_SECTIONS.flatMap((section) => section.fields)

/** Unidades que puede llevar un valor numérico. */
export type DonorUnit = 'cm' | 'kg' | 'pcs'

/** Campos cuyo valor lleva unidad. */
const UNITS: Partial<Record<DonorAttributeKey, DonorUnit>> = {
    eggsAvailable: 'pcs',
    height: 'cm',
    weight: 'kg',
    hairLength: 'cm',
}

export interface FormatOptions {
    /** Traduce `Donors.units.*`. */
    unit: (unit: DonorUnit, value: number) => string
}

/**
 * Devuelve el valor ya listo para pintar, o `null` si no consta.
 *
 * Nunca devuelve la cadena «No especificado»: quien pinta decide si muestra un
 * guion, oculta la fila (ficha) o la deja vacía (comparador).
 */
export function formatDonorAttribute(
    donor: Donor,
    key: DonorAttributeKey,
    { unit }: FormatOptions,
): string | null {
    const raw = donor[key]

    if (raw === null || raw === undefined || raw === '') return null

    if (typeof raw === 'number') {
        const suffix = UNITS[key]
        return suffix ? unit(suffix, raw) : String(raw)
    }

    return typeof raw === 'string' ? raw : null
}

/** `true` si el donante tiene algún dato en esa sección. */
export function sectionHasData(donor: Donor, fields: DonorAttributeKey[]): boolean {
    return fields.some((field) => {
        const value = donor[field]
        return value !== null && value !== undefined && value !== ''
    })
}
