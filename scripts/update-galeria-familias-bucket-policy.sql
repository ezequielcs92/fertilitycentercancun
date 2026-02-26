-- Actualizar política para permitir a usuarios autenticados listar los archivos del bucket
DROP POLICY IF EXISTS "Admins gestionan imágenes de familias" ON storage.objects;

CREATE POLICY "Admins gestionan imágenes de familias" 
ON storage.objects FOR ALL 
USING (bucket_id = 'galeria-familias' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'galeria-familias' AND auth.role() = 'authenticated');

-- Crear política explícita para SELECT (incluye operaciones list())
DROP POLICY IF EXISTS "Imágenes de familias públicas" ON storage.objects;

CREATE POLICY "Imágenes de familias públicas" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'galeria-familias');
