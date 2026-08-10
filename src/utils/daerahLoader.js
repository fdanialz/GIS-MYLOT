// Helper to dynamically load Seremban, Jempol, Port Dickson, Rembau & Tampin Shapefile GeoJSON datasets
import { RIZAB_MELAYU_NS, HUTAN_SIMPAN_NS, RIZAB_ORANG_ASLI_NS } from '../data/negeriSembilanData';
import { getFeatureCenterAndBounds } from './spatialUtils';

const cache = {};

export const SEREMBAN_LAYERS_CONFIG = [
  {
    id: 'daerahSeremban',
    daerah: 'seremban',
    name: 'Sempadan Daerah Seremban',
    file: 'T_DAERAH_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Seremban (JUPEM)'
  },
  {
    id: 'malayRes',
    daerah: 'seremban',
    name: 'Tanah Rizab Melayu (Seremban)',
    file: 'V_MALAY_RES_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Seremban (Warna Kuning)'
  },
  {
    id: 'pembatalanLama',
    daerah: 'seremban',
    name: 'Tanah Rizab Melayu Pembatalan (Seremban)',
    file: 'PEMBATALAN_LAMA_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Rekod Pembatalan Warta Rizab Melayu Seremban (Warna Merah)'
  },
  {
    id: 'forestRes',
    daerah: 'seremban',
    name: 'Hutan Simpan Kekal (Seremban)',
    file: 'V_FOREST_RES_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan',
    color: '#059669',
    fillColor: '#4ade80',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Seremban (Warna Hijau Terang/Gelap)'
  },
  {
    id: 'aborigineRes',
    daerah: 'seremban',
    name: 'Rizab Orang Asli (Seremban)',
    file: 'V_ABORIGINE_RES_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Seremban (Warna Purple)'
  },
  {
    id: 'wartaLot',
    daerah: 'seremban',
    name: 'Warta Lot Seremban (1,772 Lot)',
    file: 'WARTA_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Seremban'
  },
  {
    id: 'rizabMelayuLama',
    daerah: 'seremban',
    name: 'Rizab Melayu Terdahulu (Seremban)',
    file: 'RIZAB MELAYU_LAMA_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#fde047',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Melayu rekod terdahulu Seremban'
  }
];

export const JEMPOL_LAYERS_CONFIG = [
  {
    id: 'daerahJempol',
    daerah: 'jempol',
    name: 'Sempadan Daerah Jempol',
    file: 'JEMPOL_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Jempol (JUPEM)'
  },
  {
    id: 'malayResJempol',
    daerah: 'jempol',
    name: 'Tanah Rizab Melayu Jempol (Blok A)',
    file: 'JEMPOL TRM BARU A_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Tanah Rizab Melayu Jempol Blok A (Warna Kuning)'
  },
  {
    id: 'malayResB',
    daerah: 'jempol',
    name: 'Tanah Rizab Melayu Jempol (Blok B)',
    file: 'JEMPOL TRM BARU B_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#fde047',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Tanah Rizab Melayu Jempol Blok B (Warna Kuning)'
  },
  {
    id: 'pembatalanTrmJempol',
    daerah: 'jempol',
    name: 'Tanah Rizab Melayu Pembatalan Jempol',
    file: 'JEMPOL PEMBATALAN TRM BARU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Rekod Pembatalan Rizab Melayu Jempol (Warna Merah)'
  },
  {
    id: 'trmGantianLama',
    daerah: 'jempol',
    name: 'Tanah Rizab Melayu Penggantian Jempol',
    file: 'JEMPOL TRM GANTIAN LAMA_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Tanah Rizab Melayu Penggantian Jempol (Warna Biru)'
  },
  {
    id: 'forestResJempol',
    daerah: 'jempol',
    name: 'Hutan Simpan Kekal Jempol',
    file: 'JEMPOL RIZAB HUTAN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan',
    color: '#059669',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Jempol (Warna Hijau Gelap)'
  },
  {
    id: 'aborigineResJempol',
    daerah: 'jempol',
    name: 'Rizab Orang Asli Jempol',
    file: 'JEMPOL RIZAB ORANG ASLI_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Daerah Jempol (Warna Purple)'
  },
  {
    id: 'wartaLotJempol',
    daerah: 'jempol',
    name: 'Warta Lot Jempol (955 Lot)',
    file: 'JEMPOL WARTA_region.json',
    category: 'Kadaster & Lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Jempol'
  }
];

export const PD_LAYERS_CONFIG = [
  {
    id: 'daerahPd',
    daerah: 'pd',
    name: 'Sempadan Daerah Port Dickson',
    file: 'T_DAERAH_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Port Dickson (JUPEM)'
  },
  {
    id: 'malayResPd',
    daerah: 'pd',
    name: 'Tanah Rizab Melayu Port Dickson',
    file: 'V_MALAY_RES_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Port Dickson (Warna Kuning)'
  },
  {
    id: 'pembatalanPd',
    daerah: 'pd',
    name: 'Tanah Rizab Melayu Pembatalan Port Dickson',
    file: 'PEMBATALAN_LAMA_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Rekod Pembatalan Rizab Melayu Port Dickson (Warna Merah)'
  },
  {
    id: 'forestResPd',
    daerah: 'pd',
    name: 'Hutan Simpan Kekal Port Dickson',
    file: 'V_FOREST_RES_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan',
    color: '#059669',
    fillColor: '#4ade80',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Port Dickson (Warna Hijau Terang)'
  },
  {
    id: 'aborigineResPd',
    daerah: 'pd',
    name: 'Rizab Orang Asli Port Dickson',
    file: 'V_ABORIGINE_RES_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Port Dickson (Warna Purple)'
  },
  {
    id: 'wartaLotPd',
    daerah: 'pd',
    name: 'Warta Lot Port Dickson (569 Lot)',
    file: 'WARTA_LOT_region.json',
    category: 'Kadaster & Lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Port Dickson'
  },
  {
    id: 'rizabMelayuLamaPd',
    daerah: 'pd',
    name: 'Rizab Melayu Terdahulu Port Dickson',
    file: 'RIZAB MELAYU_LAMA_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#fde047',
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
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Rembau (JUPEM)'
  },
  {
    id: 'malayResRembau',
    daerah: 'rembau',
    name: 'Tanah Rizab Melayu Rembau',
    file: 'MALAY REMBAU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Rembau (Warna Kuning)'
  },
  {
    id: 'pembatalanRembau',
    daerah: 'rembau',
    name: 'Tanah Rizab Melayu Pembatalan Rembau',
    file: 'PEMBATALAN TRM REMBAU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Rekod Pembatalan TRM Rembau (Warna Merah)'
  },
  {
    id: 'forestResRembau',
    daerah: 'rembau',
    name: 'Hutan Simpan Kekal Rembau',
    file: 'FOREST REMBAU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan',
    color: '#059669',
    fillColor: '#15803d',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Rembau (Warna Hijau Gelap)'
  },
  {
    id: 'aborigineResRembau',
    daerah: 'rembau',
    name: 'Rizab Orang Asli Rembau',
    file: 'ABORIGINE REMBAU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Daerah Rembau (Warna Purple)'
  },
  {
    id: 'wartaLotRembau',
    daerah: 'rembau',
    name: 'Warta Lot Rembau (343 Lot)',
    file: 'WARTA LOT REMBAU_region.json',
    category: 'Kadaster & Lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Rembau'
  }
];

export const TAMPIN_LAYERS_CONFIG = [
  {
    id: 'daerahTampin',
    daerah: 'tampin',
    name: 'Sempadan Daerah Tampin',
    file: 'TAMPIN_region.json',
    category: 'Sempadan & Pentadbiran',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Tampin (JUPEM)'
  },
  {
    id: 'malayResTampin',
    daerah: 'tampin',
    name: 'Tanah Rizab Melayu Tampin',
    file: 'MALAY TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Tampin (Warna Kuning)'
  },
  {
    id: 'pembatalanTampin',
    daerah: 'tampin',
    name: 'Tanah Rizab Melayu Pembatalan Tampin',
    file: 'PEMBATALAN TRM TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Rekod Pembatalan TRM Tampin (Warna Merah)'
  },
  {
    id: 'penggantianTampin',
    daerah: 'tampin',
    name: 'Tanah Rizab Melayu Penggantian Tampin',
    file: 'PENGGANTIAN TRM TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Penggantian Rizab Melayu Tampin (Warna Biru)'
  },
  {
    id: 'forestResTampin',
    daerah: 'tampin',
    name: 'Hutan Simpan Kekal Tampin',
    file: 'FOREST TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan',
    color: '#059669',
    fillColor: '#4ade80',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Hutan Simpan Kekal Daerah Tampin (Warna Hijau Terang)'
  },
  {
    id: 'aborigineResTampin',
    daerah: 'tampin',
    name: 'Rizab Orang Asli Tampin',
    file: 'ABORIGINE TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Rizab Orang Asli Daerah Tampin (Warna Purple)'
  },
  {
    id: 'wartaLotTampin',
    daerah: 'tampin',
    name: 'Warta Lot Tampin (634 Lot)',
    file: 'WARTA LOT TAMPIN_region.json',
    category: 'Kadaster & Lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Lot-lot warta di Daerah Tampin'
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

  // Handle split chunk loading for oversized files (e.g. Seremban polyline >100MB split for GitHub compliance)
  if (daerah === 'seremban' && fileName === 'NDCDBBDY_polyline.json') {
    try {
      const p1 = fetchDaerahLayerData(daerah, 'NDCDBBDY_polyline_part1.json');
      const p2 = fetchDaerahLayerData(daerah, 'NDCDBBDY_polyline_part2.json');
      const [d1, d2] = await Promise.all([p1, p2]);
      if (d1 && d2 && d1.features && d2.features) {
        const merged = {
          type: 'FeatureCollection',
          name: 'NDCDBBDY_polyline',
          features: [...d1.features, ...d2.features]
        };
        cache[cacheKey] = merged;
        return merged;
      }
      if (d1 && d1.features) return d1;
    } catch (e) {
      console.warn('Fallback single file fetch for Seremban NDCDBBDY_polyline');
    }
  }

  const encodedFileName = encodeURIComponent(fileName);
  const rawBase = import.meta.env.BASE_URL || './';
  const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  // Candidate URLs to guarantee layer loading across GitHub Pages, Vercel, Netlify, or custom subpaths
  const candidateUrls = [
    `${cleanBase}data/${daerah}/${encodedFileName}`,
    `./data/${daerah}/${encodedFileName}`,
    `data/${daerah}/${encodedFileName}`,
    `./data/${daerah}/${fileName}`,
    `data/${daerah}/${fileName}`
  ];

  if (typeof window !== 'undefined' && window.location && window.location.pathname) {
    const path = window.location.pathname;
    const dirPath = path.endsWith('/') ? path : `${path.substring(0, path.lastIndexOf('/') + 1)}`;
    candidateUrls.unshift(`${dirPath}data/${daerah}/${encodedFileName}`);
  }

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          // If server returned 200 SPA fallback HTML, skip it
          continue;
        }
        const data = await res.json();
        if (data && data.features) {
          cache[cacheKey] = data;
          return data;
        }
      }
    } catch (e) {
      // Continue trying next URL candidate
    }
  }

  console.error(`Gagal memuatkan lapisan spasial ${daerah}/${fileName}`);
  return null;
}


// Backward compatibility alias
export async function fetchSerembanLayerData(fileName) {
  return fetchDaerahLayerData('seremban', fileName);
}

export async function searchAllDatasets(searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return [];

  const rawTerm = searchTerm.trim();
  const termLower = rawTerm.toLowerCase();
  // Strip common lot prefixes
  const cleanedNum = rawTerm.replace(/^(lot|pw|pa|pt|warta|mukim|no\.?)\s*/i, '').trim().toLowerCase();

  const results = [];
  const seenIds = new Set();

  // 1. Search Static Datasets
  const staticCollections = [
    { name: 'Rizab Melayu', collection: RIZAB_MELAYU_NS, layerId: 'malayRes' },
    { name: 'Hutan Simpan', collection: HUTAN_SIMPAN_NS, layerId: 'forestRes' },
    { name: 'Rizab Orang Asli', collection: RIZAB_ORANG_ASLI_NS, layerId: 'aborigineRes' }
  ];

  staticCollections.forEach(({ name, collection, layerId }) => {
    if (!collection || !collection.features) return;
    collection.features.forEach(f => {
      const p = f.properties || {};
      const matchName = p.nama && p.nama.toLowerCase().includes(termLower);
      const matchLot = p.noLot && (p.noLot.toLowerCase().includes(termLower) || (cleanedNum && p.noLot.toLowerCase().includes(cleanedNum)));
      const matchMukim = p.mukim && p.mukim.toLowerCase().includes(termLower);
      const matchWarta = p.noWarta && p.noWarta.toLowerCase().includes(termLower);

      if (matchName || matchLot || matchMukim || matchWarta) {
        const spatialInfo = getFeatureCenterAndBounds(f);
        if (!spatialInfo) return;

        const uid = `${f.id || p.id || p.nama}`;
        if (seenIds.has(uid)) return;
        seenIds.add(uid);

        results.push({
          id: uid,
          title: p.nama || p.noLot || 'Lot Spasial',
          subtitle: `${p.daerah || 'N.S.'} • ${p.mukim || ''} • ${p.noLot || ''}`,
          layerName: name,
          layerId,
          daerah: (p.daerah || 'seremban').toLowerCase(),
          properties: p,
          feature: f,
          center: spatialInfo.center
        });
      }
    });
  });

  // 2. Search District GeoJSON Datasets
  const districtPromises = ALL_LAYERS_CONFIG.map(async (cfg) => {
    try {
      const data = await fetchDaerahLayerData(cfg.daerah || 'seremban', cfg.file);
      if (!data || !data.features) return;

      data.features.forEach((f, idx) => {
        const p = f.properties || {};
        
        const nopw = (p.NOPW || p.noPW || '').toString();
        const pa = (p.PA || p.noPA || '').toString();
        const upi = (p.UPI || '').toString();
        const lotNama = (p.LOT_NAMA || p.noLot || p.LOT || p.NO_LOT || '').toString();
        const noFail = (p.NOFAILUKUR || '').toString();
        const nama = (p.nama || p.NAMA || '').toString();
        const mukim = (p.mukim || p.MUKIM || p.NM_MUKIM || '').toString();
        const warta = (p.noWarta || p.WARTA || p.NO_WARTA || '').toString();
        const daerahCode = cfg.daerah || 'seremban';
        const daerahName = daerahCode.toUpperCase();

        const matchNopw = nopw && (nopw.toLowerCase().includes(termLower) || (cleanedNum && nopw.toLowerCase().includes(cleanedNum)));
        const matchPa = pa && (pa.toLowerCase().includes(termLower) || (cleanedNum && pa.toLowerCase().includes(cleanedNum)));
        const matchUpi = upi && upi.toLowerCase().includes(termLower);
        const matchLotNama = lotNama && (lotNama.toLowerCase().includes(termLower) || (cleanedNum && lotNama.toLowerCase().includes(cleanedNum)));
        const matchNoFail = noFail && (noFail.toLowerCase().includes(termLower) || (cleanedNum && noFail.toLowerCase().includes(cleanedNum)));
        const matchNama = nama && nama.toLowerCase().includes(termLower);
        const matchMukim = mukim && mukim.toLowerCase().includes(termLower);
        const matchWarta = warta && warta.toLowerCase().includes(termLower);

        if (matchNopw || matchPa || matchUpi || matchLotNama || matchNoFail || matchNama || matchMukim || matchWarta) {
          const spatialInfo = getFeatureCenterAndBounds(f);
          if (!spatialInfo) return;

          const uid = `${cfg.id}-${p.MI_PRINX || p.OBJECTID || idx}-${nopw || pa || upi || lotNama}`;
          if (seenIds.has(uid)) return;
          seenIds.add(uid);

          let displayTitle = '';
          if (nopw) displayTitle += `PW: ${nopw} `;
          if (pa) displayTitle += `(PA: ${pa}) `;
          if (lotNama && lotNama !== 'A' && lotNama !== 'B') displayTitle += `Lot ${lotNama} `;
          if (nama) displayTitle += nama;
          if (!displayTitle.trim()) displayTitle = `Lot Spasial (${cfg.name})`;

          let displaySub = `Daerah ${daerahName} • ${cfg.name}`;
          if (upi) displaySub += ` • UPI: ${upi}`;
          if (p.KELUASAN) displaySub += ` • Luas: ${p.KELUASAN} m²`;

          results.push({
            id: uid,
            title: displayTitle.trim(),
            subtitle: displaySub,
            layerName: cfg.name,
            layerId: cfg.id,
            daerah: daerahCode,
            properties: p,
            feature: f,
            center: spatialInfo.center
          });
        }
      });
    } catch (err) {
      // ignore layer failure
    }
  });

  await Promise.all(districtPromises);

  return results;
}

