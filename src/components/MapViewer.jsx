import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Popup, Circle, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, MapPin, Maximize, Minimize, Info } from 'lucide-react';
import { NEGERI_SEMBILAN_BOUNDS } from '../data/negeriSembilanData';
import { ALL_LAYERS_CONFIG, fetchDaerahLayerData } from '../utils/daerahLoader';
import { getGoogleMapsUrl, getGoogleStreetViewUrl } from '../utils/spatialUtils';

// Fix default Leaflet icon marker bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to handle map movement & container resize
function MapController({ center, zoom, isSidebarOpen, isFullscreen }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);

  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 320);
    return () => clearTimeout(timer);
  }, [isSidebarOpen, isFullscreen, map]);

  return null;
}

// Click listener on Map
function MapClickListener({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

export default function MapViewer({ 
  layers, 
  opacity, 
  selectedLocation, 
  onMapClick, 
  bufferData, 
  customImportedData,
  isSidebarOpen 
}) {
  const [basemap, setBasemap] = useState('esri_imagery');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [serembanGeoData, setSerembanGeoData] = useState({});
  const [loadingState, setLoadingState] = useState({});

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Fetch GeoJSON for enabled layers across all Daerah
  useEffect(() => {
    ALL_LAYERS_CONFIG.forEach(cfg => {
      if (layers[cfg.id] && !serembanGeoData[cfg.id] && !loadingState[cfg.id]) {
        setLoadingState(prev => ({ ...prev, [cfg.id]: true }));
        fetchDaerahLayerData(cfg.daerah || 'seremban', cfg.file).then(data => {
          if (data) {
            setSerembanGeoData(prev => ({ ...prev, [cfg.id]: data }));
          }
          setLoadingState(prev => ({ ...prev, [cfg.id]: false }));
        });
      }
    });
  }, [layers, serembanGeoData, loadingState]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Ralat Skrin Penuh:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  const BASEMAP_TILES = {
    esri_imagery: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com">Esri World Imagery</a> (Jitu Kadaster)',
      name: 'ESRI Satelit Jitu'
    },
    gmaps_hybrid: {
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy; <a href="https://maps.google.com">Google Maps</a> Hybrid',
      name: 'Google Hybrid'
    },
    gmaps_satellite: {
      url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      attribution: '&copy; <a href="https://maps.google.com">Google Maps</a> Satellite',
      name: 'Google Satelit'
    },
    gmaps_roadmap: {
      url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '&copy; <a href="https://maps.google.com">Google Maps</a> Roadmap',
      name: 'Google Road'
    },
    carto_dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CartoDB Dark',
      name: 'Carto Dark'
    }
  };

  // Parse GeoJSON coordinates -> Leaflet coordinates
  const parseCoordinates = (coords, geomType) => {
    if (!coords) return [];
    if (geomType === 'Polygon') {
      return coords[0].map(pt => [pt[1], pt[0]]);
    } else if (geomType === 'MultiPolygon') {
      return coords.map(poly => poly[0].map(pt => [pt[1], pt[0]]));
    } else if (geomType === 'LineString' || geomType === 'Polyline') {
      return coords.map(pt => [pt[1], pt[0]]);
    } else if (geomType === 'MultiLineString') {
      return coords.map(line => line.map(pt => [pt[1], pt[0]]));
    }
    return [];
  };

  const getCentroid = (coords, geomType) => {
    const pts = parseCoordinates(coords, geomType);
    let flatPts = [];
    if (Array.isArray(pts[0]) && typeof pts[0][0] === 'number') {
      flatPts = pts;
    } else if (Array.isArray(pts[0])) {
      flatPts = pts.flat();
    }
    if (flatPts.length === 0) return [2.7247, 101.9378]; // Seremban default
    let sumLat = 0, sumLng = 0;
    flatPts.forEach(p => { sumLat += p[0]; sumLng += p[1]; });
    return [sumLat / flatPts.length, sumLng / flatPts.length];
  };

  return (
    <div className="map-container">
      {/* Floating Basemap & Fullscreen Controls */}
      <div className="map-floating-bar">
        <div className="basemap-selector">
          <button 
            className={`basemap-btn ${basemap === 'esri_imagery' ? 'active' : ''}`}
            onClick={() => setBasemap('esri_imagery')}
            style={{ background: basemap === 'esri_imagery' ? '#10b981' : undefined }}
          >
            🌍 ESRI Satelit (Jitu Kadaster)
          </button>
          <button 
            className={`basemap-btn ${basemap === 'gmaps_hybrid' ? 'active' : ''}`}
            onClick={() => setBasemap('gmaps_hybrid')}
          >
            🗺️ Google Hybrid
          </button>
          <button 
            className={`basemap-btn ${basemap === 'gmaps_satellite' ? 'active' : ''}`}
            onClick={() => setBasemap('gmaps_satellite')}
          >
            🛰️ Google Satelit
          </button>
          <button 
            className={`basemap-btn ${basemap === 'gmaps_roadmap' ? 'active' : ''}`}
            onClick={() => setBasemap('gmaps_roadmap')}
          >
            🚗 Google Road
          </button>
          <button 
            className={`basemap-btn ${basemap === 'carto_dark' ? 'active' : ''}`}
            onClick={() => setBasemap('carto_dark')}
          >
            🌙 Dark GIS
          </button>

          <button 
            className="fullscreen-toggle-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Keluar Skrin Penuh (ESC)" : "Skrin Penuh (Full Screen)"}
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
            <span>{isFullscreen ? "Keluar Fullscreen" : "Full Screen"}</span>
          </button>
        </div>
      </div>

      <MapContainer 
        center={NEGERI_SEMBILAN_BOUNDS.center} 
        zoom={NEGERI_SEMBILAN_BOUNDS.zoom} 
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer 
          url={BASEMAP_TILES[basemap].url} 
          attribution={BASEMAP_TILES[basemap].attribution}
          maxZoom={20}
        />

        {/* Add ESRI Transportation labels on top when using ESRI Imagery */}
        {basemap === 'esri_imagery' && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri Transportation"
            maxZoom={20}
          />
        )}

        <MapController 
          center={selectedLocation ? selectedLocation.center : NEGERI_SEMBILAN_BOUNDS.center} 
          zoom={selectedLocation ? selectedLocation.zoom : NEGERI_SEMBILAN_BOUNDS.zoom} 
          isSidebarOpen={isSidebarOpen}
          isFullscreen={isFullscreen}
        />

        <MapClickListener onMapClick={onMapClick} />

        {/* Selected / Searched Location Highlight Polygon */}
        {selectedLocation && selectedLocation.feature && selectedLocation.feature.geometry && (
          <Polygon
            positions={parseCoordinates(selectedLocation.feature.geometry.coordinates, selectedLocation.feature.geometry.type)}
            pathOptions={{
              color: '#f59e0b',
              fillColor: '#fbbf24',
              fillOpacity: 0.6,
              weight: 4,
              dashArray: '6, 6'
            }}
          />
        )}

        {/* Selected / Searched Location Marker */}
        {selectedLocation && selectedLocation.center && (
          <Marker position={selectedLocation.center}>
            <Popup>
              <div className="popup-card">
                <div className="popup-header" style={{ color: '#f59e0b', fontWeight: 800 }}>
                  <MapPin size={16} /> {selectedLocation.label || 'Lokasi Dipilih'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                  {selectedLocation.layerName && <div><strong>Lapisan:</strong> {selectedLocation.layerName}</div>}
                  {selectedLocation.properties && selectedLocation.properties.UPI && <div><strong>UPI:</strong> {selectedLocation.properties.UPI}</div>}
                  {selectedLocation.properties && selectedLocation.properties.NOPW && <div><strong>NOPW:</strong> {selectedLocation.properties.NOPW}</div>}
                  {selectedLocation.properties && selectedLocation.properties.PA && <div><strong>PA:</strong> {selectedLocation.properties.PA}</div>}
                  {selectedLocation.properties && selectedLocation.properties.KELUASAN && <div><strong>Keluasan:</strong> {selectedLocation.properties.KELUASAN} m²</div>}
                  <div style={{ color: '#94a3b8', marginTop: '0.2rem' }}>
                    Lat: {selectedLocation.center[0].toFixed(5)}, Lng: {selectedLocation.center[1].toFixed(5)}
                  </div>
                </div>
                <div className="popup-actions" style={{ marginTop: '0.4rem' }}>
                  <a 
                    href={getGoogleMapsUrl(selectedLocation.center[0], selectedLocation.center[1])} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="gmaps-btn"
                  >
                    <ExternalLink size={12} /> Buka di Google Maps
                  </a>
                  <a 
                    href={getGoogleStreetViewUrl(selectedLocation.center[0], selectedLocation.center[1])} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="streetview-btn"
                  >
                    📸 Street View
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Buffer Circle Overlay */}
        {bufferData && (
          <Circle 
            center={[bufferData.lat, bufferData.lng]}
            radius={bufferData.radius}
            pathOptions={{ color: '#a855f7', fillColor: '#a855f7', fillOpacity: 0.2, dashArray: '6, 6' }}
          >
            <Popup>
              <div className="popup-card">
                <div className="popup-header" style={{ color: '#a855f7' }}>
                  Zon Penimbal ({bufferData.radius} Meter)
                </div>
                <div style={{ fontSize: '0.78rem' }}>
                  Zon kawalan buffer radius {bufferData.radius}m sekitar koordinat ({bufferData.lat}, {bufferData.lng}).
                </div>
              </div>
            </Popup>
          </Circle>
        )}

        {/* RENDER DYNAMIC SHP LAYERS (SEREMBAN & JEMPOL) */}
        {ALL_LAYERS_CONFIG.map(cfg => {
          if (!layers[cfg.id]) return null;
          const geojson = serembanGeoData[cfg.id];
          if (!geojson || !geojson.features) return null;

          return geojson.features.map((f, idx) => {
            if (!f.geometry) return null;
            const geomType = f.geometry.type;
            const positions = parseCoordinates(f.geometry.coordinates, geomType);
            const centroid = getCentroid(f.geometry.coordinates, geomType);
            const p = f.properties || {};

            // Common properties display format
            const popupTitle = p.LOT_NO || p.KETERANGAN || p.TUJUAN_WAR || p.NAMA_WARTA || p.Nama_SRM || p.LOT_NAMA || p.UPI || `${cfg.name} #${idx + 1}`;

            if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
              return (
                <Polygon
                  key={`${cfg.id}-${idx}`}
                  positions={positions}
                  pathOptions={{
                    color: cfg.color,
                    fillColor: cfg.fillColor || cfg.color,
                    fillOpacity: opacity,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="popup-card">
                      <div className="popup-header" style={{ color: cfg.color }}>
                        <Info size={16} /> {popupTitle}
                      </div>
                      <div className="popup-grid">
                        <div>
                          <div className="popup-label">Lapisan Spasial</div>
                          <div className="popup-val" style={{ color: cfg.color }}>{cfg.name}</div>
                        </div>
                        {p.MUKIM && (
                          <div>
                            <div className="popup-label">Mukim / Daerah</div>
                            <div className="popup-val">{p.MUKIM}, {p.DAERAH || 'Seremban'}</div>
                          </div>
                        )}
                        {p.UPI && (
                          <div>
                            <div className="popup-label">UPI (Unique Parcel ID)</div>
                            <div className="popup-val" style={{ fontFamily: 'monospace', color: '#60a5fa' }}>{p.UPI}</div>
                          </div>
                        )}
                        {p.STATUS && (
                          <div>
                            <div className="popup-label">Status Lot</div>
                            <div className="popup-val">{p.STATUS}</div>
                          </div>
                        )}
                        {p.KEGUNAAN && (
                          <div>
                            <div className="popup-label">Kegunaan Tanah</div>
                            <div className="popup-val">{p.KEGUNAAN}</div>
                          </div>
                        )}
                        {p.NOWARTA && (
                          <div>
                            <div className="popup-label">No. Warta</div>
                            <div className="popup-val">{p.NOWARTA}</div>
                          </div>
                        )}
                        {p.TUJUAN_WAR && (
                          <div>
                            <div className="popup-label">Tujuan Warta</div>
                            <div className="popup-val">{p.TUJUAN_WAR}</div>
                          </div>
                        )}
                        {p.KELUASAN !== undefined && (
                          <div>
                            <div className="popup-label">Keluasan</div>
                            <div className="popup-val" style={{ color: '#f59e0b', fontWeight: 'bold' }}>
                              {typeof p.KELUASAN === 'number' ? p.KELUASAN.toLocaleString() : p.KELUASAN} m²
                            </div>
                          </div>
                        )}
                        {p.TARIKH_UKUR && (
                          <div>
                            <div className="popup-label">Tarikh Ukur</div>
                            <div className="popup-val">{p.TARIKH_UKUR}</div>
                          </div>
                        )}
                        {p.NOFAILUKUR && (
                          <div>
                            <div className="popup-label">No. Fail Ukur</div>
                            <div className="popup-val">{p.NOFAILUKUR}</div>
                          </div>
                        )}
                      </div>
                      <div className="popup-actions">
                        <a 
                          href={getGoogleMapsUrl(centroid[0], centroid[1])} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="gmaps-btn"
                        >
                          <ExternalLink size={12} /> Google Maps
                        </a>
                        <a 
                          href={getGoogleStreetViewUrl(centroid[0], centroid[1])} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="streetview-btn"
                        >
                          📸 Street View
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              );
            } else if (geomType === 'LineString' || geomType === 'MultiLineString') {
              return (
                <Polyline
                  key={`${cfg.id}-${idx}`}
                  positions={positions}
                  pathOptions={{ color: cfg.color, weight: 2.5, opacity: 0.85 }}
                >
                  <Popup>
                    <div className="popup-card">
                      <div className="popup-header" style={{ color: cfg.color }}>
                        <Info size={16} /> Garisan Sempadan NDCDB
                      </div>
                      <div className="popup-grid">
                        <div>
                          <div className="popup-label">Lapisan Spasial</div>
                          <div className="popup-val" style={{ color: cfg.color }}>{cfg.name}</div>
                        </div>
                        {p.UPI && (
                          <div>
                            <div className="popup-label">UPI Lot</div>
                            <div className="popup-val" style={{ fontFamily: 'monospace', color: '#60a5fa' }}>{p.UPI}</div>
                          </div>
                        )}
                        {p.ADJPARCEL && (
                          <div>
                            <div className="popup-label">Parcel Bersebelahan</div>
                            <div className="popup-val" style={{ fontFamily: 'monospace' }}>{p.ADJPARCEL}</div>
                          </div>
                        )}
                        {p.BEARING !== undefined && (
                          <div>
                            <div className="popup-label">Bearing Sempadan</div>
                            <div className="popup-val" style={{ color: '#10b981', fontWeight: 'bold' }}>{p.BEARING}°</div>
                          </div>
                        )}
                        {p.JARAK !== undefined && (
                          <div>
                            <div className="popup-label">Jarak Sempadan</div>
                            <div className="popup-val" style={{ color: '#f59e0b', fontWeight: 'bold' }}>{p.JARAK} Meter</div>
                          </div>
                        )}
                        {p.BLOCK && (
                          <div>
                            <div className="popup-label">Blok Ukur</div>
                            <div className="popup-val">{p.BLOCK}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Polyline>
              );
            }
            return null;
          });
        })}

        {/* CUSTOM IMPORTED QGIS DATA POLYGONS */}
        {customImportedData && customImportedData.features && customImportedData.features.map((f, idx) => {
          if (f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon')) {
            const positions = parseCoordinates(f.geometry.coordinates, f.geometry.type);
            return (
              <Polygon
                key={`custom-${idx}`}
                positions={positions}
                pathOptions={{
                  color: '#3b82f6',
                  fillColor: '#1d4ed8',
                  fillOpacity: opacity,
                  weight: 2,
                  dashArray: '4, 4'
                }}
              >
                <Popup>
                  <div className="popup-card">
                    <div className="popup-header" style={{ color: '#3b82f6' }}>
                      Fail QGIS Diimport: {f.properties.nama || `Feature #${idx + 1}`}
                    </div>
                    <div className="popup-grid">
                      {Object.keys(f.properties || {}).slice(0, 6).map(key => (
                        <div key={key}>
                          <div className="popup-label">{key}</div>
                          <div className="popup-val">{String(f.properties[key])}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Polygon>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}
