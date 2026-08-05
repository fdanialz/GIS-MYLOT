import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '..', 'public', 'data', 'seremban', 'V_TRANSITTION_BDY_polyline.json');

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('Features count:', data.features.length);
console.log('Sample feature 0 coordinates:', JSON.stringify(data.features[0].geometry.coordinates.slice(0, 3)));

// Find coordinates near Lavender Heights (around Lng 101.986, Lat 2.707)
let countNearLavender = 0;
data.features.forEach((f, idx) => {
  if (f.geometry && f.geometry.coordinates) {
    const pt = f.geometry.coordinates[0];
    if (Array.isArray(pt) && pt[0] > 101.980 && pt[0] < 101.995 && pt[1] > 2.700 && pt[1] < 2.715) {
      countNearLavender++;
      if (countNearLavender <= 3) {
        console.log(`[Feature #${idx}] Near Lavender: Lng ${pt[0].toFixed(6)}, Lat ${pt[1].toFixed(6)}`);
      }
    }
  }
});
console.log('Total features near Lavender Heights (101.98, 2.70):', countNearLavender);
