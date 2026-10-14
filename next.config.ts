import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Optimización activa: Next sirve WebP/AVIF redimensionado. Requiere `sharp`
    // en dependencies (ya declarado) también en el runtime standalone.
    formats: ['image/avif', 'image/webp'],
    // Optimizar una foto de donante en frío cuesta ~2,5 s de CPU, así que
    // interesa reutilizar el resultado el máximo tiempo posible. Hoy el
    // servidor de Moscú manda `max-age=2592000` y Next lo respeta, pero si
    // algún día deja de mandarlo, sin este suelo la caché caducaría enseguida
    // y cada visita volvería a pagar esos 2,5 s por imagen.
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fertilitycentercancun.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      // Fotografías del catálogo de donantes. Las sirve la clínica de Moscú
      // desde los mismos dominios que publican los feeds XML: `esp.` es el
      // feed en castellano y el dominio pelado el de inglés.
      {
        protocol: 'https',
        hostname: 'altravita-ivf.com',
      },
      {
        protocol: 'https',
        hostname: 'esp.altravita-ivf.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
