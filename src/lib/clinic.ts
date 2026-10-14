import { siteUrl } from '@/lib/seo'
import { DEFAULT_SITE_PHONE, formatPhoneDisplay } from '@/lib/site-phones'

export const CLINIC_NAME = 'Advanced Fertility Center Cancún'
export const CLINIC_ALTERNATE_NAMES = ['AFCC', 'Fertility Center Cancun']
export const CLINIC_EMAIL = 'info@fertilitycentercancun.com.mx'
export const DONOR_EMAIL = 'donantes@afcc.com.mx'
export const CLINIC_PHONE_DISPLAY = formatPhoneDisplay(DEFAULT_SITE_PHONE)
export const CLINIC_PHONE_E164 = `+52${DEFAULT_SITE_PHONE}`

/** Dirección publicada en las preguntas frecuentes. */
export const CLINIC_STREET = 'Edificio Tulum Center, Avenida Tulum, Super Manzana 9, Manzana 1, Lote 3'
export const CLINIC_LOCALITY = 'Cancún'
export const CLINIC_REGION = 'Quintana Roo'
export const CLINIC_POSTAL_CODE = '77500'

export const CLINIC_ADDRESS_ES = `${CLINIC_STREET}, ${CLINIC_LOCALITY}, ${CLINIC_REGION}, México, CP ${CLINIC_POSTAL_CODE}`
export const CLINIC_ADDRESS_EN = `Tulum Center Building, Avenida Tulum, Super Manzana 9, Manzana 1, Lote 3, Cancun, ${CLINIC_REGION}, Mexico, CP ${CLINIC_POSTAL_CODE}`

export const MAPS_URL =
    'https://www.google.com/maps/search/?api=1&query=Advanced+Fertility+Center+Canc%C3%BAn+Edificio+Tulum+Center+Avenida+Tulum+Canc%C3%BAn+77500'

export const CLINIC_SAME_AS = [
    MAPS_URL,
    'https://www.facebook.com/AdvancedFertilityCenterCancun',
    'https://www.instagram.com/advancedfertilitycentercancun/',
    'https://www.youtube.com/channel/UCC2jGdKaXHDn9G6J0NcSjAQ',
    'https://www.tiktok.com/@fertilitycentercancun',
    'https://x.com/fertilitycc',
    'https://open.spotify.com/show/4jzZYLfhfb3xiXaYpB8WQC',
]

export const CLINIC_ID = `${siteUrl}/#clinic`
export const DEFAULT_OG_IMAGE_PATH = '/images/og-afcc.png'

export const defaultOgImage = {
    url: DEFAULT_OG_IMAGE_PATH,
    width: 1200,
    height: 630,
    alt: CLINIC_NAME,
}
