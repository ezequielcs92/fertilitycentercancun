-- ============================================
-- Fertility Center Cancun - Database Schema
-- Tabla: leads
-- ============================================

-- Crear tabla para almacenar leads del formulario de contacto
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  pais TEXT,
  tratamiento TEXT,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Habilitar RLS en la tabla
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política: Permitir INSERT sin autenticación (formulario público)
CREATE POLICY "Permitir inserción pública de leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden leer leads
-- (Se actualizará más adelante cuando implementes autenticación para admin)
CREATE POLICY "Solo admins pueden leer leads"
  ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- Índices para optimizar consultas
-- ============================================

-- Índice para búsqueda por email
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

-- Índice para ordenar por fecha de creación
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Índice para filtrar por tratamiento
CREATE INDEX IF NOT EXISTS idx_leads_tratamiento ON public.leads(tratamiento);

-- ============================================
-- Comentarios de documentación
-- ============================================

COMMENT ON TABLE public.leads IS 'Almacena los leads generados desde el formulario de contacto del sitio web';
COMMENT ON COLUMN public.leads.id IS 'Identificador único del lead';
COMMENT ON COLUMN public.leads.nombre IS 'Nombre completo del prospecto';
COMMENT ON COLUMN public.leads.email IS 'Email de contacto';
COMMENT ON COLUMN public.leads.telefono IS 'Número de teléfono (opcional)';
COMMENT ON COLUMN public.leads.pais IS 'País de origen del prospecto';
COMMENT ON COLUMN public.leads.tratamiento IS 'Tratamiento de interés';
COMMENT ON COLUMN public.leads.mensaje IS 'Mensaje o consulta adicional (opcional)';
COMMENT ON COLUMN public.leads.created_at IS 'Fecha y hora de creación del lead';
