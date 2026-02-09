const fs = require('fs');
const path = require('path');

const RAW_DATA_FILE = 'extracted_wp_data.json';
const OUTPUT_FILE = 'migrating_data.json';
const UPLOADS_PATH = 'd:\\fertilitycentercancun\\Wordpress\\fertilitycentercancun-com-20260207-174518-gv1ruevch067\\uploads';

function cleanContent(content) {
    if (!content) return '';

    // 1. Eliminar shortcodes [tag ...] [/tag] o [tag]
    let cleaned = content.replace(/\[\/?[^\]]+\]/g, '');

    // 2. Eliminar estilos inline style="..."
    cleaned = cleaned.replace(/style=\"[^\"]*\"/g, '');
    cleaned = cleaned.replace(/style=\'[^\']*\'/g, '');

    // 3. Eliminar clases de WordPress wp-block, etc. (opcional, pero útil para Tailwind)
    cleaned = cleaned.replace(/class=\"[^\"]*\"/g, '');

    // 4. Limpiar espacios múltiples y saltos de línea excesivos
    cleaned = cleaned.replace(/\s\s+/g, ' ').trim();

    return cleaned;
}

function process() {
    const data = JSON.parse(fs.readFileSync(RAW_DATA_FILE, 'utf8'));

    const imageMap = {};
    data.attachments.forEach(att => {
        const relPath = att.meta._wp_attached_file;
        if (relPath) {
            const fullPath = path.join(UPLOADS_PATH, relPath.replace(/\//g, path.sep));
            imageMap[att.ID] = {
                title: att.post_title,
                relPath: relPath,
                exists: fs.existsSync(fullPath)
            };
        }
    });

    const processCollection = (col) => col.map(item => ({
        id: item.ID,
        slug: item.post_name,
        title: item.post_title,
        content: cleanContent(item.post_content),
        raw_content: item.post_content, // Por si queremos rescatar algo luego
        date: item.post_date,
        author: item.post_author,
        parent: item.post_parent,
        meta: item.meta
    }));

    const result = {
        pages: processCollection(data.pages),
        posts: processCollection(data.posts),
        team: processCollection(data.team),
        podcasts: processCollection(data.podcasts),
        imageMap: imageMap
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`Limpieza y mapeo completado. Archivo generado: ${OUTPUT_FILE}`);

    const existsCount = Object.values(imageMap).filter(i => i.exists).length;
    console.log(`Imágenes mapeadas: ${Object.keys(imageMap).length}`);
    console.log(`Archivos físicos encontrados: ${existsCount}`);
}

process();
