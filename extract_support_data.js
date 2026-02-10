
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/fertilitycentercancun/migrating_data.json', 'utf8'));

const supportPage = data.pages.find(p => p.slug === 'soporte-internacional');
if (supportPage) {
    console.log("=== TITLE ===");
    console.log(supportPage.title);
    console.log("\n=== CONTENT (TRUNCATED) ===");
    console.log(supportPage.content.substring(0, 1000));
    console.log("\n=== FEATURED IMAGE ===");
    const thumbId = supportPage.meta._thumbnail_id;
    console.log(`Thumbnail ID: ${thumbId}`);
    console.log(`Image URL: ${data.imageMap[thumbId] ? data.imageMap[thumbId].relPath : 'Not found'}`);
} else {
    console.log("Page not found");
}
