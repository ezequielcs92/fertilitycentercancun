
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Transferencia de embriones congelados" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Transferencia de embriones congelados', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `Es un proceso mediante el que se desvitrifica (descongela) uno o dos embriones y se transfiere(n) al útero preparado para recibirlo(s). \n <a href=\"#\">\n <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 476.213 476.213\" style=\"enable-background:new 0 0 476.213 476.213;\" xml:space=\"preserve\"><polygon points=\"405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 405.606,308.713 476.213,238.106 \"></polygon><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \n Contactar ahora\n </a>\n <img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/plugins/elementor/assets/images/placeholder.png\" title=\"\" alt=\"\" loading=\"lazy\" /> \n <img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/plugins/elementor/assets/images/placeholder.png\" title=\"\" alt=\"\" loading=\"lazy\" /> \n Se realiza una preparación endometrial para lograr las características necesarias para recibir al embrión. Se desvitrifica el embrión para transferir. \n <img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/plugins/elementor/assets/images/placeholder.png\" title=\"\" alt=\"\" loading=\"lazy\" /> \n <img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/plugins/elementor/assets/images/placeholder.png\" title=\"\" alt=\"\" loading=\"lazy\" /> \n Se realiza transferencia en quirófano guiada mediante ultrasonido. \n <h2>Expertos en fertilidad y reproducción asistida</h2> \n <a href=\"#\">\n <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 476.213 476.213\" style=\"enable-background:new 0 0 476.213 476.213;\" xml:space=\"preserve\"><polygon points=\"405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 405.606,308.713 476.213,238.106 \"></polygon><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \n Contactar ahora\n </a>` }} />
      </Container>
    </main>
  );
}
