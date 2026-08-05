import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import proj4 from 'proj4';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');

// Read raw SHP and DBF for V_TRANSITTION_BDY_polyline and WARTA_LOT_region
const polyShpBuffer = fs.readFileSync(path.join(shpDir, 'V_TRANSITTION_BDY_polyline.shp'));
const polyDbfBuffer = fs.readFileSync(path.join(shpDir, 'V_TRANSITTION_BDY_polyline.dbf'));

const rawShp = shpModule.parseShp(polyShpBuffer);
const rawDbf = shpModule.parseDbf(polyDbfBuffer);

console.log('Shp features count:', rawShp.length);
console.log('Dbf features count:', rawDbf.length);

// Let's inspect raw DBF properties to see if any feature mentions Lavender or Mukim
if (rawDbf.length > 0) {
  console.log('Sample DBF keys:', Object.keys(rawDbf[0]));
  console.log('Sample DBF row 0:', rawDbf[0]);
}

// Let's test a range of towgs84 values for Cassini N.Sembilan origin (lat0=2.7121205083, lon0=101.9397026917):
// Target WGS84 for Lavender Heights 35: Lng ~101.9868, Lat ~2.7077
// Target WGS84 for Jalan Senawang / Bunga Raya: Lng ~101.9805, Lat ~2.7095

// Raw Cassini origin in meters:
// Lon 101.9868 - 101.9397 = +0.0471 deg ~ +5220 meters East
// Lat 2.7077 - 2.7121 = -0.0044 deg ~ -486 meters North

// Let's find raw feature near [5220, -486]
let lavenderFeature = null;
let minDistance = Infinity;

rawShp.forEach((f, i) => {
  if (f.coordinates && f.coordinates[0]) {
    const pt = f.coordinates[0];
    const dist = Math.hypot(pt[0] - 5220, pt[1] - (-486));
    if (dist < minDistance) {
      minDistance = dist;
      lavenderFeature = { index: i, pt: pt };
    }
  }
});

console.log('Closest raw feature to Lavender Heights [5220, -486]:', lavenderFeature, 'distance:', minDistance);

const rawPt = lavenderFeature.pt;

// Let's test different proj4 definitions on rawPt and print the resulting Lng/Lat:
const testDefs = {
  // Original shpjs default (ellipse GRS80, no towgs84):
  shpjs_orig: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
  
  // Inverse towgs84 (+11, -851, -5):
  towgs84_positive: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=11,-851,-5,0,0,0,0 +units=m +no_defs',

  // Negative towgs84 (-11, +851, +5):
  towgs84_negative: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',

  // GDM2000 / Cassini N.Sembilan with specific dx/dy offsets:
  // Let's test dx offset from +0 to +200 meters in steps of 50m
};

const wgs84 = 'EPSG:4326';

console.log('\n--- TESTING PROJECTIONS AGAINST TARGET (101.9868, 2.7077) ---');
for (const [name, def] of Object.entries(testDefs)) {
  const res = proj4(def, wgs84, rawPt);
  console.log(`${name.padEnd(20)} => Lng: ${res[0].toFixed(6)}, Lat: ${res[1].toFixed(6)} | Diff Lng: ${(res[0] - 101.9868).toFixed(6)}, Diff Lat: ${(res[1] - 2.7077).toFixed(6)}`);
}
