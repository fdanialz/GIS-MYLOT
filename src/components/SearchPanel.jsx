import React, { useState } from 'react';
import { Search, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { NEGERI_SEMBILAN_BOUNDS } from '../data/negeriSembilanData';

const DISTRICT_COORDS = {
  'Seremban': [2.7258, 101.9424],
  'Port Dickson': [2.5228, 101.7961],
  'Jempol': [2.8048, 102.3615],
  'Jelebu': [2.9667, 102.0667],
  'Kuala Pilah': [2.7389, 102.2486],
  'Rembau': [2.5898, 102.0945],
  'Tampin': [2.4701, 102.2302]
};

export default function SearchPanel({ onSelectLocation, onSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearchResult(searchTerm);
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
      {/* Search by Lot / Name */}
      <div className="card-section">
        <div className="card-title">
          <Search size={18} color="#f59e0b" /> Carian Lot / Mukim / Warta
        </div>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cari cth: Lot 3481, Ampangan, Berembun..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            <Search size={14} /> Cari Lot Spasial
          </button>
        </form>
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
