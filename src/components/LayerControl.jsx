import React, { useState } from 'react';
import { 
  Layers, 
  Shield, 
  TreePine, 
  Users, 
  MapPin, 
  FileCheck2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Map, 
  Building2, 
  Trees, 
  Waves, 
  Sprout, 
  Mountain,
  Filter,
  Landmark,
  Compass,
  Crown
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
  const [activeReserveFilter, setActiveReserveFilter] = useState('all');
  const [showStateBoundary, setShowStateBoundary] = useState(true);

  const toggleLayer = (key) => {
    setLayers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filterConfigList = (list) => {
    if (activeReserveFilter === 'all') return list;
    return list.filter(cfg => cfg.reserveType === activeReserveFilter || cfg.id.startsWith('daerah') || cfg.id.startsWith('warta'));
  };

  const getReserveBadge = (type) => {
    if (type === 'rizab_melayu') return <span style={{ fontSize: '0.62rem', background: 'rgba(234, 179, 8, 0.2)', color: '#facc15', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600, border: '1px solid rgba(234, 179, 8, 0.4)' }}>🟡 Rizab Melayu</span>;
    if (type === 'pembatalan') return <span style={{ fontSize: '0.62rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.4)' }}>🔴 Pembatalan</span>;
    if (type === 'penggantian') return <span style={{ fontSize: '0.62rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600, border: '1px solid rgba(59, 130, 246, 0.4)' }}>🔵 Penggantian</span>;
    if (type === 'hutan') return <span style={{ fontSize: '0.62rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600, border: '1px solid rgba(34, 197, 94, 0.4)' }}>🟢 Hutan Simpan</span>;
    if (type === 'orang_asli') return <span style={{ fontSize: '0.62rem', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600, border: '1px solid rgba(168, 85, 247, 0.4)' }}>🟣 Orang Asli</span>;
    return null;
  };

  const renderLayerGroup = (title, configList, statsDict) => {
    const filteredList = filterConfigList(configList);
    if (filteredList.length === 0) return null;

    return (
      <div className="layer-group-container" style={{ marginBottom: '0.75rem' }}>
        <div className="layer-group-header">
          <MapPin size={14} /> {title} ({filteredList.length} Lapisan)
        </div>

        <div className="layer-items-list">
          {filteredList.map(cfg => {
            const isChecked = !!layers[cfg.id];
            const count = statsDict && statsDict[cfg.id] !== undefined 
              ? `${statsDict[cfg.id]} Rekod Spasial` 
              : cfg.description;

            return (
              <div className={`layer-toggle-item ${isChecked ? 'checked' : ''}`} key={cfg.id}>
                <div className="layer-info">
                  <div className="layer-color-dot" style={{ background: cfg.fillColor || cfg.color, border: `2px solid ${cfg.color}` }} />
                  <div>
                    <div className="layer-name" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <span>{cfg.name}</span>
                      {getReserveBadge(cfg.reserveType)}
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
          <CheckCircle2 size={16} color="#60a5fa" /> Hierarki Spasial MRIS N.S.
        </div>
        <p className="layer-banner-desc">
          Disusun berasaskan: Sempadan Negeri ➔ Sempadan Daerah ➔ Sempadan Mukim ➔ Tanah Rizab.
        </p>
      </div>

      {/* 1. HIERARKI SEMPADAN PENTADBIRAN */}
      <div className="card-section" style={{ marginBottom: '0.75rem', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <div style={{ fontSize: '0.76rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Landmark size={15} /> 1. Sempadan Pentadbiran (Negeri, Daerah & Mukim)
        </div>

        {/* Sempadan Negeri Toggle */}
        <div className="layer-toggle-item checked" style={{ marginBottom: '0.4rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div className="layer-info">
            <div className="layer-color-dot" style={{ background: '#fef08a', border: '2px solid #f59e0b' }} />
            <div>
              <div className="layer-name" style={{ color: '#facc15', fontWeight: 700 }}>
                👑 Sempadan Negeri Sembilan
              </div>
              <div className="layer-count">Sempadan Rasmi Negeri (Warta JUPEM)</div>
            </div>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={showStateBoundary} 
              onChange={() => setShowStateBoundary(!showStateBoundary)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Sempadan Daerah Quick Toggles */}
        <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.4rem', marginBottom: '0.25rem', fontWeight: 600 }}>
          🏙️ Sempadan Daerah Pentadbiran:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
          {['seremban', 'jempol', 'pd', 'rembau', 'tampin'].map(dKey => {
            const cfgId = `daerah${dKey.charAt(0).toUpperCase() + dKey.slice(1)}`;
            const isChecked = !!layers[cfgId];
            return (
              <button
                key={dKey}
                onClick={() => toggleLayer(cfgId)}
                style={{
                  fontSize: '0.68rem',
                  padding: '0.3rem 0.4rem',
                  borderRadius: '4px',
                  border: isChecked ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                  background: isChecked ? 'rgba(59, 130, 246, 0.25)' : 'rgba(15,23,42,0.5)',
                  color: isChecked ? '#60a5fa' : '#cbd5e1',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isChecked ? '#3b82f6' : '#64748b' }} />
                <span>Daerah {dKey.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card-section">
        <div className="layer-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <span><Layers size={16} color="#60a5fa" /> 2. Lapisan Tanah Rizab & Kadaster</span>
          <div className="layer-bulk-actions">
            <button
              onClick={turnAllOff}
              title="Tutup Semua Lapisan"
              className="btn-bulk-toggle danger"
            >
              <EyeOff size={12} /> Tutup
            </button>
            <button
              onClick={turnAllOn}
              title="Buka Semua Lapisan"
              className="btn-bulk-toggle success"
            >
              <Eye size={12} /> Buka
            </button>
          </div>
        </div>

        {/* 5 CORE RESERVE TOGGLES & COLORS */}
        <div style={{ marginBottom: '0.75rem', background: 'rgba(15, 23, 42, 0.5)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.7rem', color: '#f59e0b', marginBottom: '0.4rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={12} /> Tapis Mengikut Warna Kategori Rizab:
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            <button
              type="button"
              onClick={() => setActiveReserveFilter('all')}
              className={`layer-district-btn ${activeReserveFilter === 'all' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem' }}
            >
              Semua Rizab
            </button>

            <button
              type="button"
              onClick={() => setActiveReserveFilter('rizab_melayu')}
              className={`layer-district-btn ${activeReserveFilter === 'rizab_melayu' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem', color: '#facc15', borderColor: activeReserveFilter === 'rizab_melayu' ? '#facc15' : '' }}
            >
              🟡 Rizab Melayu (Kuning)
            </button>

            <button
              type="button"
              onClick={() => setActiveReserveFilter('pembatalan')}
              className={`layer-district-btn ${activeReserveFilter === 'pembatalan' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem', color: '#ef4444', borderColor: activeReserveFilter === 'pembatalan' ? '#ef4444' : '' }}
            >
              🔴 Pembatalan (Merah)
            </button>

            <button
              type="button"
              onClick={() => setActiveReserveFilter('penggantian')}
              className={`layer-district-btn ${activeReserveFilter === 'penggantian' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem', color: '#60a5fa', borderColor: activeReserveFilter === 'penggantian' ? '#60a5fa' : '' }}
            >
              🔵 Penggantian (Biru)
            </button>

            <button
              type="button"
              onClick={() => setActiveReserveFilter('hutan')}
              className={`layer-district-btn ${activeReserveFilter === 'hutan' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem', color: '#4ade80', borderColor: activeReserveFilter === 'hutan' ? '#4ade80' : '' }}
            >
              🟢 Hutan Simpan (Hijau)
            </button>

            <button
              type="button"
              onClick={() => setActiveReserveFilter('orang_asli')}
              className={`layer-district-btn ${activeReserveFilter === 'orang_asli' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem', color: '#c084fc', borderColor: activeReserveFilter === 'orang_asli' ? '#c084fc' : '' }}
            >
              🟣 Orang Asli (Purple)
            </button>
          </div>
        </div>

        {/* Daerah Filter Buttons */}
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <MapPin size={12} color="#3b82f6" /> Asingkan Mengikut Daerah:
        </div>
        <div className="layer-district-grid" style={{ marginBottom: '0.75rem' }}>
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
          renderLayerGroup('Daerah Seremban', SEREMBAN_LAYERS_CONFIG, serembanStats)
        )}

        {/* Render Jempol Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'jempol') && (
          renderLayerGroup('Daerah Jempol', JEMPOL_LAYERS_CONFIG, jempolStats)
        )}

        {/* Render Port Dickson Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'pd') && (
          renderLayerGroup('Daerah Port Dickson', PD_LAYERS_CONFIG, pdStats)
        )}

        {/* Render Rembau Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'rembau') && (
          renderLayerGroup('Daerah Rembau', REMBAU_LAYERS_CONFIG, rembauStats)
        )}

        {/* Render Tampin Group */}
        {(selectedDaerah === 'all' || selectedDaerah === 'tampin') && (
          renderLayerGroup('Daerah Tampin', TAMPIN_LAYERS_CONFIG, tampinStats)
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
