import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shpDir = path.join(__dirname, '..', 'SEREMBAN SHP');

const files = [
  'V_MALAY_RES_region',
  'V_FOREST_RES_region',
  'V_ABORIGINE_RES_region',
  'RIZAB MELAYU_LAMA_region',
  'WARTA_LOT_region'
];

console.log('--- SEARCHING FOR KNOWN LANDMARKS IN DBFS ---');

for (const f of files) {
  try {
    const shpBuffer = fs.readFileSync(path.join(shpDir, `${f}.shp`));
    const dbfBuffer = fs.readFileSync(path.join(shpDir, `${f}.dbf`));
    const rawShp = shpModule.parseShp(shpBuffer);
    const rawDbf = shpModule.parseDbf(dbfBuffer);

    rawDbf.forEach((row, idx) => {
      const str = JSON.stringify(row).toLowerCase();
      if (str.includes('seremban') || str.includes('ampangan') || str.includes('senawang') || str.includes('rasah') || str.includes('lavender') || str.includes('galla')) {
        const shape = rawShp[idx];
        if (shape && shape.coordinates) {
          const pt = shape.coordinates[0]?.[0] || shape.coordinates[0];
          console.log(`[${f} #${idx}] Match:`, row.TUJUAN_WAR || row.NAMA_WARTA || row.KETERANGAN || row.nama || row.Nama_SRM || row.UPI);
          console.log(`  Raw Cassini Pt:`, pt);
        }
      }
    });
  } catch (e) {
    console.error(`Error in ${f}:`, e.message);
  }
}
