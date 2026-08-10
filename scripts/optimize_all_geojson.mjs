import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'public', 'data');

// Allowed keys for polygons & polylines to keep popup & search features fully intact while removing unnecessary GIS bloat
const ALLOWED_KEYS = new Set([
  'id', 'ID', 'nama', 'NAMA', 'noLot', 'LOT', 'NO_LOT', 'LOT_NAMA',
  'mukim', 'MUKIM', 'NM_MUKIM', 'daerah', 'DAERAH', 'noWarta', 'WARTA',
  'NO_WARTA', 'NOWARTA', 'TUJUAN_WAR', 'NOPW', 'noPW', 'PA', 'noPA',
  'UPI', 'NOFAILUKUR', 'KELUASAN', 'TARIKH_UKUR', 'STATUS', 'KEGUNAAN',
  'BEARING', 'JARAK', 'ADJPARCEL', 'BLOCK', 'MI_PRINX', 'OBJECTID'
]);

function roundCoords(coords) {
  if (typeof coords === 'number') {
    return Math.round(coords * 1000000) / 1000000;
  }
  if (Array.isArray(coords)) {
    return coords.map(roundCoords);
  }
  return coords;
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.json') && item !== 'index.json') {
      const beforeSizeMb = (stat.size / 1024 / 1024).toFixed(2);
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(raw);

        if (data && data.features && Array.isArray(data.features)) {
          data.features.forEach(f => {
            if (f.geometry && f.geometry.coordinates) {
              f.geometry.coordinates = roundCoords(f.geometry.coordinates);
            }
            if (f.properties) {
              const clean = {};
              for (const k of Object.keys(f.properties)) {
                const val = f.properties[k];
                if (val !== null && val !== '' && val !== undefined) {
                  // Keep allowed keys or any key if allowed set isn't strict
                  if (ALLOWED_KEYS.has(k)) {
                    clean[k] = val;
                  }
                }
              }
              f.properties = clean;
            }
          });

          const json = JSON.stringify(data);
          fs.writeFileSync(fullPath, json);
          const afterSizeMb = (fs.statSync(fullPath).size / 1024 / 1024).toFixed(2);
          console.log(`✓ ${path.relative(dataDir, fullPath)}: ${beforeSizeMb} MB -> ${afterSizeMb} MB`);
        }
      } catch (e) {
        console.error(`✗ Failed to optimize ${fullPath}:`, e.message);
      }
    }
  }
}

console.log('=== OPTIMIZING ALL GEOJSON DATASETS ===');
processDirectory(dataDir);
console.log('=== OPTIMIZATION COMPLETE ===');
