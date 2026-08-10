import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const polyFile = path.join(__dirname, '..', 'public', 'data', 'seremban', 'NDCDBBDY_polyline.json');

if (fs.existsSync(polyFile)) {
  console.log('Splitting Seremban NDCDBBDY_polyline.json into 2 GitHub-compliant parts...');
  const data = JSON.parse(fs.readFileSync(polyFile, 'utf8'));
  const total = data.features ? data.features.length : 0;
  const half = Math.ceil(total / 2);

  const part1 = {
    type: 'FeatureCollection',
    name: 'NDCDBBDY_polyline_part1',
    features: data.features.slice(0, half)
  };

  const part2 = {
    type: 'FeatureCollection',
    name: 'NDCDBBDY_polyline_part2',
    features: data.features.slice(half)
  };

  const dir = path.dirname(polyFile);
  const file1 = path.join(dir, 'NDCDBBDY_polyline_part1.json');
  const file2 = path.join(dir, 'NDCDBBDY_polyline_part2.json');

  fs.writeFileSync(file1, JSON.stringify(part1));
  fs.writeFileSync(file2, JSON.stringify(part2));

  const size1 = (fs.statSync(file1).size / 1024 / 1024).toFixed(2);
  const size2 = (fs.statSync(file2).size / 1024 / 1024).toFixed(2);

  console.log(`✓ Exported Part 1: ${file1} (${part1.features.length} features, ${size1} MB)`);
  console.log(`✓ Exported Part 2: ${file2} (${part2.features.length} features, ${size2} MB)`);

  // Remove the oversized single file (>100MB)
  fs.unlinkSync(polyFile);
  console.log('✓ Unlinked oversized single file NDCDBBDY_polyline.json');
} else {
  console.log('NDCDBBDY_polyline.json not found or already split.');
}
