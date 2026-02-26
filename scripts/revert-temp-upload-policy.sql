-- Revertir la política temporal que permitía a cualquiera subir imágenes
DROP POLICY IF EXISTS "TEMP: Migracion anonima" ON storage.objects;
