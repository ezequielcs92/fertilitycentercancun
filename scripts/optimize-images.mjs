/**
 * Recomprime las imágenes de `public/` en el sitio, conservando nombre, ruta y
 * formato, de modo que no haya que tocar ninguna referencia del código.
 *
 *   node scripts/optimize-images.mjs            # aplica los cambios
 *   node scripts/optimize-images.mjs --dry-run  # solo informa
 *
 * Reglas:
 *  - Se limita el ancho a MAX_WIDTH (las fotos del equipo venían a 3781px).
 *  - JPEG: mozjpeg calidad 82. PNG: paleta calidad 90, compresión máxima.
 *  - Solo se sobrescribe si el resultado pesa menos que el original.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = 'public'
const MAX_WIDTH = 2000
const DRY_RUN = process.argv.includes('--dry-run')
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) {
            yield* walk(full)
        } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
            yield full
        }
    }
}

function mb(bytes) {
    return (bytes / 1048576).toFixed(2)
}

async function optimize(file) {
    // Se lee a buffer a propósito: si se le pasa la ruta, libvips mantiene el
    // archivo abierto (mmap) y en Windows la reescritura falla con EUNKNOWN.
    const input = await readFile(file)
    const before = input.length
    const image = sharp(input, { failOn: 'none' })
    const meta = await image.metadata()

    let pipeline = image.rotate() // respeta la orientación EXIF antes de perderla

    if (meta.width && meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    }

    const isJpeg = ['.jpg', '.jpeg'].includes(extname(file).toLowerCase())
    const output = isJpeg
        ? await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
        : await pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toBuffer()

    if (output.length >= before) {
        return { file, before, after: before, skipped: true }
    }

    if (!DRY_RUN) {
        await writeFile(file, output)
    }

    return { file, before, after: output.length, skipped: false }
}

const results = []
let failures = 0

for await (const file of walk(ROOT)) {
    try {
        results.push(await optimize(file))
    } catch (error) {
        failures++
        console.error(`  ✗ ${file}: ${error.message}`)
    }
}

const changed = results.filter((r) => !r.skipped)
const before = results.reduce((sum, r) => sum + r.before, 0)
const after = results.reduce((sum, r) => sum + r.after, 0)

changed
    .sort((a, b) => b.before - b.after - (a.before - a.after))
    .slice(0, 10)
    .forEach((r) => console.log(`  ${r.file}: ${mb(r.before)} MB -> ${mb(r.after)} MB`))

console.log('')
console.log(`${DRY_RUN ? '[dry-run] ' : ''}${changed.length} de ${results.length} imágenes optimizadas` +
    (failures ? `, ${failures} con error` : ''))
console.log(`Total: ${mb(before)} MB -> ${mb(after)} MB (${Math.round(100 - (after / before) * 100)}% menos)`)
