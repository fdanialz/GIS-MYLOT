import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');
const parseZip = shpModule.parseZip || shpModule.default;

console.log('shpModule:', Object.keys(shpModule));
console.log('parseZip type:', typeof parseZip);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');

const files = [
  'T_DAERAH_region',
  'V_ABORIGINE_RES_region',
  'V_FOREST_RES_region',
  'V_MALAY_RES_region',
  'PEMBATALAN_LAMA_region',
  'RIZAB MELAYU_LAMA_region',
  'WARTA_LOT_region',
  'V_TRANSITTION_LOT_region'
];

// Or test loading zip or buffer
for (const name of files) {
  try {
    const shpBuffer = fs.readFileSync(path.join(shpDir, `${name}.shp`));
    const dbfBuffer = fs.readFileSync(path.join(shpDir, `${name}.dbf`));
    const prjString = fs.existsSync(path.join(shpDir, `${name}.prj`)) 
      ? fs.readFileSync(path.join(shpDir, `${name}.prj`), 'utf8') 
      : '';

    // shpjs functions
    const parsedShp = shpModule.parseShp(shpBuffer, prjString);
    const parsedDbf = shpModule.parseDbf(dbfBuffer);
    const geojson = shpModule.combine([parsedShp, parsedDbf]);

    console.log(`=== ${name} ===`);
    console.log(`Features count: ${geojson.features ? geojson.features.length : 0}`);
    if (geojson.features && geojson.features.length > 0) {
      console.log('Sample properties:', JSON.stringify(geojson.features[0].properties, null, 2));
      console.log('Sample geometry type:', geojson.features[0].geometry.type);
      const coords = geojson.features[0].geometry.coordinates;
      console.log('Sample first coord:', JSON.stringify(coords[0]?.[0] || coords[0]));
    }
  } catch (err) {
    console.error(`Error processing ${name}:`, err.message);
  }
}
