import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');
const outputDir = path.join(__dirname, '..', 'public', 'data', 'seremban');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const fileBases = [
  'T_DAERAH_region',
  'V_MALAY_RES_region',
  'V_FOREST_RES_region',
  'V_ABORIGINE_RES_region',
  'RIZAB MELAYU_LAMA_region',
  'PEMBATALAN_LAMA_region',
  'WARTA_LOT_region',
  'V_TRANSITTION_LOT_region',
  'V_TRANSITTION_BDY_polyline',
  'V_TRANSITTION_STN_point',
  'V_TRANSITTION_BDY_point',
  'V_TRANSITTION_LOT_none',
  'V_NDCDBLOT_region',
  'NDCDBBDY_polyline'
];

const summary = [];

console.log('--- Processing SEREMBAN SHP Files ---');

for (const name of fileBases) {
  const shpPath = path.join(shpDir, `${name}.shp`);
  const dbfPath = path.join(shpDir, `${name}.dbf`);
  const prjPath = path.join(shpDir, `${name}.prj`);

  if (!fs.existsSync(shpPath) || !fs.existsSync(dbfPath)) {
    console.log(`Skipping ${name}: SHP or DBF file missing.`);
    continue;
  }

  try {
    console.log(`Converting ${name}...`);
    const shpBuffer = fs.readFileSync(shpPath);
    const dbfBuffer = fs.readFileSync(dbfPath);
    const prjString = fs.existsSync(prjPath) ? fs.readFileSync(prjPath, 'utf8') : '';

    const parsedShp = shpModule.parseShp(shpBuffer, prjString);
    const parsedDbf = shpModule.parseDbf(dbfBuffer);
    const geojson = shpModule.combine([parsedShp, parsedDbf]);

    const count = geojson.features ? geojson.features.length : 0;
    const jsonFileName = `${name}.json`;
    const outputPath = path.join(outputDir, jsonFileName);

    // Save GeoJSON
    fs.writeFileSync(outputPath, JSON.stringify(geojson));
    const sizeMb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);

    summary.push({
      key: name,
      file: jsonFileName,
      featureCount: count,
      sizeMb: parseFloat(sizeMb),
      geomType: geojson.features && geojson.features[0] ? geojson.features[0].geometry.type : 'Unknown'
    });

    console.log(`  ✓ Successfully exported ${jsonFileName} (${count} features, ${sizeMb} MB)`);
  } catch (err) {
    console.error(`  ✗ Error converting ${name}:`, err.message);
  }
}

// Generate summary metadata index file
fs.writeFileSync(
  path.join(outputDir, 'index.json'),
  JSON.stringify(summary, null, 2)
);

console.log('--- All SEREMBAN SHP Files Converted Successfully! ---');
