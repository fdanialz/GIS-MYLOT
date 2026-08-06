// Helper to dynamically load Seremban, Jempol, Port Dickson, Rembau & Tampin Shapefile GeoJSON datasets
const cache = {};

export const SEREMBAN_LAYERS_CONFIG = [
  {
    id: 'daerahSeremban',
    daerah: 'seremban',
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
    daerah: 'seremban',
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
    daerah: 'seremban',
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
    daerah: 'seremban',
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
    daerah: 'seremban',
    name: 'Warta Lot Seremban (1,772 Lot)',
    file: 'WARTA_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#eab308',
    fillColor: '#ca8a04',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Seremban'
  },
  {
    id: 'rizabMelayuLama',
    daerah: 'seremban',
    name: 'Rizab Melayu Lama (Seremban)',
    file: 'RIZAB MELAYU_LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#f97316',
    fillColor: '#c2410c',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Melayu rekod terdahulu Seremban'
  },
  {
    id: 'pembatalanLama',
    daerah: 'seremban',
    name: 'Warta Pembatalan Rizab (Seremban)',
    file: 'PEMBATALAN_LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#64748b',
    fillColor: '#334155',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan warta terdahulu Seremban'
  },
  {
    id: 'transitionLot',
    daerah: 'seremban',
    name: 'Transition Lot Region (Seremban)',
    file: 'V_TRANSITTION_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#06b6d4',
    fillColor: '#0e7490',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot pemetaan transition JUPEM Seremban'
  },
  {
    id: 'transitionBdyPolyline',
    daerah: 'seremban',
    name: 'Sempadan Transition Polyline',
    file: 'V_TRANSITTION_BDY_polyline.json',
    category: 'Sempadan & Pentadbiran',
    color: '#ec4899',
    type: 'polyline',
    defaultEnabled: false,
    description: 'Garisan garisan sempadan transition Seremban'
  },
  {
    id: 'ndcdbLotRegion',
    daerah: 'seremban',
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
    daerah: 'seremban',
    name: 'Garisan Sempadan NDCDB Polyline',
    file: 'NDCDBBDY_polyline.json',
    category: 'Kadaster & Lot',
    color: '#6366f1',
    type: 'polyline',
    defaultEnabled: false,
    description: 'Garisan polilain NDCDB Seremban'
  }
];

export const JEMPOL_LAYERS_CONFIG = [
  {
    id: 'daerahJempol',
    daerah: 'jempol',
    name: 'Sempadan Daerah Jempol',
    file: 'JEMPOL_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#3b82f6',
    fillColor: '#1d4ed8',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Jempol (JUPEM)'
  },
  {
    id: 'malayResJempol',
    daerah: 'jempol',
    name: 'Warta Rizab Melayu Jempol (Blok A)',
    file: 'JEMPOL TRM BARU A_region.json',
    category: 'Rizab Tanah',
    color: '#ef4444',
    fillColor: '#b91c1c',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Jempol (Blok A)'
  },
  {
    id: 'malayResB',
    daerah: 'jempol',
    name: 'Warta Rizab Melayu Jempol (Blok B)',
    file: 'JEMPOL TRM BARU B_region.json',
    category: 'Rizab Tanah',
    color: '#f87171',
    fillColor: '#dc2626',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Jempol (Blok B)'
  },
  {
    id: 'forestResJempol',
    daerah: 'jempol',
    name: 'Hutan Simpan Kekal Jempol',
    file: 'JEMPOL RIZAB HUTAN_region.json',
    category: 'Rizab Tanah',
    color: '#10b981',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Jempol'
  },
  {
    id: 'aborigineResJempol',
    daerah: 'jempol',
    name: 'Rizab Orang Asli Jempol',
    file: 'JEMPOL RIZAB ORANG ASLI_region.json',
    category: 'Rizab Tanah',
    color: '#a855f7',
    fillColor: '#7e22ce',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Daerah Jempol'
  },
  {
    id: 'wartaLotJempol',
    daerah: 'jempol',
    name: 'Warta Lot Jempol (955 Lot)',
    file: 'JEMPOL WARTA_region.json',
    category: 'Kadaster & Lot',
    color: '#eab308',
    fillColor: '#ca8a04',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Jempol'
  },
  {
    id: 'ndcdbLotJempol',
    daerah: 'jempol',
    name: 'Lot Kadaster NDCDB Jempol (62,516 Lot)',
    file: 'JEMPOL NDCDB BARU_region.json',
    category: 'Kadaster & Lot',
    color: '#0284c7',
    fillColor: '#0369a1',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Keseluruhan lot NDCDB Daerah Jempol'
  },
  {
    id: 'pembatalanTrmJempol',
    daerah: 'jempol',
    name: 'Warta Pembatalan TRM Jempol',
    file: 'JEMPOL PEMBATALAN TRM BARU_region.json',
    category: 'Rizab Tanah',
    color: '#64748b',
    fillColor: '#334155',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan Warta Rizab Melayu Jempol'
  },
  {
    id: 'trmGantianLama',
    daerah: 'jempol',
    name: 'Rizab Melayu Gantian Lama Jempol',
    file: 'JEMPOL TRM GANTIAN LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#f97316',
    fillColor: '#c2410c',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Melayu Gantian Jempol'
  },
  {
    id: 'trmLamaJempol',
    daerah: 'jempol',
    name: 'Rizab Melayu Rekod Terdahulu Jempol',
    file: 'JEMPOL TRM LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#fb923c',
    fillColor: '#ea580c',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod terdahulu Rizab Melayu Jempol'
  }
];

export const PD_LAYERS_CONFIG = [
  {
    id: 'daerahPd',
    daerah: 'pd',
    name: 'Sempadan Daerah Port Dickson',
    file: 'T_DAERAH_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#3b82f6',
    fillColor: '#1d4ed8',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Port Dickson (JUPEM)'
  },
  {
    id: 'malayResPd',
    daerah: 'pd',
    name: 'Warta Rizab Melayu Port Dickson',
    file: 'V_MALAY_RES_region.json',
    category: 'Rizab Tanah',
    color: '#ef4444',
    fillColor: '#b91c1c',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Port Dickson'
  },
  {
    id: 'forestResPd',
    daerah: 'pd',
    name: 'Hutan Simpan Kekal Port Dickson',
    file: 'V_FOREST_RES_region.json',
    category: 'Rizab Tanah',
    color: '#10b981',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Port Dickson'
  },
  {
    id: 'aborigineResPd',
    daerah: 'pd',
    name: 'Rizab Orang Asli Port Dickson',
    file: 'V_ABORIGINE_RES_region.json',
    category: 'Rizab Tanah',
    color: '#a855f7',
    fillColor: '#7e22ce',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Port Dickson'
  },
  {
    id: 'wartaLotPd',
    daerah: 'pd',
    name: 'Warta Lot Port Dickson (569 Lot)',
    file: 'WARTA_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#eab308',
    fillColor: '#ca8a04',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Port Dickson'
  },
  {
    id: 'ndcdbLotPd',
    daerah: 'pd',
    name: 'Lot Kadaster NDCDB Port Dickson (64,565 Lot)',
    file: 'V_NDCDBLOT_region.json',
    category: 'Kadaster & Lot',
    color: '#0284c7',
    fillColor: '#0369a1',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Keseluruhan lot NDCDB Daerah Port Dickson'
  },
  {
    id: 'ndcdbBdyPd',
    daerah: 'pd',
    name: 'Garisan Sempadan NDCDB Polyline Port Dickson',
    file: 'NDCDBBDY_polyline.json',
    category: 'Kadaster & Lot',
    color: '#6366f1',
    type: 'polyline',
    defaultEnabled: false,
    description: 'Garisan polilain NDCDB Port Dickson'
  },
  {
    id: 'pembatalanPd',
    daerah: 'pd',
    name: 'Warta Pembatalan Rizab Port Dickson',
    file: 'PEMBATALAN_LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#64748b',
    fillColor: '#334155',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan warta Port Dickson'
  },
  {
    id: 'rizabMelayuLamaPd',
    daerah: 'pd',
    name: 'Rizab Melayu Rekod Terdahulu Port Dickson',
    file: 'RIZAB MELAYU_LAMA_region.json',
    category: 'Rizab Tanah',
    color: '#f97316',
    fillColor: '#c2410c',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod terdahulu Rizab Melayu Port Dickson'
  }
];

export const REMBAU_LAYERS_CONFIG = [
  {
    id: 'daerahRembau',
    daerah: 'rembau',
    name: 'Sempadan Daerah Rembau',
    file: 'REMBAU_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#3b82f6',
    fillColor: '#1d4ed8',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Rembau (JUPEM)'
  },
  {
    id: 'malayResRembau',
    daerah: 'rembau',
    name: 'Warta Rizab Melayu Rembau',
    file: 'MALAY REMBAU_region.json',
    category: 'Rizab Tanah',
    color: '#ef4444',
    fillColor: '#b91c1c',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Rembau'
  },
  {
    id: 'forestResRembau',
    daerah: 'rembau',
    name: 'Hutan Simpan Kekal Rembau',
    file: 'FOREST REMBAU_region.json',
    category: 'Rizab Tanah',
    color: '#10b981',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Rembau'
  },
  {
    id: 'aborigineResRembau',
    daerah: 'rembau',
    name: 'Rizab Orang Asli Rembau',
    file: 'ABORIGINE REMBAU_region.json',
    category: 'Rizab Tanah',
    color: '#a855f7',
    fillColor: '#7e22ce',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Daerah Rembau'
  },
  {
    id: 'wartaLotRembau',
    daerah: 'rembau',
    name: 'Warta Lot Rembau (343 Lot)',
    file: 'WARTA LOT REMBAU_region.json',
    category: 'Kadaster & Lot',
    color: '#eab308',
    fillColor: '#ca8a04',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Rembau'
  },
  {
    id: 'ndcdbLotRembau',
    daerah: 'rembau',
    name: 'Lot Kadaster NDCDB Rembau (39,502 Lot)',
    file: 'NDCDB LOT REMBAU_region.json',
    category: 'Kadaster & Lot',
    color: '#0284c7',
    fillColor: '#0369a1',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Keseluruhan lot NDCDB Daerah Rembau'
  },
  {
    id: 'pembatalanRembau',
    daerah: 'rembau',
    name: 'Warta Pembatalan TRM Rembau',
    file: 'PEMBATALAN TRM REMBAU_region.json',
    category: 'Rizab Tanah',
    color: '#64748b',
    fillColor: '#334155',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan TRM Rembau'
  },
  {
    id: 'seksyenRembau',
    daerah: 'rembau',
    name: 'Seksyen Ukur Rembau',
    file: 'SEKSYEN REMBAU_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#06b6d4',
    fillColor: '#0e7490',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Sempadan seksyen pemetaan Rembau'
  }
];

export const TAMPIN_LAYERS_CONFIG = [
  {
    id: 'daerahTampin',
    daerah: 'tampin',
    name: 'Sempadan Daerah Tampin',
    file: 'TAMPIN_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#3b82f6',
    fillColor: '#1d4ed8',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Tampin (JUPEM)'
  },
  {
    id: 'malayResTampin',
    daerah: 'tampin',
    name: 'Warta Rizab Melayu Tampin',
    file: 'MALAY TAMPIN_region.json',
    category: 'Rizab Tanah',
    color: '#ef4444',
    fillColor: '#b91c1c',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Tampin'
  },
  {
    id: 'forestResTampin',
    daerah: 'tampin',
    name: 'Hutan Simpan Kekal Tampin',
    file: 'FOREST TAMPIN_region.json',
    category: 'Rizab Tanah',
    color: '#10b981',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Tampin'
  },
  {
    id: 'aborigineResTampin',
    daerah: 'tampin',
    name: 'Rizab Orang Asli Tampin',
    file: 'ABORIGINE TAMPIN_region.json',
    category: 'Rizab Tanah',
    color: '#a855f7',
    fillColor: '#7e22ce',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Daerah Tampin'
  },
  {
    id: 'wartaLotTampin',
    daerah: 'tampin',
    name: 'Warta Lot Tampin (634 Lot)',
    file: 'WARTA LOT TAMPIN_region.json',
    category: 'Kadaster & Lot',
    color: '#eab308',
    fillColor: '#ca8a04',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Tampin'
  },
  {
    id: 'ndcdbLotTampin',
    daerah: 'tampin',
    name: 'Lot Kadaster NDCDB Tampin (49,425 Lot)',
    file: 'NDCDB LOT TAMPIN_region.json',
    category: 'Kadaster & Lot',
    color: '#0284c7',
    fillColor: '#0369a1',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Keseluruhan lot NDCDB Daerah Tampin'
  },
  {
    id: 'pembatalanTampin',
    daerah: 'tampin',
    name: 'Warta Pembatalan TRM Tampin',
    file: 'PEMBATALAN TRM TAMPIN_region.json',
    category: 'Rizab Tanah',
    color: '#64748b',
    fillColor: '#334155',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan TRM Tampin'
  },
  {
    id: 'penggantianTampin',
    daerah: 'tampin',
    name: 'Penggantian TRM Tampin',
    file: 'PENGGANTIAN TRM TAMPIN_region.json',
    category: 'Rizab Tanah',
    color: '#f97316',
    fillColor: '#c2410c',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Penggantian Rizab Melayu Tampin'
  },
  {
    id: 'seksyenTampin',
    daerah: 'tampin',
    name: 'Seksyen Ukur Tampin',
    file: 'SEKSYEN TAMPIN_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#06b6d4',
    fillColor: '#0e7490',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Sempadan seksyen pemetaan Tampin'
  }
];

export const ALL_LAYERS_CONFIG = [
  ...SEREMBAN_LAYERS_CONFIG,
  ...JEMPOL_LAYERS_CONFIG,
  ...PD_LAYERS_CONFIG,
  ...REMBAU_LAYERS_CONFIG,
  ...TAMPIN_LAYERS_CONFIG
];

export const DAERAH_CENTROIDS = {
  seremban: { center: [2.7247, 101.9378], zoom: 12, label: 'Daerah Seremban' },
  jempol: { center: [2.7924, 102.4182], zoom: 11, label: 'Daerah Jempol' },
  pd: { center: [2.5228, 101.7958], zoom: 11, label: 'Daerah Port Dickson' },
  rembau: { center: [2.5371, 102.0934], zoom: 12, label: 'Daerah Rembau' },
  tampin: { center: [2.4701, 102.2302], zoom: 11, label: 'Daerah Tampin' },
  all: { center: [2.6800, 102.0500], zoom: 10, label: 'Semua Daerah (Negeri Sembilan)' }
};

export async function fetchDaerahLayerData(daerah, fileName) {
  const cacheKey = `${daerah}/${fileName}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const res = await fetch(`${cleanBase}data/${daerah}/${fileName}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    cache[cacheKey] = data;
    return data;
  } catch (err) {
    console.error(`Error loading ${daerah} layer ${fileName}:`, err);
    return null;
  }
}

// Backward compatibility alias
export async function fetchSerembanLayerData(fileName) {
  return fetchDaerahLayerData('seremban', fileName);
}
