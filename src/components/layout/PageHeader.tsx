import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumb: BreadcrumbItem[];
}

export default function PageHeader({ title, breadcrumb }: PageHeaderProps) {
    return (
        <section className="bg-brand-violet pt-40 pb-20 relative overflow-hidden">
            {/* Abstract Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green rounded-full blur-[120px]" />
            </div>

            <Container className="relative z-10">
                <nav className="flex items-center gap-2 text-white/60 text-sm mb-6 uppercase tracking-widest font-bold">
                    {breadcrumb.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <ChevronRight className="w-4 h-4" />}
                            {index === breadcrumb.length - 1 ? (
                                <span className="text-brand-green">{item.label}</span>
                            ) : (
                                <Link href={item.href} className="hover:text-white transition-colors">
                                    {item.label}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
                <h1 className="text-5xl md:text-7xl font-serif text-white max-w-4xl tracking-tight leading-tight">
                    {title}
                </h1>
            </Container>
        </section>
    );
}
