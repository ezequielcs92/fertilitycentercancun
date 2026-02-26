-- Migración de especialistas de JSON a la tabla equipo_medico
-- Requisito: Nombre debe ser único para el upsert
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'equipo_medico_nombre_key') THEN
        ALTER TABLE public.equipo_medico ADD CONSTRAINT equipo_medico_nombre_key UNIQUE (nombre);
    END IF;
END $$;

-- Este script inserta la lista actual de especialistas
INSERT INTO public.equipo_medico (nombre, especialidad, foto_url, activo, orden)
VALUES 
('Dra. Esther Iyune Cojab', 'Endocrinólogo reproductivo, Especialista en fertilidad, Ginecología, obstetricia y climaterio', '/dra-esther-iyune.jpg', true, 1),
('Dr. Eduardo Emanuel Espadas Reyes', 'Endocrinólogo reproductivo, Especialista en fertilidad, Obstetra ginecólogo, Ginecólogo', '/dr-eduardo-espadas.jpg', true, 2),
('Dr. Everardo Treviño Ortiz', 'Ginecología, obstetricia y Especialista en fertilidad - reproducción asistida', '/dr-everardo-trevino.jpg', true, 3),
('Dra. Azul Estefanía Torres Rivera', 'Médico Cirujano 6957075 / Medicina Hiperbárica y Subacuática', '/placeholder.jpg', true, 4),
('Dr. Luis Ernesto Segoviano Diaz', 'Ginecología, obstetricia | Medicina Materno fetal', '/placeholder.jpg', true, 5),
('Margarita Beatriz Martínez Manzanares', 'Directora de Laboratorio de FIV', '/placeholder.jpg', true, 6),
('QFB. Carolina González Cortés', 'Responsable de laboratorio Andrología', '/placeholder.jpg', true, 7),
('Elisheva Vianey García Ticante', 'Coordinadora de ciclos', '/placeholder.jpg', true, 8),
('Yhadira Sarai Serrano Díaz', 'Coordinadora de donantes', '/placeholder.jpg', true, 9),
('Inda Inés Estrada Ramos', 'Coordinadora', '/placeholder.jpg', true, 10),
('Wendy Isabel Montes Morales', 'Líder del departamento de Enfermería', '/placeholder.jpg', true, 11),
('Luz Clarita Domínguez Millares', 'Responsable de laboratorio Clínico', '/placeholder.jpg', true, 12)
ON CONFLICT (nombre) DO UPDATE SET
  especialidad = EXCLUDED.especialidad,
  foto_url = EXCLUDED.foto_url;
