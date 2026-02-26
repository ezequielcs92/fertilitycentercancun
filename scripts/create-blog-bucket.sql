-- Crear el bucket 'blog-images' si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Crear política para permitir visualización pública de las imágenes
CREATE POLICY "Imágenes de blog públicas" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

-- Crear política para permitir a usuarios autenticados subir/editar/borrar imágenes
CREATE POLICY "Admins gestionan imágenes de blog" 
ON storage.objects FOR ALL 
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
