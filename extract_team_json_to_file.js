
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/fertilitycentercancun/migrating_data.json', 'utf8'));
fs.writeFileSync('d:/fertilitycentercancun/team_data.json', JSON.stringify(data.team, null, 2));
console.log(`Saved ${data.team.length} specialists to team_data.json`);
