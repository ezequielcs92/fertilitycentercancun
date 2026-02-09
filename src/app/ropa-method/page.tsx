
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="ROPA Method" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'ROPA Method', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `<h2>A unique and special way to share motherhood for all families</h2> \n <p>At <strong>Advanced Fertility Center Cancún</strong>, we proudly support and celebrate family diversity, warmly and respectfully accompanying all couples, including the LGBT+ community. The <strong>ROPA method</strong> (Reception of Oocytes from Partner) is a treatment designed for female couples who wish to biologically share the experience of motherhood, strengthening their bond through a journey filled with love and collaboration.</p>\n <h2>What does the ROPA method involve?</h2> \n <p>This in vitro fertilization treatment allows one woman to provide her eggs, which are fertilized in the lab with <a href=\"#\">donor sperm</a> , and her partner carries the pregnancy, creating a shared and deeply meaningful experience. Both women actively participate in motherhood — one as the genetic mother and the other as the gestational mother.</p>\n <a href=\"https://api.whatsapp.com/send?phone=5219983050373&#038;text=I%20visited%20your%20website%20and%20would%20like%20to%20schedule%20my%20free%20video%20call.\" target=\"_blank\" rel=\"nofollow\">\n <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 476.213 476.213\" style=\"enable-background:new 0 0 476.213 476.213;\" xml:space=\"preserve\"><polygon points=\"405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 405.606,308.713 476.213,238.106 \"></polygon><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \n Contact now\n </a>\n <img width=\"550\" height=\"400\" src=\"https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-¿En-que-consiste-.jpg\" alt=\"\" srcset=\"https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-¿En-que-consiste-.jpg 550w, https://fertilitycentercancun.com/wp-content/uploads/2025/08/WEB-1.-¿En-que-consiste--300x218.jpg 300w\" sizes=\"(max-width: 550px) 100vw, 550px\" /> \n <h2>Who is it for?</h2> \n <ul>\n <li>\n Female couples who want to build their family by sharing biological motherhood.\n </li>\n <li>\n Women who, for any reason, cannot carry a pregnancy but wish to provide their eggs.\n </li>\n <li>\n Couples seeking a personalized and respectful option aligned with their wishes and values.\n </li>\n </ul>\n <h2>Advantages of the ROPA method</h2> \n <ul>\n <li>\n Strengthens the emotional and family bond from the very beginning.\n </li>\n <li>\n High success rates thanks to advanced IVF techniques.\n </li>\n <li>\n An inclusive, safe, and respectful process honoring all identities and family forms.\n </li>\n <li>\n Allows both women to be active participants in the motherhood experience.\n </li>\n </ul>\n <h2>Experts in fertility and assisted reproduction</h2> \n <a href=\"https://api.whatsapp.com/send?phone=5219983050373&#038;text=I%20visited%20your%20website%20and%20would%20like%20to%20schedule%20my%20free%20video%20call.\" target=\"_blank\" rel=\"nofollow\">\n <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 476.213 476.213\" style=\"enable-background:new 0 0 476.213 476.213;\" xml:space=\"preserve\"><polygon points=\"405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 405.606,308.713 476.213,238.106 \"></polygon><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \n Contact now\n </a>` }} />
      </Container>
    </main>
  );
}
