import React, { useState } from 'react';
import { 
  Layers, 
  Landmark, 
  MapPin, 
  Eye, 
  EyeOff, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal,
  Check,
  Globe
} from 'lucide-react';
import { 
  STATEWIDE_LAYERS_CONFIG,
  SEREMBAN_LAYERS_CONFIG, 
  JEMPOL_LAYERS_CONFIG, 
  KUALAPILAH_LAYERS_CONFIG,
  JELEBU_LAYERS_CONFIG,
  PD_LAYERS_CONFIG, 
  REMBAU_LAYERS_CONFIG, 
  TAMPIN_LAYERS_CONFIG 
} from '../utils/daerahLoader';

export default function LayerControl({ 
  layers, 
  setLayers, 
  opacity, 
  setOpacity,
  serembanStats,
  jempolStats,
  kualapilahStats,
  jelebuStats,
  pdStats,
  rembauStats,
  tampinStats,
  selectedDaerah,
  onSelectDaerah
}) {
  const [activeReserveFilter, setActiveReserveFilter] = useState('all');
  const [showStateBoundary, setShowStateBoundary] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const toggleLayer = (key) => {
    setLayers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleGroupCollapse = (groupKey) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const filterConfigList = (list) => {
    if (activeReserveFilter === 'all') return list;
    return list.filter(cfg => cfg.reserveType === activeReserveFilter || cfg.id.startsWith('daerah') || cfg.id.startsWith('sempadan'));
  };

  const renderLegendSwatch = (color, fillColor, type) => {
    return (
      <span 
        className="gis-legend-swatch"
        style={{ 
          background: fillColor || color, 
          borderColor: color 
        }} 
        title={`Simbologi: ${type || 'Poligon'}`}
      />
    );
  };

  const renderLayerGroup = (groupKey, title, configList, statsDict) => {
    const filteredList = filterConfigList(configList);
    if (filteredList.length === 0) return null;

    const isCollapsed = !!collapsedGroups[groupKey];
    const activeCount = filteredList.filter(cfg => !!layers[cfg.id]).length;

    return (
      <div className="gis-tree-group" key={groupKey}>
        {/* Group Header Row */}
        <div 
          className="gis-tree-group-header" 
          onClick={() => toggleGroupCollapse(groupKey)}
        >
          <div className="gis-tree-group-left">
            {isCollapsed ? <ChevronRight size={14} className="tree-chevron" /> : <ChevronDown size={14} className="tree-chevron" />}
            <span className="gis-group-title">{title}</span>
          </div>
          <div className="gis-tree-group-right">
            <span className="gis-group-count">{activeCount}/{filteredList.length}</span>
          </div>
        </div>

        {/* Group Items List */}
        {!isCollapsed && (
          <div className="gis-tree-items">
            {filteredList.map(cfg => {
              const isChecked = !!layers[cfg.id];
              const countText = statsDict && statsDict[cfg.id] !== undefined 
                ? `${statsDict[cfg.id]} rekod` 
                : null;

              return (
                <div 
                  className={`gis-tree-row ${isChecked ? 'active' : ''}`} 
                  key={cfg.id}
                  onClick={() => toggleLayer(cfg.id)}
                >
                  <div className="gis-row-checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      className="gis-row-checkbox"
                      checked={isChecked} 
                      onChange={() => {}}
                    />
                  </div>

                  {renderLegendSwatch(cfg.color, cfg.fillColor, cfg.reserveType)}

                  <div className="gis-row-label">
                    <span className="gis-row-name">{cfg.name}</span>
                  </div>

                  {countText && (
                    <div className="gis-row-badge mono">{countText}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const turnAllOff = () => {
    setLayers(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { next[k] = false; });
      return next;
    });
  };

  const turnAllOn = () => {
    setLayers(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { next[k] = true; });
      return next;
    });
  };

  const reserveFilterOptions = [
    { id: 'all', label: 'Semua Lapisan', swatch: '#3b82f6' },
    { id: 'rizab_melayu', label: 'Rizab Melayu', swatch: '#facc15' },
    { id: 'pembatalan', label: 'Pembatalan TRM', swatch: '#ef4444' },
    { id: 'penggantian', label: 'Penggantian TRM', swatch: '#3b82f6' },
    { id: 'hutan', label: 'Hutan Simpan', swatch: '#22c55e' },
    { id: 'orang_asli', label: 'Orang Asli', swatch: '#a855f7' }
  ];

  const districtOptions = [
    { id: 'all', label: 'Semua Daerah' },
    { id: 'seremban', label: 'Seremban' },
    { id: 'jempol', label: 'Jempol' },
    { id: 'pd', label: 'Port Dickson' },
    { id: 'kualapilah', label: 'Kuala Pilah' },
    { id: 'jelebu', label: 'Jelebu' },
    { id: 'rembau', label: 'Rembau' },
    { id: 'tampin', label: 'Tampin' }
  ];

  const districtKeys = [
    { id: 'daerahSeremban', label: 'Seremban' },
    { id: 'daerahJempol', label: 'Jempol' },
    { id: 'daerahPd', label: 'Port Dickson' },
    { id: 'daerahKualaPilah', label: 'Kuala Pilah' },
    { id: 'daerahJelebu', label: 'Jelebu' },
    { id: 'daerahRembau', label: 'Rembau' },
    { id: 'daerahTampin', label: 'Tampin' }
  ];

  return (
    <div className="gis-sidebar-panel">
      {/* Top Toolbar Header */}
      <div className="gis-panel-header">
        <div className="gis-panel-title">
          <Layers size={15} color="#38bdf8" />
          <span>Pengurusan Lapisan Spasial</span>
        </div>
        <div className="gis-panel-actions">
          <button 
            className="gis-tool-btn" 
            onClick={turnAllOff} 
            title="Nyahaktifkan Semua Lapisan"
          >
            <EyeOff size={13} />
            <span>Tutup Semua</span>
          </button>
          <button 
            className="gis-tool-btn primary" 
            onClick={turnAllOn} 
            title="Aktifkan Semua Lapisan"
          >
            <Eye size={13} />
            <span>Buka Semua</span>
          </button>
        </div>
      </div>

      {/* District Segment Control */}
      <div className="gis-filter-section">
        <div className="gis-filter-label">
          <MapPin size={12} />
          <span>Tapis Pentadbiran Daerah (7 Daerah)</span>
        </div>
        <div className="gis-segment-control">
          {districtOptions.map(d => (
            <button
              key={d.id}
              onClick={() => onSelectDaerah(d.id)}
              className={`gis-segment-btn ${selectedDaerah === d.id ? 'active' : ''}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reserve Category Legend Filter Bar */}
      <div className="gis-filter-section">
        <div className="gis-filter-label">
          <Filter size={12} />
          <span>Simbologi & Kategori Rizab</span>
        </div>
        <div className="gis-legend-chips">
          {reserveFilterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setActiveReserveFilter(opt.id)}
              className={`gis-legend-chip ${activeReserveFilter === opt.id ? 'active' : ''}`}
            >
              <span className="chip-swatch" style={{ background: opt.swatch }} />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* GIS LAYER TREE CONTAINER */}
      <div className="gis-layer-tree-container">
        
        {/* 1. SEMPADAN PENTADBIRAN GROUP */}
        <div className="gis-tree-section">
          <div className="gis-section-header">
            <Landmark size={13} />
            <span>Sempadan Pentadbiran (JUPEM)</span>
          </div>

          <div className="gis-tree-items">
            {/* Sempadan Negeri Row */}
            <div 
              className={`gis-tree-row ${showStateBoundary ? 'active' : ''}`}
              onClick={() => setShowStateBoundary(!showStateBoundary)}
            >
              <div className="gis-row-checkbox-wrapper">
                <input 
                  type="checkbox" 
                  className="gis-row-checkbox"
                  checked={showStateBoundary} 
                  onChange={() => {}}
                />
              </div>
              <span className="gis-legend-swatch state-swatch" title="Sempadan Rasmi Negeri Sembilan" />
              <div className="gis-row-label">
                <span className="gis-row-name">Sempadan Negeri Sembilan</span>
              </div>
              <div className="gis-row-badge mono">Warta JUPEM</div>
            </div>

            {/* Sempadan 7 Daerah Toggles */}
            {districtKeys.map(d => {
              const isChecked = !!layers[d.id];
              return (
                <div 
                  key={d.id}
                  className={`gis-tree-row ${isChecked ? 'active' : ''}`}
                  onClick={() => toggleLayer(d.id)}
                >
                  <div className="gis-row-checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      className="gis-row-checkbox"
                      checked={isChecked} 
                      onChange={() => {}}
                    />
                  </div>
                  <span className="gis-legend-swatch district-swatch" title={`Sempadan Pentadbiran Daerah ${d.label}`} />
                  <div className="gis-row-label">
                    <span className="gis-row-name">Sempadan Daerah {d.label}</span>
                  </div>
                  <div className="gis-row-badge mono">Polygon</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. LAPISAN PERINGKAT NEGERI */}
        <div className="gis-tree-section">
          <div className="gis-section-header">
            <Globe size={13} />
            <span>Lapisan Seluruh Negeri</span>
          </div>
          {renderLayerGroup('statewide', 'Rizab Hutan Negeri Sembilan', STATEWIDE_LAYERS_CONFIG, {
            hutanSimpanNegeri: 35,
            pembatalanHutanNegeri: 295
          })}
        </div>

        {/* 3. 7 DAERAH SPATIAL DATA GROUPS */}
        <div className="gis-tree-section">
          <div className="gis-section-header">
            <Layers size={13} />
            <span>Kawasan Rizab & Lot Mengikut Daerah</span>
          </div>

          {(selectedDaerah === 'all' || selectedDaerah === 'seremban') && (
            renderLayerGroup('seremban', 'Daerah Seremban', SEREMBAN_LAYERS_CONFIG, serembanStats)
          )}

          {(selectedDaerah === 'all' || selectedDaerah === 'jempol') && (
            renderLayerGroup('jempol', 'Daerah Jempol', JEMPOL_LAYERS_CONFIG, jempolStats)
          )}

          {(selectedDaerah === 'all' || selectedDaerah === 'pd') && (
            renderLayerGroup('pd', 'Daerah Port Dickson', PD_LAYERS_CONFIG, pdStats)
          )}

          {(selectedDaerah === 'all' || selectedDaerah === 'kualapilah') && (
            renderLayerGroup('kualapilah', 'Daerah Kuala Pilah', KUALAPILAH_LAYERS_CONFIG, kualapilahStats)
          )}

          {(selectedDaerah === 'all' || selectedDaerah === 'jelebu') && (
            renderLayerGroup('jelebu', 'Daerah Jelebu', JELEBU_LAYERS_CONFIG, jelebuStats)
          )}

          {(selectedDaerah === 'all' || selectedDaerah === 'rembau') && (
            renderLayerGroup('rembau', 'Daerah Rembau', REMBAU_LAYERS_CONFIG, rembauStats)
          )}

          {(selectedDaerah === 'all' || selectedDaerah === 'tampin') && (
            renderLayerGroup('tampin', 'Daerah Tampin', TAMPIN_LAYERS_CONFIG, tampinStats)
          )}
        </div>
      </div>

      {/* Opacity Control Footer */}
      <div className="gis-opacity-footer">
        <div className="gis-opacity-header">
          <SlidersHorizontal size={12} />
          <span>Ketelusan Poligon (Opacity)</span>
          <span className="gis-opacity-val mono">{Math.round(opacity * 100)}%</span>
        </div>
        <input 
          type="range" 
          min="0.1" 
          max="1.0" 
          step="0.05" 
          value={opacity} 
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="gis-opacity-slider"
        />
      </div>
    </div>
  );
}
