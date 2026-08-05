import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import proj4 from 'proj4';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Raw Cassini origin for N. Sembilan:
// lat_0 = 2.7121205083, lon_0 = 101.9397026917

// Let's test a coordinate in Seremban (e.g. Lavender Heights / Senawang)
// Raw Cassini meters in SHP file:
// X (Easting), Y (Northing)

// Proj4 definitions to test:
const defs = {
  // 1. Raw Cassini without TOWGS84 (what shpjs produced)
  raw_cassini: '+proj=cass +lat_0=2.7121205083 +lon_0=101.9397026917 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',

  // 2. Cassini with Kertau 1948 TOWGS84 (Malaya / WGS84 shift)
  kertau_towgs84_1: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=mora +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',

  // 3. Cassini with Kertau 1948 RSO Peninsular Malaysia towgs84
  kertau_towgs84_2: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=mora +towgs84=-23.6,851.8,216.2,0,0,0,0 +units=m +no_defs',

  // 4. GDM2000 Cassini (GRS80)
  gdm2000_cassini: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',

  // 5. Cassini with MRT / Kertau 1948 (EPSG:4375 - Cassini-Soldner Negeri Sembilan & Melaka)
  epsg4375: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +b=6356103.038993155 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs',

  // 6. Modified Kertau
  mod_kertau: '+proj=cass +lat_0=2.712120508333333 +lon_0=101.9397026916667 +x_0=0 +y_0=0 +a=6377304.063 +rf=300 +towgs84=-11,851,5,0,0,0,0 +units=m +no_defs'
};

// Test a sample coordinate from Lavender Heights:
// Lavender Heights Seremban real Google Maps Lat/Lng: ~2.7061, 101.9885
// Let's check raw Cassini coordinates in WARTA_LOT_region or V_TRANSITTION_BDY_polyline
console.log('Testing Proj4 Definitions...');
