/**
 * Step 1: Place your WordPress 'uploads' folder in 'public/wp-content/uploads'
 * Step 2: Run this script to generate a SEO mapping file
 */

const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../public/wp-content/uploads');
const MAPPING_FILE = path.join(__dirname, '../src/lib/utils/image-mapping.json');

function scanDir(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
        console.log(`⚠️  Directory not found: ${dir}`);
        return fileList;
    }

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            scanDir(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function generateMapping() {
    console.log('🚀 Scanning WordPress uploads for SEO mapping...');
    const files = scanDir(UPLOADS_DIR);

    const mapping = {};

    files.forEach(file => {
        // Original path: public/wp-content/uploads/2023/01/image.jpg
        const relativePath = path.relative(path.join(__dirname, '../public'), file);
        const fileName = path.basename(file);

        // We map filename to optimized NextJs path
        // This allows us to keep old URLs working or redirect them
        mapping[fileName] = `/${relativePath.replace(/\\/g, '/')}`;
    });

    fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
    console.log(`✅ Mapping generated with ${files.length} images.`);
    console.log(`📂 File saved at: ${MAPPING_FILE}`);
}

generateMapping();
