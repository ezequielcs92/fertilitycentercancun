-- Tabla para Mensajes de Contacto
CREATE TABLE IF NOT EXISTS public.mensajes_contacto (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS para Mensajes
ALTER TABLE public.mensajes_contacto ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserción pública de mensajes"
  ON public.mensajes_contacto FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins gestionan mensajes"
  ON public.mensajes_contacto FOR ALL
  USING (auth.role() = 'authenticated');
