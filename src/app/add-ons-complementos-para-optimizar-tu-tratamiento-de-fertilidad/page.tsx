
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Add-Ons: Complementos para Optimizar tu Tratamiento de Fertilidad" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Add-Ons: Complementos para Optimizar tu Tratamiento de Fertilidad', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `En <strong>Advanced Fertility Center Cancún</strong> sabemos que cada paciente es único, por eso ofrecemos una variedad de tratamientos complementarios que pueden aumentar tus probabilidades de éxito y mejorar tu bienestar durante todo el proceso. Estos <strong>add-ons</strong> se integran de forma personalizada según tus necesidades médicas y emocionales.\r\n\r\n<img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Intralipidos.png\" alt=\"\" width=\"800\" height=\"800\" />\r\n<h2>Intralípidos</h2>\r\nUna infusión diseñada para modular el sistema inmunológico, especialmente útil en pacientes con antecedentes de fallo recurrente de implantación o aborto espontáneo. Ayuda a reducir la inflamación y mejorar el ambiente uterino para favorecer la implantación embrionaria.\r\n\r\n<img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/PRP-Plasma-Rico-en-Plaquetas.png\" alt=\"\" width=\"800\" height=\"800\" />\r\n<h2>PRP (Plasma Rico en Plaquetas)</h2>\r\nTerapia regenerativa que utiliza factores de crecimiento extraídos de tu propia sangre para mejorar la calidad del endometrio o estimular la función ovárica. Esta técnica puede ser beneficiosa en casos de baja respuesta ovárica o endometrios delgados.\r\n\r\n<img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Acupuntura.png\" alt=\"\" width=\"800\" height=\"800\" />\r\n<h2>Acupuntura</h2>\r\nUna práctica milenaria que favorece la relajación, mejora la circulación sanguínea y equilibra el sistema hormonal. Muchos estudios sugieren que la acupuntura puede aumentar las tasas de implantación y disminuir el estrés durante los tratamientos de fertilidad.\r\n\r\n<img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Acompanamiento-Emocional.png\" alt=\"\" width=\"800\" height=\"800\" />\r\n<h2>Acompañamiento Emocional</h2>\r\nEntendemos que la fertilidad puede ser un camino emocionalmente desafiante. Por eso, ofrecemos apoyo psicológico especializado durante todo el proceso, ayudándote a manejar la ansiedad, el estrés y fortaleciendo tu bienestar mental y emocional.\r\n\r\n<img src=\"https://www.bh-desarrollosweb.com/fertilitycentermexico/wp-content/uploads/2025/06/Embryo-Glue.png\" alt=\"\" width=\"800\" height=\"800\" />\r\n<h2>Embryo Glue</h2>\r\nUn medio especial que se aplica durante la transferencia embrionaria para mejorar la adhesión del embrión al útero, aumentando las probabilidades de implantación y embarazo exitoso.\r\n\r\nCada uno de estos complementos es evaluado y recomendado por nuestro equipo médico y coordinadores para asegurar que recibas la mejor atención personalizada, basada en la evidencia y con un enfoque humano y respetuoso.\r\n\r\n<strong>¿Quieres saber cuáles add-ons pueden ser adecuados para ti?</strong>\r\n\r\nAgenda tu consulta con nosotros y déjanos acompañarte en cada paso hacia tu sueño de ser mamá o papá.` }} />
      </Container>
    </main>
  );
}
