import React from 'react';
import EnglishInfoPage from '@/components/layout/EnglishInfoPage';

export default function Page() {
  return (
    <EnglishInfoPage
      title="About Fertility Center Cancun"
      breadcrumbSection="About Us"
      subtitle="A fertility center focused on science, empathy, and personalized care."
      intro="Advanced Fertility Center Cancun integrates reproductive specialists, embryology experts, and international patient support to provide high-quality care with transparent medical planning."
      highlights={[
        'Multidisciplinary reproductive medicine team',
        'Advanced laboratory and clinical protocols',
        'Personalized treatment pathways',
        'International patient coordination and follow-up'
      ]}
    />
  );
}
