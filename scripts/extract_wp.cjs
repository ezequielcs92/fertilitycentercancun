const fs = require('fs');
const readline = require('readline');
const path = require('path');

const SQL_FILE = 'd:\\fertilitycentercancun\\Wordpress\\fertilitycentercancun-com-20260207-174518-gv1ruevch067\\database.sql';
const OUTPUT_FILE = 'extracted_wp_data.json';
const PREFIX = 'SERVMASK_PREFIX_';

async function processSql() {
  const fileStream = fs.createReadStream(SQL_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const tables = {};
  let currentTable = null;
  const data = {
    posts: [],
    postmeta: []
  };

  console.log('Iniciando procesamiento de SQL...');

  for await (const line of rl) {
    // Detectar esquema de tablas
    if (line.startsWith('CREATE TABLE')) {
      const match = line.match(/CREATE TABLE `([^`]+)` \(/);
      if (match) {
        currentTable = match[1];
        tables[currentTable] = [];
        // console.log(`Encontrada tabla: ${currentTable}`);
      }
    } else if (currentTable && line.trim().startsWith('`')) {
      const colMatch = line.match(/^\s*`([^`]+)`/);
      if (colMatch) {
        tables[currentTable].push(colMatch[1]);
      }
    } else if (line.includes(') ENGINE=') || line.includes(') ;')) {
      currentTable = null;
    }

    // Detectar INSERTs
    if (line.startsWith('INSERT INTO')) {
      const match = line.match(/INSERT INTO `([^`]+)` VALUES/);
      if (match) {
        const tableName = match[1];
        if (tableName === `${PREFIX}posts` || tableName === `${PREFIX}postmeta`) {
          // Extraer valores. Nota: Los valores pueden estar en la misma línea o múltiples.
          // Simplificación: asumimos que el script de procesamiento maneja el formato de dump
          const valuesPart = line.substring(line.indexOf('VALUES') + 7);
          processValues(tableName, valuesPart, tables[tableName], data);
        }
      }
    }
  }

  // Filtrar y organizar datos
  const result = organizeData(data, tables);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log(`Procesamiento completado. Datos guardados en ${OUTPUT_FILE}`);
}

function processValues(tableName, valuesStr, columns, dataTarget) {
  if (!columns) return; // No tenemos el esquema todavía o no es una tabla de interés
  
  // Regex básico para separar filas (Viene como: (val1, val2), (val3, val4);)
  // Nota: Esto es frágil con comas dentro de strings, pero para un dump estándar suele funcionar
  // Mejor usar un parser de SQL si es complejo, pero probemos esto:
  const rows = valuesStr.split(/(?<=\)),(?=\()/);
  
  for (let row of rows) {
    row = row.trim();
    if (row.endsWith(';')) row = row.slice(0, -1);
    if (row.startsWith('(') && row.endsWith(')')) {
      row = row.slice(1, -1);
      
      // Parser de valores CSV-like (considerando comillas)
      const values = parseSqlValues(row);
      
      const obj = {};
      columns.forEach((col, i) => {
        obj[col] = values[i];
      });

      if (tableName.includes('posts')) {
        // Solo guardar si es publicado y tipo relevante
        const relevantTypes = ['page', 'post', 'equipo-medico', 'podcasts', 'attachment'];
        if (obj.post_status === 'publish' && relevantTypes.includes(obj.post_type)) {
          dataTarget.posts.push(obj);
        } else if (obj.post_type === 'attachment') {
          dataTarget.posts.push(obj);
        }
      } else if (tableName.includes('postmeta')) {
        dataTarget.postmeta.push(obj);
      }
    }
  }
}

function parseSqlValues(str) {
  const result = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';
  let escaped = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (escaped) {
      current += char;
      escaped = false;
    } else if (char === '\\') {
      escaped = true;
      current += char;
    } else if ((char === "'" || char === '"') && (!inQuotes || char === quoteChar)) {
      if (inQuotes) {
        inQuotes = false;
      } else {
        inQuotes = true;
        quoteChar = char;
      }
      current += char;
    } else if (char === ',' && !inQuotes) {
      result.push(cleanValue(current));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(cleanValue(current));
  return result;
}

function cleanValue(val) {
  val = val.trim();
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1).replace(/\\'/g, "'");
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1).replace(/\\"/g, '"');
  if (val === 'NULL') return null;
  return val;
}

function organizeData(data, tables) {
  const postsById = {};
  data.posts.forEach(p => {
    postsById[p.ID] = { ...p, meta: {} };
  });

  data.postmeta.forEach(m => {
    if (postsById[m.post_id]) {
      postsById[m.post_id].meta[m.meta_key] = m.meta_value;
    }
  });

  const final = {
    pages: [],
    posts: [],
    team: [],
    podcasts: [],
    attachments: []
  };

  Object.values(postsById).forEach(p => {
    if (p.post_type === 'page') final.pages.push(p);
    else if (p.post_type === 'post') final.posts.push(p);
    else if (p.post_type === 'equipo-medico') final.team.push(p);
    else if (p.post_type === 'podcasts') final.podcasts.push(p);
    else if (p.post_type === 'attachment') final.attachments.push(p);
  });

  return final;
}

processSql().catch(console.error);
