import React from 'react';
import { Montserrat } from 'next/font/google';
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
      <body className="relative antialiased selection:bg-brand-green/30 selection:text-brand-violet">
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
