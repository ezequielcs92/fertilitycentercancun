export const SITE_PHONES = [
    '9988022197',
    '9988899264',
    '9988899250',
    '9988022199',
] as const;

export const DEFAULT_SITE_PHONE = SITE_PHONES[0];

export const SITE_PHONE_SESSION_KEY = 'afcc_site_phone';

export type SitePhone = (typeof SITE_PHONES)[number];

export function isSitePhone(value: string | null | undefined): value is SitePhone {
    return !!value && (SITE_PHONES as readonly string[]).includes(value);
}

export function formatPhoneDisplay(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 10);
    return `+52 (${a}) ${b}-${c}`;
}

export function phoneHref(phone: string): string {
    return `tel:+52${phone.replace(/\D/g, '')}`;
}