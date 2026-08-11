# Advanced Fertility Center Cancún — sitio web

Sitio público bilingüe (ES/EN) + panel de administración propio.

- **Framework**: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- **Estilos**: Tailwind CSS v4
- **Datos y auth**: Supabase (Postgres + Storage + Auth)
- **i18n**: next-intl (`localePrefix: 'always'`, todas las URLs llevan `/es` o `/en`)
- **Captación de leads**: Supabase + CRM Upnify (+ webhook genérico de respaldo) + correo vía Resend
- **Anti-spam**: Cloudflare Turnstile

---

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y rellena los valores
npm run dev
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (`output: 'standalone'`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run optimize:images` | Recomprime `public/` conservando rutas (ver más abajo) |

Las variables de entorno están documentadas una a una en [`.env.example`](.env.example).
Como mínimo necesitas `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## Estructura

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (public)/          # Rutas públicas con Navbar/Footer e i18n
│   │   │   ├── page.tsx           # Home
│   │   │   ├── [slug]/            # Resuelve TODAS las páginas de contenido
│   │   │   ├── blog/, podcast/, podcasts/[slug]/
│   │   │   ├── contacto/, equipo/, nosotros/, tratamientos/, experiencia/
│   │   └── layout.tsx         # Metadata base + NextIntlClientProvider
│   ├── admin/                 # Panel (sin prefijo de idioma, protegido)
│   ├── login/
│   ├── robots.ts, sitemap.ts, rss.xml/
├── content/pages/             # ~68 páginas de contenido — NO son rutas
│   └── registry.ts            # Fuente única: slug -> componente + SEO
├── components/                # ui/, layout/, sections/, forms/, admin/, blog/
├── lib/
│   ├── actions/               # Server Actions por dominio
│   ├── auth/admin.ts          # Autorización del panel
│   ├── supabase/              # client / server / public / middleware
│   └── seo.ts                 # Helper de metadata bilingüe
├── data/                      # FAQs, partners y contenido heredado de WordPress
├── i18n/                      # routing.ts + request.ts (next-intl)
└── proxy.ts                   # Middleware: sesión de admin + i18n
```

### Cómo añadir una página de contenido

1. Crea el componente en `src/content/pages/mi-slug.tsx`.
2. Regístralo en `src/content/pages/registry.ts` con su `locale`, `title`,
   `description` y, si aplica, `counterpart` (el slug equivalente en el otro idioma).

Con eso queda resuelta la ruta `/es/mi-slug`, su metadata, su `canonical`, su
`hreflang` y su entrada en el sitemap. **No** crees carpetas nuevas bajo
`src/app/`: cualquier directorio ahí se compila como ruta propia y duplica el
bundle.

---

## Panel de administración

Ruta `/admin`. El acceso exige dos cosas:

1. Sesión válida de Supabase (la fuerza `src/proxy.ts`).
2. Que la cuenta esté dada de alta como administradora — tabla `admin_users`
   o la variable `ADMIN_EMAILS` (ver `src/lib/auth/admin.ts`).

Todas las Server Actions de escritura repiten la comprobación con `requireAdmin()`,
y las políticas RLS la repiten en la base de datos.

Módulos: dashboard, blog, podcasts, categorías, equipo, testimonios, galería,
bandeja de contacto y configuración.

---

## Base de datos (Supabase)

Ejecutar en el SQL Editor, **en este orden**:

| Archivo | Contenido |
| --- | --- |
| `supabase-schema.sql` | Tabla `leads` |
| `supabase-schema-fase2.sql` | `categorias`, `posts`, `equipo_medico`, `podcasts`, `comentarios` |
| `supabase-schema-contact-messages.sql` | `mensajes_contacto` |
| `supabase-schema-admin-updates.sql` | `testimonios_pacientes` |
| `supabase-schema-admin-roles.sql` | **Control de acceso por rol** — obligatorio |

Buckets de Storage (públicos en lectura): `blog-images`, `team-photos`,
`galeria-familias`.

> `supabase-schema-admin-roles.sql` sustituye las políticas antiguas, que daban
> permisos de administración a *cualquier* usuario autenticado. Antes de
> ejecutarlo, descomenta el `INSERT` que da de alta al primer administrador o te
> quedarás fuera del panel. Y desactiva el alta de usuarios en
> *Authentication > Providers > Email*.

---

## SEO

- Metadata por página desde `src/content/pages/registry.ts` y, en las rutas
  fijas, con `buildRouteMetadata()` de `src/lib/seo.ts`.
- `canonical` y `hreflang` (incluido `x-default`) coherentes con el prefijo de
  idioma.
- `sitemap.xml` generado a partir del registro + las rutas fijas + los posts
  publicados; `robots.txt` en `src/app/robots.ts`; feed en `/rss.xml`.
- Al añadir contenido no hace falta tocar el sitemap: sale del registro.

---

## Imágenes

`next/image` está activo (WebP/AVIF, `sharp` en dependencias). Las fuentes de
`public/` se recomprimen con:

```bash
npm run optimize:images
```

El script limita el ancho a 2000 px y reescribe cada archivo **solo si el
resultado pesa menos**, conservando nombre, ruta y formato. Es lossy: ejecútalo
una sola vez sobre imágenes nuevas, no repetidamente sobre las mismas.
Usa `--dry-run` para ver el efecto sin escribir.

---

## Leads y CRM

El formulario publica en Supabase, en Upnify (una integración por idioma) y por
correo a las cuentas corporativas. El flujo acordado con el cliente y Upnify, los
nombres de campo que hay que configurar y la lista de comprobación de activación
están en [`crm-integracion.md`](crm-integracion.md).

---

## Contenido heredado de WordPress

La migración dejó volcados JSON de ~28 MB (`migrating_data.json`,
`extracted_wp_data.json`, `team_data.json`, `team_with_images.json`). **No están
versionados**: solo hacen falta para reejecutar los scripts de `scripts/` y se
pueden recuperar del historial (`git show <commit>:migrating_data.json`).

Lo que la aplicación sí necesita en runtime está extraído en:

- `src/data/legacy-posts.json` — artículos antiguos, respaldo de `/blog/[slug]`
  cuando el slug no existe en Supabase.
- `src/data/legacy-podcasts.json` — episodios antiguos servidos en `/podcasts/[slug]`.

---

## Despliegue

Docker multi-stage (`Dockerfile`) con `output: 'standalone'`. Ver
[`coolify_ubuntu_deploy.md`](coolify_ubuntu_deploy.md) y
[`deployment_guide.md`](deployment_guide.md).

Recuerda configurar en el entorno de producción todas las variables de
`.env.example`, en particular `NEXT_PUBLIC_SITE_URL` (de ella dependen canonical,
hreflang, sitemap y RSS).
