import React from 'react';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import '@/app/globals.css';
import FloatingContactButtons from '@/components/layout/FloatingContactButtons';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z34WJX4W4X"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z34WJX4W4X');
            gtag('config', 'AW-984765742');
          `}
        </Script>
      </head>
      <body className="relative antialiased selection:bg-brand-green/30 selection:text-brand-violet">
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
