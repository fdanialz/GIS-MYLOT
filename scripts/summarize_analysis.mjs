import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = 'C:/Users/Irfan/.gemini/antigravity-ide/brain/03e24800-7ea0-43c9-bca1-76ce15acf986/.system_generated/tasks/task-56.log';

const rawLog = fs.readFileSync(logPath, 'utf8');
const jsonStart = rawLog.indexOf('{');
const jsonStr = rawLog.slice(jsonStart);
const data = JSON.parse(jsonStr);

console.log('=== DATASET SUMMARY BY CATEGORY ===\n');

for (const [cat, layers] of Object.entries(data)) {
  console.log(`### Category: ${cat}`);
  let totalFeatures = 0;
  let totalShpSize = 0;
  for (const l of layers) {
    totalFeatures += (l.featureCount || 0);
    totalShpSize += (l.shpSizeBytes || 0);
    console.log(` - ${l.baseName}: ${l.featureCount} features | Geom: ${l.geomType} | Fields: [${l.fields ? l.fields.join(', ') : ''}]`);
  }
  console.log(` TOTAL: ${layers.length} layers, ${totalFeatures.toLocaleString()} features, ${(totalShpSize / 1024 / 1024).toFixed(2)} MB SHP\n`);
}
