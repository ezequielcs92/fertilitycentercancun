import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Optimización activa: Next sirve WebP/AVIF redimensionado. Requiere `sharp`
    // en dependencies (ya declarado) también en el runtime standalone.
    formats: ['image/avif', 'image/webp'],
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
