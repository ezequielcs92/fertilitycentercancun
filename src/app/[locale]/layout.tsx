import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { Montserrat } from 'next/font/google';
import '@/app/globals.css';
import FloatingElements from '@/components/ui/FloatingElements';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

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
        <html lang={locale} className={`${montserrat.variable}`}>
            <body className="relative antialiased selection:bg-brand-green/30 selection:text-brand-violet">
                <NextIntlClientProvider messages={messages}>
                    <FloatingElements />
                    <div className="relative z-10">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
