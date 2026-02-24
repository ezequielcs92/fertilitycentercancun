const fs = require('fs');
const path = require('path');
const https = require('https');

const srcDir = path.join(__dirname, 'src');
const publicImagesDir = path.join(__dirname, 'public', 'images', 'wp');

if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Regex to find WordPress uploads URLs
const urlRegex = /https?:\/\/www\.bh-desarrollosweb\.com\/fertilitycentermexico\/wp-content\/uploads\/[^\s"'\)<>\\]+/g;

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, fileList);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            return resolve(true);
        }
        https.get(url, { rejectUnauthorized: false }, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(true);
                });
            } else {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

function processUrlString(rawUrl) {
    let url = rawUrl.replace(/\\$/, '');
    return url;
}

async function processAll() {
    console.log("Finding files...");
    const files = findFiles(srcDir);
    let failed = 0;

    const urlMap = new Map();
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.match(urlRegex);
        if (matches) {
            for (let match of matches) {
                match = processUrlString(match);
                let safeName = match.split('uploads/')[1].replace(/\//g, '_');
                try {
                    safeName = decodeURIComponent(safeName);
                } catch (e) { }
                safeName = safeName.split('?')[0].split('#')[0];
                const destPath = path.join(publicImagesDir, safeName);
                const localPath = `/images/wp/${encodeURIComponent(safeName)}`;

                urlMap.set(match, { localPath, destPath });
            }
        }
    }

    console.log(`Found ${urlMap.size} unique URLs.`);

    let count = 0;
    for (const [url, { destPath }] of urlMap.entries()) {
        count++;
        console.log(`Downloading ${count}/${urlMap.size}: ${url}`);
        try {
            await downloadImage(url, destPath);
        } catch (err) {
            console.error(err.message);
            failed++;
        }
    }

    console.log("Updating files...");
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        for (const [url, { localPath }] of urlMap.entries()) {
            if (content.includes(url)) {
                content = content.split(url).join(localPath);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }

    console.log(`Done. Total URLs: ${urlMap.size}. Failed: ${failed}.`);
}

processAll();
