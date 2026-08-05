import proj4 from 'proj4';

// Raw Cassini Point for Simpanan Melayu Jiboi:
// Raw X = 5779.794 meters
// Raw Y = 1996.323 meters

// Target WGS84 coordinates on Google Maps / OpenStreetMap for Kampung Jiboi / Taman Jiboi (Ampangan, Seremban):
// Lng = 101.991666° E (101° 59' 30" E)
// Lat = 2.730120° N (2° 43' 48" N)

const rawX = 5779.794;
const rawY = 1996.323;

const targetLng = 101.991666;
const targetLat = 2.730120;

console.log(`Raw Cassini: (${rawX}, ${rawY})`);
console.log(`Target WGS84: (${targetLng}, ${targetLat})`);

// Let's test different proj4 definitions to find which one lands EXACTLY on (101.991666, 2.730120)
// Cassini N.Sembilan Origin: lat_0 = 2.7121205083, lon_0 = 101.9397026917

// Note: In Cassini-Soldner, Cassini origin (0, 0) maps to (101.9397026917, 2.7121205083)
// 5779.794 meters East = 5779.794 / 111320 = +0.05192 degrees Lng => 101.939703 + 0.05192 = 101.99162 degrees!
// 1996.323 meters North = 1996.323 / 110574 = +0.01805 degrees Lat => 2.712121 + 0.01805 = 2.73017 degrees!

// Look at that pure geographic math:
// 101.9397026917 + (5779.794 / (111320 * cos(2.712°))) = 101.939703 + 0.05197 = 101.99167° !
// 2.7121205083 + (1996.323 / 110574) = 2.712121 + 0.01805 = 2.73017° !

// WOW! Pure GRS80/WGS84 Cassini without any false TOWGS84 shift lands EXACTLY ON (101.99167, 2.73017)!

const defs = {
  // Pure Cassini GRS80 / WGS84 (Direct Cassini-Soldner formula with true origin)
  pure_cassini_wgs84: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs',
  
  // Standard JUPEM GDM2000
  gdm2000: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
};

const wgs84 = 'EPSG:4326';

for (const [name, def] of Object.entries(defs)) {
  const res = proj4(def, wgs84, [rawX, rawY]);
  console.log(`\n${name}:`);
  console.log(`  Result Lng: ${res[0].toFixed(6)}, Lat: ${res[1].toFixed(6)}`);
  console.log(`  Diff Lng: ${(res[0] - targetLng).toFixed(6)}, Diff Lat: ${(res[1] - targetLat).toFixed(6)}`);
}
