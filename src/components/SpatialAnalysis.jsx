import React, { useState } from 'react';
import { Target, CircleDot, Ruler, CheckCircle2, AlertTriangle, Shield, TreePine, Users } from 'lucide-react';
import { checkPointOverlap, createBufferGeometry } from '../utils/spatialUtils';
import { RIZAB_MELAYU_NS, HUTAN_SIMPAN_NS, RIZAB_ORANG_ASLI_NS } from '../data/negeriSembilanData';

export default function SpatialAnalysis({ clickedCoords, onBufferCreated }) {
  const [latInput, setLatInput] = useState(clickedCoords ? clickedCoords[0] : 2.7258);
  const [lngInput, setLngInput] = useState(clickedCoords ? clickedCoords[1] : 101.9424);
  const [bufferRadius, setBufferRadius] = useState(500); // 500 meters
  const [analysisResult, setAnalysisResult] = useState(null);

  // Sync if map clicked
  React.useEffect(() => {
    if (clickedCoords) {
      setLatInput(clickedCoords[0].toFixed(5));
      setLngInput(clickedCoords[1].toFixed(5));
      runOverlapAnalysis(clickedCoords[0], clickedCoords[1]);
    }
  }, [clickedCoords]);

  const runOverlapAnalysis = (lat, lng) => {
    const featureCollections = [
      { category: 'Tanah Rizab Melayu', color: '#ef4444', collection: RIZAB_MELAYU_NS },
      { category: 'Hutan Simpan Kekal', color: '#10b981', collection: HUTAN_SIMPAN_NS },
      { category: 'Rizab Orang Asli', color: '#a855f7', collection: RIZAB_ORANG_ASLI_NS }
    ];

    const overlaps = checkPointOverlap(parseFloat(lat), parseFloat(lng), featureCollections);
    setAnalysisResult({
      lat,
      lng,
      overlaps,
      hasOverlap: overlaps.length > 0
    });
  };

  const handleManualCheck = (e) => {
    e.preventDefault();
    runOverlapAnalysis(latInput, lngInput);
  };

  const handleGenerateBuffer = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (!isNaN(lat) && !isNaN(lng)) {
      const buf = createBufferGeometry(lat, lng, bufferRadius);
      onBufferCreated(buf, lat, lng, bufferRadius);
    }
  };

  return (
    <div className="spatial-analysis-panel">
      {/* Point Overlap Detector */}
      <div className="card-section">
        <div className="card-title">
          <Target size={18} color="#ef4444" /> Analisis Tindih Spasial (Overlap)
        </div>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
          Klik pada peta atau masukkan koordinat untuk menyemak samada tapak bertindih dengan Rizab Melayu, Hutan Simpan, atau Rizab Orang Asli.
        </p>

        <form onSubmit={handleManualCheck}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div className="form-group">
              <label className="form-label">Lat:</label>
              <input 
                type="number" 
                step="any"
                className="form-input" 
                value={latInput} 
                onChange={(e) => setLatInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Lng:</label>
              <input 
                type="number" 
                step="any"
                className="form-input" 
                value={lngInput} 
                onChange={(e) => setLngInput(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            <Target size={14} /> Semak Status Tindih
          </button>
        </form>

        {/* Results */}
        {analysisResult && (
          <div style={{ marginTop: '0.85rem', padding: '0.75rem', borderRadius: '8px', background: analysisResult.hasOverlap ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', border: `1px solid ${analysisResult.hasOverlap ? '#ef4444' : '#10b981'}` }}>
            <div style={{ fontWeight: 700, fontSize: '0.825rem', color: analysisResult.hasOverlap ? '#fca5a5' : '#6ee7b7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {analysisResult.hasOverlap ? (
                <><AlertTriangle size={16} /> TAPAK BERTINDIH DENGAN RIZAB</>
              ) : (
                <><CheckCircle2 size={16} /> BEBAS TINDIHAN (TANAH AM / PERSENDIRIAN)</>
              )}
            </div>

            {analysisResult.overlaps.map((item, idx) => (
              <div key={idx} style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dotted rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: item.color, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  • {item.category}: {item.properties.nama}
                </div>
                <div style={{ color: '#cbd5e1', marginLeft: '0.8rem', marginTop: '0.2rem' }}>
                  No. Warta: <b>{item.properties.noWarta}</b> | Daerah: <b>{item.properties.daerah}</b>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buffer Generator */}
      <div className="card-section">
        <div className="card-title">
          <CircleDot size={18} color="#a855f7" /> Penjanaan Zon Penimbal (Buffer)
        </div>
        <div className="form-group">
          <label className="form-label">Jarak Penimbal (Meter):</label>
          <select 
            className="form-select" 
            value={bufferRadius} 
            onChange={(e) => setBufferRadius(parseInt(e.target.value))}
          >
            <option value={100}>100 Meter (Sensitiviti Tinggi)</option>
            <option value={500}>500 Meter (Zon Sempadan Standard)</option>
            <option value={1000}>1,000 Meter (1 KM Penimbal)</option>
            <option value={5000}>5,000 Meter (5 KM Zon Impak)</option>
          </select>
        </div>
        <button onClick={handleGenerateBuffer} className="btn-secondary">
          <CircleDot size={14} /> Jana Buffer atas Peta
        </button>
      </div>
    </div>
  );
}
