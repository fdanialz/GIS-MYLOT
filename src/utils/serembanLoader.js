// Helper to dynamically load Seremban Shapefile GeoJSON datasets
const cache = {};

export const SEREMBAN_LAYERS_CONFIG = [
  {
    id: 'daerahSeremban',
    name: 'Sempadan Daerah Seremban',
    file: 'T_DAERAH_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#3b82f6',
    fillColor: '#1d4ed8',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Seremban (JUPEM)'
  },
  {
    id: 'malayRes',
    name: 'Warta Rizab Melayu (Seremban)',
    file: 'V_MALAY_RES_region.json',
    category: 'Rizab Tanah',
    color: '#ef4444',
    fillColor: '#b91c1c',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Seremban'
  },
  {
    id: 'forestRes',
    name: 'Hutan Simpan Kekal (Seremban)',
    file: 'V_FOREST_RES_region.json',
    category: 'Rizab Tanah',
    color: '#10b981',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Seremban'
  },
  {
    id: 'aborigineRes',
    name: 'Rizab Orang Asli (Seremban)',
    file: 'V_ABORIGINE_RES_region.json',
    category: 'Rizab Tanah',
    color: '#a855f7',
    fillColor: '#7e22ce',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Seremban'
  },
  {
    id: 'wartaLot',
    name: 'Warta Lot Seremban (1,772 Lot)',
    file: 'WARTA_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#eab308',
    fillColor: '#ca8a04',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Negeri Sembilan'
  },
  {
    id: 'rizabMelayuLama',
    name: 'Rizab Melayu Lama',
    file: 'RIZAB MELAYU_LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#f97316',
    fillColor: '#c2410c',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Melayu rekod terdahulu'
  },
  {
    id: 'pembatalanLama',
    name: 'Warta Pembatalan Rizab',
    file: 'PEMBATALAN_LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#64748b',
    fillColor: '#334155',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan warta terdahulu'
  },
  {
    id: 'transitionLot',
    name: 'Transition Lot Region',
    file: 'V_TRANSITTION_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#06b6d4',
    fillColor: '#0e7490',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot pemetaan transition JUPEM'
  },
  {
    id: 'transitionBdyPolyline',
    name: 'Sempadan Transition Polyline',
    file: 'V_TRANSITTION_BDY_polyline.json',
    category: 'Sempadan & Pentadbiran',
    color: '#ec4899',
    type: 'polyline',
    defaultEnabled: false,
    description: 'Garisan garisan sempadan transition'
  },
  {
    id: 'ndcdbLotRegion',
    name: 'Lot Kadaster NDCDB Seremban',
    file: 'V_NDCDBLOT_region.json',
    category: 'Kadaster & Lot',
    color: '#0284c7',
    fillColor: '#0369a1',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Keseluruhan lot NDCDB Daerah Seremban'
  },
  {
    id: 'ndcdbBdyPolyline',
    name: 'Garisan Sempadan NDCDB Polyline',
    file: 'NDCDBBDY_polyline.json',
    category: 'Kadaster & Lot',
    color: '#6366f1',
    type: 'polyline',
    defaultEnabled: false,
    description: 'Garisan polilain NDCDB Seremban'
  }
];

export async function fetchSerembanLayerData(fileName) {
  if (cache[fileName]) {
    return cache[fileName];
  }

  try {
    const res = await fetch(`/data/seremban/${fileName}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    cache[fileName] = data;
    return data;
  } catch (err) {
    console.error(`Error loading Seremban layer ${fileName}:`, err);
    return null;
  }
}
