const fs = require('fs');

const filePath = 'd:/fertilitycentercancun/src/app/equipo-medico2/page.tsx';
const content = fs.readFileSync(filePath, 'utf8');

const htmlMatch = content.match(/dangerouslySetInnerHTML=\{\{\s*__html:\s*`([\s\S]*)`\s*\}\}/);
if (!htmlMatch) {
    console.error("No HTML found");
    process.exit(1);
}

const html = htmlMatch[1];

// WordPress/Elementor often structure their content in specific ways.
// Let's try to find potential names ignoring HTML tags more aggressively.
const doctors = [];

// Look for anything that starts with Dr. or Dra. and isn't a long string (to avoid CSS/JS)
const nameRegex = /(Dr\.|Dra\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/g;
let match;

while ((match = nameRegex.exec(html)) !== null) {
    doctors.push({
        name: match[0],
        index: match.index
    });
}

console.log("Found Names:", JSON.stringify(doctors, null, 2));

// Log some context around the first 5 matches to see what they look like
doctors.slice(0, 5).forEach(d => {
    console.log(`\nContext for ${d.name}:`);
    console.log(html.substring(Math.max(0, d.index - 300), Math.min(html.length, d.index + 300)));
});
