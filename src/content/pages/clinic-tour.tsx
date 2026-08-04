import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader
        title="Tour Our Facilities"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Facilities', href: '#' },
        ]}
      />

      <Container className="pt-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-violet mb-4">
            Virtual <span className="text-brand-green italic">360° Tour</span>
          </h2>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            Explore our state-of-the-art facilities from the comfort of your home. Discover our IVF laboratories, operating rooms, and patient care areas.
          </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://my.matterport.com/show/?m=KMsYvXiwCHb"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="xr-spatial-tracking"
              title="360° Virtual Tour - Advanced Fertility Center Cancún"
            />
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-slate-400 font-light">
          Click and drag to look around · Click hotspots to move · Scroll to zoom
        </div>
      </Container>
    </main>
  );
}
