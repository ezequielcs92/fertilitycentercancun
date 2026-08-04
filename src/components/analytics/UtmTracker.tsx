'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureUtmParams } from '@/lib/utm';

/**
 * Guarda los parámetros de atribución de la URL de entrada.
 *
 * Va en el layout público para capturarlos en la primera página que ve el
 * usuario, que casi nunca es la del formulario. No renderiza nada.
 */
export default function UtmTracker() {
    const pathname = usePathname();

    useEffect(() => {
        captureUtmParams(window.location.search);
    }, [pathname]);

    return null;
}
