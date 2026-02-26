'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isExcluded = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    return (
        <>
            {!isExcluded && <Navbar />}
            {children}
            {!isExcluded && <Footer />}
        </>
    );
}
