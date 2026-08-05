import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '..', 'public', 'data', 'seremban', 'V_TRANSITTION_BDY_polyline.json');

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('Total polylines in JSON:', data.features.length);

let countInLavender = 0;
data.features.forEach(f => {
  if (f.geometry && f.geometry.coordinates) {
    const pt = f.geometry.coordinates[0];
    if (Array.isArray(pt) && pt[0] >= 102.000 && pt[0] <= 102.008 && pt[1] >= 2.705 && pt[1] <= 2.715) {
      countInLavender++;
    }
  }
});

console.log(`Polylines in Lavender Heights zone (102.000..102.008 E, 2.705..2.715 N): ${countInLavender}`);
