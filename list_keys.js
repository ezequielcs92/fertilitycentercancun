
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/fertilitycentercancun/migrating_data.json', 'utf8'));
console.log(Object.keys(data));
