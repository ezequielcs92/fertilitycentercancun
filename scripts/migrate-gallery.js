import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const nums = [
    "015", "014", "013", "012", "011", "010", "009", "008", "007", "006", "005", "004", "003", "002", "001", "016"
];

const BUCKET = 'galeria-familias';

async function migrateImages() {
    console.log(`Iniciando migración de ${nums.length} imágenes a ${BUCKET}...`);

    for (const num of nums) {
        const fileName = `Fotos-bebes-de-fertility-center-mexico-cancun-${num}-768x576.jpg`;
        const url = `https://fertilitycentercancun.com/wp-content/uploads/2025/08/${fileName}`;

        try {
            console.log(`Descargando: ${fileName}...`);
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`❌ Error descargando ${fileName}: ${response.statusText}`);
                continue;
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            console.log(`Subiendo a Supabase: ${fileName}...`);
            const { data, error } = await supabase.storage
                .from(BUCKET)
                .upload(fileName, buffer, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (error) {
                console.error(`❌ Error subiendo ${fileName}:`, error.message);
            } else {
                console.log(`✅ Subido exitosamente: ${fileName}`);
            }
        } catch (err) {
            console.error(`❌ Error general con ${fileName}:`, err);
        }
    }

    console.log('¡Migración completada!');
}

migrateImages();
