
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Add-Ons: Enhancements to Optimize Your Fertility Treatment" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Add-Ons: Enhancements to Optimize Your Fertility Treatment', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `<p>At <strong>Advanced Fertility Center Cancún</strong>, we understand that every patient is unique. That’s why we offer a variety of complementary treatments that can increase your chances of success and improve your well-being throughout the entire process. These add-ons are personalized to meet your specific medical and emotional needs.</p> \n <img width=\"800\" height=\"800\" src=\"/images/wp/2025_06_Intralipidos-2.png\" alt=\"\" /> \n <h2>Intralipids</h2> \n <p>An infusion designed to modulate the immune system, especially helpful for patients with a history of recurrent implantation failure or miscarriage. It helps reduce inflammation and improves the uterine environment to favor embryo implantation.</p> \n <img width=\"800\" height=\"800\" src=\"/images/wp/2025_06_PRP-Plasma-Rico-en-Plaquetas-1.png\" alt=\"\" /> \n <h2>PRP (Platelet-Rich Plasma)</h2> \n <p>A regenerative therapy that uses growth factors extracted from your own blood to improve endometrial quality or stimulate ovarian function. This technique can be beneficial in cases of poor ovarian response or thin endometrium.</p> \n <img width=\"800\" height=\"800\" src=\"/images/wp/2025_06_Acupuntura-1.png\" alt=\"\" /> \n <h2>Acupuncture</h2> \n An ancient practice that promotes relaxation, improves blood circulation, and balances the hormonal system. Many studies suggest that acupuncture can increase implantation rates and reduce stress during fertility treatments. \n <img width=\"800\" height=\"800\" src=\"/images/wp/2025_06_Acompanamiento-Emocional-1.png\" alt=\"\" /> \n <h2>Emotional Support</h2> \n <p>We understand that fertility can be an emotionally challenging journey. That’s why we offer specialized psychological support throughout the entire process, helping you manage anxiety and stress while strengthening your mental and emotional well-being.</p> \n <img width=\"800\" height=\"800\" src=\"/images/wp/2025_06_Embryo-Glue-2.png\" alt=\"\" /> \n <h2>Embryo Glue</h2> \n <p>A special medium applied during embryo transfer to enhance the embryo’s adhesion to the uterus, increasing the chances of implantation and a successful pregnancy.</p><p>Each of these add-ons is carefully evaluated and recommended by our medical team and coordinators to ensure you receive the best personalized care, based on evidence and delivered with a compassionate and respectful approach.</p><p>Want to know which add-ons might be right for you? Schedule your consultation with us and let us support you every step of the way toward your dream of becoming a mom or dad.</p><p><strong>Do you want to know which add-ons might be right for you?</strong></p><p>Schedule your consultation with us and let us guide you every step of the way toward your dream of becoming a mom or dad.</p>` }} />
      </Container>
    </main>
  );
}
