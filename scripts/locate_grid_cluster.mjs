import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');

const files = [
  'V_TRANSITTION_BDY_polyline',
  'WARTA_LOT_region',
  'V_TRANSITTION_LOT_region',
  'V_NDCDBLOT_region'
];

for (const name of files) {
  try {
    const shpPath = path.join(shpDir, `${name}.shp`);
    if (!fs.existsSync(shpPath)) continue;
    const shpBuffer = fs.readFileSync(shpPath);
    const rawShp = shpModule.parseShp(shpBuffer);

    let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
    rawShp.forEach(f => {
      if (f.coordinates) {
        const pts = f.type === 'LineString' ? f.coordinates : (f.type === 'Polygon' ? f.coordinates[0] : (f.type === 'MultiPolygon' ? f.coordinates[0][0] : []));
        pts.forEach(pt => {
          if (Array.isArray(pt) && typeof pt[0] === 'number') {
            if (pt[0] < xmin) xmin = pt[0];
            if (pt[0] > xmax) xmax = pt[0];
            if (pt[1] < ymin) ymin = pt[1];
            if (pt[1] > ymax) ymax = pt[1];
          }
        });
      }
    });

    console.log(`=== ${name} ===`);
    console.log(`Raw Cassini Bounds: X [${xmin.toFixed(1)}, ${xmax.toFixed(1)}], Y [${ymin.toFixed(1)}, ${ymax.toFixed(1)}]`);
  } catch (e) {
    console.error(`Error ${name}:`, e.message);
  }
}
