
const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    // Sanitize: only allow standard UTF-8 characters (including common accented ones for Spanish)
    // Remove invalid surrogate pairs or control chars that break protobuf
    const cleaned = content.replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF\u0100-\uFFFF]/g, '');
    if (content !== cleaned) {
        fs.writeFileSync(filePath, cleaned, 'utf8');
        console.log(`Cleaned: ${path.basename(filePath)}`);
    } else {
        console.log(`Already clean: ${path.basename(filePath)}`);
    }
}

const brainDir = 'C:/Users/ezequ/.gemini/antigravity/brain/ba5fdd93-89a8-4d78-a3c3-16e4bcabfc67';
const filesToClean = ['task.md', 'walkthrough.md', 'implementation_plan.md'];

filesToClean.forEach(file => {
    cleanFile(path.join(brainDir, file));
});
