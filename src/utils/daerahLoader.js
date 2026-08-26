// Helper to dynamically load Negeri Sembilan 7 Daerah Shapefile GeoJSON datasets
import { RIZAB_MELAYU_NS, HUTAN_SIMPAN_NS, RIZAB_ORANG_ASLI_NS } from '../data/negeriSembilanData';
import { getFeatureCenterAndBounds } from './spatialUtils';

const cache = {};

export const STATEWIDE_LAYERS_CONFIG = [
  {
    id: 'sempadanNegeri',
    daerah: 'statewide',
    name: 'Sempadan Negeri Sembilan',
    file: 'NEGERI_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan Rasmi Pentadbiran Negeri Sembilan Darul Khusus (JUPEM)'
  },
  {
    id: 'hutanSimpanNegeri',
    daerah: 'statewide',
    name: 'Hutan Simpan Kekal (Negeri Sembilan)',
    file: 'HUTAN_SIMPAN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan',
    color: '#059669',
    fillColor: '#22c55e',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Hutan Simpan Kekal seluruh Negeri Sembilan (Akta Perhutanan 1984)'
  },
  {
    id: 'pembatalanHutanNegeri',
    daerah: 'statewide',
    name: 'Pembatalan Hutan Simpan (Negeri Sembilan)',
    file: 'PEMBATALAN_HUTAN_SIMPAN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'hutan_pembatalan',
    color: '#b91c1c',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod pembatalan dan pewartaan semula Hutan Simpan Negeri Sembilan'
  }
];

export const SEREMBAN_LAYERS_CONFIG = [
  {
    id: 'daerahSeremban',
    daerah: 'seremban',
    name: 'Sempadan Daerah Seremban',
    file: 'SEMPADAN_SEREMBAN_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Seremban (JUPEM)'
  },
  {
    id: 'malayResSeremban',
    daerah: 'seremban',
    name: 'Tanah Rizab Melayu (Seremban)',
    file: 'RIZAB_MELAYU_SEREMBAN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Seremban (Warna Kuning)'
  },
  {
    id: 'pembatalanTrmSeremban',
    daerah: 'seremban',
    name: 'Pembatalan Rizab Melayu (Seremban)',
    file: 'PEMBATALAN_TRM_SEREMBAN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan Warta Rizab Melayu Seremban (Warna Merah)'
  },
  {
    id: 'aborigineResSeremban',
    daerah: 'seremban',
    name: 'Rizab Orang Asli (Seremban)',
    file: 'RIZAB_ORANG_ASLI_SEREMBAN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Seremban (Warna Ungu)'
  },
  {
    id: 'ndcdbLotSeremban',
    daerah: 'seremban',
    name: 'NDCDB Lot Kadaster (Seremban)',
    file: 'NDCDB_LOT_SEREMBAN_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Daerah Seremban (279,467 Lot)'
  },
  {
    id: 'relativeLotSeremban',
    daerah: 'seremban',
    name: 'Relative Lot (Seremban)',
    file: 'RELATIVE_LOT_SEREMBAN_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Daerah Seremban (23,899 Lot)'
  }
];

export const JEMPOL_LAYERS_CONFIG = [
  {
    id: 'daerahJempol',
    daerah: 'jempol',
    name: 'Sempadan Daerah Jempol',
    file: 'SEMPADAN_JEMPOL_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Jempol (JUPEM)'
  },
  {
    id: 'malayResJempol',
    daerah: 'jempol',
    name: 'Tanah Rizab Melayu (Jempol)',
    file: 'RIZAB_MELAYU_JEMPOL_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Jempol (Warna Kuning)'
  },
  {
    id: 'pembatalanTrmJempol',
    daerah: 'jempol',
    name: 'Pembatalan Rizab Melayu (Jempol)',
    file: 'PEMBATALAN_TRM_JEMPOL_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan Rizab Melayu Jempol (Warna Merah)'
  },
  {
    id: 'gantianTrmJempol',
    daerah: 'jempol',
    name: 'Penggantian Rizab Melayu (Jempol)',
    file: 'GANTIAN_TRM_JEMPOL_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Tanah Rizab Melayu Penggantian Jempol (Warna Biru)'
  },
  {
    id: 'aborigineResJempol',
    daerah: 'jempol',
    name: 'Rizab Orang Asli (Jempol)',
    file: 'RIZAB_ORANG_ASLI_JEMPOL_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Daerah Jempol (Warna Ungu)'
  },
  {
    id: 'ndcdbLotJempol',
    daerah: 'jempol',
    name: 'NDCDB Lot Kadaster (Jempol)',
    file: 'NDCDB_LOT_JEMPOL_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Daerah Jempol (65,228 Lot)'
  },
  {
    id: 'relativeLotJempol',
    daerah: 'jempol',
    name: 'Relative Lot (Jempol)',
    file: 'RELATIVE_LOT_JEMPOL_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Daerah Jempol (2,770 Lot)'
  }
];

export const KUALAPILAH_LAYERS_CONFIG = [
  {
    id: 'daerahKualaPilah',
    daerah: 'kualapilah',
    name: 'Sempadan Daerah Kuala Pilah',
    file: 'SEMPADAN_KUALAPILAH_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Kuala Pilah (JUPEM)'
  },
  {
    id: 'malayResKualaPilah',
    daerah: 'kualapilah',
    name: 'Tanah Rizab Melayu (Kuala Pilah)',
    file: 'RIZAB_MELAYU_KUALAPILAH_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Kuala Pilah (Warna Kuning)'
  },
  {
    id: 'pembatalanTrmKualaPilah',
    daerah: 'kualapilah',
    name: 'Pembatalan Rizab Melayu (Kuala Pilah)',
    file: 'PEMBATALAN_TRM_KUALAPILAH_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan Rizab Melayu Kuala Pilah (Warna Merah)'
  },
  {
    id: 'gantianTrmKualaPilah',
    daerah: 'kualapilah',
    name: 'Penggantian Rizab Melayu (Kuala Pilah)',
    file: 'GANTIAN_TRM_KUALAPILAH_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Penggantian Rizab Melayu Kuala Pilah (Warna Biru)'
  },
  {
    id: 'aborigineResKualaPilah',
    daerah: 'kualapilah',
    name: 'Rizab Orang Asli (Kuala Pilah)',
    file: 'RIZAB_ORANG_ASLI_KUALAPILAH_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Kuala Pilah (Warna Ungu)'
  },
  {
    id: 'ndcdbLotKualaPilah',
    daerah: 'kualapilah',
    name: 'NDCDB Lot Kadaster (Kuala Pilah)',
    file: 'NDCDB_LOT_KUALAPILAH_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Daerah Kuala Pilah (56,507 Lot)'
  },
  {
    id: 'relativeLotKualaPilah',
    daerah: 'kualapilah',
    name: 'Relative Lot (Kuala Pilah)',
    file: 'RELATIVE_LOT_KUALAPILAH_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Daerah Kuala Pilah (3,829 Lot)'
  }
];

export const JELEBU_LAYERS_CONFIG = [
  {
    id: 'daerahJelebu',
    daerah: 'jelebu',
    name: 'Sempadan Daerah Jelebu',
    file: 'SEMPADAN_JELEBU_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Jelebu (JUPEM)'
  },
  {
    id: 'malayResJelebu',
    daerah: 'jelebu',
    name: 'Tanah Rizab Melayu (Jelebu)',
    file: 'RIZAB_MELAYU_JELEBU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'rizab_melayu',
    color: '#ca8a04',
    fillColor: '#facc15',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Kawasan Warta Tanah Rizab Melayu Jelebu (Warna Kuning)'
  },
  {
    id: 'pembatalanTrmJelebu',
    daerah: 'jelebu',
    name: 'Pembatalan Rizab Melayu (Jelebu)',
    file: 'PEMBATALAN_TRM_JELEBU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan Rizab Melayu Jelebu (Warna Merah)'
  },
  {
    id: 'gantianTrmJelebu',
    daerah: 'jelebu',
    name: 'Penggantian Rizab Melayu (Jelebu)',
    file: 'GANTIAN_TRM_JELEBU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Penggantian Rizab Melayu Jelebu (Warna Biru)'
  },
  {
    id: 'aborigineResJelebu',
    daerah: 'jelebu',
    name: 'Rizab Orang Asli (Jelebu)',
    file: 'RIZAB_ORANG_ASLI_JELEBU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Jelebu (Warna Ungu)'
  },
  {
    id: 'ndcdbLotJelebu',
    daerah: 'jelebu',
    name: 'NDCDB Lot Kadaster (Jelebu)',
    file: 'NDCDB_LOT_JELEBU_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Daerah Jelebu (32,225 Lot)'
  },
  {
    id: 'relativeLotJelebu',
    daerah: 'jelebu',
    name: 'Relative Lot (Jelebu)',
    file: 'RELATIVE_LOT_JELEBU_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Daerah Jelebu (1,005 Lot)'
  }
];

export const PD_LAYERS_CONFIG = [
  {
    id: 'daerahPd',
    daerah: 'pd',
    name: 'Sempadan Daerah Port Dickson',
    file: 'SEMPADAN_PD_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Port Dickson (JUPEM)'
  },
  {
    id: 'malayResPd',
    daerah: 'pd',
    name: 'Tanah Rizab Melayu (Port Dickson)',
    file: 'RIZAB_MELAYU_PD_region.json',
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
    name: 'Pembatalan Rizab Melayu (Port Dickson)',
    file: 'PEMBATALAN_TRM_PD_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan Rizab Melayu Port Dickson (Warna Merah)'
  },
  {
    id: 'gantianTrmPd',
    daerah: 'pd',
    name: 'Penggantian Rizab Melayu (Port Dickson)',
    file: 'GANTIAN_TRM_PD_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Penggantian Rizab Melayu Port Dickson (Warna Biru)'
  },
  {
    id: 'aborigineResPd',
    daerah: 'pd',
    name: 'Rizab Orang Asli (Port Dickson)',
    file: 'RIZAB_ORANG_ASLI_PD_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Port Dickson (Warna Ungu)'
  },
  {
    id: 'ndcdbLotPd',
    daerah: 'pd',
    name: 'NDCDB Lot Kadaster (Port Dickson)',
    file: 'NDCDB_LOT_PD_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Port Dickson (64,565 Lot)'
  },
  {
    id: 'relativeLotPd',
    daerah: 'pd',
    name: 'Relative Lot (Port Dickson)',
    file: 'RELATIVE_LOT_PD_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Port Dickson (2,735 Lot)'
  }
];

export const REMBAU_LAYERS_CONFIG = [
  {
    id: 'daerahRembau',
    daerah: 'rembau',
    name: 'Sempadan Daerah Rembau',
    file: 'SEMPADAN_REMBAU_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Rembau (JUPEM)'
  },
  {
    id: 'malayResRembau',
    daerah: 'rembau',
    name: 'Tanah Rizab Melayu (Rembau)',
    file: 'RIZAB_MELAYU_REMBAU_region.json',
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
    name: 'Pembatalan Rizab Melayu (Rembau)',
    file: 'PEMBATALAN_TRM_REMBAU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan TRM Rembau (Warna Merah)'
  },
  {
    id: 'aborigineResRembau',
    daerah: 'rembau',
    name: 'Rizab Orang Asli (Rembau)',
    file: 'RIZAB_ORANG_ASLI_REMBAU_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Daerah Rembau (Warna Ungu)'
  },
  {
    id: 'ndcdbLotRembau',
    daerah: 'rembau',
    name: 'NDCDB Lot Kadaster (Rembau)',
    file: 'NDCDB_LOT_REMBAU_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Rembau (39,490 Lot)'
  },
  {
    id: 'relativeLotRembau',
    daerah: 'rembau',
    name: 'Relative Lot (Rembau)',
    file: 'RELATIVE_LOT_REMBAU_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Rembau (1,154 Lot)'
  }
];

export const TAMPIN_LAYERS_CONFIG = [
  {
    id: 'daerahTampin',
    daerah: 'tampin',
    name: 'Sempadan Daerah Tampin',
    file: 'SEMPADAN_TAMPIN_region.json',
    category: 'Sempadan & Pentadbiran',
    reserveType: 'sempadan',
    color: '#0284c7',
    fillColor: '#0ea5e9',
    type: 'polygon',
    defaultEnabled: true,
    description: 'Sempadan rasmi pentadbiran Daerah Tampin (JUPEM)'
  },
  {
    id: 'malayResTampin',
    daerah: 'tampin',
    name: 'Tanah Rizab Melayu (Tampin)',
    file: 'RIZAB_MELAYU_TAMPIN_region.json',
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
    name: 'Pembatalan Rizab Melayu (Tampin)',
    file: 'PEMBATALAN_TRM_TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'pembatalan',
    color: '#dc2626',
    fillColor: '#ef4444',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Rekod Pembatalan TRM Tampin (Warna Merah)'
  },
  {
    id: 'penggantianTampin',
    daerah: 'tampin',
    name: 'Penggantian Rizab Melayu (Tampin)',
    file: 'GANTIAN_TRM_TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'penggantian',
    color: '#2563eb',
    fillColor: '#3b82f6',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Penggantian Rizab Melayu Tampin (Warna Biru)'
  },
  {
    id: 'aborigineResTampin',
    daerah: 'tampin',
    name: 'Rizab Orang Asli (Tampin)',
    file: 'RIZAB_ORANG_ASLI_TAMPIN_region.json',
    category: 'Rizab Tanah',
    reserveType: 'orang_asli',
    color: '#7e22ce',
    fillColor: '#a855f7',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Kawasan Rizab Orang Asli Daerah Tampin (Warna Ungu)'
  },
  {
    id: 'ndcdbLotTampin',
    daerah: 'tampin',
    name: 'NDCDB Lot Kadaster (Tampin)',
    file: 'NDCDB_LOT_TAMPIN_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#f59e0b',
    fillColor: '#fbbf24',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot kadaster NDCDB Tampin (49,413 Lot)'
  },
  {
    id: 'relativeLotTampin',
    daerah: 'tampin',
    name: 'Relative Lot (Tampin)',
    file: 'RELATIVE_LOT_TAMPIN_region.json',
    category: 'Kadaster & Lot',
    reserveType: 'lot',
    color: '#64748b',
    fillColor: '#94a3b8',
    type: 'polygon',
    defaultEnabled: false,
    description: 'Lot relatif Tampin (2,139 Lot)'
  }
];

export const ALL_LAYERS_CONFIG = [
  ...STATEWIDE_LAYERS_CONFIG,
  ...SEREMBAN_LAYERS_CONFIG,
  ...JEMPOL_LAYERS_CONFIG,
  ...KUALAPILAH_LAYERS_CONFIG,
  ...JELEBU_LAYERS_CONFIG,
  ...PD_LAYERS_CONFIG,
  ...REMBAU_LAYERS_CONFIG,
  ...TAMPIN_LAYERS_CONFIG
];

export const DAERAH_CENTROIDS = {
  seremban: { center: [2.7247, 101.9378], zoom: 12, label: 'Daerah Seremban' },
  jempol: { center: [2.8050, 102.4000], zoom: 11, label: 'Daerah Jempol' },
  kualapilah: { center: [2.7389, 102.2489], zoom: 12, label: 'Daerah Kuala Pilah' },
  jelebu: { center: [2.9667, 102.0500], zoom: 11, label: 'Daerah Jelebu' },
  pd: { center: [2.5228, 101.7958], zoom: 11, label: 'Daerah Port Dickson' },
  rembau: { center: [2.5371, 102.0934], zoom: 12, label: 'Daerah Rembau' },
  tampin: { center: [2.4701, 102.2302], zoom: 11, label: 'Daerah Tampin' },
  all: { center: [2.7200, 102.1500], zoom: 10, label: 'Semua Daerah (Negeri Sembilan)' }
};

export async function fetchDaerahLayerData(daerah, fileName) {
  const cacheKey = `${daerah}/${fileName}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const encodedFileName = encodeURIComponent(fileName);
  const rawBase = import.meta.env.BASE_URL || './';
  const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

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
          continue;
        }
        const data = await res.json();
        if (data && data.features) {
          cache[cacheKey] = data;
          return data;
        }
      }
    } catch (e) {
      // Try next url candidate
    }
  }

  console.warn(`Layer not found or fetch skipped: ${daerah}/${fileName}`);
  return null;
}

export async function fetchSerembanLayerData(fileName) {
  return fetchDaerahLayerData('seremban', fileName);
}

export async function searchAllDatasets(searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return [];

  const rawTerm = searchTerm.trim();
  const termLower = rawTerm.toLowerCase();
  const cleanedNum = rawTerm.replace(/^(lot|pw|pa|pt|warta|mukim|no\.?)\s*/i, '').trim().toLowerCase();

  const results = [];
  const seenIds = new Set();

  // Search Static Curated Datasets
  const staticCollections = [
    { name: 'Rizab Melayu', collection: RIZAB_MELAYU_NS, layerId: 'malayResSeremban' },
    { name: 'Hutan Simpan', collection: HUTAN_SIMPAN_NS, layerId: 'hutanSimpanNegeri' },
    { name: 'Rizab Orang Asli', collection: RIZAB_ORANG_ASLI_NS, layerId: 'aborigineResSeremban' }
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

  // Search District GeoJSON Datasets (Priority on Reserve and Boundary layers, limit NDCDB search for speed)
  const searchConfigs = ALL_LAYERS_CONFIG.filter(cfg => !cfg.id.startsWith('ndcdbLot') && !cfg.id.startsWith('relativeLot'));

  const districtPromises = searchConfigs.map(async (cfg) => {
    try {
      const data = await fetchDaerahLayerData(cfg.daerah, cfg.file);
      if (!data || !data.features) return;

      data.features.forEach((f, idx) => {
        const p = f.properties || {};

        const nopw = (p.NOPW || p.noPW || '').toString();
        const pa = (p.PA || p.noPA || '').toString();
        const upi = (p.UPI || '').toString();
        const lotNama = (p.LOT_NAMA || p.noLot || p.LOT || p.NO_LOT || p.LOT_NO || '').toString();
        const noFail = (p.NOFAILUKUR || '').toString();
        const nama = (p.nama || p.NAMA || p.KETERANGAN || p.TUJUAN_WAR || '').toString();
        const mukim = (p.mukim || p.MUKIM || p.NM_MUKIM || '').toString();
        const warta = (p.noWarta || p.WARTA || p.NOWARTA || p.NO_WARTA || '').toString();
        const daerahCode = cfg.daerah;
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
          if (nama) displayTitle += nama.slice(0, 40);
          if (!displayTitle.trim()) displayTitle = `Poligon Spasial (${cfg.name})`;

          let displaySub = `Daerah ${daerahName} • ${cfg.name}`;
          if (upi) displaySub += ` • UPI: ${upi}`;
          if (p.KELUASAN) displaySub += ` • Luas: ${typeof p.KELUASAN === 'number' ? p.KELUASAN.toLocaleString() : p.KELUASAN} m²`;

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
      // Ignore errors
    }
  });

  await Promise.all(districtPromises);
  return results;
}
