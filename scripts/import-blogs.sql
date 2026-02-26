DO $$
DECLARE
    cat_id UUID;
BEGIN
    SELECT id INTO cat_id FROM public.categorias WHERE slug = 'blog' LIMIT 1;
    
    IF cat_id IS NULL THEN
        INSERT INTO public.categorias (nombre, slug) VALUES ('Blog', 'blog') RETURNING id INTO cat_id;
    END IF;

    INSERT INTO public.posts (titulo, slug, extracto, imagen_banner_url, status, categoria_id, fecha_publicacion, contenido_html)
    VALUES 
    ('La fertilidad después del diagnóstico oncológico', 'la-fertilidad-despues-del-diagnostico-oncologico', 'Información vital sobre la preservación de la fertilidad y las opciones disponibles después de un diagnóstico de cáncer.', 'https://images.unsplash.com/photo-1579154238328-3e9613675de9?q=80&w=1000', 'published', cat_id, '2025-11-24T18:38:50Z', '<p>Este artículo explora las diferentes opciones de preservación de fertilidad disponibles para pacientes oncológicos antes de comenzar sus tratamientos.</p>'),
    ('El viaje del ovocito', 'el-viaje-del-ovocito', 'Un recorrido detallado por el proceso biológico y científico que atraviesa el óvulo durante el tratamiento de fertilidad.', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000', 'published', cat_id, '2025-10-15T12:00:00Z', '<p>Descubre paso a paso cómo se desarrolla el proceso de estimulación ovárica, aspiración y posterior fecundación in vitro en nuestro laboratorio.</p>'),
    ('¿Qué es la endometriosis?', 'que-es-la-endometriosis', 'Entendiendo una de las causas más comunes de infertilidad femenina y cómo abordarla médicamente.', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000', 'published', cat_id, '2025-09-20T10:00:00Z', '<p>La endometriosis es un trastorno a menudo doloroso en el cual el tejido similar al tejido que normalmente recubre el interior de tu útero crece fuera de este. Aprende sobre sus síntomas y opciones de tratamiento disponibles en AFCC.</p>'),
    ('Abordaje de la pareja infértil', 'abordaje-de-la-pareja-infertil', 'El primer paso hacia la maternidad y paternidad: cómo realizamos el diagnóstico integral en AFCC.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000', 'published', cat_id, '2025-08-05T09:00:00Z', '<p>Te explicamos qué esperar en tu primera consulta de fertilidad, los estudios más comunes que se solicitan y por qué el abordaje de pareja es fundamental para el éxito del tratamiento.</p>'),
    ('Por qué elegir una clínica de fertilidad especializada', 'por-que-elegir-una-clinica-de-fertilidad-especializada', 'La importancia de la tecnología, la experiencia médica y el acompañamiento humano en tu proceso.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000', 'published', cat_id, '2025-07-12T08:00:00Z', '<p>Las instalaciones, el equipo médico, la tecnología del laboratorio y la calidez en la atención son factores clave al momento de elegir dónde comenzar tu tratamiento de fertilidad asistida. Descubre por qué Fertility Center Cancun es tu mejor opción.</p>'),
    ('Combina la fertilidad con tus vacaciones', 'combina-la-fertilidad-con-tus-vacaciones', 'Descubre cómo Cancún ofrece el entorno perfecto para relajarte mientras realizas tu tratamiento.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000', 'published', cat_id, '2025-06-30T07:00:00Z', '<p>El turismo médico reproductivo en Cancún permite vivir un proceso con menos estrés médico y poder disfrutar hermosos atardeceres. Permítenos cuidarte durante tu estancia.</p>');
END $$;
