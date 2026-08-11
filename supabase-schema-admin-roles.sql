-- ============================================
-- CONTROL DE ACCESO POR ROL PARA EL PANEL ADMIN
-- ============================================
--
-- Problema que resuelve: hasta ahora todas las políticas usaban
-- `auth.role() = 'authenticated'`, por lo que CUALQUIER usuario registrado en el
-- proyecto de Supabase podía escribir contenido y leer la tabla `leads`
-- (datos personales de pacientes).
--
-- Ejecutar completo en: Supabase Dashboard > SQL Editor.
-- Es idempotente: se puede correr varias veces sin efectos secundarios.

-- --------------------------------------------
-- 1. Tabla de administradores
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------
-- 2. Helper: ¿el usuario actual es administrador?
-- --------------------------------------------
-- SECURITY DEFINER para que la función pueda leer admin_users sin quedar
-- atrapada en la RLS de la propia tabla (evita recursión infinita).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

DROP POLICY IF EXISTS "Admins ven la lista de admins" ON public.admin_users;
CREATE POLICY "Admins ven la lista de admins"
  ON public.admin_users FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins gestionan admins" ON public.admin_users;
CREATE POLICY "Admins gestionan admins"
  ON public.admin_users FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------
-- 3. IMPORTANTE — Alta del primer administrador
-- --------------------------------------------
-- Sin este paso te quedas fuera del panel. Sustituye el correo por el tuyo y
-- descomenta:
--
-- INSERT INTO public.admin_users (user_id, email)
-- SELECT id, email FROM auth.users WHERE email = 'tu-correo@afcc.com.mx'
-- ON CONFLICT (user_id) DO NOTHING;
--
-- Para ver qué cuentas existen hoy en el proyecto:
--   SELECT id, email, created_at FROM auth.users ORDER BY created_at;

-- --------------------------------------------
-- 4. Sustituir las políticas permisivas por control de rol
-- --------------------------------------------

-- Leads (datos personales de pacientes): solo admins pueden leerlos.
DROP POLICY IF EXISTS "Solo admins pueden leer leads" ON public.leads;
CREATE POLICY "Solo admins pueden leer leads"
  ON public.leads FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Solo admins gestionan leads" ON public.leads;
CREATE POLICY "Solo admins gestionan leads"
  ON public.leads FOR DELETE
  USING (public.is_admin());

-- Categorías
DROP POLICY IF EXISTS "Solo admins pueden gestionar categorías" ON public.categorias;
CREATE POLICY "Solo admins pueden gestionar categorías"
  ON public.categorias FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Posts
DROP POLICY IF EXISTS "Solo admins pueden gestionar posts" ON public.posts;
CREATE POLICY "Solo admins pueden gestionar posts"
  ON public.posts FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Los borradores solo son visibles para admins.
DROP POLICY IF EXISTS "Admins ven todos los posts" ON public.posts;
CREATE POLICY "Admins ven todos los posts"
  ON public.posts FOR SELECT
  USING (public.is_admin());

-- Equipo médico
DROP POLICY IF EXISTS "Solo admins pueden gestionar equipo" ON public.equipo_medico;
CREATE POLICY "Solo admins pueden gestionar equipo"
  ON public.equipo_medico FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins ven todo el equipo" ON public.equipo_medico;
CREATE POLICY "Admins ven todo el equipo"
  ON public.equipo_medico FOR SELECT
  USING (public.is_admin());

-- Podcasts
DROP POLICY IF EXISTS "Solo admins pueden gestionar podcasts" ON public.podcasts;
CREATE POLICY "Solo admins pueden gestionar podcasts"
  ON public.podcasts FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Comentarios
DROP POLICY IF EXISTS "Solo admins pueden moderar comentarios" ON public.comentarios;
CREATE POLICY "Solo admins pueden moderar comentarios"
  ON public.comentarios FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Solo admins pueden eliminar comentarios" ON public.comentarios;
CREATE POLICY "Solo admins pueden eliminar comentarios"
  ON public.comentarios FOR DELETE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins ven todos los comentarios" ON public.comentarios;
CREATE POLICY "Admins ven todos los comentarios"
  ON public.comentarios FOR SELECT
  USING (public.is_admin());

-- Testimonios de pacientes
DROP POLICY IF EXISTS "Admins gestionan testimonios" ON public.testimonios_pacientes;
CREATE POLICY "Admins gestionan testimonios"
  ON public.testimonios_pacientes FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Mensajes de contacto
DROP POLICY IF EXISTS "Admins gestionan mensajes" ON public.mensajes_contacto;
CREATE POLICY "Admins gestionan mensajes"
  ON public.mensajes_contacto FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Configuración del sitio
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_schema = 'public' AND table_name = 'site_settings') THEN
    EXECUTE 'ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Configuración legible" ON public.site_settings';
    EXECUTE 'CREATE POLICY "Configuración legible" ON public.site_settings FOR SELECT USING (true)';
    EXECUTE 'DROP POLICY IF EXISTS "Solo admins editan configuración" ON public.site_settings';
    EXECUTE 'CREATE POLICY "Solo admins editan configuración" ON public.site_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin())';
  END IF;
END $$;

-- --------------------------------------------
-- 5. Storage: solo admins suben/borran imágenes
-- --------------------------------------------
DROP POLICY IF EXISTS "Solo admins suben imágenes" ON storage.objects;
CREATE POLICY "Solo admins suben imágenes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id IN ('blog-images', 'team-photos') AND public.is_admin());

DROP POLICY IF EXISTS "Solo admins actualizan imágenes" ON storage.objects;
CREATE POLICY "Solo admins actualizan imágenes"
  ON storage.objects FOR UPDATE
  USING (bucket_id IN ('blog-images', 'team-photos') AND public.is_admin());

DROP POLICY IF EXISTS "Solo admins eliminan imágenes" ON storage.objects;
CREATE POLICY "Solo admins eliminan imágenes"
  ON storage.objects FOR DELETE
  USING (bucket_id IN ('blog-images', 'team-photos') AND public.is_admin());

-- --------------------------------------------
-- 6. Recordatorio de configuración del proyecto
-- --------------------------------------------
-- Authentication > Providers > Email: desactivar "Enable Sign Ups".
-- Con el alta abierta cualquiera puede crearse una cuenta; esta migración
-- impide que esa cuenta sea administradora, pero el registro debe cerrarse igual.
