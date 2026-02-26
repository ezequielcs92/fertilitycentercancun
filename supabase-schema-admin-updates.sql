-- ============================================
-- Fertility Center Cancun - FASE 3: ADMIN
-- Modificaciones para el Panel de Administración
-- ============================================

-- 1. Actualizar tabla equipo_medico para incluir nuevos campos
ALTER TABLE public.equipo_medico 
ADD COLUMN IF NOT EXISTS telefono TEXT,
ADD COLUMN IF NOT EXISTS ubicacion TEXT,
ADD COLUMN IF NOT EXISTS perfil_profesional TEXT,
ADD COLUMN IF NOT EXISTS experiencia_profesional JSONB DEFAULT '[]'::jsonb;

-- 2. Asegurar que la tabla testimonios_pacientes existe con los campos correctos
CREATE TABLE IF NOT EXISTS public.testimonios_pacientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  calificacion INTEGER CHECK (calificacion >= 1 AND calificacion <= 5),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en testimonios_pacientes
ALTER TABLE public.testimonios_pacientes ENABLE ROW LEVEL SECURITY;

-- Políticas para testimonios_pacientes
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir inserción pública de testimonios') THEN
        CREATE POLICY "Permitir inserción pública de testimonios"
          ON public.testimonios_pacientes FOR INSERT
          WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins gestionan testimonios') THEN
        CREATE POLICY "Admins gestionan testimonios"
          ON public.testimonios_pacientes FOR ALL
          USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 3. Tabla para Configuración Global (Bandeja de entrada, etc.)
CREATE TABLE IF NOT EXISTS public.configuracion_admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clave TEXT UNIQUE NOT NULL,
    valor JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insertar configuración inicial para email receptor
INSERT INTO public.configuracion_admin (clave, valor) 
VALUES ('email_contacto', '{"email": "info@fertilitycentercancun.com"}'::jsonb)
ON CONFLICT (clave) DO NOTHING;

-- COMENTARIOS
COMMENT ON COLUMN public.equipo_medico.experiencia_profesional IS 'Lista de objetos JSON con: rango (string), titulo (string), descripcion (text)';
