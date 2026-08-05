import React, { useState } from 'react';
import Header from './components/Header';
import LayerControl from './components/LayerControl';
import SearchPanel from './components/SearchPanel';
import SpatialAnalysis from './components/SpatialAnalysis';
import QgisIntegration from './components/QgisIntegration';
import Dashboard from './components/Dashboard';
import MapViewer from './components/MapViewer';
import ReportModal from './components/ReportModal';
import { Layers, Search, Target, Cpu, BarChart3, PanelLeftOpen } from 'lucide-react';
import { SUMMARY_STATS_NS, RIZAB_MELAYU_NS, HUTAN_SIMPAN_NS, RIZAB_ORANG_ASLI_NS } from './data/negeriSembilanData';
import { 
  ALL_LAYERS_CONFIG, 
  SEREMBAN_LAYERS_CONFIG, 
  JEMPOL_LAYERS_CONFIG,
  PD_LAYERS_CONFIG,
  REMBAU_LAYERS_CONFIG,
  TAMPIN_LAYERS_CONFIG,
  DAERAH_CENTROIDS 
} from './utils/daerahLoader';

export default function App() {
  const [activeTab, setActiveTab] = useState('layers');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDaerah, setSelectedDaerah] = useState('all'); // 'all', 'seremban', 'jempol', 'pd', 'rembau', 'tampin'

  // Initialize layer states: all layers toggled OFF by default on load
  const initialLayers = ALL_LAYERS_CONFIG.reduce((acc, cfg) => {
    acc[cfg.id] = false;
    return acc;
  }, {});

  const [layers, setLayers] = useState(initialLayers);
  const [opacity, setOpacity] = useState(0.5);
  const [selectedLocation, setSelectedLocation] = useState(DAERAH_CENTROIDS.all);
  const [clickedCoords, setClickedCoords] = useState(null);
  const [bufferData, setBufferData] = useState(null);
  const [customImportedData, setCustomImportedData] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Handle map click
  const handleMapClick = (lat, lng) => {
    setClickedCoords([lat, lng]);
    setSelectedLocation({
      center: [lat, lng],
      zoom: 14,
      label: `Titik Dipilih (${lat.toFixed(4)}, ${lng.toFixed(4)})`
    });
    if (activeTab !== 'analysis' && isSidebarOpen) {
      setActiveTab('analysis');
    }
  };

  // Handle Search Result Selection
  const handleSearchResult = (term) => {
    const termLower = term.toLowerCase();
    
    // Check in TRM
    const trmMatch = RIZAB_MELAYU_NS.features.find(f => 
      f.properties.nama.toLowerCase().includes(termLower) ||
      f.properties.noLot.toLowerCase().includes(termLower) ||
      f.properties.mukim.toLowerCase().includes(termLower)
    );

    if (trmMatch) {
      const coords = trmMatch.geometry.coordinates[0][0];
      setSelectedLocation({
        center: [coords[1], coords[0]],
        zoom: 14,
        label: `${trmMatch.properties.nama} (${trmMatch.properties.noLot})`
      });
      return;
    }

    // Check in HSK
    const hskMatch = HUTAN_SIMPAN_NS.features.find(f => 
      f.properties.nama.toLowerCase().includes(termLower) ||
      f.properties.daerahHutan.toLowerCase().includes(termLower)
    );

    if (hskMatch) {
      const coords = hskMatch.geometry.coordinates[0][0];
      setSelectedLocation({
        center: [coords[1], coords[0]],
        zoom: 13,
        label: hskMatch.properties.nama
      });
      return;
    }

    // Check in ROA
    const roaMatch = RIZAB_ORANG_ASLI_NS.features.find(f => 
      f.properties.nama.toLowerCase().includes(termLower)
    );

    if (roaMatch) {
      const coords = roaMatch.geometry.coordinates[0][0];
      setSelectedLocation({
        center: [coords[1], coords[0]],
        zoom: 14,
        label: roaMatch.properties.nama
      });
      return;
    }

    alert(`Tiada padanan lot ditemui untuk carian: "${term}" dalam data Negeri Sembilan. Silakan cuba katakunci lain seperti "Ampangan", "Berembun", atau "Lot 3481".`);
  };

  // Handle Location Selection
  const handleSelectLocation = (lat, lng, zoom, label) => {
    setSelectedLocation({ center: [lat, lng], zoom, label });
  };

  // Handle Buffer Creation
  const handleBufferCreated = (buf, lat, lng, radius) => {
    setBufferData({ lat, lng, radius, geometry: buf });
  };

  // Handle Custom QGIS Data Import
  const handleCustomDataImported = (data, filename) => {
    setCustomImportedData(data);
    alert(`Fail ${filename} berjaya diimport! Poligon baru ditambah di atas peta.`);
  };

  const serembanStats = {
    daerahSeremban: 1,
    malayRes: 40,
    forestRes: 53,
    aborigineRes: 3,
    wartaLot: 1772,
    rizabMelayuLama: 25,
    pembatalanLama: 16,
    transitionLot: 7,
    transitionBdyPolyline: 16921,
    ndcdbLotRegion: '1,772',
    ndcdbBdyPolyline: '16,921'
  };

  const jempolStats = {
    daerahJempol: 1,
    malayResJempol: 45,
    malayResB: 24,
    forestResJempol: 49,
    aborigineResJempol: 18,
    wartaLotJempol: 955,
    ndcdbLotJempol: '62,516',
    pembatalanTrmJempol: 8,
    trmGantianLama: 5,
    trmLamaJempol: 4
  };

  const pdStats = {
    daerahPd: 1,
    malayResPd: 15,
    forestResPd: 34,
    aborigineResPd: 1,
    wartaLotPd: 569,
    ndcdbLotPd: '64,565',
    ndcdbBdyPd: '229,933',
    pembatalanPd: 7,
    rizabMelayuLamaPd: 17
  };

  const rembauStats = {
    daerahRembau: 1,
    malayResRembau: 27,
    forestResRembau: 34,
    aborigineResRembau: 3,
    wartaLotRembau: 331,
    ndcdbLotRembau: '39,490',
    pembatalanRembau: 14,
    seksyenRembau: 2
  };

  const tampinStats = {
    daerahTampin: 1,
    malayResTampin: 18,
    forestResTampin: 45,
    aborigineResTampin: 2,
    wartaLotTampin: 622,
    ndcdbLotTampin: '49,413',
    pembatalanTampin: 8,
    penggantianTampin: 1,
    seksyenTampin: 2
  };

  const handleSelectDaerah = (daerahId) => {
    setSelectedDaerah(daerahId);
    const targetLoc = DAERAH_CENTROIDS[daerahId] || DAERAH_CENTROIDS.all;
    setSelectedLocation(targetLoc);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        onOpenQgisModal={() => setActiveTab('qgis')}
        onOpenReportModal={() => setShowReportModal(true)}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedDaerah={selectedDaerah}
        onSelectDaerah={handleSelectDaerah}
      />

      <div className="app-container">
        {/* Left Sidebar Control Panel */}
        <aside className={`app-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-tabs">
            <button 
              className={`tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
              onClick={() => setActiveTab('layers')}
            >
              <Layers size={16} /> Lapisan
            </button>
            <button 
              className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              <Search size={16} /> Carian Lot
            </button>
            <button 
              className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              <Target size={16} /> Analisis
            </button>
            <button 
              className={`tab-btn ${activeTab === 'qgis' ? 'active' : ''}`}
              onClick={() => setActiveTab('qgis')}
            >
              <Cpu size={16} /> QGIS
            </button>
            <button 
              className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 size={16} /> Dashboard
            </button>
          </nav>

          <div className="sidebar-content">
            {activeTab === 'layers' && (
              <LayerControl 
                layers={layers}
                setLayers={setLayers}
                opacity={opacity}
                setOpacity={setOpacity}
                stats={SUMMARY_STATS_NS}
                serembanStats={serembanStats}
                jempolStats={jempolStats}
                pdStats={pdStats}
                rembauStats={rembauStats}
                tampinStats={tampinStats}
                selectedDaerah={selectedDaerah}
                onSelectDaerah={handleSelectDaerah}
              />
            )}

            {activeTab === 'search' && (
              <SearchPanel 
                onSelectLocation={handleSelectLocation}
                onSearchResult={handleSearchResult}
              />
            )}

            {activeTab === 'analysis' && (
              <SpatialAnalysis 
                clickedCoords={clickedCoords}
                onBufferCreated={handleBufferCreated}
              />
            )}

            {activeTab === 'qgis' && (
              <QgisIntegration 
                onCustomDataImported={handleCustomDataImported}
              />
            )}

            {activeTab === 'dashboard' && (
              <Dashboard />
            )}
          </div>
        </aside>

        {/* Floating Sidebar Toggle Button on Map when Sidebar is closed */}
        {!isSidebarOpen && (
          <button 
            className="floating-sidebar-toggle"
            onClick={() => setIsSidebarOpen(true)}
            title="Buka Sidebar Panel"
          >
            <PanelLeftOpen size={18} /> Menu Panel
          </button>
        )}

        {/* GIS Map Canvas */}
        <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <MapViewer 
            layers={layers}
            opacity={opacity}
            selectedLocation={selectedLocation}
            onMapClick={handleMapClick}
            bufferData={bufferData}
            customImportedData={customImportedData}
            isSidebarOpen={isSidebarOpen}
            selectedDaerah={selectedDaerah}
          />
        </main>
      </div>

      {/* Modal Report Window */}
      {showReportModal && (
        <ReportModal onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
}
