import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shpDir = path.join(__dirname, '..', 'JEMPOL SHP');
const outputDir = path.join(__dirname, '..', 'public', 'data', 'jempol');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('--- Processing JEMPOL SHP Files ---');

// List of major shapefile datasets in JEMPOL SHP
const fileBases = [
  { key: 'daerahJempol', file: 'JEMPOL_region', name: 'Sempadan Daerah Jempol' },
  { key: 'malayResJempol', file: 'JEMPOL TRM BARU A_region', name: 'Warta Rizab Melayu Jempol (Kawasan A)' },
  { key: 'malayResB', file: 'JEMPOL TRM BARU B_region', name: 'Warta Rizab Melayu Jempol (Kawasan B)' },
  { key: 'forestResJempol', file: 'JEMPOL RIZAB HUTAN_region', name: 'Hutan Simpan Kekal Jempol' },
  { key: 'aborigineResJempol', file: 'JEMPOL RIZAB ORANG ASLI_region', name: 'Rizab Orang Asli Jempol' },
  { key: 'wartaLotJempol', file: 'JEMPOL WARTA_region', name: 'Warta Lot Jempol' },
  { key: 'ndcdbLotJempol', file: 'JEMPOL NDCDB BARU_region', name: 'Lot Kadaster NDCDB Jempol' },
  { key: 'pembatalanTrmJempol', file: 'JEMPOL PEMBATALAN TRM BARU_region', name: 'Warta Pembatalan Rizab Melayu Jempol' },
  { key: 'trmGantianLama', file: 'JEMPOL TRM GANTIAN LAMA_region', name: 'Rizab Melayu Gantian Lama Jempol' },
  { key: 'trmLamaJempol', file: 'JEMPOL TRM LAMA_region', name: 'Rizab Melayu Rekod Terdahulu Jempol' }
];

const summary = [];

for (const item of fileBases) {
  const name = item.file;
  const shpPath = path.join(shpDir, `${name}.shp`);
  const dbfPath = path.join(shpDir, `${name}.dbf`);
  const prjPath = path.join(shpDir, `${name}.prj`);

  if (!fs.existsSync(shpPath)) {
    console.log(`Skipping ${name}: SHP file missing.`);
    continue;
  }

  try {
    console.log(`Converting ${name}...`);
    const shpBuffer = fs.readFileSync(shpPath);
    const dbfBuffer = fs.existsSync(dbfPath) ? fs.readFileSync(dbfPath) : null;
    const prjString = fs.existsSync(prjPath) ? fs.readFileSync(prjPath, 'utf8') : '';

    const parsedShp = shpModule.parseShp(shpBuffer, prjString);
    const parsedDbf = dbfBuffer ? shpModule.parseDbf(dbfBuffer) : [];
    const geojson = shpModule.combine([parsedShp, parsedDbf]);

    const count = geojson.features ? geojson.features.length : 0;
    const jsonFileName = `${name}.json`;
    const outputPath = path.join(outputDir, jsonFileName);

    // Save GeoJSON
    fs.writeFileSync(outputPath, JSON.stringify(geojson));
    const sizeMb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);

    summary.push({
      key: item.key,
      name: item.name,
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

// Generate summary metadata index file for Jempol
fs.writeFileSync(
  path.join(outputDir, 'index.json'),
  JSON.stringify(summary, null, 2)
);

console.log('--- All JEMPOL SHP Files Converted Successfully! ---');
