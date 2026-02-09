
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Programa de referidos" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Programa de referidos', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `<h2>Tu recomendación no solo tiene recompensa, también puede cambiar vidas. Ayúdanos a llevar esperanza a más familias.\n</h2> \n <h2>¡Comparte tu experiencia y recibe beneficios exclusivos!\n</h2> \n <p>En Advanced Fertility Center Cancún, agradecemos la confianza de nuestros pacientes. Por eso, hemos creado un programa de referidos especialmente pensado para ti:</p> \n <h2>¿Qué beneficios puedes obtener?\n</h2> \n <h2>1 año de almacenamiento gratuito\n</h2> \n <h2> Aplica para embriones, óvulos o viales.\n Válido si la persona referida inicia tratamiento con nosotros.</h2> \n <h2>Descuento en tu anualidad de almacenamiento</h2> \n <h2> Por cada persona que agende una videollamada de cortesía gracias a tu recomendación.</h2> \n <h2> ¿Cómo funciona?</h2> \n <ol><li>Comparte tu experiencia con amigos, familiares o personas que podrían beneficiarse de nuestros tratamientos.</li><li>Puedes referirlos de dos formas:<ol><li>Compartiendo los datos de contacto de tu ejecutiva comercial responsable.</li><li>O bien, enviando un correo a: <a href=\"mailto:info@fertilitycentermexico.com.mx\">info@fertilitycentermexico.com.mx</a></li></ol></li><li>Asegúrate de que mencionen tu nombre completo al agendar.</li><li>Una vez confirmada la videollamada o el inicio del tratamiento, recibirás tu beneficio.</li></ol> \n <h2>¡También aplica para pacientes internacionales!</h2>` }} />
      </Container>
    </main>
  );
}
