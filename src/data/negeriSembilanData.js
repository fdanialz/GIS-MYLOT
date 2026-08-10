// Dataset Spasial Negeri Sembilan (Negeri Sembilan GIS Data)
// Pusat Koordinat N.S.: Lat 2.7258, Lng 101.9424 (Seremban / Central N.S.)

export const NEGERI_SEMBILAN_BOUNDS = {
  center: [2.7258, 101.9424],
  zoom: 10,
  districts: [
    'Seremban',
    'Port Dickson',
    'Jempol',
    'Jelebu',
    'Kuala Pilah',
    'Rembau',
    'Tampin'
  ]
};

// Sempadan Rasmi Negeri Sembilan Darul Khusus
export const SEMPADAN_NEGERI_SEMBILAN = {
  type: 'Feature',
  properties: {
    nama: 'Sempadan Negeri Sembilan Darul Khusus',
    kod: 'N.S.',
    deskripsi: 'Sempadan Pentadbiran Negeri Sembilan'
  },
  coordinates: [
    [2.400, 101.700],
    [2.550, 101.750],
    [2.700, 101.850],
    [2.900, 101.900],
    [3.200, 102.000],
    [3.250, 102.200],
    [3.150, 102.400],
    [3.100, 102.600],
    [2.800, 102.750],
    [2.650, 102.700],
    [2.450, 102.500],
    [2.400, 102.350],
    [2.350, 102.000],
    [2.350, 101.800],
    [2.400, 101.700]
  ]
};

// 1. TANAH RIZAB MELAYU (TRM) NEGERI SEMBILAN
export const RIZAB_MELAYU_NS = {
  type: 'FeatureCollection',
  name: 'Tanah Rizab Melayu Negeri Sembilan',
  features: [
    {
      type: 'Feature',
      id: 'trm-ns-001',
      properties: {
        id: 'TRM-NS-001',
        nama: 'Rizab Melayu Ampangan',
        noLot: 'Lot 3481 & Lot 3482',
        mukim: 'Mukim Ampangan',
        daerah: 'Seremban',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 412/1932',
        tarikhWarta: '15 Ogos 1932',
        luasHektar: 142.5,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian & Kediaman',
        deskripsi: 'Kawasan Rizab Melayu tradisi Mukim Ampangan berhampiran Paroi.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.965, 2.715],
          [101.985, 2.718],
          [101.990, 2.700],
          [101.970, 2.695],
          [101.965, 2.715]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-002',
      properties: {
        id: 'TRM-NS-002',
        nama: 'Rizab Melayu Rasah & Mambau',
        noLot: 'Lot 1204 - Lot 1220',
        mukim: 'Mukim Rasah',
        daerah: 'Seremban',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 889/1954',
        tarikhWarta: '22 April 1954',
        luasHektar: 98.2,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Kediaman Campuran',
        deskripsi: 'Rizab Melayu Mukim Rasah meliputi penempatan Mambau dan Mambau Jaya.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.910, 2.680],
          [101.930, 2.685],
          [101.935, 2.665],
          [101.912, 2.660],
          [101.910, 2.680]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-003',
      properties: {
        id: 'TRM-NS-003',
        nama: 'Rizab Melayu Jimah & Chuah',
        noLot: 'Lot 5012 & PT 890',
        mukim: 'Mukim Jimah',
        daerah: 'Port Dickson',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 104/1962',
        tarikhWarta: '11 Februari 1962',
        luasHektar: 215.8,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian (Kelapa Sawit & Dusun)',
        deskripsi: 'Kawasan pertanian Rizab Melayu Jimah berdekatan Lukut dan Sepang.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.810, 2.600],
          [101.835, 2.610],
          [101.840, 2.585],
          [101.815, 2.580],
          [101.810, 2.600]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-004',
      properties: {
        id: 'TRM-NS-004',
        nama: 'Rizab Melayu Juasseh',
        noLot: 'Lot 892 - Lot 910',
        mukim: 'Mukim Juasseh',
        daerah: 'Kuala Pilah',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 310/1948',
        tarikhWarta: '05 September 1948',
        luasHektar: 310.4,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian (Sawah Padi & Getah)',
        deskripsi: 'Lembah Sawah Padi dan perkampungan adat Terachi/Juasseh.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.260, 2.780],
          [102.290, 2.785],
          [102.295, 2.760],
          [102.265, 2.755],
          [102.260, 2.780]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-005',
      properties: {
        id: 'TRM-NS-005',
        nama: 'Rizab Melayu Serting Ilir',
        noLot: 'Lot 4401 - Lot 4450',
        mukim: 'Mukim Serting Ilir',
        daerah: 'Jempol',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 762/1971',
        tarikhWarta: '14 Disember 1971',
        luasHektar: 420.0,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian Komoditi',
        deskripsi: 'Zon Rizab Melayu terbesar daerah Jempol berdekatan Bandar Seri Jempol.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.390, 2.820],
          [102.430, 2.825],
          [102.435, 2.790],
          [102.395, 2.785],
          [102.390, 2.820]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-006',
      properties: {
        id: 'TRM-NS-006',
        nama: 'Rizab Melayu Chembong',
        noLot: 'Lot 1500 - Lot 1540',
        mukim: 'Mukim Chembong',
        daerah: 'Rembau',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 215/1938',
        tarikhWarta: '08 Julai 1938',
        luasHektar: 185.3,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Kediaman Adat & Dusun',
        deskripsi: 'Tanah Adat Perpatih / Rizab Melayu Chembong & Pedas.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.080, 2.550],
          [102.105, 2.555],
          [102.110, 2.530],
          [102.085, 2.525],
          [102.080, 2.550]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-007',
      properties: {
        id: 'TRM-NS-007',
        nama: 'Rizab Melayu Repah & Gemas',
        noLot: 'Lot 8810 - Lot 8890',
        mukim: 'Mukim Repah',
        daerah: 'Tampin',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 550/1959',
        tarikhWarta: '19 November 1959',
        luasHektar: 260.9,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian & Komuniti',
        deskripsi: 'Kawasan Rizab Melayu Repah bersebelahan Bandar Tampin.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.220, 2.480],
          [102.250, 2.485],
          [102.255, 2.455],
          [102.225, 2.450],
          [102.220, 2.480]
        ]]
      }
    }
  ]
};

// 2. HUTAN SIMPAN KEKAL (RIZAB HUTAN) NEGERI SEMBILAN
export const HUTAN_SIMPAN_NS = {
  type: 'FeatureCollection',
  name: 'Hutan Simpan Kekal Negeri Sembilan',
  features: [
    {
      type: 'Feature',
      id: 'hsk-ns-001',
      properties: {
        id: 'HSK-NS-001',
        nama: 'Hutan Simpan Berembun',
        jenis: 'Hutan Perlindungan & Hutan Pelancongan',
        daerahHutan: 'Seremban & Jelebu',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 12/1923',
        tarikhWarta: '14 Mac 1923',
        luasHektar: 4230.0,
        status: 'Hutan Simpan Kekal (HSK)',
        spesiesUtama: 'Meranti, Keruing, Pelanginan',
        ketinggianMax: '1,014m (Gunung Berembun)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.000, 2.760],
          [102.050, 2.790],
          [102.070, 2.740],
          [102.020, 2.710],
          [102.000, 2.760]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-002',
      properties: {
        id: 'HSK-NS-002',
        nama: 'Hutan Simpan Pasoh',
        jenis: 'Hutan Penyelidikan & Perlindungan Biodiversiti',
        daerahHutan: 'Jempol',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 88/1930',
        tarikhWarta: '01 Ogos 1930',
        luasHektar: 2450.8,
        status: 'Hutan Simpan Kekal (Tapak Penyelidikan FRIM)',
        spesiesUtama: 'Dipterokarpa Lowland, Chengal, Balau',
        ketinggianMax: '650m'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.280, 2.950],
          [102.340, 2.970],
          [102.360, 2.920],
          [102.300, 2.900],
          [102.280, 2.950]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-003',
      properties: {
        id: 'HSK-NS-003',
        nama: 'Hutan Simpan Gunong Angsi',
        jenis: 'Hutan Pelindungan Tadahan Air & Rekreasi',
        daerahHutan: 'Seremban / Rembau',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 05/1918',
        tarikhWarta: '10 Mei 1918',
        luasHektar: 3120.5,
        status: 'Hutan Simpan Kekal (HSK)',
        spesiesUtama: 'Damar Minyak, Seraya, Jelutong',
        ketinggianMax: '825m (Gunung Angsi)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.010, 2.680],
          [102.050, 2.690],
          [102.060, 2.640],
          [102.020, 2.630],
          [102.010, 2.680]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-004',
      properties: {
        id: 'HSK-NS-004',
        nama: 'Hutan Simpan Sungai Menyala',
        jenis: 'Hutan Dataran Rendah & Hutan Lipur',
        daerahHutan: 'Port Dickson',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 44/1951',
        tarikhWarta: '30 Oktober 1951',
        luasHektar: 1280.0,
        status: 'Hutan Simpan Kekal (Pusat Eko-Pelajaran)',
        spesiesUtama: 'Kempas, Keruing, Jelutong Gergasi',
        ketinggianMax: '120m'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.880, 2.470],
          [101.910, 2.485],
          [101.920, 2.450],
          [101.890, 2.440],
          [101.880, 2.470]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-005',
      properties: {
        id: 'HSK-NS-005',
        nama: 'Hutan Simpan Kenaboi & Triang',
        jenis: 'Hutan Tadahan Air & Perlindungan Liar',
        daerahHutan: 'Jelebu',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 09/1935',
        tarikhWarta: '18 Januari 1935',
        luasHektar: 8940.0,
        status: 'Hutan Simpan Kekal (HSK Taman Negeri Kenaboi)',
        spesiesUtama: 'Meranti Seraya, Kasai, Bintangor',
        ketinggianMax: '1,462m (Gunung Telapak Burok)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.980, 3.020],
          [102.080, 3.060],
          [102.120, 2.980],
          [102.020, 2.950],
          [101.980, 3.020]
        ]]
      }
    }
  ]
};

// 3. RIZAB ORANG ASLI NEGERI SEMBILAN
export const RIZAB_ORANG_ASLI_NS = {
  type: 'FeatureCollection',
  name: 'Rizab Orang Asli Negeri Sembilan',
  features: [
    {
      type: 'Feature',
      id: 'roa-ns-001',
      properties: {
        id: 'ROA-NS-001',
        nama: 'Perkampungan Orang Asli Bukit Kepayang / Labu',
        sukuKaum: 'Temuan',
        daerah: 'Seremban',
        mukim: 'Mukim Labu',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 112/1968',
        tarikhWarta: '04 April 1968',
        luasHektar: 85.4,
        pendudukAnggaran: 420,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Balai Raya, Sekolah Kebangsaan, Surau, Pusat Komuniti'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.880, 2.730],
          [101.900, 2.735],
          [101.905, 2.715],
          [101.885, 2.710],
          [101.880, 2.730]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-002',
      properties: {
        id: 'ROA-NS-002',
        nama: 'Perkampungan Orang Asli Guntung & Duson Tua',
        sukuKaum: 'Temuan',
        daerah: 'Jelebu',
        mukim: 'Mukim Ulu Klawang',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 408/1974',
        tarikhWarta: '12 September 1974',
        luasHektar: 140.2,
        pendudukAnggaran: 680,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Pusat Kesihatan Desa, Tadika Kemas, Dewan Serbaguna'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.040, 2.920],
          [102.065, 2.930],
          [102.070, 2.900],
          [102.045, 2.895],
          [102.040, 2.920]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-003',
      properties: {
        id: 'ROA-NS-003',
        nama: 'Perkampungan Orang Asli Sungai Sampo',
        sukuKaum: 'Semai & Temuan',
        daerah: 'Jempol',
        mukim: 'Mukim Serting Ulu',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 220/1982',
        tarikhWarta: '28 Mei 1982',
        luasHektar: 295.6,
        pendudukAnggaran: 1150,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Sekolah SK Sungai Sampo, Klinik Desa, Medan Usahawan'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.310, 2.880],
          [102.345, 2.890],
          [102.350, 2.855],
          [102.315, 2.850],
          [102.310, 2.880]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-004',
      properties: {
        id: 'ROA-NS-004',
        nama: 'Perkampungan Orang Asli Langkap & Ulu Johol',
        sukuKaum: 'Temuan',
        daerah: 'Kuala Pilah',
        mukim: 'Mukim Johol',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 512/1979',
        tarikhWarta: '14 Ogos 1979',
        luasHektar: 198.0,
        pendudukAnggaran: 540,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Balai Pengajian, Bekalan Air Graviti, Dewan Komuniti'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.180, 2.610],
          [102.210, 2.620],
          [102.215, 2.590],
          [102.185, 2.585],
          [102.180, 2.610]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-005',
      properties: {
        id: 'ROA-NS-005',
        nama: 'Perkampungan Orang Asli Tebong & Air Kuning',
        sukuKaum: 'Temuan',
        daerah: 'Tampin',
        mukim: 'Mukim Air Kuning',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 604/1985',
        tarikhWarta: '03 Disember 1985',
        luasHektar: 112.3,
        pendudukAnggaran: 390,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Dewan Orang Asli Tebong, Projek Tani Jakoa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.300, 2.510],
          [102.325, 2.520],
          [102.330, 2.495],
          [102.305, 2.490],
          [102.300, 2.510]
        ]]
      }
    }
  ]
};

// Ringkasan Statistik Negeri Sembilan
export const SUMMARY_STATS_NS = {
  totalRizabMelayuHektar: 1583.1,
  totalHutanSimpanHektar: 20020.5,
  totalOrangAsliHektar: 831.5,
  jumlahLotRizabMelayu: 7,
  jumlahKompartmenHutan: 5,
  jumlahPerkampunganOA: 5,
  daerahList: [
    { nama: 'Seremban', rm: 240.7, hsk: 7350.5, roa: 85.4 },
    { nama: 'Port Dickson', rm: 215.8, hsk: 1280.0, roa: 0.0 },
    { nama: 'Jempol', rm: 420.0, hsk: 2450.8, roa: 295.6 },
    { nama: 'Jelebu', rm: 0.0, hsk: 8940.0, roa: 140.2 },
    { nama: 'Kuala Pilah', rm: 310.4, hsk: 0.0, roa: 198.0 },
    { nama: 'Rembau', rm: 185.3, hsk: 0.0, roa: 0.0 },
    { nama: 'Tampin', rm: 260.9, hsk: 0.0, roa: 112.3 }
  ]
};
