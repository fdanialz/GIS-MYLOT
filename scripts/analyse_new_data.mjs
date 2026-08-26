import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const newDataDir = path.join(__dirname, '..', 'NEW DATA');

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

const allShp = findShpFiles(newDataDir);
console.log(`Found ${allShp.length} shapefile layers in NEW DATA folder.\n`);

const summaryByCategory = {};

for (const shpPath of allShp) {
  const dir = path.dirname(shpPath);
  const baseName = path.basename(shpPath, '.shp');
  const relativeDir = path.relative(newDataDir, dir);
  const category = relativeDir.split(path.sep)[0];

  if (!summaryByCategory[category]) {
    summaryByCategory[category] = [];
  }

  try {
    const shpBuffer = fs.readFileSync(shpPath);
    const dbfPath = path.join(dir, `${baseName}.dbf`);
    const dbfBuffer = fs.existsSync(dbfPath) ? fs.readFileSync(dbfPath) : null;
    const prjPath = path.join(dir, `${baseName}.prj`);
    const prjString = fs.existsSync(prjPath) ? fs.readFileSync(prjPath, 'utf8') : '';

    const parsedShp = shpModule.parseShp(shpBuffer, prjString);
    const parsedDbf = dbfBuffer ? shpModule.parseDbf(dbfBuffer) : [];
    const geojson = shpModule.combine([parsedShp, parsedDbf]);

    const features = geojson.features || [];
    const sampleProps = features.length > 0 ? features[0].properties : {};
    const propKeys = Object.keys(sampleProps || {});

    // Compute bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    function checkCoords(coord) {
      if (Array.isArray(coord[0])) {
        coord.forEach(checkCoords);
      } else if (typeof coord[0] === 'number') {
        const [x, y] = coord;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    for (const f of features.slice(0, 1000)) {
      if (f.geometry && f.geometry.coordinates) {
        checkCoords(f.geometry.coordinates);
      }
    }

    const info = {
      baseName,
      relativeDir,
      featureCount: features.length,
      geomType: features.length > 0 && features[0].geometry ? features[0].geometry.type : 'N/A',
      fields: propKeys,
      sampleProps: sampleProps,
      bbox: minX !== Infinity ? [minX.toFixed(4), minY.toFixed(4), maxX.toFixed(4), maxY.toFixed(4)] : 'N/A',
      hasPrj: !!prjString,
      shpSizeBytes: fs.statSync(shpPath).size,
      dbfSizeBytes: dbfBuffer ? fs.statSync(dbfPath).size : 0
    };

    summaryByCategory[category].push(info);
  } catch (err) {
    summaryByCategory[category].push({
      baseName,
      relativeDir,
      error: err.message
    });
  }
}

console.log(JSON.stringify(summaryByCategory, null, 2));
