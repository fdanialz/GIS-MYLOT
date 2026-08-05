import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import proj4 from 'proj4';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');

// Proj4 definitions to test:
const projDefs = {
  no_shift: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
  kertau_towgs84_1: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',
  kertau_towgs84_2: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-23.6,851.8,216.2,0,0,0,0 +units=m +no_defs',
  gdm2000_jupem: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',
  cassini_ns_exact: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +rf=300.0 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs'
};

const wgs84 = 'EPSG:4326';

const shpBuffer = fs.readFileSync(path.join(shpDir, 'V_TRANSITTION_BDY_polyline.shp'));
const rawShp = shpModule.parseShp(shpBuffer);

console.log('Total features:', rawShp.length);

let targetFeature = null;
for (const f of rawShp) {
  if (f.type === 'LineString' && f.coordinates) {
    const pt = f.coordinates[0];
    if (pt[0] > 5000 && pt[0] < 6000 && pt[1] > -1000 && pt[1] < 0) {
      targetFeature = f;
      break;
    }
  }
}

if (targetFeature) {
  const pt = targetFeature.coordinates[0];
  console.log('Found Lavender Heights Raw Cassini Point:', pt);

  for (const [name, def] of Object.entries(projDefs)) {
    const res = proj4(def, wgs84, pt);
    console.log(`\n${name} => Lng: ${res[0].toFixed(6)}, Lat: ${res[1].toFixed(6)}`);
  }
} else {
  console.log('No exact Lavender feature found in range, checking first feature:');
  const pt = rawShp[0].coordinates[0];
  console.log('Raw Pt:', pt);
  for (const [name, def] of Object.entries(projDefs)) {
    const res = proj4(def, wgs84, pt);
    console.log(`\n${name} => Lng: ${res[0].toFixed(6)}, Lat: ${res[1].toFixed(6)}`);
  }
}
