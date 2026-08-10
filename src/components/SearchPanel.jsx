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

  const getCrossReferenceBadge = (res) => {
    const lId = (res.layerId || '').toLowerCase();
    const lName = (res.layerName || '').toLowerCase();
    
    if (lId.includes('pembatalan') || lName.includes('pembatalan')) {
      return (
        <div style={{ fontSize: '0.66rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '4px', marginTop: '0.25rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
          🔴 Silang Rujukan: Pembatalan Warta Rizab Melayu
        </div>
      );
    }
    if (lId.includes('gantian') || lName.includes('penggantian')) {
      return (
        <div style={{ fontSize: '0.66rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '4px', marginTop: '0.25rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
          🔵 Silang Rujukan: Tanah Rizab Melayu Penggantian
        </div>
      );
    }
    if (lId.includes('malay') || lId.includes('trm') || lName.includes('rizab melayu')) {
      return (
        <div style={{ fontSize: '0.66rem', background: 'rgba(234, 179, 8, 0.2)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '4px', marginTop: '0.25rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
          🟡 Silang Rujukan: Warta Tanah Rizab Melayu
        </div>
      );
    }
    if (lId.includes('forest') || lName.includes('hutan')) {
      return (
        <div style={{ fontSize: '0.66rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '4px', marginTop: '0.25rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
          🟢 Silang Rujukan: Zon Hutan Simpan Kekal
        </div>
      );
    }
    if (lId.includes('aborigine') || lName.includes('orang asli')) {
      return (
        <div style={{ fontSize: '0.66rem', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '4px', marginTop: '0.25rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
          🟣 Silang Rujukan: Zon Rizab Orang Asli
        </div>
      );
    }
    return (
      <div style={{ fontSize: '0.66rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.15rem 0.35rem', borderRadius: '4px', marginTop: '0.25rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
        📍 Lot Spasial Kadaster / Warta
      </div>
    );
  };

  const trackClickAnalytics = () => {
    try {
      const storedClicks = parseInt(localStorage.getItem('mris_click_count') || '3892', 10);
      localStorage.setItem('mris_click_count', (storedClicks + 1).toString());
    } catch (e) {}
  };

  const handleResultClick = (res) => {
    trackClickAnalytics();
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
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Sparkles size={12} color="#3b82f6" /> Sampel Carian Spasial:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {SAMPLE_SEARCHES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(item.term)}
                className="btn-header-action btn-secondary"
                style={{ fontSize: '0.68rem', padding: '0.25rem 0.45rem' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display List */}
        {isSearching && (
          <div style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa', fontSize: '0.78rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <Loader2 size={14} className="animate-spin" /> Meninjau pangkalan data spasial...
          </div>
        )}

        {searchResults !== null && !isSearching && (
          <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: searchResults.length > 0 ? '#10b981' : '#f87171', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {searchResults.length > 0 ? (
                  <><CheckCircle2 size={14} /> Jumpa {searchResults.length} padanan lot</>
                ) : (
                  <><AlertCircle size={14} /> Tiada lot ditemui</>
                )}
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(239, 68, 68, 0.08)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                Tiada lot ditemui untuk "{searchTerm}". Sila klik sampel carian di atas untuk menguji.
              </div>
            ) : (
              <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.2rem' }}>
                {searchResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleResultClick(res)}
                    style={{
                      background: activeResultId === res.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                      border: activeResultId === res.id ? '1px solid #3b82f6' : '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '0.5rem 0.6rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.8rem', color: activeResultId === res.id ? '#60a5fa' : '#f8fafc' }}>
                      {res.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {res.subtitle}
                    </div>
                    {getCrossReferenceBadge(res)}
                    <div style={{ fontSize: '0.68rem', color: '#38bdf8', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <CheckCircle2 size={11} /> Sorot & fokus dalam peta
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
          <MapPin size={16} color="#10b981" /> Navigasi Daerah N.S.
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
          <Navigation size={16} color="#3b82f6" /> Carian Koordinat (WGS84)
        </div>
        <form onSubmit={handleCoordinateSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div className="form-group">
              <label className="form-label">Latitude (Utara):</label>
              <input 
                type="number" 
                step="any"
                className="form-input mono" 
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
                className="form-input mono" 
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

