
const fs = require('fs');
const filePath = 'd:/fertilitycentercancun/src/app/equipo-medico2/page.tsx';
const content = fs.readFileSync(filePath, 'utf8');
console.log(content.substring(0, 5000));
