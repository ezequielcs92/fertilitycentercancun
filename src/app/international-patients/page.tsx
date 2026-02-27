import React from 'react';
import InnerPageLayout from '@/components/layout/InnerPageLayout';
import { Plane, MapPin, Sun, Hotel, HeartHandshake, Languages, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <InnerPageLayout
      title="Medical Tourism in Cancún"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'International Patients', href: '#' },
        { label: 'Medical Tourism', href: '#' }
      ]}
    >
      <div className="mb-12">
        <p className="lead text-2xl font-serif text-brand-violet italic mb-6">
          Why Cancún? The paradise where your dream begins.
        </p>
        <p className="text-lg text-slate-600 font-light">
          Located in the heart of the Mexican Caribbean, <strong>Cancún</strong> is much more than a tourist destination: it is the perfect place to start your fertility treatment. Surrounded by the most beautiful turquoise waters in the world, here you will find an environment of peace, well-being, and accessibility that will allow you to focus on what matters most: your health and your future.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <BenefitCard
          icon={<Plane className="w-8 h-8 text-white" />}
          title="Global Connectivity"
          description="Cancún International Airport offers direct flights to more than 40 cities in the United States and 20 in Europe."
        />
        <BenefitCard
          icon={<MapPin className="w-8 h-8 text-white" />}
          title="Strategic Location"
          description="Our clinic is located just 15 minutes from the airport, facilitating your transfer and travel logistics."
        />
        <BenefitCard
          icon={<Sun className="w-8 h-8 text-white" />}
          title="Relaxing Environment"
          description="The warm climate and ocean breeze create a calm atmosphere, key to reducing stress during your treatment."
        />
        <BenefitCard
          icon={<Hotel className="w-8 h-8 text-white" />}
          title="Tourism Infrastructure"
          description="Partnerships with top-tier hotels and resorts near the clinic for a comfortable and pleasant stay."
        />
        <BenefitCard
          icon={<Languages className="w-8 h-8 text-white" />}
          title="Bilingual Care"
          description="All our staff speaks English and Spanish, eliminating communication barriers so you feel at home."
        />
        <BenefitCard
          icon={<HeartHandshake className="w-8 h-8 text-white" />}
          title="Human Warmth"
          description="An empathetic and personalized treatment that distinguishes Mexican hospitality and our medical team."
        />
      </div>

      <div className="bg-brand-gray rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-serif text-brand-violet mb-6">Need Help With Your Trip?</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          We have international patient coordinators who can help you plan your visit, suggest accommodation, and coordinate your medical appointments to optimize your time in Cancún.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact-ivf-doctors" className="inline-flex items-center justify-center gap-2 bg-brand-violet text-white px-8 py-3 rounded-full hover:bg-brand-violet/90 transition-colors font-medium">
            Contact Coordinator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </InnerPageLayout>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-brand-green/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-violet mb-3">{title}</h3>
      <p className="text-base text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
