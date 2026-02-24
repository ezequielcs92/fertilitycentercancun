
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Laboratories and Services" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Laboratories and Services', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `At <strong>Advanced Fertility Center Cancún</strong>, we offer a full range of specialized medical services to support you every step of the way on your journey to parenthood. We have state-of-the-art facilities and a highly trained team of professionals to provide you with the most advanced and personalized care.\r\n\r\n<img src=\"/images/wp/2025_07_Diagnostico-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Diagnostico-430x290-1.jpg 430w, /images/wp/2025_07_Diagnostico-430x290-1-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nFertility Diagnosis\r\n</a>\r\n<img src=\"/images/wp/2025_07_Ginecologia-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Ginecologia-430x290-1.jpg 430w, /images/wp/2025_07_Ginecologia-430x290-1-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nGynecology and Obstetrics\r\n</a>\r\n<img src=\"/images/wp/2025_07_Laboratorio-de-andrologia-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Laboratorio-de-andrologia-430x290-1.jpg 430w, /images/wp/2025_07_Laboratorio-de-andrologia-430x290-1-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nAndrology Laboratory\r\n</a>\r\n<img src=\"/images/wp/2025_07_Laboratorio-clinico-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Laboratorio-clinico-430x290-1.jpg 430w, /images/wp/2025_07_Laboratorio-clinico-430x290-1-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nClinical Analysis\r\n</a>\r\n<img src=\"/images/wp/2025_07_Materno-fetal-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Materno-fetal-430x290-1.jpg 430w, /images/wp/2025_07_Materno-fetal-430x290-1-300x202.jpg 300w\" alt=\"Embarazo en ciclo natural - Materno fetal\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nMaternal-Fetal Medicine\r\n</a>\r\n<img src=\"/images/wp/2025_07_Acompanamiento-emocional-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Acompanamiento-emocional-430x290-1.jpg 430w, /images/wp/2025_07_Acompanamiento-emocional-430x290-1-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nEmotional and Psychological Support\r\n</a>\r\n<img src=\"/images/wp/2025_07_Acupuntura-430x290-1.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_07_Acupuntura-430x290-1.jpg 430w, /images/wp/2025_07_Acupuntura-430x290-1-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nAcupuncture\r\n</a>\r\n<img src=\"/images/wp/2025_10_intralipidos-001.jpg\" sizes=\"(max-width: 430px) 100vw, 430px\" srcset=\"/images/wp/2025_10_intralipidos-001.jpg 430w, /images/wp/2025_10_intralipidos-001-300x202.jpg 300w\" alt=\"\" width=\"430\" height=\"290\" />\r\n<a role=\"button\">\r\n\r\nIntralipids\r\n</a>` }} />
      </Container>
    </main>
  );
}
