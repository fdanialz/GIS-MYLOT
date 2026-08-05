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

// Bin features into 1000m x 1000m grid cells
const grid = {};

rawShp.forEach(f => {
  if (f.coordinates) {
    const pt = f.type === 'LineString' ? f.coordinates[0] : (f.type === 'Polygon' ? f.coordinates[0][0] : null);
    if (pt && typeof pt[0] === 'number') {
      const gx = Math.floor(pt[0] / 1000) * 1000;
      const gy = Math.floor(pt[1] / 1000) * 1000;
      const key = `${gx},${gy}`;
      grid[key] = (grid[key] || 0) + 1;
    }
  }
});

// Sort grid cells by feature density
const sorted = Object.entries(grid).sort((a, b) => b[1] - a[1]);

console.log('Top 15 densest 1km x 1km grid cells in V_TRANSITTION_BDY_polyline:');
sorted.slice(0, 15).forEach(([cell, count]) => {
  console.log(`Cell X,Y [${cell}]: ${count} polylines`);
});
