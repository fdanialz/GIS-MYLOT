import React, { useState } from 'react';
import { Search, MapPin, Navigation, ExternalLink, Sparkles, Layers, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { NEGERI_SEMBILAN_BOUNDS } from '../data/negeriSembilanData';
import { searchAllDatasets } from '../utils/daerahLoader';

const DISTRICT_COORDS = {
  'Seremban': [2.7258, 101.9424],
  'Port Dickson': [2.5228, 101.7961],
  'Jempol': [2.8048, 102.3615],
  'Jelebu': [2.9667, 102.0667],
  'Kuala Pilah': [2.7389, 102.2486],
  'Rembau': [2.5898, 102.0945],
  'Tampin': [2.4701, 102.2302]
};

const SAMPLE_SEARCHES = [
  { label: 'PW2163 (Port Dickson)', term: 'PW2163' },
  { label: 'PA73315 (Warta)', term: 'PA73315' },
  { label: 'Lot 3481 (Ampangan)', term: 'Lot 3481' },
  { label: 'UPI 0503020005779', term: '0503020005779' },
  { label: 'Mukim Ampangan', term: 'Ampangan' },
  { label: 'Warta Jempol', term: 'Jempol' },
  { label: 'Lot Rembau', term: 'Rembau' },
  { label: 'Lot Tampin', term: 'Tampin' }
];

export default function SearchPanel({ onSelectLocation, onSelectSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeResultId, setActiveResultId] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  const executeSearch = async (termToSearch) => {
    const term = termToSearch !== undefined ? termToSearch : searchTerm;
    if (!term || !term.trim()) return;
    
    setIsSearching(true);
    setSearchResults(null);
    try {
      const results = await searchAllDatasets(term);
      setSearchResults(results);
      if (results.length > 0) {
        const first = results[0];
        setActiveResultId(first.id);
        if (onSelectSearchResult) {
          onSelectSearchResult(first);
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const handleSampleClick = (term) => {
    setSearchTerm(term);
    executeSearch(term);
  };

  const handleResultClick = (res) => {
    setActiveResultId(res.id);
    if (onSelectSearchResult) {
      onSelectSearchResult(res);
    }
  };

  const handleCoordinateSearch = (e) => {
    e.preventDefault();
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (!isNaN(lat) && !isNaN(lng)) {
      onSelectLocation(lat, lng, 15, `Koordinat Carian (${lat}, ${lng})`);
    }
  };

  const handleDistrictChange = (e) => {
    const d = e.target.value;
    setSelectedDistrict(d);
    if (DISTRICT_COORDS[d]) {
      const [lat, lng] = DISTRICT_COORDS[d];
      onSelectLocation(lat, lng, 12, `Daerah ${d}`);
    }
  };

  return (
    <div className="search-panel">
      {/* Search by Lot / Name / Warta */}
      <div className="card-section">
        <div className="card-title">
          <Search size={18} color="#f59e0b" /> Carian Lot / Mukim / Warta Spasial
        </div>
        <form onSubmit={handleSearchSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cari Lot, NOPW, PA, UPI, Mukim..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSearching}>
            {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            {isSearching ? ' Memproses Carian...' : ' Cari Lot Spasial'}
          </button>
        </form>

        {/* Quick Sample Buttons */}
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Sparkles size={12} color="#f59e0b" /> Sampel Carian Pantas (Klik Untuk Uji):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {SAMPLE_SEARCHES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(item.term)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e2e8f0',
                  padding: '0.2rem 0.45rem',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display List */}
        {isSearching && (
          <div style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa', fontSize: '0.8rem', marginTop: '0.75rem' }}>
            ⏳ Meninjau keseluruhan pangkalan data spasial Negeri Sembilan...
          </div>
        )}

        {searchResults !== null && !isSearching && (
          <div style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: searchResults.length > 0 ? '#10b981' : '#ef4444' }}>
                {searchResults.length > 0 ? `✅ Jumpa ${searchResults.length} padanan lot` : '❌ Tiada lot ditemui'}
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                Tiada lot ditemui untuk "{searchTerm}". Sila klik mana-mana sampel butang carian di atas (seperti <strong>PW2163</strong> atau <strong>Lot 3481</strong>) untuk menguji.
              </div>
            ) : (
              <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.2rem' }}>
                {searchResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleResultClick(res)}
                    style={{
                      background: activeResultId === res.id ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: activeResultId === res.id ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '0.5rem 0.6rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: activeResultId === res.id ? '#60a5fa' : '#f8fafc' }}>
                      {res.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                      {res.subtitle}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <CheckCircle2 size={11} /> Klik untuk sorot & fokus dalam peta
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Jump to District */}
      <div className="card-section">
        <div className="card-title">
          <MapPin size={18} color="#10b981" /> Navigasi Daerah N.S.
        </div>
        <div className="form-group">
          <label className="form-label">Pilih Daerah:</label>
          <select 
            className="form-select" 
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="">-- Semua Daerah Negeri Sembilan --</option>
            {NEGERI_SEMBILAN_BOUNDS.districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Coordinate Input */}
      <div className="card-section">
        <div className="card-title">
          <Navigation size={18} color="#3b82f6" /> Carian Koordinat (WGS84)
        </div>
        <form onSubmit={handleCoordinateSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div className="form-group">
              <label className="form-label">Latitude (Utara):</label>
              <input 
                type="number" 
                step="any"
                className="form-input" 
                placeholder="Cth: 2.7258" 
                value={latInput}
                onChange={(e) => setLatInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude (Timur):</label>
              <input 
                type="number" 
                step="any"
                className="form-input" 
                placeholder="Cth: 101.9424" 
                value={lngInput}
                onChange={(e) => setLngInput(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-secondary" style={{ marginTop: '0.25rem' }}>
            <Navigation size={14} /> Pergi Ke Koordinat
          </button>
        </form>
      </div>
    </div>
  );
}
