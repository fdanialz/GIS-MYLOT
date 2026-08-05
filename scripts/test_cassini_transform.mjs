import proj4 from 'proj4';

// Cassini Origin for N. Sembilan (Maklumat Ukur Cadastral JUPEM N.Sembilan):
// Latitude of Origin = 2° 42' 43.6338" N = 2.7121205083333333 N
// Central Meridian = 101° 56' 22.9297" E = 101.93970269166667 E

// Test Raw Coordinate in Cassini Meters:
// X (Easting) = -169.792 meters
// Y (Northing) = 2109.237 meters

const rawX = -169.792;
const rawY = 2109.237;

// Proj4 definitions to test:
const projDefs = {
  // 1. Basic Cassini (Standard GRS80) - What shpjs was using (NO DATUM SHIFT)
  shpjs_default: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',

  // 2. Kertau 1948 Datum Shift (+towgs84=-11,851,5)
  kertau_std: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',

  // 3. Kertau 1948 7-Parameter Transformation (JUPEM Peninsular Malaysia standard: dx=-11, dy=851, dz=5, rx=0, ry=0, rz=0, scale=0)
  kertau_7param: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +rf=300.0 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',

  // 4. Kertau 1948 RSO (Peninsular Malaysia Datum)
  kertau_rso: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-23.6,851.8,216.2,0,0,0,0 +units=m +no_defs',

  // 5. GDM2000 Cassini with GRS80 (JUPEM GDM2000 Transformation)
  gdm2000_jupem: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs'
};

const wgs84 = 'EPSG:4326';

console.log('Testing Raw Cassini Point (-169.792 m, 2109.237 m):');
for (const [name, def] of Object.entries(projDefs)) {
  try {
    const result = proj4(def, wgs84, [rawX, rawY]);
    console.log(`\n--- ${name} ---`);
    console.log(`Lng: ${result[0]}, Lat: ${result[1]}`);
  } catch (e) {
    console.error(`Error in ${name}:`, e.message);
  }
}
