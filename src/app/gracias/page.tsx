
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';

export default function Page() {
  return (
    <main className="bg-white pb-24">
      <PageHeader 
        title="Gracias" 
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Gracias', href: '#' }
        ]}
      />
      <Container className="pt-16 prose prose-lg prose-violet max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: `<h2>¡Gracias por su confianza!\n</h2> \n <h2>Mientras te relajas nosotros hacemos tus sueños realidad.\n</h2> \n <a href=\"#\">\n <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.009 512.009\" style=\"enable-background:new 0 0 512.009 512.009;\" xml:space=\"preserve\"><g>	<g> <path d=\"M508.625,247.801L508.625,247.801L392.262,131.437c-4.18-4.881-11.526-5.45-16.407-1.269 c-4.881,4.18-5.45,11.526-1.269,16.407c0.39,0.455,0.814,0.88,1.269,1.269l96.465,96.582H11.636C5.21,244.426,0,249.636,0,256.063 s5.21,11.636,11.636,11.636H472.32l-96.465,96.465c-4.881,4.18-5.45,11.526-1.269,16.407s11.526,5.45,16.407,1.269 c0.455-0.39,0.88-0.814,1.269-1.269l116.364-116.364C513.137,259.67,513.137,252.34,508.625,247.801z\"></path>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \n Visita nuestro blog\n </a>\n <a href=\"#\">\n <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.009 512.009\" style=\"enable-background:new 0 0 512.009 512.009;\" xml:space=\"preserve\"><g>	<g> <path d=\"M508.625,247.801L508.625,247.801L392.262,131.437c-4.18-4.881-11.526-5.45-16.407-1.269 c-4.881,4.18-5.45,11.526-1.269,16.407c0.39,0.455,0.814,0.88,1.269,1.269l96.465,96.582H11.636C5.21,244.426,0,249.636,0,256.063 s5.21,11.636,11.636,11.636H472.32l-96.465,96.465c-4.881,4.18-5.45,11.526-1.269,16.407s11.526,5.45,16.407,1.269 c0.455-0.39,0.88-0.814,1.269-1.269l116.364-116.364C513.137,259.67,513.137,252.34,508.625,247.801z\"></path>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \n Escucha nuestro podcastblog\n </a>\n <h2>Síguenos para saber todo sobre la fertilidad</h2> \n <a href=\"https://www.facebook.com/AdvancedFertilityCenterCancun\" target=\"_blank\" rel=\"nofollow noopener\">\n Facebook\n </a>\n <a href=\"https://www.instagram.com/advancedfertilitycentercancun/\" target=\"_blank\" rel=\"nofollow noopener\">\n Instagram\n </a>\n <a href=\"https://www.youtube.com/channel/UCC2jGdKaXHDn9G6J0NcSjAQ\" target=\"_blank\" rel=\"nofollow noopener\">\n Youtube\n </a>\n <a href=\"https://mx.pinterest.com/fertilitycancun/_created/\" target=\"_blank\" rel=\"nofollow noopener\">\n Pinterest\n </a>\n <a href=\"https://www.linkedin.com/company/fertility-center-cancun/\" target=\"_blank\" rel=\"nofollow noopener\">\n Linkedin\n </a>\n <a href=\"https://www.tiktok.com/@fertilitycentercancun\" target=\"_blank\" rel=\"nofollow noopener\">\n Tiktok\n </a>\n <a href=\"https://x.com/fertilitycc\" target=\"_blank\" rel=\"nofollow noopener\">\n Twitter\n </a>\n <a href=\"https://open.spotify.com/show/4jzZYLfhfb3xiXaYpB8WQC\" target=\"_blank\" rel=\"nofollow noopener\">\n Spotify\n </a>` }} />
      </Container>
    </main>
  );
}
