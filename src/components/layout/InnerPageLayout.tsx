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
                <div className="flex flex-col">
                    {/* Main Content */}
                    <article className="w-full">
                        <div className="inner-page-prose prose prose-lg prose-violet prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:text-slate-600 prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:mt-0 prose-img:mb-0 prose-figure:mt-0 prose-figure:mb-0 max-w-none">
                            {children}
                        </div>
                    </article>
                </div>
            </Container>
        </main>
    );
}
