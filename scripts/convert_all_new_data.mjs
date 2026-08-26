import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const newDataDir = path.join(projectRoot, 'NEW DATA');
const publicDataDir = path.join(projectRoot, 'public', 'data');

// Exact Cassini-Soldner (Negeri Sembilan - GDM2000 / GRS80) to WGS84 Converter
function cassiniToWgs84(x, y) {
  const lat0 = 2.7121205083 * Math.PI / 180;
  const lon0 = 101.9397026917 * Math.PI / 180;
  const a = 6378137.0;
  const f = 1 / 298.2572221008916;
  const e2 = 2 * f - f * f;

  const M0 = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * lat0
    - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * lat0)
    + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * lat0)
    - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * lat0));

  const M1 = M0 + y;
  const mu1 = M1 / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

  const phi1 = mu1
    + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu1)
    + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu1)
    + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu1);

  const N1 = a / Math.sqrt(1 - e2 * Math.sin(phi1) * Math.sin(phi1));
  const T1 = Math.tan(phi1) * Math.tan(phi1);
  const R1 = a * (1 - e2) / Math.pow(1 - e2 * Math.sin(phi1) * Math.sin(phi1), 1.5);
  const D = x / N1;

  const lat = phi1 - (N1 * Math.tan(phi1) / R1) * (
    D * D / 2 - (5 + 3 * T1 + 10 * (e2 / (1 - e2)) - 4 * (e2 / (1 - e2)) * (e2 / (1 - e2)) - 9 * (e2 / (1 - e2))) * Math.pow(D, 4) / 24
    + (61 + 90 * T1 + 298 * (e2 / (1 - e2)) + 45 * T1 * T1 - 252 * (e2 / (1 - e2))) * Math.pow(D, 6) / 720
  );

  const lon = lon0 + (
    D - (1 + 2 * T1 + (e2 / (1 - e2))) * Math.pow(D, 3) / 6
    + (5 - 2 * (e2 / (1 - e2)) + 28 * T1 - 3 * (e2 / (1 - e2)) * (e2 / (1 - e2)) + 8 * (e2 / (1 - e2)) + 24 * T1 * T1) * Math.pow(D, 5) / 120
  ) / Math.cos(phi1);

  return [
    Math.round((lon * 180 / Math.PI) * 100000) / 100000,
    Math.round((lat * 180 / Math.PI) * 100000) / 100000
  ];
}

function transformCoords(coords) {
  if (!Array.isArray(coords)) return coords;
  if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
    // If it's already in lat/lon (~101-103, ~2-4), leave it
    if (coords[0] > 90 && coords[0] < 110 && coords[1] > 0 && coords[1] < 10) {
      return [
        Math.round(coords[0] * 100000) / 100000,
        Math.round(coords[1] * 100000) / 100000
      ];
    }
    // Cassini [x, y] -> WGS84 [lon, lat]
    return cassiniToWgs84(coords[0], coords[1]);
  }
  return coords.map(c => transformCoords(c));
}

// Convert SHP to reprojected GeoJSON
function convertShp(shpPath, dbfPath) {
  const shpBuffer = fs.readFileSync(shpPath);
  const dbfBuffer = fs.existsSync(dbfPath) ? fs.readFileSync(dbfPath) : null;

  // We do not pass prj to shpjs parseShp so it retains raw projected coordinates, then we apply exact Cassini formula
  const parsedShp = shpModule.parseShp(shpBuffer);
  const parsedDbf = dbfBuffer ? shpModule.parseDbf(dbfBuffer) : [];
  const geojson = shpModule.combine([parsedShp, parsedDbf]);

  if (geojson && geojson.features) {
    geojson.features.forEach(f => {
      if (f.geometry && f.geometry.coordinates) {
        f.geometry.coordinates = transformCoords(f.geometry.coordinates);
      }
    });
  }

  return geojson;
}

// Map files to target destination in public/data
// Target directories: statewide, jelebu, jempol, kualapilah, pd, rembau, seremban, tampin
function determineTarget(filePath) {
  const lower = filePath.toLowerCase().replace(/\\/g, '/');
  const baseName = path.basename(filePath, '.shp');

  // Statewide files
  if (baseName === 'NEGERI_region') {
    return { dir: 'statewide', file: 'NEGERI_region.json' };
  }
  if (baseName === 'HUTAN SIMPAN_region') {
    return { dir: 'statewide', file: 'HUTAN_SIMPAN_region.json' };
  }
  if (baseName === 'PEMBATALAN HUTAN SIMPAN_region') {
    return { dir: 'statewide', file: 'PEMBATALAN_HUTAN_SIMPAN_region.json' };
  }

  // Determine District
  let district = null;
  if (lower.includes('jelebu')) district = 'jelebu';
  else if (lower.includes('jempol')) district = 'jempol';
  else if (lower.includes('kuala pilah') || lower.includes('kuala_pilah')) district = 'kualapilah';
  else if (lower.includes('port dickson') || lower.includes('_pd_') || lower.includes('relative_pd')) district = 'pd';
  else if (lower.includes('rembau')) district = 'rembau';
  else if (lower.includes('seremban')) district = 'seremban';
  else if (lower.includes('tampin')) district = 'tampin';

  if (!district) {
    district = 'statewide';
  }

  // Standardize file name based on category
  let outName = `${baseName}.json`;
  if (lower.includes('sempadan')) {
    outName = `SEMPADAN_${district.toUpperCase()}_region.json`;
  } else if (lower.includes('tanah rizab melayu')) {
    outName = `RIZAB_MELAYU_${district.toUpperCase()}_region.json`;
  } else if (lower.includes('pembatalan trm') || (lower.includes('pengantian trm') && lower.includes('pembatalan'))) {
    outName = `PEMBATALAN_TRM_${district.toUpperCase()}_region.json`;
  } else if (lower.includes('gantian rizab melayu')) {
    outName = `GANTIAN_TRM_${district.toUpperCase()}_region.json`;
  } else if (lower.includes('rizab orang asli')) {
    outName = `RIZAB_ORANG_ASLI_${district.toUpperCase()}_region.json`;
  } else if (lower.includes('ndcdb lot')) {
    if (baseName.startsWith('LOT')) {
      outName = `NDCDB_LOT_${district.toUpperCase()}_region.json`;
    } else if (baseName.startsWith('RELATIVE')) {
      outName = `RELATIVE_LOT_${district.toUpperCase()}_region.json`;
    }
  }

  return { dir: district, file: outName };
}

function findShpFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      findShpFiles(fullPath, fileList);
    } else if (item.name.toLowerCase().endsWith('.shp')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function run() {
  console.log('=== STARTING BATCH CONVERSION OF ALL NEW DATA SHAPEFILES ===\n');

  const allShp = findShpFiles(newDataDir);
  console.log(`Found ${allShp.length} shapefiles to process.`);

  const summary = {};

  for (const shpPath of allShp) {
    const dir = path.dirname(shpPath);
    const baseName = path.basename(shpPath, '.shp');
    const dbfPath = path.join(dir, `${baseName}.dbf`);

    const target = determineTarget(shpPath);
    const targetDir = path.join(publicDataDir, target.dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const outPath = path.join(targetDir, target.file);

    try {
      const geojson = convertShp(shpPath, dbfPath);
      const featureCount = geojson.features ? geojson.features.length : 0;

      fs.writeFileSync(outPath, JSON.stringify(geojson));
      const sizeMb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);

      console.log(`✓ [${target.dir}] ${target.file} (${featureCount.toLocaleString()} features, ${sizeMb} MB)`);

      if (!summary[target.dir]) summary[target.dir] = [];
      summary[target.dir].push({ file: target.file, count: featureCount, sizeMb });
    } catch (err) {
      console.error(`✗ Error converting ${baseName}:`, err.message);
    }
  }

  console.log('\n=== CONVERSION COMPLETE ===');
  console.log(JSON.stringify(summary, null, 2));
}

run();
