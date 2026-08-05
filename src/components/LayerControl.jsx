import React from 'react';
import { Layers, Shield, TreePine, Users, MapPin, FileCheck2, FileText, CheckCircle2, Box, Filter } from 'lucide-react';
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
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ 
          fontSize: '0.78rem', 
          fontWeight: 700, 
          color: '#60a5fa', 
          marginBottom: '0.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.35rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '0.35rem'
        }}>
          <MapPin size={14} /> {title}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {configList.map(cfg => {
            const isChecked = !!layers[cfg.id];
            const count = statsDict && statsDict[cfg.id] !== undefined 
              ? `${statsDict[cfg.id]} Rekod Spasial` 
              : cfg.description;

            return (
              <div className="layer-toggle-item" key={cfg.id} style={{ background: isChecked ? 'rgba(30, 41, 59, 0.7)' : 'transparent' }}>
                <div className="layer-info">
                  <div className="layer-color-dot" style={{ background: cfg.color }} />
                  <div>
                    <div className="layer-name" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: isChecked ? 700 : 500 }}>
                      {getIconForLayer(cfg.id)}
                      {cfg.name}
                    </div>
                    <div className="layer-count" style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
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

  return (
    <div className="layer-control-panel">
      {/* Header Banner */}
      <div className="card-section" style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59, 130, 246, 0.08)' }}>
        <div className="card-title" style={{ color: '#60a5fa' }}>
          <CheckCircle2 size={18} color="#60a5fa" /> Data Shapefile Negeri Sembilan (JUPEM)
        </div>
        <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
          Semua fail <b>.SHP / .DBF</b> daripada 5 Daerah (Seremban, Jempol, Port Dickson, Rembau, Tampin) telah sedia ditayangkan!
        </p>
      </div>

      <div className="card-section">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span><Layers size={18} color="#60a5fa" /> Lapisan Spasial</span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={turnAllOff}
              title="Tutup Semua Lapisan"
              style={{
                fontSize: '0.68rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '4px',
                padding: '0.2rem 0.45rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ❌ Tutup Semua
            </button>
            <button
              onClick={turnAllOn}
              title="Buka Semua Lapisan"
              style={{
                fontSize: '0.68rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '4px',
                padding: '0.2rem 0.45rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ✅ Buka Semua
            </button>
          </div>
        </div>

        {/* Daerah Filter Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', margin: '0.75rem 0 1rem 0' }}>
          {[
            { id: 'all', label: '🗺️ Semua' },
            { id: 'seremban', label: '🏙️ Seremban' },
            { id: 'jempol', label: '🌲 Jempol' },
            { id: 'pd', label: '🏖️ Port Dickson' },
            { id: 'rembau', label: '🌾 Rembau' },
            { id: 'tampin', label: '⛰️ Tampin' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => onSelectDaerah(d.id)}
              style={{
                padding: '0.35rem 0.2rem',
                fontSize: '0.7rem',
                fontWeight: selectedDaerah === d.id ? 700 : 500,
                borderRadius: '6px',
                border: selectedDaerah === d.id ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                background: selectedDaerah === d.id ? '#1d4ed8' : '#1e293b',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              {d.label}
            </button>
          ))}
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
