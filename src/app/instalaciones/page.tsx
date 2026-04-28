import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="Recorre Nuestras Instalaciones"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Instalaciones', href: '#' },
        ]}
      />

      <Container className="pt-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-4">
            Tour Virtual <span className="text-brand-green italic">360°</span>
          </h2>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            Explora nuestras modernas instalaciones desde la comodidad de tu hogar. Conoce nuestros laboratorios de FIV, quirófanos y áreas de atención al paciente.
          </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://my.matterport.com/show/?m=KMsYvXiwCHb"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="xr-spatial-tracking"
              title="Tour Virtual 360° - Advanced Fertility Center Cancún"
            />
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-slate-400 font-light">
          Usa el cursor para navegar · Haz clic en los puntos para moverte · Usa la rueda del mouse para hacer zoom
        </div>
      </Container>
    </main>
  );
}
