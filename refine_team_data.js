
const fs = require('fs');
const team = JSON.parse(fs.readFileSync('d:/fertilitycentercancun/team_with_images.json', 'utf8'));

const uniqueTeam = [];
const seenTitles = new Set();

team.forEach(member => {
    // Basic deduplication by title (normallized)
    const normalizedTitle = member.title.trim().toLowerCase();
    if (!seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueTeam.push(member);
    }
});

fs.writeFileSync('d:/fertilitycentercancun/src/data/team.json', JSON.stringify(uniqueTeam, null, 2));
console.log(`Saved ${uniqueTeam.length} unique specialists to src/data/team.json`);
