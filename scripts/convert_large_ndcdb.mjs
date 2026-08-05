import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');
const outputDir = path.join(__dirname, '..', 'public', 'data', 'seremban');

const largeFiles = ['V_NDCDBLOT_region', 'NDCDBBDY_polyline'];

for (const name of largeFiles) {
  const shpPath = path.join(shpDir, `${name}.shp`);
  const dbfPath = path.join(shpDir, `${name}.dbf`);
  const prjPath = path.join(shpDir, `${name}.prj`);

  console.log(`Starting large conversion for ${name}...`);
  try {
    const shpBuffer = fs.readFileSync(shpPath);
    const dbfBuffer = fs.readFileSync(dbfPath);
    const prjString = fs.existsSync(prjPath) ? fs.readFileSync(prjPath, 'utf8') : '';

    console.log(`Parsing SHP & DBF for ${name}...`);
    const parsedShp = shpModule.parseShp(shpBuffer, prjString);
    const parsedDbf = shpModule.parseDbf(dbfBuffer);
    const geojson = shpModule.combine([parsedShp, parsedDbf]);

    console.log(`Features count for ${name}: ${geojson.features ? geojson.features.length : 0}`);
    const jsonPath = path.join(outputDir, `${name}.json`);
    
    // Save GeoJSON
    const stream = fs.createWriteStream(jsonPath);
    stream.write(JSON.stringify(geojson));
    stream.end();

    console.log(`✓ Done writing ${name}.json`);
  } catch (err) {
    console.error(`✗ Error converting ${name}:`, err);
  }
}
