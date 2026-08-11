
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Referral program" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Referral program', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `<h2>Your referral doesn’t just earn rewards — it can change lives. Help us bring hope to more families.</h2>\r\n<h2>Share your experience and receive exclusive benefits!</h2>\r\nAt Advanced Fertility Center Cancún, we’re grateful for the trust our patients place in us. That’s why we’ve created a special referral program just for you:\r\n<h2>What can you earn?</h2>\r\n<h2>1 year of free storage</h2>\r\n<h2>Applies to embryos, eggs, or vials. Valid when the referred person begins treatment with us.</h2>\r\n<h2>Discount on your annual storage fee</h2>\r\n<h2>For every person who schedules a complimentary video consultation through your recommendation.</h2>\r\n<h2>How does it work?</h2>\r\n<ol>\r\n <li>Share your experience with friends, family, or anyone who could benefit from our care.</li>\r\n <li>You can refer them in two ways:\r\n<ol>\r\n <li>By sharing the contact information of your assigned patient care executive.</li>\r\n <li>Or by sending an email to: info@fertilitycentermexico.com.mx</li>\r\n</ol>\r\n</li>\r\n <li>Make sure they mention your full name when booking.</li>\r\n <li>You’ll receive your reward once their video consultation or treatment is confirmed.</li>\r\n</ol>\r\n<h2>Available for international patients too!</h2>` }} />
      </Container>
    </main>
  );
}
