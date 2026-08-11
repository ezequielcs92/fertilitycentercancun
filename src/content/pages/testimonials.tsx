'use client';

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { TestimonialModal } from '@/components/testimonials/TestimonialModal';
import { getTestimonials, type Testimonial } from '@/lib/actions/testimonials';
import { getStorageFiles, type StorageFile } from '@/lib/actions/storage';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [babyImages, setBabyImages] = useState<StorageFile[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getTestimonials('approved', 'en');
      setTestimonials(data);
      setLoading(false);
    };
    const fetchGallery = async () => {
      const images = await getStorageFiles('galeria-familias');
      setBabyImages(images);
    };
    fetchTestimonials();
    fetchGallery();
  }, []);

  return (
    <main className="bg-slate-50 pb-24">
      <PageHeader
        title="Testimonials"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Testimonials', href: '#' }
        ]}
      />
      <div className="pt-16 max-w-[1800px] w-full mx-auto px-6 md:px-12">
        {/* Intro */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-violet mb-6 relative inline-block">
            <span className="relative z-10">&ldquo;Here begins your journey to</span><br />
            <span className="relative z-10">parenthood,</span><br />
            <span className="relative z-10">with science, care, and heart.&rdquo;</span>
            <div className="absolute -bottom-4 left-0 right-0 h-4 bg-brand-green/20 -rotate-1 rounded-full pointer-events-none" />
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-8 font-light">
            Discover our patients&apos; experiences and how together we helped make their dream of building a family come true. These testimonials reflect the support and care we provide at every step, giving you an authentic view of what to expect on your own path to parenthood.
          </p>
        </div>

        {/* Video Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-video bg-slate-200">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5aZmAS43R28?si=NfeWZ5GH-gjt5hti"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-video bg-slate-200">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A7kc8Bp14pY?si=S6iN-ULf5oviQcm1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="text-center mb-24">
          <a href="https://youtube.com/playlist?list=PLGPNuKqY4XrjawL-2hakrVjI-4PgMWQ3V&#038;si=O8Wjeq4Vc1G8qB2u" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" fill="currentColor">
              <path d="m61.66 33.11a2 2 0 0 0 -.25-2.53l-12-12a2 2 0 0 0 -2.82 2.82l8.58 8.6h-51.17a2 2 0 0 0 0 4h51.17l-8.58 8.59a2 2 0 1 0 2.82 2.82l12-12a1.79 1.79 0 0 0 .25-.3z"></path>
            </svg>
            View all testimonials on YouTube
          </a>
        </div>

        {/* Written Testimonials Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 italic font-light">Loading stories...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-slate-400 italic font-light text-lg">No stories to show yet. Be the first to share yours!</p>
          </div>
        ) : (
          <div className="mb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {testimonials.slice(0, visibleCount).map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="text-6xl text-brand-green/20 font-serif leading-none absolute top-4 left-6 group-hover:text-brand-green/40 transition-colors">&ldquo;</div>
                  <p className="text-slate-600 font-light italic mb-6 relative z-10 pt-4 leading-relaxed flex-grow line-clamp-6 hover:line-clamp-none transition-all">
                    {testimonial.mensaje}
                  </p>
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-brand-violet text-white flex items-center justify-center font-bold text-lg shrink-0 uppercase">
                      {testimonial.nombre.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic font-medium text-brand-violet block line-clamp-1">{testimonial.nombre}</cite>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < (testimonial.calificacion || 5) ? 'fill-brand-green text-brand-green' : 'text-slate-200'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < testimonials.length && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="bg-white border-2 border-brand-violet/10 text-brand-violet px-8 py-3 rounded-full font-bold hover:bg-brand-violet hover:text-white transition-all shadow-sm"
                >
                  Load more testimonials
                </button>
              </div>
            )}
          </div>
        )}

        {/* Baby Gallery */}
        <div className="mb-24">
          <h3 className="text-3xl font-serif text-center text-brand-violet mb-12">Families created with <span className="text-brand-green">love</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {babyImages.map((image) => (
              <div key={image.id} className="aspect-square rounded-3xl overflow-hidden relative group">
                <img
                  src={image.publicUrl}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-violet/0 group-hover:bg-brand-violet/20 transition-colors duration-500 mix-blend-overlay" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-violet/5 rounded-[3rem] p-12 text-center max-w-4xl mx-auto border border-brand-violet/10">
          <h2 className="text-3xl font-serif text-brand-violet mb-6">Share your experience with us!</h2>
          <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
            If you have been a patient at our clinic, tell us about your journey and what you valued most about our team&apos;s care and support. We know the path to building a family is not easy, and sharing your success story can inspire other couples.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-green text-brand-violet px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-violet transition-colors shadow-lg shadow-brand-green/20"
          >
            Share my story
          </button>
        </div>

      </div>
      <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
