import React from 'react';
import { 
  Layers, 
  Shield, 
  TreePine, 
  Users, 
  MapPin, 
  FileCheck2, 
  FileText, 
  CheckCircle2, 
  Box, 
  Eye, 
  EyeOff, 
  Map, 
  Building2, 
  Trees, 
  Waves, 
  Sprout, 
  Mountain 
} from 'lucide-react';
import { 
  SEREMBAN_LAYERS_CONFIG, 
  JEMPOL_LAYERS_CONFIG, 
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
  pdStats,
  rembauStats,
  tampinStats,
  selectedDaerah,
  onSelectDaerah
}) {
  const toggleLayer = (key) => {
    setLayers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getIconForLayer = (id) => {
    if (id.startsWith('daerah') || id.startsWith('seksyen')) return <MapPin size={14} color="#3b82f6" />;
    if (id.includes('malay') || id.includes('rizab') || id.includes('trm') || id.includes('penggantian')) return <Shield size={14} color="#ef4444" />;
    if (id.includes('forest') || id.includes('Hutan')) return <TreePine size={14} color="#10b981" />;
    if (id.includes('aborigine') || id.includes('OrangAsli')) return <Users size={14} color="#a855f7" />;
    if (id.includes('warta')) return <FileCheck2 size={14} color="#eab308" />;
    if (id.includes('pembatalan')) return <FileText size={14} color="#64748b" />;
    return <Box size={14} color="#06b6d4" />;
  };

  const renderLayerGroup = (title, configList, statsDict) => {
    return (
      <div className="layer-group-container">
        <div className="layer-group-header">
          <MapPin size={14} /> {title}
        </div>

        <div className="layer-items-list">
          {configList.map(cfg => {
            const isChecked = !!layers[cfg.id];
            const count = statsDict && statsDict[cfg.id] !== undefined 
              ? `${statsDict[cfg.id]} Rekod Spasial` 
              : cfg.description;

            return (
              <div className={`layer-toggle-item ${isChecked ? 'checked' : ''}`} key={cfg.id}>
                <div className="layer-info">
                  <div className="layer-color-dot" style={{ background: cfg.color }} />
                  <div>
                    <div className="layer-name">
                      {getIconForLayer(cfg.id)}
                      {cfg.name}
                    </div>
                    <div className="layer-count">
                      {count}
                    </div>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={() => toggleLayer(cfg.id)} 
                  />
                  <span className="slider"></span>
                </label>
              </div>
            );
          })}
        </div>
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

  const districtFilters = [
    { id: 'all', label: 'Semua', icon: Map },
    { id: 'seremban', label: 'Seremban', icon: Building2 },
    { id: 'jempol', label: 'Jempol', icon: Trees },
    { id: 'pd', label: 'Port Dickson', icon: Waves },
    { id: 'rembau', label: 'Rembau', icon: Sprout },
    { id: 'tampin', label: 'Tampin', icon: Mountain }
  ];

  return (
    <div className="layer-control-panel">
      {/* Header Banner */}
      <div className="layer-banner-info">
        <div className="layer-banner-title">
          <CheckCircle2 size={16} color="#60a5fa" /> Shapefile JUPEM N.S.
        </div>
        <p className="layer-banner-desc">
          Semua fail <b>.SHP</b> 5 Daerah (Seremban, Jempol, Port Dickson, Rembau, Tampin) sedia ditayangkan.
        </p>
      </div>

      <div className="card-section">
        <div className="layer-section-title">
          <span><Layers size={16} color="#60a5fa" /> Lapisan Spasial</span>
          <div className="layer-bulk-actions">
            <button
              onClick={turnAllOff}
              title="Tutup Semua Lapisan"
              className="btn-bulk-toggle danger"
            >
              <EyeOff size={12} /> Tutup Semua
            </button>
            <button
              onClick={turnAllOn}
              title="Buka Semua Lapisan"
              className="btn-bulk-toggle success"
            >
              <Eye size={12} /> Buka Semua
            </button>
          </div>
        </div>

        {/* Daerah Filter Buttons */}
        <div className="layer-district-grid">
          {districtFilters.map(d => {
            const IconComp = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => onSelectDaerah(d.id)}
                className={`layer-district-btn ${selectedDaerah === d.id ? 'active' : ''}`}
              >
                <IconComp size={12} />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>


        {/* Render Seremban Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'seremban') && (
          renderLayerGroup('Daerah Seremban (11 Lapisan)', SEREMBAN_LAYERS_CONFIG, serembanStats)
        )}

        {/* Render Jempol Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'jempol') && (
          renderLayerGroup('Daerah Jempol (10 Lapisan)', JEMPOL_LAYERS_CONFIG, jempolStats)
        )}

        {/* Render Port Dickson Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'pd') && (
          renderLayerGroup('Daerah Port Dickson (9 Lapisan)', PD_LAYERS_CONFIG, pdStats)
        )}

        {/* Render Rembau Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'rembau') && (
          renderLayerGroup('Daerah Rembau (8 Lapisan)', REMBAU_LAYERS_CONFIG, rembauStats)
        )}

        {/* Render Tampin Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'tampin') && (
          renderLayerGroup('Daerah Tampin (9 Lapisan)', TAMPIN_LAYERS_CONFIG, tampinStats)
        )}

        {/* Opacity Slider */}
        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
            <span>Ketelusan Poligon (Opacity):</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{Math.round(opacity * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="1.0" 
            step="0.05" 
            value={opacity} 
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
