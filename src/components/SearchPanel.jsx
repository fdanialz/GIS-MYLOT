import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Filter,
  Compass,
  Building2,
  Trees,
  Waves,
  Mountain,
  Sprout
} from 'lucide-react';
import { NEGERI_SEMBILAN_BOUNDS } from '../data/negeriSembilanData';
import { searchAllDatasets, DAERAH_CENTROIDS } from '../utils/daerahLoader';

// Complete Mukim & Town lists per district in Negeri Sembilan
const MUKIM_BY_DAERAH = {
  'seremban': [
    'Ampangan',
    'Bandar Seremban',
    'Labu',
    'Lenggeng',
    'Pantai',
    'Rasah',
    'Rantau',
    'Setul'
  ],
  'jempol': [
    'Jempol',
    'Batu Kikir',
    'Kuala Klawang',
    'Pekan Johol',
    'Rompin',
    'Serting Hilir',
    'Serting Ulu'
  ],
  'pd': [
    'Bandar Port Dickson',
    'Jimah',
    'Linggi',
    'Pasir Panjang',
    'Port Dickson',
    'Si Rusa'
  ],
  'rembau': [
    'Batu Hampar',
    'Bongek',
    'Chembong',
    'Chengkau',
    'Gadong',
    'Kundur',
    'Legong Hilir',
    'Pedas',
    'Pilau',
    'Rembau',
    'Selemak',
    'Semerbok',
    'Tanjung Keling'
  ],
  'tampin': [
    'Air Kuning',
    'Gemas',
    'Keru',
    'Repah',
    'Tampin Tengah',
    'Tebong'
  ],
  'kuala_pilah': [
    'Ampang Tinggi',
    'Johol',
    'Juasseh',
    'Kuala Pilah',
    'Parit Tinggi',
    'Pilau',
    'Sri Menanti',
    'Terachi',
    'Ulu Muar'
  ],
  'jelebu': [
    'Glami Lemi',
    'Hulu Klawang',
    'Hulu Triang',
    'Kuala Klawang',
    'Peradong',
    'Pertang',
    'Triang Ilir'
  ]
};

const DISTRICT_OPTIONS = [
  { value: 'all', label: 'Semua Daerah' },
  { value: 'seremban', label: 'Seremban' },
  { value: 'jempol', label: 'Jempol' },
  { value: 'pd', label: 'Port Dickson' },
  { value: 'kualapilah', label: 'Kuala Pilah' },
  { value: 'jelebu', label: 'Jelebu' },
  { value: 'rembau', label: 'Rembau' },
  { value: 'tampin', label: 'Tampin' }
];

const SAMPLE_SEARCHES = [
  { label: 'PW2163 (Port Dickson)', term: 'PW2163' },
  { label: 'PW1989 (Orang Asli)', term: 'PW1989' },
  { label: 'PW1174 (Kuala Pilah)', term: 'PW1174' },
  { label: 'PW839 (Jelebu)', term: 'PW839' },
  { label: 'Lot 3481 (Ampangan)', term: 'Lot 3481' },
  { label: 'Mukim Juasseh', term: 'Juasseh' },
  { label: 'Mukim Kuala Klawang', term: 'Kuala Klawang' },
  { label: 'Warta Jempol', term: 'Jempol' },
  { label: 'Lot Rembau', term: 'Rembau' },
  { label: 'Lot Tampin', term: 'Tampin' }
];

const SECTIONS_LIST = [
  { value: 'Semua Seksyen', label: 'Semua Seksyen' },
  { value: 'Seksyen 1', label: 'Seksyen 1' },
  { value: 'Seksyen 2', label: 'Seksyen 2' },
  { value: 'Seksyen 3', label: 'Seksyen 3' },
  { value: 'Seksyen 4', label: 'Seksyen 4' },
  { value: 'Seksyen 5', label: 'Seksyen 5' }
];

/**
 * Modern Custom Dropdown Component with smooth popover, search, and check indicator
 */
function CustomSelect({ 
  value, 
  options, 
  onChange, 
  placeholder = "Pilih...", 
  searchable = false,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedOption = useMemo(() => {
    return options.find(opt => {
      const val = typeof opt === 'string' ? opt : opt.value;
      return val === value;
    });
  }, [options, value]);

  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : placeholder;

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(opt => {
      const text = typeof opt === 'string' ? opt : opt.label;
      return text.toLowerCase().includes(q);
    });
  }, [options, searchQuery]);

  return (
    <div className={`mris-custom-select-wrapper ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className={`mris-select-trigger-pill ${isOpen ? 'active-open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="mris-trigger-label">{displayLabel}</span>
        <ChevronDown 
          size={15} 
          className={`mris-trigger-arrow ${isOpen ? 'arrow-rotated' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="mris-dropdown-popover">
          {searchable && options.length > 5 && (
            <div className="mris-dropdown-search-box">
              <Search size={13} className="mris-search-icon-inside" />
              <input
                type="text"
                placeholder="Cari dalam senarai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mris-dropdown-search-input"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="mris-dropdown-scroll-list">
            {filteredOptions.length === 0 ? (
              <div className="mris-dropdown-no-result">Tiada pilihan dijumpai</div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const optVal = typeof opt === 'string' ? opt : opt.value;
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const isSelected = optVal === value;

                return (
                  <div
                    key={idx}
                    className={`mris-dropdown-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onChange(optVal);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <span className="mris-item-text">{optLabel}</span>
                    {isSelected && (
                      <Check size={14} strokeWidth={2.5} className="mris-item-check-icon" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPanel({ onSelectLocation, onSelectSearchResult }) {
  // Hierarchical Filter States (Matching Wireframe 1)
  const [selectedState, setSelectedState] = useState('Negeri Sembilan');
  const [selectedDistrict, setSelectedDistrict] = useState('kuala_pilah');
  const [selectedMukim, setSelectedMukim] = useState('');
  const [selectedSeksyen, setSelectedSeksyen] = useState('Semua Seksyen');
  
  // Rizab Melayu sub-options (Multiselect Checkboxes)
  const [isRizabMelayuOpen, setIsRizabMelayuOpen] = useState(true);
  const [trmOptions, setTrmOptions] = useState({
    trm: true,           // Tanah Rizab Melayu (TRM)
    pembatalan: false,   // Pembatalan TRM
    penggantian: false   // Penggantian TRM
  });

  // Other reserve toggles
  const [isHutanChecked, setIsHutanChecked] = useState(false);
  const [isOrangAsliChecked, setIsOrangAsliChecked] = useState(false);

  // Lot Number Search
  const [lotNumber, setLotNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [activeResultId, setActiveResultId] = useState(null);

  // Coordinate Search States
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  // Handle TRM checkbox toggle
  const toggleTrmOption = (key) => {
    setTrmOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Available Mukim options for selected district
  const mukimOptions = useMemo(() => {
    const defaultOpt = [{ value: '', label: 'Mukim/Bandar/Pekan (Semua)' }];
    if (!selectedDistrict || selectedDistrict === 'all') return defaultOpt;
    const list = MUKIM_BY_DAERAH[selectedDistrict] || [];
    return [
      ...defaultOpt,
      ...list.map(m => ({ value: m, label: m }))
    ];
  }, [selectedDistrict]);

  // Execute Spatial Lot Search
  const handleExecuteLotSearch = async (e) => {
    if (e) e.preventDefault();

    setIsSearching(true);
    setSearchResults(null);

    try {
      // Build query string
      let queryParts = [];
      if (lotNumber.trim()) queryParts.push(lotNumber.trim());
      if (selectedMukim) queryParts.push(selectedMukim);
      if (selectedSeksyen && selectedSeksyen !== 'Semua Seksyen') queryParts.push(selectedSeksyen);

      const queryTerm = queryParts.length > 0 ? queryParts.join(' ') : (selectedDistrict || 'Seremban');
      
      let results = await searchAllDatasets(queryTerm);

      // 1. Filter by District if selected
      if (selectedDistrict && selectedDistrict !== 'all') {
        results = results.filter(r => {
          const d = (r.daerah || '').toLowerCase();
          if (selectedDistrict === 'pd') return d.includes('pd') || d.includes('port dickson');
          if (selectedDistrict === 'kuala_pilah') return d.includes('pilah');
          if (selectedDistrict === 'jelebu') return d.includes('jelebu');
          return d.includes(selectedDistrict);
        });
      }

      // 2. Filter by Mukim if selected
      if (selectedMukim) {
        const mukimLower = selectedMukim.toLowerCase();
        const mukimFiltered = results.filter(r => {
          const p = r.properties || {};
          const sub = (r.subtitle || '').toLowerCase();
          const tit = (r.title || '').toLowerCase();
          const m = (p.mukim || p.MUKIM || p.NM_MUKIM || '').toLowerCase();
          return m.includes(mukimLower) || sub.includes(mukimLower) || tit.includes(mukimLower);
        });
        if (mukimFiltered.length > 0) {
          results = mukimFiltered;
        }
      }

      // 3. Filter by Reserve Categories (TRM, Pembatalan, Penggantian, Hutan, Orang Asli)
      const hasAnyFilter = trmOptions.trm || trmOptions.pembatalan || trmOptions.penggantian || isHutanChecked || isOrangAsliChecked;
      
      if (hasAnyFilter) {
        results = results.filter(r => {
          const lId = (r.layerId || '').toLowerCase();
          const lName = (r.layerName || '').toLowerCase();
          
          let matches = false;
          if (trmOptions.trm && (lId.includes('malay') || lName.includes('rizab melayu') || lId.includes('warta'))) {
            matches = true;
          }
          if (trmOptions.pembatalan && (lId.includes('pembatalan') || lName.includes('pembatalan'))) {
            matches = true;
          }
          if (trmOptions.penggantian && (lId.includes('gantian') || lName.includes('penggantian'))) {
            matches = true;
          }
          if (isHutanChecked && (lId.includes('forest') || lName.includes('hutan'))) {
            matches = true;
          }
          if (isOrangAsliChecked && (lId.includes('aborigine') || lName.includes('orang asli'))) {
            matches = true;
          }
          return matches;
        });
      }

      setSearchResults(results);

      // Auto highlight first result on map
      if (results.length > 0) {
        const first = results[0];
        setActiveResultId(first.id);
        if (onSelectSearchResult) {
          onSelectSearchResult(first);
        }
      }
    } catch (err) {
      console.error('Lot search error:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Coordinate Search
  const handleCoordinateSearch = (e) => {
    e.preventDefault();
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (!isNaN(lat) && !isNaN(lng)) {
      if (onSelectLocation) {
        onSelectLocation(lat, lng, 16, `Koordinat (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
      }
    }
  };

  const handleResultClick = (res) => {
    setActiveResultId(res.id);
    if (onSelectSearchResult) {
      onSelectSearchResult(res);
    }
  };

  return (
    <div className="search-panel mris-search-layout">
      {/* 1. Sampel Carian Spasial / Hierarchical Dropdowns */}
      <div className="card-section mris-filter-card">
        <div className="card-title-sub">
          <Sparkles size={14} color="#3b82f6" />
          <span>Sampel Carian Spasial:</span>
        </div>

        <div className="mris-dropdown-stack">
          {/* Negeri Dropdown */}
          <CustomSelect
            value={selectedState}
            options={[{ value: 'Negeri Sembilan', label: 'Negeri Sembilan' }]}
            onChange={setSelectedState}
            placeholder="Pilih Negeri"
          />

          {/* Daerah Dropdown */}
          <CustomSelect
            value={selectedDistrict}
            options={DISTRICT_OPTIONS}
            onChange={(val) => {
              setSelectedDistrict(val);
              setSelectedMukim('');
            }}
            placeholder="Pilih Daerah"
          />

          {/* Mukim/Bandar/Pekan Dropdown (Searchable) */}
          <CustomSelect
            value={selectedMukim}
            options={mukimOptions}
            onChange={setSelectedMukim}
            placeholder="Mukim/Bandar/Pekan"
            searchable={true}
          />

          {/* Seksyen Dropdown */}
          <CustomSelect
            value={selectedSeksyen}
            options={SECTIONS_LIST}
            onChange={setSelectedSeksyen}
            placeholder="Pilih Seksyen"
          />

          {/* Rizab Melayu Expandable Multi-Select Option */}
          <div className="mris-expandable-section">
            <button 
              type="button"
              className={`mris-select-trigger-pill ${isRizabMelayuOpen ? 'active-open' : ''}`}
              onClick={() => setIsRizabMelayuOpen(!isRizabMelayuOpen)}
            >
              <span className="mris-trigger-label">Rizab Melayu</span>
              <ChevronDown 
                size={15} 
                className={`mris-trigger-arrow ${isRizabMelayuOpen ? 'arrow-rotated' : ''}`} 
              />
            </button>

            {/* Sub Checkboxes (Multi-select) */}
            {isRizabMelayuOpen && (
              <div className="mris-checkbox-group-card">
                <label className="mris-checkbox-row">
                  <input 
                    type="checkbox"
                    checked={trmOptions.trm}
                    onChange={() => toggleTrmOption('trm')}
                    className="mris-real-checkbox"
                  />
                  <div className={`mris-custom-checkbox ${trmOptions.trm ? 'checked' : ''}`}>
                    {trmOptions.trm && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="mris-checkbox-text">Tanah Rizab Melayu (TRM)</span>
                </label>

                <label className="mris-checkbox-row">
                  <input 
                    type="checkbox"
                    checked={trmOptions.pembatalan}
                    onChange={() => toggleTrmOption('pembatalan')}
                    className="mris-real-checkbox"
                  />
                  <div className={`mris-custom-checkbox ${trmOptions.pembatalan ? 'checked' : ''}`}>
                    {trmOptions.pembatalan && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="mris-checkbox-text">Pembatalan TRM</span>
                </label>

                <label className="mris-checkbox-row">
                  <input 
                    type="checkbox"
                    checked={trmOptions.penggantian}
                    onChange={() => toggleTrmOption('penggantian')}
                    className="mris-real-checkbox"
                  />
                  <div className={`mris-custom-checkbox ${trmOptions.penggantian ? 'checked' : ''}`}>
                    {trmOptions.penggantian && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="mris-checkbox-text">Penggantian TRM</span>
                </label>

                <div className="mris-multiselect-hint">
                  **boleh tanda lebih daripada satu pilihan
                </div>
              </div>
            )}
          </div>

          {/* Rizab Hutan Toggle */}
          <div 
            className={`mris-select-trigger-pill toggle-row ${isHutanChecked ? 'active-toggled' : ''}`}
            onClick={() => setIsHutanChecked(!isHutanChecked)}
          >
            <span className="mris-trigger-label">Rizab Hutan</span>
            <div className={`mris-custom-checkbox ${isHutanChecked ? 'checked' : ''}`}>
              {isHutanChecked && <Check size={12} strokeWidth={3} />}
            </div>
          </div>

          {/* Rizab Orang Asli Toggle */}
          <div 
            className={`mris-select-trigger-pill toggle-row ${isOrangAsliChecked ? 'active-toggled' : ''}`}
            onClick={() => setIsOrangAsliChecked(!isOrangAsliChecked)}
          >
            <span className="mris-trigger-label">Rizab Orang Asli</span>
            <div className={`mris-custom-checkbox ${isOrangAsliChecked ? 'checked' : ''}`}>
              {isOrangAsliChecked && <Check size={12} strokeWidth={3} />}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Carian Lot Input Box & Button */}
      <div className="card-section mris-lot-search-card">
        <div className="card-title-sub">
          <Search size={14} color="#f59e0b" />
          <span>Carian Lot</span>
        </div>

        <form onSubmit={handleExecuteLotSearch} className="mris-lot-search-form">
          <div className="mris-lot-input-wrapper">
            <input 
              type="text"
              className="mris-lot-text-input"
              placeholder="Masukkan Nombor Lot anda di sini"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="mris-cari-btn-purple"
            disabled={isSearching}
          >
            {isSearching ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Search size={15} />
            )}
            <span>Cari Lot Spasial</span>
          </button>
        </form>

        {/* Search Results Display */}
        {searchResults !== null && !isSearching && (
          <div className="mris-search-results-box">
            <div className="mris-results-header">
              {searchResults.length > 0 ? (
                <span className="text-emerald-500 font-semibold text-xs flex items-center gap-1">
                  <CheckCircle2 size={13} /> {searchResults.length} Lot Ditemui
                </span>
              ) : (
                <span className="text-rose-500 font-semibold text-xs flex items-center gap-1">
                  <AlertCircle size={13} /> Tiada lot ditemui bagi tapisan ini
                </span>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="mris-results-list">
                {searchResults.slice(0, 10).map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleResultClick(res)}
                    className={`mris-result-item ${activeResultId === res.id ? 'active' : ''}`}
                  >
                    <div className="mris-result-title">{res.title}</div>
                    <div className="mris-result-sub">{res.subtitle}</div>
                    <div className="mris-result-action">
                      <Compass size={11} /> Klik untuk fokus peta
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Carian Koordinat (WGS84) */}
      <div className="card-section mris-coord-card">
        <div className="card-title-sub">
          <Navigation size={14} color="#6366f1" />
          <span>Carian Koordinat (WGS84)</span>
        </div>

        <form onSubmit={handleCoordinateSearch} className="mris-coord-form">
          <div className="mris-coord-inputs-grid">
            <div className="mris-coord-field">
              <label className="mris-field-label">Latitude (Utara):</label>
              <input 
                type="number"
                step="any"
                className="mris-coord-input"
                placeholder="Cth: 2.7258"
                value={latInput}
                onChange={(e) => setLatInput(e.target.value)}
              />
            </div>

            <div className="mris-coord-field">
              <label className="mris-field-label">Longitude (Timur):</label>
              <input 
                type="number"
                step="any"
                className="mris-coord-input"
                placeholder="Cth: 101.9424"
                value={lngInput}
                onChange={(e) => setLngInput(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="mris-coord-btn">
            <Navigation size={14} />
            <span>Pergi Ke Koordinat</span>
          </button>
        </form>
      </div>
    </div>
  );
}
