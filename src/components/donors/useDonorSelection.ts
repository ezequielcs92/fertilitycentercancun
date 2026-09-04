'use client'

import { useCallback, useSyncExternalStore } from 'react'
import type { DonorType } from '@/lib/donors/types'

/**
 * Favoritos y comparador del catálogo de donantes.
 *
 * Vive en `localStorage` y no en Supabase a propósito: el catálogo se consulta
 * sin cuenta de usuario, así que no hay a quién asociar la lista. Guardarlo en
 * el navegador también evita registrar en nuestros servidores qué donantes
 * concretos mira cada visitante, que es un dato sensible de más.
 *
 * `useSyncExternalStore` mantiene en el mismo estado a todos los componentes
 * montados (las tarjetas del listado, la barra flotante y la cabecera) sin
 * necesidad de un contexto que envuelva media aplicación.
 */

export type SelectionList = 'favorites' | 'compare'

const STORAGE_KEYS: Record<SelectionList, string> = {
    favorites: 'afcc_donor_favorites',
    compare: 'afcc_donor_compare',
}

/**
 * Tope de fichas comparables a la vez.
 *
 * Cuatro columnas es lo que cabe en una tabla legible en escritorio; por encima
 * de eso la comparación deja de leerse y se convierte en scroll horizontal.
 */
export const MAX_COMPARE = 4

/** Identificador estable de una ficha: `egg:100866`. */
export type DonorRef = string

export function donorRef(type: DonorType, id: string): DonorRef {
    return `${type}:${id}`
}

export function parseDonorRef(ref: DonorRef): { type: DonorType; id: string } | null {
    const separator = ref.indexOf(':')
    if (separator < 1) return null

    const type = ref.slice(0, separator)
    const id = ref.slice(separator + 1)
    if ((type !== 'egg' && type !== 'sperm') || !id) return null

    return { type, id }
}

/* -------------------------------------------------------------------------- */
/*  Almacén                                                                    */
/* -------------------------------------------------------------------------- */

const listeners = new Set<() => void>()

/**
 * Copia en memoria de cada lista.
 *
 * `useSyncExternalStore` compara el resultado de `getSnapshot` por identidad, y
 * leer `localStorage` devolvería un array nuevo en cada render: bucle infinito.
 * La caché se invalida sola en cada escritura y con el evento `storage`.
 */
const cache = new Map<SelectionList, DonorRef[]>()

const EMPTY: DonorRef[] = []

function read(list: SelectionList): DonorRef[] {
    const cached = cache.get(list)
    if (cached) return cached

    let value: DonorRef[] = EMPTY
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS[list])
        const parsed: unknown = raw ? JSON.parse(raw) : []
        if (Array.isArray(parsed)) {
            value = parsed.filter((entry): entry is string => typeof entry === 'string' && parseDonorRef(entry) !== null)
        }
    } catch {
        // Modo privado o almacenamiento lleno: la selección es una comodidad,
        // nunca debe impedir navegar por el catálogo.
        value = EMPTY
    }

    cache.set(list, value)
    return value
}

function write(list: SelectionList, refs: DonorRef[]) {
    cache.set(list, refs)

    try {
        window.localStorage.setItem(STORAGE_KEYS[list], JSON.stringify(refs))
    } catch {
        // Se conserva en memoria aunque no se pueda persistir: la sesión actual
        // sigue funcionando y solo se pierde al recargar.
    }

    for (const listener of listeners) listener()
}

function subscribe(onChange: () => void): () => void {
    listeners.add(onChange)

    // Otra pestaña puede haber cambiado la selección: se vacía la caché para
    // que la siguiente lectura vaya a `localStorage`.
    const onStorage = (event: StorageEvent) => {
        if (event.key === null) {
            cache.clear()
        } else {
            const affected = (Object.keys(STORAGE_KEYS) as SelectionList[]).find(
                (list) => STORAGE_KEYS[list] === event.key,
            )
            if (!affected) return
            cache.delete(affected)
        }
        onChange()
    }

    window.addEventListener('storage', onStorage)

    return () => {
        listeners.delete(onChange)
        window.removeEventListener('storage', onStorage)
    }
}

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */

const noopSubscribe = () => () => {}
const onClient = () => true
const onServer = () => false

/**
 * `false` en el servidor y en el primer render del cliente; `true` después.
 *
 * Sirve para esperar a que `localStorage` se haya leído antes de decidir si la
 * lista está vacía de verdad. Un `useState` + `useEffect` haría lo mismo, pero
 * con un render en cascada de más; esto lo resuelve el propio mecanismo de
 * hidratación de React.
 */
export function useIsHydrated(): boolean {
    return useSyncExternalStore(noopSubscribe, onClient, onServer)
}

export interface DonorSelection {
    refs: DonorRef[]
    count: number
    has: (type: DonorType, id: string) => boolean
    toggle: (type: DonorType, id: string) => void
    remove: (type: DonorType, id: string) => void
    clear: () => void
    /** `false` cuando el comparador ya está lleno y la ficha no está dentro. */
    canAdd: (type: DonorType, id: string) => boolean
    isFull: boolean
}

export function useDonorSelection(list: SelectionList): DonorSelection {
    const refs = useSyncExternalStore(
        subscribe,
        () => read(list),
        // En el servidor no hay `localStorage`. Devolver siempre el mismo array
        // vacío evita el error de hidratación: el primer render del cliente
        // coincide con el del servidor y el estado real llega en el efecto que
        // dispara `useSyncExternalStore`.
        () => EMPTY,
    )

    const limit = list === 'compare' ? MAX_COMPARE : Number.POSITIVE_INFINITY
    const isFull = refs.length >= limit

    const has = useCallback((type: DonorType, id: string) => refs.includes(donorRef(type, id)), [refs])

    const toggle = useCallback(
        (type: DonorType, id: string) => {
            const ref = donorRef(type, id)
            const current = read(list)

            if (current.includes(ref)) {
                write(list, current.filter((entry) => entry !== ref))
                return
            }

            if (current.length >= limit) return
            write(list, [...current, ref])
        },
        [list, limit],
    )

    const remove = useCallback(
        (type: DonorType, id: string) => {
            const ref = donorRef(type, id)
            write(list, read(list).filter((entry) => entry !== ref))
        },
        [list],
    )

    const clear = useCallback(() => write(list, []), [list])

    const canAdd = useCallback(
        (type: DonorType, id: string) => refs.includes(donorRef(type, id)) || refs.length < limit,
        [refs, limit],
    )

    return { refs, count: refs.length, has, toggle, remove, clear, canAdd, isFull }
}
