-- ============================================
-- Fertility Center Cancun - FASE 2
-- Blog System + Admin Panel
-- ============================================

-- ============================================
-- TABLA: categorias
-- ============================================

CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insertar categorías iniciales
INSERT INTO public.categorias (nombre, slug, descripcion) VALUES
  ('Tratamientos', 'tratamientos', 'Información sobre tratamientos de fertilidad'),
  ('Noticias Científicas', 'noticias-cientificas', 'Últimos avances en reproducción asistida'),
  ('Testimonios', 'testimonios', 'Historias reales de nuestros pacientes'),
  ('Guías de Fertilidad', 'guias-fertilidad', 'Guías completas sobre fertilidad'),
  ('Lifestyle & Wellness', 'lifestyle-wellness', 'Consejos de salud y bienestar')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TABLA: posts (Blog)
-- ============================================

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  contenido_html TEXT NOT NULL,
  extracto TEXT,
  imagen_banner_url TEXT,
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
  autor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  fecha_publicacion TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para optimizar consultas del blog
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_categoria ON public.posts(categoria_id);
CREATE INDEX IF NOT EXISTS idx_posts_fecha_pub ON public.posts(fecha_publicacion DESC);
CREATE INDEX IF NOT EXISTS idx_posts_created ON public.posts(created_at DESC);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE
    ON public.posts FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: equipo_medico
-- ============================================

CREATE TABLE IF NOT EXISTS public.equipo_medico (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  especialidad TEXT NOT NULL,
  bio TEXT,
  foto_url TEXT,
  orden INTEGER DEFAULT 0,
  linkedin_url TEXT,
  email TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índice para ordenamiento por posición
CREATE INDEX IF NOT EXISTS idx_equipo_orden ON public.equipo_medico(orden);
CREATE INDEX IF NOT EXISTS idx_equipo_activo ON public.equipo_medico(activo);

-- ============================================
-- TABLA: podcasts
-- ============================================

CREATE TABLE IF NOT EXISTS public.podcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  url_audio TEXT NOT NULL,
  descripcion TEXT,
  duracion_segundos INTEGER,
  thumbnail_url TEXT,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_podcasts_fecha ON public.podcasts(fecha DESC);

-- ============================================
-- TABLA: comentarios
-- ============================================

CREATE TABLE IF NOT EXISTS public.comentarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  contenido TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comentarios_post ON public.comentarios(post_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_status ON public.comentarios(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Categorías: Lectura pública
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorías son públicas"
  ON public.categorias FOR SELECT
  USING (true);

CREATE POLICY "Solo admins pueden gestionar categorías"
  ON public.categorias FOR ALL
  USING (auth.role() = 'authenticated');

-- Posts: Solo publicados son públicos
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts publicados son públicos"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Solo admins pueden gestionar posts"
  ON public.posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Equipo Médico: Público
ALTER TABLE public.equipo_medico ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipo activo es público"
  ON public.equipo_medico FOR SELECT
  USING (activo = true);

CREATE POLICY "Solo admins pueden gestionar equipo"
  ON public.equipo_medico FOR ALL
  USING (auth.role() = 'authenticated');

-- Podcasts: Público
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Podcasts son públicos"
  ON public.podcasts FOR SELECT
  USING (true);

CREATE POLICY "Solo admins pueden gestionar podcasts"
  ON public.podcasts FOR ALL
  USING (auth.role() = 'authenticated');

-- Comentarios: Inserción pública, lectura solo aprobados
ALTER TABLE public.comentarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inserción pública de comentarios"
  ON public.comentarios FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Comentarios aprobados son públicos"
  ON public.comentarios FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Solo admins pueden moderar comentarios"
  ON public.comentarios FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Solo admins pueden eliminar comentarios"
  ON public.comentarios FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKETS (Ejecutar en Storage)
-- ============================================

-- Crear buckets (esto se hace desde la UI de Supabase o vía API)
-- 1. blog-images (público)
-- 2. team-photos (público)

-- Políticas de storage (ejemplo para blog-images)
-- Se configuran en: Storage > blog-images > Policies

/*
-- Lectura pública
CREATE POLICY "Lectura pública de imágenes del blog"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Solo admins pueden subir
CREATE POLICY "Solo admins suben imágenes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Solo admins pueden actualizar
CREATE POLICY "Solo admins actualizan imágenes"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
);

-- Solo admins pueden eliminar
CREATE POLICY "Solo admins eliminan imágenes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
);
*/

-- ============================================
-- COMENTARIOS DE DOCUMENTACIÓN
-- ============================================

COMMENT ON TABLE public.categorias IS 'Categorías para organizar los posts del blog';
COMMENT ON TABLE public.posts IS 'Posts del blog médico con contenido HTML';
COMMENT ON TABLE public.equipo_medico IS 'Perfiles del equipo médico de la clínica';
COMMENT ON TABLE public.podcasts IS 'Episodios de podcast sobre fertilidad';
COMMENT ON TABLE public.comentarios IS 'Comentarios de usuarios en posts del blog (requieren moderación)';

COMMENT ON COLUMN public.posts.status IS 'Estado del post: draft (borrador) o published (publicado)';
COMMENT ON COLUMN public.posts.slug IS 'URL-friendly identifier único para el post';
COMMENT ON COLUMN public.posts.views IS 'Contador de visualizaciones del post';
COMMENT ON COLUMN public.comentarios.status IS 'Estado del comentario: pending (pendiente), approved (aprobado), rejected (rechazado)';
