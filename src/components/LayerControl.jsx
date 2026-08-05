import React from 'react';
import { Layers, Shield, TreePine, Users, MapPin, FileCheck2, FileText, CheckCircle2, Box } from 'lucide-react';
import { SEREMBAN_LAYERS_CONFIG } from '../utils/serembanLoader';

export default function LayerControl({ 
  layers, 
  setLayers, 
  opacity, 
  setOpacity,
  serembanStats
}) {
  const toggleLayer = (key) => {
    setLayers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getIconForLayer = (id) => {
    switch (id) {
      case 'daerahSeremban': return <MapPin size={14} color="#3b82f6" />;
      case 'malayRes':
      case 'rizabMelayuLama': return <Shield size={14} color="#ef4444" />;
      case 'forestRes': return <TreePine size={14} color="#10b981" />;
      case 'aborigineRes': return <Users size={14} color="#a855f7" />;
      case 'wartaLot': return <FileCheck2 size={14} color="#eab308" />;
      case 'pembatalanLama': return <FileText size={14} color="#64748b" />;
      default: return <Box size={14} color="#06b6d4" />;
    }
  };

  return (
    <div className="layer-control-panel">
      {/* Header Banner for SEREMBAN SHP */}
      <div className="card-section" style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59, 130, 246, 0.08)' }}>
        <div className="card-title" style={{ color: '#60a5fa' }}>
          <CheckCircle2 size={18} color="#60a5fa" /> Data Shapefile SEREMBAN SHP (JUPEM)
        </div>
        <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
          Semua fail <b>.SHP / .DBF</b> daripada folder <code>SEREMBAN SHP</code> telah diimport dan ditukar secara automatik ke koordinat GIS WGS84!
        </p>
      </div>

      <div className="card-section">
        <div className="card-title">
          <Layers size={18} color="#60a5fa" /> Senarai Lapisan Spasial Seremban
        </div>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.85rem' }}>
          Pilih lapisan untuk ditayangkan pada peta interaktif Leaflet.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {SEREMBAN_LAYERS_CONFIG.map(cfg => {
            const isChecked = !!layers[cfg.id];
            const count = serembanStats && serembanStats[cfg.id] !== undefined 
              ? `${serembanStats[cfg.id]} Rekod Spasial` 
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
