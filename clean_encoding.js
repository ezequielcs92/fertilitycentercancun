
const fs = require('fs');

function cleanString(str) {
    if (typeof str !== 'string') return str;
    // Remove null bytes and other non-printable characters except common whitespace
    // Also ensure it's valid UTF-8 by re-encoding if necessary
    return str.replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF\u0100-\uFFFF]/g, '').trim();
}

const teamPath = 'd:/fertilitycentercancun/src/data/team.json';
if (fs.existsSync(teamPath)) {
    const team = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
    const cleanedTeam = team.map(member => ({
        id: cleanString(member.id),
        slug: cleanString(member.slug),
        title: cleanString(member.title),
        especialidad: cleanString(member.especialidad).replace(/\\r\\n/g, '').replace(/\r\n/g, ''),
        image: member.image
    }));
    fs.writeFileSync(teamPath, JSON.stringify(cleanedTeam, null, 2), 'utf8');
    console.log('Cleaned team.json');
}
