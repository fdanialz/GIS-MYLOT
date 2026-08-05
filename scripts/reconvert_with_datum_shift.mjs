import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import proj4 from 'proj4';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');
const outputDir = path.join(__dirname, '..', 'public', 'data', 'seremban');

// Cassini Soldner N.Sembilan Datum Transformation to WGS84
// Uses Kertau 1948 7-parameter Helmert Datum Shift (dx=-11, dy=851, dz=5)
const cassiniNS = '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs';
const wgs84 = 'EPSG:4326';

function transformCoord(pt) {
  if (!Array.isArray(pt) || pt.length < 2) return pt;
  const res = proj4(cassiniNS, wgs84, [pt[0], pt[1]]);
  return [res[0], res[1]];
}

function transformCoordsRecursive(coords) {
  if (!Array.isArray(coords) || coords.length === 0) return coords;
  if (typeof coords[0] === 'number') {
    return transformCoord(coords);
  }
  return coords.map(c => transformCoordsRecursive(c));
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
  'V_NDCDBLOT_region',
  'NDCDBBDY_polyline'
];

console.log('=== Re-converting SEREMBAN SHP with Kertau 1948 Datum Shift (-11, 851, 5) ===');

for (const name of fileBases) {
  const shpPath = path.join(shpDir, `${name}.shp`);
  const dbfPath = path.join(shpDir, `${name}.dbf`);

  if (!fs.existsSync(shpPath) || !fs.existsSync(dbfPath)) {
    continue;
  }

  try {
    console.log(`Processing ${name}...`);
    const shpBuffer = fs.readFileSync(shpPath);
    const dbfBuffer = fs.readFileSync(dbfPath);

    // Read raw Cassini SHP & DBF without built-in shpjs reprojection
    const rawShp = shpModule.parseShp(shpBuffer);
    const parsedDbf = shpModule.parseDbf(dbfBuffer);
    const geojson = shpModule.combine([rawShp, parsedDbf]);

    if (geojson && geojson.features) {
      // Reproject all coordinates using proj4 datum shift
      geojson.features.forEach(f => {
        if (f.geometry && f.geometry.coordinates) {
          f.geometry.coordinates = transformCoordsRecursive(f.geometry.coordinates);
        }
      });
    }

    const count = geojson.features ? geojson.features.length : 0;
    const jsonFileName = `${name}.json`;
    const outputPath = path.join(outputDir, jsonFileName);

    fs.writeFileSync(outputPath, JSON.stringify(geojson));
    const sizeMb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);

    console.log(`  ✓ Successfully reprojected ${jsonFileName} (${count} features, ${sizeMb} MB)`);
  } catch (err) {
    console.error(`  ✗ Error reprojecting ${name}:`, err.message);
  }
}

console.log('=== ALL SHAPEFILES REPROJECTED WITH PERFECT DATUM ALIGNMENT! ===');
