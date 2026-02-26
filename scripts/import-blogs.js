import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const MOCK_POSTS = [
    {
        titulo: 'La fertilidad después del diagnóstico oncológico',
        slug: 'la-fertilidad-despues-del-diagnostico-oncologico',
        extracto: 'Información vital sobre la preservación de la fertilidad y las opciones disponibles después de un diagnóstico de cáncer.',
        imagen_banner_url: 'https://images.unsplash.com/photo-1579154238328-3e9613675de9?q=80&w=1000',
        fecha_publicacion: '2025-11-24T18:38:50Z',
        contenido_html: '<p>Este artículo explora las diferentes opciones de preservación de fertilidad disponibles para pacientes oncológicos antes de comenzar sus tratamientos.</p>'
    },
    {
        titulo: 'El viaje del ovocito',
        slug: 'el-viaje-del-ovocito',
        extracto: 'Un recorrido detallado por el proceso biológico y científico que atraviesa el óvulo durante el tratamiento de fertilidad.',
        imagen_banner_url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000',
        fecha_publicacion: '2025-10-15T12:00:00Z',
        contenido_html: '<p>Descubre paso a paso cómo se desarrolla el proceso de estimulación ovárica, aspiración y posterior fecundación in vitro en nuestro laboratorio.</p>'
    },
    {
        titulo: '¿Qué es la endometriosis?',
        slug: 'que-es-la-endometriosis',
        extracto: 'Entendiendo una de las causas más comunes de infertilidad femenina y cómo abordarla médicamente.',
        imagen_banner_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000',
        fecha_publicacion: '2025-09-20T10:00:00Z',
        contenido_html: '<p>La endometriosis es un trastorno a menudo doloroso en el cual el tejido similar al tejido que normalmente recubre el interior de tu útero crece fuera de este. Aprende sobre sus síntomas y opciones de tratamiento disponibles en AFCC.</p>'
    },
    {
        titulo: 'Abordaje de la pareja infértil',
        slug: 'abordaje-de-la-pareja-infertil',
        extracto: 'El primer paso hacia la maternidad y paternidad: cómo realizamos el diagnóstico integral en AFCC.',
        imagen_banner_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000',
        fecha_publicacion: '2025-08-05T09:00:00Z',
        contenido_html: '<p>Te explicamos qué esperar en tu primera consulta de fertilidad, los estudios más comunes que se solicitan y por qué el abordaje de pareja es fundamental para el éxito del tratamiento.</p>'
    },
    {
        titulo: 'Por qué elegir una clínica de fertilidad especializada',
        slug: 'por-que-elegir-una-clinica-de-fertilidad-especializada',
        extracto: 'La importancia de la tecnología, la experiencia médica y el acompañamiento humano en tu proceso.',
        imagen_banner_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000',
        fecha_publicacion: '2025-07-12T08:00:00Z',
        contenido_html: '<p>Las instalaciones, el equipo médico, la tecnología del laboratorio y la calidez en la atención son factores clave al momento de elegir dónde comenzar tu tratamiento de fertilidad asistida. Descubre por qué Fertility Center Cancun es tu mejor opción.</p>'
    },
    {
        titulo: 'Combina la fertilidad con tus vacaciones',
        slug: 'combina-la-fertilidad-con-tus-vacaciones',
        extracto: 'Descubre cómo Cancún ofrece el entorno perfecto para relajarte mientras realizas tu tratamiento.',
        imagen_banner_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
        fecha_publicacion: '2025-06-30T07:00:00Z',
        contenido_html: '<p>El turismo médico reproductivo en Cancún permite vivir un proceso con menos estrés médico y poder disfrutar hermosos atardeceres. Permítenos cuidarte durante tu estancia.</p>'
    }
];

async function importBlogs() {
    let { data: categories } = await supabase.from('categorias').select('id').limit(1);
    let categoryId = categories?.[0]?.id;

    if (!categoryId) {
        console.log('No category found, creating default Blog category...');
        const { data: newCat, error: catError } = await supabase
            .from('categorias')
            .insert([{ nombre: 'Blog', slug: 'blog' }])
            .select('id')
            .single();

        if (catError) {
            console.error('Failed to create category', catError);
            return;
        }
        categoryId = newCat.id;
    }

    console.log(`Using category ID: ${categoryId}`);

    for (const p of MOCK_POSTS) {
        const payload = {
            titulo: p.titulo,
            slug: p.slug,
            extracto: p.extracto,
            imagen_banner_url: p.imagen_banner_url,
            status: 'published',
            categoria_id: categoryId,
            fecha_publicacion: p.fecha_publicacion,
            contenido_html: p.contenido_html
        };

        const { error } = await supabase.from('posts').insert([payload]);
        if (error) {
            console.error('Error inserting post:', p.titulo, error.message);
        } else {
            console.log('Successfully inserted:', p.titulo);
        }
    }

    console.log('Migration complete!');
}

importBlogs();
