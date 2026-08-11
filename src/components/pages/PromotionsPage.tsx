import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import PromotionsForm from '@/components/forms/PromotionsForm';

export default function PromotionsPage({ locale }: { locale: 'es' | 'en' }) {
    const isEs = locale === 'es';

    return (
        <main className="bg-white min-h-screen">
            <PageHeader
                title={isEs ? 'Promociones' : 'Promotions'}
                breadcrumb={[
                    { label: isEs ? 'Inicio' : 'Home', href: '/' },
                    { label: isEs ? 'Promociones' : 'Promotions', href: '#' },
                ]}
            />

            {/* Imagen promocional al 70% de ancho */}
            <section className="w-full">
                <div className="w-[70%] mx-auto">
                    <Image
                        src={isEs ? '/images/promo-subpage-es.png' : '/images/promo-subpage-en.png'}
                        alt={isEs
                            ? 'Promoción FIV - Tratamiento $157,000 MXN - Advanced Fertility Center Cancún'
                            : 'IVF Promotion - Treatment $157,000 MXN - Advanced Fertility Center Cancun'}
                        width={2300}
                        height={7152}
                        className="w-full h-auto rounded-3xl"
                        priority
                    />
                </div>
            </section>

            {/* Formulario al final */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <PromotionsForm locale={locale} />
                    </div>
                </Container>
            </section>
        </main>
    );
}