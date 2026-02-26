-- Permitir temporalmente a ANON insertar en galeria-familias (Para el script de migracion)
CREATE POLICY "TEMP: Migracion anonima" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'galeria-familias');
