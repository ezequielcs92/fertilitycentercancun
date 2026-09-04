import type { Donor, DonorLocale, DonorType } from './types'

/**
 * Descarga y normalización de los feeds de donantes de la clínica de Moscú.
 *
 * Cada combinación de tipo (ovocitos / esperma) e idioma tiene su propio XML, y
 * los dos idiomas comparten los mismos identificadores: la ficha 100866 es la
 * misma donante en `/es` y en `/en`. Por eso se descarga el feed del idioma que
 * se está pintando en lugar de traducir nada por nuestra cuenta.
 *
 * No se parsea con librería externa a propósito: el XML lo genera un script, es
 * plano y sin CDATA, y añadir un parser al bundle por 160 fichas no compensa.
 */

const FEED_HOSTS: Record<DonorLocale, string> = {
    es: 'https://esp.altravita-ivf.com',
    en: 'https://altravita-ivf.com',
}

const FEED_FILES: Record<DonorType, string> = {
    egg: 'feed-donors-egg.xml',
    sperm: 'feed-donors-sperm.xml',
}

/**
 * Etiqueta de caché compartida por los cuatro feeds.
 *
 * El cron de `/api/donors/refresh` la invalida a las 08:05 (UTC-5) y con eso se
 * renuevan a la vez los dos idiomas y los dos tipos. Si se invalidaran por
 * separado, `/es` y `/en` podrían mostrar catálogos distintos durante un rato.
 */
export const DONORS_CACHE_TAG = 'donors'

/**
 * Respaldo por tiempo, por si el cron no llega a ejecutarse.
 *
 * Doce horas: el feed se regenera una vez al día, así que revalidar más a
 * menudo solo añadiría peticiones sin datos nuevos, y menos dejaría el catálogo
 * congelado más de un día entero si falla el cron.
 */
const FALLBACK_REVALIDATE_SECONDS = 60 * 60 * 12

/** Valores con los que el feed marca «sin dato». Se guardan como `null`. */
const PLACEHOLDER_VALUES = new Set(['no especificado', 'not specified', 'n/a', '-'])

const XML_ENTITIES: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
}

function decodeXml(value: string): string {
    return value.replace(/&(?:#(\d+)|#[xX]([0-9a-fA-F]+)|([a-zA-Z]+));/g, (match, dec, hex, name) => {
        if (dec) return String.fromCodePoint(Number(dec))
        if (hex) return String.fromCodePoint(parseInt(hex, 16))
        return XML_ENTITIES[name as string] ?? match
    })
}

/** Devuelve el contenido de la primera `<tag>` del bloque, ya limpio. */
function tag(block: string, name: string): string | null {
    const match = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))
    if (!match) return null

    const value = decodeXml(match[1]).trim()
    if (!value) return null
    if (PLACEHOLDER_VALUES.has(value.toLowerCase())) return null

    return value
}

/**
 * Igual que `tag`, pero numérico.
 *
 * El feed de esperma trae `0` en altura y peso cuando no consta el dato, y un
 * donante de 0 cm rompería tanto el filtro por rango como la ficha.
 */
function numericTag(block: string, name: string): number | null {
    const raw = tag(block, name)
    if (raw === null) return null

    const parsed = Number(raw.replace(',', '.'))
    if (!Number.isFinite(parsed) || parsed <= 0) return null

    return parsed
}

function parsePhotos(block: string): string[] {
    const photos: string[] = []
    const regex = /<photo>([\s\S]*?)<\/photo>/g

    let match: RegExpExecArray | null
    while ((match = regex.exec(block)) !== null) {
        const url = decodeXml(match[1]).trim()
        // Solo https: una foto por http rompería la página entera con mixed content.
        if (url.startsWith('https://')) {
            photos.push(url)
        }
    }

    return photos
}

export function parseDonorsXml(xml: string, type: DonorType): Donor[] {
    const donors: Donor[] = []
    const regex = /<donor>([\s\S]*?)<\/donor>/g

    let match: RegExpExecArray | null
    while ((match = regex.exec(xml)) !== null) {
        const block = match[1]
        const id = tag(block, 'id')

        // Sin identificador no hay ficha ni URL posible: se descarta la entrada.
        if (!id) continue

        donors.push({
            id,
            type,
            sourceUrl: tag(block, 'url'),
            nationality: tag(block, 'nationality'),
            bloodType: tag(block, 'blood_type'),
            rhesusFactor: tag(block, 'rhesus_factor'),
            height: numericTag(block, 'height'),
            weight: numericTag(block, 'weight'),
            hairType: tag(block, 'hair_type'),
            hairColor: tag(block, 'hair_color'),
            hairLength: numericTag(block, 'hair_length'),
            eyeColor: tag(block, 'eye_color'),
            eyeSize: tag(block, 'eye_size'),
            eyeType: tag(block, 'eye_type'),
            faceType: tag(block, 'face_type'),
            noseSize: tag(block, 'nose_size'),
            noseType: tag(block, 'nose_type'),
            foreheadType: tag(block, 'forehead_type'),
            constitution: tag(block, 'constitution'),
            handedness: tag(block, 'handedness'),
            education: tag(block, 'education'),
            gpaSchool: numericTag(block, 'gpa_school'),
            gpaUniversity: numericTag(block, 'gpa_university'),
            dressSize: tag(block, 'dress_size'),
            shoesSize: tag(block, 'shoes_size'),
            braSize: tag(block, 'bra_size'),
            photos: parsePhotos(block),
        })
    }

    return donors
}

/**
 * Ordena por número de donante.
 *
 * Los identificadores de esperma llevan sufijo (`102v`), así que se compara la
 * parte numérica y se deja el texto como desempate. Ordenar como cadena pondría
 * el 1000 antes del 99.
 */
export function compareDonorIds(a: string, b: string): number {
    const numberOf = (value: string) => {
        const digits = value.match(/\d+/)
        return digits ? Number(digits[0]) : Number.POSITIVE_INFINITY
    }

    const diff = numberOf(a) - numberOf(b)
    return diff !== 0 ? diff : a.localeCompare(b)
}

/**
 * Devuelve el catálogo de un tipo de donante en un idioma.
 *
 * Nunca lanza: si el feed de Moscú no responde, la página se pinta vacía con su
 * aviso en lugar de devolver un 500. Un catálogo temporalmente vacío es mucho
 * menos grave que tirar la página.
 */
export async function getDonors(type: DonorType, locale: DonorLocale): Promise<Donor[]> {
    const url = `${FEED_HOSTS[locale]}/${FEED_FILES[type]}`

    try {
        const response = await fetch(url, {
            next: {
                revalidate: FALLBACK_REVALIDATE_SECONDS,
                tags: [DONORS_CACHE_TAG],
            },
        })

        if (!response.ok) {
            console.error(`[donantes] ${url} respondió ${response.status}`)
            return []
        }

        return parseDonorsXml(await response.text(), type).sort((a, b) => compareDonorIds(a.id, b.id))
    } catch (error) {
        console.error(`[donantes] no se pudo leer ${url}:`, error)
        return []
    }
}

export async function getDonorById(
    type: DonorType,
    locale: DonorLocale,
    id: string,
): Promise<Donor | null> {
    const donors = await getDonors(type, locale)
    return donors.find((donor) => donor.id === id) ?? null
}
