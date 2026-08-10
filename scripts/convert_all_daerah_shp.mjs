import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

globalThis.self = globalThis;
const shpModule = await import('shpjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.join(__dirname, '..');

console.log('=== CONVERTING PD, REMBAU & TAMPIN SHAPEFILES ===');

const DAERAH_SOURCES = [
  {
    key: 'pd',
    name: 'Port Dickson',
    shpDir: path.join(projectDir, 'PD SHP-20260805T082438Z-1-001', 'PD SHP'),
    outputDir: path.join(projectDir, 'public', 'data', 'pd'),
    fileBases: [
      { key: 'daerahPd', file: 'T_DAERAH_region', name: 'Sempadan Daerah Port Dickson' },
      { key: 'malayResPd', file: 'V_MALAY_RES_region', name: 'Warta Rizab Melayu Port Dickson' },
      { key: 'forestResPd', file: 'V_FOREST_RES_region', name: 'Hutan Simpan Kekal Port Dickson' },
      { key: 'aborigineResPd', file: 'V_ABORIGINE_RES_region', name: 'Rizab Orang Asli Port Dickson' },
      { key: 'wartaLotPd', file: 'WARTA_LOT_region', name: 'Warta Lot Port Dickson' },
      { key: 'ndcdbLotPd', file: 'V_NDCDBLOT_region', name: 'Lot Kadaster NDCDB Port Dickson' },
      { key: 'ndcdbBdyPd', file: 'NDCDBBDY_polyline', name: 'Garisan Sempadan NDCDB Polyline Port Dickson' },
      { key: 'pembatalanPd', file: 'PEMBATALAN_LAMA_region', name: 'Warta Pembatalan Rizab Port Dickson' },
      { key: 'rizabMelayuLamaPd', file: 'RIZAB MELAYU_LAMA_region', name: 'Rizab Melayu Rekod Terdahulu Port Dickson' }
    ]
  },
  {
    key: 'rembau',
    name: 'Rembau',
    shpDir: path.join(projectDir, 'REMBAU SHP-20260805T082441Z-1-001', 'REMBAU SHP'),
    outputDir: path.join(projectDir, 'public', 'data', 'rembau'),
    fileBases: [
      { key: 'daerahRembau', file: 'REMBAU_region', name: 'Sempadan Daerah Rembau' },
      { key: 'malayResRembau', file: 'MALAY REMBAU_region', name: 'Warta Rizab Melayu Rembau' },
      { key: 'forestResRembau', file: 'FOREST REMBAU_region', name: 'Hutan Simpan Kekal Rembau' },
      { key: 'aborigineResRembau', file: 'ABORIGINE REMBAU_region', name: 'Rizab Orang Asli Rembau' },
      { key: 'wartaLotRembau', file: 'WARTA LOT REMBAU_region', name: 'Warta Lot Rembau' },
      { key: 'ndcdbLotRembau', file: 'NDCDB LOT REMBAU_region', name: 'Lot Kadaster NDCDB Rembau' },
      { key: 'pembatalanRembau', file: 'PEMBATALAN TRM REMBAU_region', name: 'Warta Pembatalan Rizab Rembau' },
      { key: 'seksyenRembau', file: 'SEKSYEN REMBAU_region', name: 'Seksyen Ukur Rembau' }
    ]
  },
  {
    key: 'tampin',
    name: 'Tampin',
    shpDir: path.join(projectDir, 'TAMPIN SHP-20260805T082446Z-1-001', 'TAMPIN SHP'),
    outputDir: path.join(projectDir, 'public', 'data', 'tampin'),
    fileBases: [
      { key: 'daerahTampin', file: 'TAMPIN_region', name: 'Sempadan Daerah Tampin' },
      { key: 'malayResTampin', file: 'MALAY TAMPIN_region', name: 'Warta Rizab Melayu Tampin' },
      { key: 'forestResTampin', file: 'FOREST TAMPIN_region', name: 'Hutan Simpan Kekal Tampin' },
      { key: 'aborigineResTampin', file: 'ABORIGINE TAMPIN_region', name: 'Rizab Orang Asli Tampin' },
      { key: 'wartaLotTampin', file: 'WARTA LOT TAMPIN_region', name: 'Warta Lot Tampin' },
      { key: 'ndcdbLotTampin', file: 'NDCDB LOT TAMPIN_region', name: 'Lot Kadaster NDCDB Tampin' },
      { key: 'pembatalanTampin', file: 'PEMBATALAN TRM TAMPIN_region', name: 'Warta Pembatalan Rizab Tampin' },
      { key: 'penggantianTampin', file: 'PENGGANTIAN TRM TAMPIN_region', name: 'Penggantian TRM Tampin' },
      { key: 'seksyenTampin', file: 'SEKSYEN TAMPIN_region', name: 'Seksyen Ukur Tampin' }
    ]
  }
];

for (const source of DAERAH_SOURCES) {
  console.log(`\n--- Processing Shapefiles for ${source.name} ---`);
  
  if (!fs.existsSync(source.outputDir)) {
    fs.mkdirSync(source.outputDir, { recursive: true });
  }

  const summary = [];

  for (const item of source.fileBases) {
    const name = item.file;
    const shpPath = path.join(source.shpDir, `${name}.shp`);
    const dbfPath = path.join(source.shpDir, `${name}.dbf`);
    const prjPath = path.join(source.shpDir, `${name}.prj`);

    if (!fs.existsSync(shpPath)) {
      console.log(`  Skipping ${name}: SHP file missing.`);
      continue;
    }

    try {
      console.log(`  Converting ${name}...`);
      const shpBuffer = fs.readFileSync(shpPath);
      const dbfBuffer = fs.existsSync(dbfPath) ? fs.readFileSync(dbfPath) : null;
      const prjString = fs.existsSync(prjPath) ? fs.readFileSync(prjPath, 'utf8') : '';

      const parsedShp = shpModule.parseShp(shpBuffer, prjString);
      const parsedDbf = dbfBuffer ? shpModule.parseDbf(dbfBuffer) : [];
      const geojson = shpModule.combine([parsedShp, parsedDbf]);

      // Function to round coordinates to 6 decimal places (~10cm accuracy)
      const roundCoords = (coords) => {
        if (typeof coords === 'number') return Math.round(coords * 1000000) / 1000000;
        if (Array.isArray(coords)) return coords.map(roundCoords);
        return coords;
      };

      if (geojson && geojson.features) {
        geojson.features.forEach(f => {
          if (f.geometry && f.geometry.coordinates) {
            f.geometry.coordinates = roundCoords(f.geometry.coordinates);
          }
          if (f.properties) {
            Object.keys(f.properties).forEach(k => {
              if (f.properties[k] === null || f.properties[k] === '') {
                delete f.properties[k];
              }
            });
          }
        });
      }

      const count = geojson.features ? geojson.features.length : 0;
      const jsonFileName = `${name}.json`;
      const outputPath = path.join(source.outputDir, jsonFileName);

      fs.writeFileSync(outputPath, JSON.stringify(geojson));
      const sizeMb = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);

      summary.push({
        key: item.key,
        name: item.name,
        file: jsonFileName,
        featureCount: count,
        sizeMb: parseFloat(sizeMb),
        geomType: geojson.features && geojson.features[0] ? geojson.features[0].geometry.type : 'Unknown'
      });

      console.log(`    ✓ Exported ${jsonFileName} (${count} features, ${sizeMb} MB)`);
    } catch (err) {
      console.error(`    ✗ Error converting ${name}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(source.outputDir, 'index.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`✓ Completed ${source.name} conversion!`);
}

console.log('\n=== ALL DAERAH SHAPEFILES CONVERTED SUCCESSFULLY! ===');
