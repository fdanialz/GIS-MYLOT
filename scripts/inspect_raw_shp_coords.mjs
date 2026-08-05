import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpPath = path.join(__dirname, '..', 'SEREMBAN SHP', 'WARTA_LOT_region.shp');

const buffer = fs.readFileSync(shpPath);
// Shapefile header is 100 bytes.
// First record starts at byte 100.
// Record header is 8 bytes (record number, content length)
// Shape type at offset 100+8 = 104 (int32 LE)
// Bounding box at offset 108: xmin (double), ymin (double), xmax (double), ymax (double)

const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

const fileLengthBytes = view.getInt32(24, false) * 2;
console.log('File length:', fileLengthBytes);

// Read first record box
const recordNum = view.getInt32(100, false);
const contentLength = view.getInt32(104, false) * 2;
const shapeType = view.getInt32(108, true);

const xmin = view.getFloat64(112, true);
const ymin = view.getFloat64(120, true);
const xmax = view.getFloat64(128, true);
const ymax = view.getFloat64(136, true);

console.log('Record 1 shapeType:', shapeType);
console.log(`Raw Cassini Coordinates - X (Easting): ${xmin} to ${xmax}, Y (Northing): ${ymin} to ${ymax}`);
