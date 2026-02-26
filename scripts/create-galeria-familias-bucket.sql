-- Crear el bucket 'galeria-familias' si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('galeria-familias', 'galeria-familias', true)
ON CONFLICT (id) DO NOTHING;

-- Crear política para permitir visualización pública de las imágenes
CREATE POLICY "Imágenes de familias públicas" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'galeria-familias');

-- Crear política para permitir a usuarios autenticados subir/editar/borrar imágenes
CREATE POLICY "Admins gestionan imágenes de familias" 
ON storage.objects FOR ALL 
USING (bucket_id = 'galeria-familias' AND auth.role() = 'authenticated');
