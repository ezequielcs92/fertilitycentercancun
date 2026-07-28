import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import FloatingElements from '@/components/ui/FloatingElements';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PromoPopup from '@/components/ui/PromoPopup';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fertilitycentercancun.com';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isEs = locale === 'es';
    const title = 'Advanced Fertility Center Cancun';
    const description = isEs
        ? 'Lideres en reproduccion asistida en el Caribe Mexicano. Combinamos tecnologia de vanguardia con un trato humano y calido para hacer realidad tu sueno.'
        : 'Leaders in assisted reproduction in the Mexican Caribbean. We combine cutting-edge technology with warm, human care to help make your dream come true.';
    const localePath = locale === 'es' ? '/es' : '';
    const canonical = `${siteUrl}${localePath}`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            canonical,
            languages: {
                es: `${siteUrl}/es`,
                en: siteUrl
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
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <FloatingElements />
            <div className="relative z-10">
                <Navbar />
                {children}
                <Footer />
            </div>
            <PromoPopup />
        </NextIntlClientProvider>
    );
}
