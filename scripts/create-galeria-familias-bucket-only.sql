-- Crear el bucket 'galeria-familias' si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('galeria-familias', 'galeria-familias', true)
ON CONFLICT (id) DO NOTHING;

-- Nota: Como ya ejecutaste el script de las políticas anteriormente,
-- omitimos la creación de las políticas en este script para que no dé error.
