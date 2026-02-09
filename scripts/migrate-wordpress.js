#!/usr/bin/env node

/**
 * WordPress to Supabase Migration Script
 * Fertility Center Cancun
 * 
 * Funcionalidad:
 * 1. Parsea el XML de WordPress
 * 2. Extrae posts y metadata
 * 3. Descarga imágenes de forma controlada
 * 4. Optimiza y sube a Supabase Storage
 * 5. Genera SQL para insertar posts
 */

import fs from 'fs/promises';
import path from 'path';
import { parseString } from 'xml2js';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import pLimit from 'p-limit';
import fetch from 'node-fetch';

// ============================================
// CONFIGURACIÓN
// ============================================

const CONFIG = {
    // Archivo XML de WordPress
    XML_FILE: './fertility.WordPress.2026-02-07.xml',

    // Directorio temporal para imágenes descargadas
    TEMP_DIR: './temp-wordpress-images',

    // Supabase
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STORAGE_BUCKET: 'blog-images',

    // Rate limiting (imágenes por segundo)
    CONCURRENT_DOWNLOADS: 5,

    // Optimización de imágenes
    MAX_IMAGE_WIDTH: 1920,
    IMAGE_QUALITY: 85,

    // Output
    SQL_OUTPUT: './migrated-posts.sql',
};

// ============================================
// INICIALIZACIÓN
// ============================================

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
const downloadLimit = pLimit(CONFIG.CONCURRENT_DOWNLOADS);

// ============================================
// UTILIDADES
// ============================================

/**
 * Genera slug desde título
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
        .trim()
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/-+/g, '-'); // Múltiples guiones a uno
}

/**
 * Extrae URLs de imágenes del contenido HTML
 */
function extractImageUrls(html) {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const urls = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
        urls.push(match[1]);
    }

    return urls;
}

/**
 * Descarga imagen con reintentos
 */
async function downloadImage(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.buffer();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

/**
 * Optimiza imagen con sharp
 */
async function optimizeImage(buffer) {
    return await sharp(buffer)
        .resize(CONFIG.MAX_IMAGE_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside',
        })
        .jpeg({ quality: CONFIG.IMAGE_QUALITY, progressive: true })
        .toBuffer();
}

/**
 * Sube imagen a Supabase Storage
 */
async function uploadToSupabase(filename, buffer) {
    const { data, error } = await supabase.storage
        .from(CONFIG.STORAGE_BUCKET)
        .upload(filename, buffer, {
            contentType: 'image/jpeg',
            upsert: false,
        });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
        .from(CONFIG.STORAGE_BUCKET)
        .getPublicUrl(filename);

    return publicUrl.publicUrl;
}

// ============================================
// PROCESAMIENTO DE POSTS
// ============================================

/**
 * Parsea el XML de WordPress
 */
async function parseWordPressXML() {
    console.log('📖 Leyendo archivo XML...');

    const xmlContent = await fs.readFile(CONFIG.XML_FILE, 'utf-8');

    return new Promise((resolve, reject) => {
        parseString(xmlContent, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

/**
 * Extrae posts del XML parseado
 */
function extractPosts(xmlData) {
    const items = xmlData.rss.channel[0].item || [];
    const posts = [];

    for (const item of items) {
        // Solo posts (no pages, attachments, etc.)
        if (item['wp:post_type'][0] !== 'post') continue;
        if (item['wp:status'][0] !== 'publish') continue;

        posts.push({
            title: item.title[0],
            slug: item['wp:post_name'][0],
            content: item['content:encoded'][0],
            excerpt: item['excerpt:encoded']?.[0] || '',
            pubDate: item.pubDate[0],
            category: item.category?.[0]?._ || 'Sin categoría',
        });
    }

    console.log(`✅ Encontrados ${posts.length} posts publicados`);
    return posts;
}

/**
 * Procesa todas las imágenes de un post
 */
async function processPostImages(post, index) {
    const imageUrls = extractImageUrls(post.content);

    if (imageUrls.length === 0) {
        console.log(`  📄 Post ${index + 1}: Sin imágenes`);
        return post.content;
    }

    console.log(`  🖼️  Post ${index + 1}: Procesando ${imageUrls.length} imágenes...`);

    let updatedContent = post.content;
    const imageMap = new Map();

    // Descargar y procesar imágenes
    await Promise.all(
        imageUrls.map(url =>
            downloadLimit(async () => {
                try {
                    const filename = `post-${index + 1}-${path.basename(url)}`;

                    // Descargar
                    const buffer = await downloadImage(url);

                    // Optimizar
                    const optimized = await optimizeImage(buffer);

                    // Subir a Supabase
                    const newUrl = await uploadToSupabase(filename, optimized);

                    imageMap.set(url, newUrl);
                    console.log(`    ✓ ${path.basename(url)}`);
                } catch (error) {
                    console.error(`    ✗ Error ${url}: ${error.message}`);
                }
            })
        )
    );

    // Reemplazar URLs en el contenido
    for (const [oldUrl, newUrl] of imageMap) {
        updatedContent = updatedContent.replaceAll(oldUrl, newUrl);
    }

    return updatedContent;
}

/**
 * Genera SQL INSERT para un post
 */
function generatePostSQL(post, categoryId = null) {
    const escape = (str) => str.replace(/'/g, "''");

    return `
INSERT INTO public.posts (titulo, slug, contenido_html, extracto, categoria_id, status, fecha_publicacion)
VALUES (
  '${escape(post.title)}',
  '${escape(post.slug)}',
  '${escape(post.content)}',
  '${escape(post.excerpt)}',
  ${categoryId ? `'${categoryId}'` : 'NULL'},
  'published',
  '${new Date(post.pubDate).toISOString()}'
);
  `.trim();
}

// ============================================
// MAIN
// ============================================

async function main() {
    console.log('🚀 Iniciando migración de WordPress a Supabase\n');

    try {
        // 1. Crear directorio temporal
        await fs.mkdir(CONFIG.TEMP_DIR, { recursive: true });

        // 2. Parsear XML
        const xmlData = await parseWordPressXML();

        // 3. Extraer posts
        const posts = extractPosts(xmlData);

        // 4. Procesar cada post
        console.log('\n📦 Procesando posts e imágenes...\n');

        const sqlStatements = [];

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            console.log(`\n[${i + 1}/${posts.length}] ${post.title}`);

            // Procesar imágenes
            post.content = await processPostImages(post, i);

            // Generar SQL
            const sql = generatePostSQL(post);
            sqlStatements.push(sql);
        }

        // 5. Guardar SQL
        console.log('\n\n💾 Generando archivo SQL...');

        const sqlContent = `
-- ============================================
-- Posts Migrados de WordPress
-- Generado: ${new Date().toISOString()}
-- Total posts: ${posts.length}
-- ============================================

${sqlStatements.join('\n\n')}
    `.trim();

        await fs.writeFile(CONFIG.SQL_OUTPUT, sqlContent);

        console.log(`✅ Archivo guardado: ${CONFIG.SQL_OUTPUT}`);
        console.log(`\n✨ Migración completada con éxito!`);
        console.log(`\n📊 Resumen:`);
        console.log(`   - Posts procesados: ${posts.length}`);
        console.log(`   - Archivo SQL: ${CONFIG.SQL_OUTPUT}`);

    } catch (error) {
        console.error('\n❌ Error en la migración:', error);
        process.exit(1);
    }
}

// Ejecutar
main();
