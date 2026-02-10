'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface InnerPageLayoutProps {
    title: string;
    breadcrumb: { label: string; href: string }[];
    children: React.ReactNode;
    sidebarContent?: React.ReactNode;
}

export default function InnerPageLayout({ title, breadcrumb, children, sidebarContent }: InnerPageLayoutProps) {
    return (
        <main className="bg-white min-h-screen">
            <PageHeader title={title} breadcrumb={breadcrumb} />

            <Container className="py-24">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <article className="flex-1 max-w-4xl">
                        <div className="prose prose-lg prose-violet prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:text-slate-600 prose-img:rounded-[2rem] prose-img:shadow-2xl">
                            {children}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            {/* Fast Contact Card */}
                            <GlassCard className="p-8 border-brand-violet/10">
                                <Heart className="w-10 h-10 text-brand-violet mb-6 fill-brand-violet/10" />
                                <h4 className="text-2xl font-serif text-brand-violet mb-4">¿Deseas más información?</h4>
                                <p className="text-slate-600 text-sm font-light mb-8">
                                    Agenda una evaluación personalizada y comienza el camino hacia tu bebé.
                                </p>
                                <Link
                                    href="/contacto"
                                    className="flex items-center justify-between bg-brand-violet text-white p-4 rounded-2xl group hover:bg-brand-green hover:text-brand-violet transition-all duration-500"
                                >
                                    <span className="font-bold text-sm">Agendar Cita</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </GlassCard>

                            {/* Additional Sidebar Content */}
                            {sidebarContent}
                        </div>
                    </aside>
                </div>
            </Container>
        </main>
    );
}
