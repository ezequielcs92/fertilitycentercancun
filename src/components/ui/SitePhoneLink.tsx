'use client';

import React, { useEffect, useState } from 'react';
import {
    DEFAULT_SITE_PHONE,
    SITE_PHONE_SESSION_KEY,
    SITE_PHONES,
    formatPhoneDisplay,
    isSitePhone,
    phoneHref,
} from '@/lib/site-phones';

export interface SitePhoneValue {
    phone: string;
    href: string;
    display: string;
    ready: boolean;
}

function pickPhone(): string {
    if (typeof window === 'undefined') return DEFAULT_SITE_PHONE;
    try {
        const stored = window.sessionStorage.getItem(SITE_PHONE_SESSION_KEY);
        if (isSitePhone(stored)) return stored;
        const choice = SITE_PHONES[Math.floor(Math.random() * SITE_PHONES.length)];
        window.sessionStorage.setItem(SITE_PHONE_SESSION_KEY, choice);
        return choice;
    } catch {
        return DEFAULT_SITE_PHONE;
    }
}

export function useSitePhone(): SitePhoneValue {
    const [phone, setPhone] = useState<string>(DEFAULT_SITE_PHONE);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setPhone(pickPhone());
        setReady(true);
    }, []);

    return {
        phone,
        href: phoneHref(phone),
        display: formatPhoneDisplay(phone),
        ready,
    };
}

interface SitePhoneLinkProps {
    className?: string;
    children?: React.ReactNode;
    ariaLabel?: string;
    target?: string;
    rel?: string;
}

export default function SitePhoneLink({
    className,
    children,
    ariaLabel,
    target,
    rel,
}: SitePhoneLinkProps) {
    const { href } = useSitePhone();
    return (
        <a href={href} className={className} aria-label={ariaLabel} target={target} rel={rel}>
            {children}
        </a>
    );
}

export function SitePhoneText() {
    const { display } = useSitePhone();
    return <>{display}</>;
}