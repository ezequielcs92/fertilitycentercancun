import type { Metadata } from 'next';
import { isValidLocale, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import FloatingElements from '@/components/ui/FloatingElements';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PromoPopup from '@/components/ui/PromoPopup';
import GoogleAdsTracking from '@/components/GoogleAdsTracking';
import UtmTracker from '@/components/analytics/UtmTracker';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com').replace(/\/$/, '');

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isEs = locale === 'es';
    const siteName = 'Advanced Fertility Center Cancún';
    const title = isEs
        ? 'Clínica de Fertilidad en Cancún | Advanced Fertility Center'
        : 'Fertility Clinic in Cancun | Advanced Fertility Center';
    const description = isEs
        ? 'Líderes en reproducción asistida en el Caribe Mexicano. Combinamos tecnología de vanguardia con un trato humano y cálido para hacer realidad tu sueño.'
        : 'Leaders in assisted reproduction in the Mexican Caribbean. We combine cutting-edge technology with warm, human care to help make your dream come true.';

    // localePrefix es 'always': todas las URLs llevan prefijo, incluido el idioma
    // por defecto. El canonical debe reflejarlo o Google ve un canonical que
    // redirige.
    const canonical = `${siteUrl}/${isEs ? 'es' : 'en'}`;

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: title,
            template: `%s | ${siteName}`
        },
        description,
        alternates: {
            canonical,
            languages: {
                es: `${siteUrl}/es`,
                en: `${siteUrl}/en`,
                'x-default': `${siteUrl}/es`
            }
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: 'Advanced Fertility Center Cancun',
            locale: isEs ? 'es_MX' : 'en_US',
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description
        }
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!isValidLocale(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <UtmTracker />
            <FloatingElements />
            <div className="relative z-10">
                <Navbar />
                {children}
                <Footer />
            </div>
            <PromoPopup />
            <GoogleAdsTracking />
        </NextIntlClientProvider>
    );
}
