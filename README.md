# 🚀 Fertility Center Cancun - Sistema Blog Autoadministrable

## ✅ Estado del Proyecto

### Fase 1: COMPLETADA ✅
- Formulario de contacto funcional
- Integración con Supabase
- Diseño médico premium

### Fase 2: EN PROGRESO 🔄

**Completado**:
- ✅ Base de datos blog (schema SQL)
- ✅ Blog público (`/blog`)
- ✅ Posts individuales (`/blog/[slug]`)
- ✅ Filtros por categoría
- ✅ Sistema de comentarios
- ✅ SEO (sitemap.xml, RSS feed)
- ✅ Script de migración WordPress

**Pendiente**:
- 🔲 Panel admin (`/admin`)
- 🔲 Editor rich text (TipTap)
- 🔲 Autenticación admin

---

## 📋 Pasos para Configurar

### 1. Ejecutar SQL en Supabase

**Archivo**: [`supabase-schema-fase2.sql`](supabase-schema-fase2.sql)

1. Ve a: https://supabase.com/dashboard/project/albhkcvkihratkrxcavi/sql/new
2. Copia y pega el contenido completo del archivo
3. Click "Run"

**Tablas que se crearán**:
- `categorias` (5 categorías predefinidas)
- `posts` (blog)
- `equipo_medico` (equipo médico)
- `podcasts` (contenido audio)
- `comentarios` (con moderación)

---

### 2. Crear Storage Buckets

1. Ve a: Storage → Create bucket
2. Crear bucket: **`blog-images`** (público)
3. Crear bucket: **`team-photos`** (público)

**Configurar políticas**:
- Lectura: Pública
- Subida: Solo autenticados

---

### 3. Migrar WordPress (Opcional)

Si tienes el XML de WordPress:

```bash
cd scripts
npm install
npm run migrate
```

**Requisitos**:
- Archivo `fertility.WordPress.2026-02-07.xml` en la raíz del proyecto
- Buckets de Supabase creados

---

### 4. Probar el Blog

```bash
npm run dev
```

Visitar:
- http://localhost:3000/blog
- http://localhost:3000/sitemap.xml
- http://localhost:3000/rss.xml

---

## 📁 Estructura Creada

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx                    # Listado posts
│   │   ├── [slug]/page.tsx             # Post individual
│   │   └── categoria/[categoria]/      # Filtro categoría
│   ├── sitemap.ts                      # SEO sitemap
│   └── rss.xml/route.ts               # RSS feed
├── components/
│   └── blog/
│       ├── BlogGrid.tsx                # Grid de posts
│       ├── PostContent.tsx             # Render HTML
│       ├── CommentSection.tsx          # Comentarios
│       └── RelatedPosts.tsx            # Posts relacionados
└── lib/
    └── actions/
        ├── posts.ts                    # Server Actions blog
        └── comments.ts                 # Server Actions comentarios
```

---

## 🎯 Próximos Pasos

### Admin Panel (En desarrollo)

1. **Autenticación**:
   - Login con Supabase Auth
   - Protección de rutas `/admin`

2. **Blog Manager**:
   - Editor TipTap para posts
   - CRUD completo
   - Preview antes de publicar

3. **Moderación**:
   - Aprobar/rechazar comentarios
   - Gestión de leads del formulario

---

## 📚 Documentación

- **Plan completo**: [`implementation_plan.md`](implementation_plan.md)
- **Tareas**: [`task.md`](task.md)
- **Script migración**: [`scripts/migrate-wordpress.js`](scripts/migrate-wordpress.js)

---

## 🐛 Troubleshooting

### "No se encuentra la tabla posts"
→ Ejecutar `supabase-schema-fase2.sql` en Supabase

### "Error al subir imagen"
→ Verificar que los buckets de Storage existan y sean públicos

### "No aparecen los posts"
→ Asegurarse que los posts tengan `status = 'published'`

---

## ✨ Features Implementadas

- ✅ ISR (revalidación cada 60s)
- ✅ SEO completo (OpenGraph, meta tags)
- ✅ Sitemap dinámico
- ✅ RSS feed
- ✅ Comentarios con moderación
- ✅ Filtros por categoría
- ✅ Posts relacionados
- ✅ Contador de vistas
- ✅ Diseño médico responsive
