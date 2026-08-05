import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');

const polyShpBuffer = fs.readFileSync(path.join(shpDir, 'V_TRANSITTION_BDY_polyline.shp'));
const rawShp = shpModule.parseShp(polyShpBuffer);

console.log('Searching for features in Lavender Heights box: X [5000..5600], Y [-1000..0]...');

const matches = [];

rawShp.forEach((f, idx) => {
  if (f.coordinates) {
    const pts = f.type === 'LineString' ? f.coordinates : (f.type === 'MultiLineString' ? f.coordinates.flat() : []);
    const inBox = pts.some(pt => pt[0] >= 5000 && pt[0] <= 5600 && pt[1] >= -1000 && pt[1] <= 0);
    if (inBox) {
      matches.push({ idx, pt: pts[0] });
    }
  }
});

console.log(`Found ${matches.length} matching polylines in Lavender Heights box:`);
console.log(matches.slice(0, 10));
