/** WhatsApp de la clínica, sin el «1» de marcación móvil antigua. */
export const CLINIC_WHATSAPP_NUMBER = '529983050373'

export function whatsAppHref(text: string): string {
    return `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/** Texto de apertura según la página, para que coordinación vea el origen. */
export function whatsAppTextForPath(pathname: string, isEs: boolean): string {
    const path = pathname.toLowerCase()

    if (path.includes('lifestart') || path.includes('programa-donacion-lifestart')) {
        return isEs
            ? 'Hola, quiero aplicar al programa de donación de óvulos LifeStart.'
            : 'Hello, I would like to apply to the LifeStart egg donor program.'
    }

    if (path.includes('espermatozoid') || path.includes('sperm-donation') || path.includes('sperm-donor') || path.includes('esperma')) {
        return isEs
            ? 'Hola, me interesa un tratamiento con donación de espermatozoides.'
            : 'Hello, I am interested in donor sperm treatment.'
    }

    if (path.includes('ovulo') || path.includes('ovodon') || path.includes('egg-donor') || path.includes('egg-donation')) {
        return isEs
            ? 'Hola, me interesa un tratamiento de ovodonación.'
            : 'Hello, I am interested in egg donation treatment.'
    }

    if (path.includes('fiv') || path.includes('ivf')) {
        return isEs
            ? 'Hola, me interesa un tratamiento de FIV.'
            : 'Hello, I am interested in IVF.'
    }

    return isEs
        ? 'Hola, visité su sitio web y quisiera agendar mi videollamada gratuita.'
        : 'Hello, I visited your website and would like to schedule a free video call.'
}
