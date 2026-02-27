import React from 'react';
import EnglishInfoPage from '@/components/layout/EnglishInfoPage';

export default function Page() {
  return (
    <EnglishInfoPage
      title="Contact IVF Doctors"
      breadcrumbSection="Contact"
      subtitle="Connect with our fertility specialists and coordination team."
      intro="Share your case and goals through our contact channels. Our team will guide you on consultation options, required information, and next steps for your fertility journey."
      highlights={[
        'Bilingual medical and coordination support',
        'Fast response for first-time consultations',
        'In-person and virtual care options',
        'Clear guidance before your first appointment'
      ]}
    />
  );
}
