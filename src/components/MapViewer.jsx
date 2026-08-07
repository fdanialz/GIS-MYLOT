import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Popup, Circle, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, MapPin, Maximize, Minimize, Info, Globe, Layers, Moon, Compass, Camera } from 'lucide-react';
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
    }, 300);
    return () => clearTimeout(timer);
  }, [isSidebarOpen, isFullscreen, map]);

  return null;
}

// Listener for map click, mousemove, zoom, and bounds events
function MapEventsHandler({ onMapClick, onCursorMove, onZoomChange, onBoundsChange }) {
  const map = useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
    mousemove(e) {
      if (onCursorMove) {
        onCursorMove(e.latlng.lat, e.latlng.lng);
      }
    },
    zoomend(e) {
      if (onZoomChange) onZoomChange(e.target.getZoom());
      if (onBoundsChange) onBoundsChange(e.target.getBounds());
    },
    moveend(e) {
      if (onBoundsChange) onBoundsChange(e.target.getBounds());
    }
  });

  // Initial bounds report
  useEffect(() => {
    if (onBoundsChange) {
      onBoundsChange(map.getBounds());
    }
  }, [map, onBoundsChange]);

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
  const [cursorCoords, setCursorCoords] = useState({ lat: 2.7247, lng: 101.9378 });
  const [currentZoom, setCurrentZoom] = useState(NEGERI_SEMBILAN_BOUNDS.zoom);
  const [currentBounds, setCurrentBounds] = useState(null);

  // Track pending/loaded layer fetches without triggering re-render loops
  const loadedLayersRef = useRef({});

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Fetch GeoJSON for enabled layers across all Daerah (Safe from infinite re-render loops)
  useEffect(() => {
    ALL_LAYERS_CONFIG.forEach(cfg => {
      if (layers[cfg.id] && !serembanGeoData[cfg.id] && !loadedLayersRef.current[cfg.id]) {
        loadedLayersRef.current[cfg.id] = true;
        fetchDaerahLayerData(cfg.daerah || 'seremban', cfg.file).then(data => {
          if (data) {
            setSerembanGeoData(prev => ({ ...prev, [cfg.id]: data }));
          } else {
            // Allow retry if network or path failed
            delete loadedLayersRef.current[cfg.id];
          }
        });
      }
    });
  }, [layers]);



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
      attribution: '&copy; <a href="https://www.esri.com">Esri World Imagery</a>',
      name: 'ESRI Satelit'
    },
    gmaps_hybrid: {
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps Hybrid',
      name: 'Google Hybrid'
    },
    gmaps_satellite: {
      url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps Satellite',
      name: 'Google Satelit'
    },
    gmaps_roadmap: {
      url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps Roadmap',
      name: 'Google Peta'
    },
    carto_dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CartoDB Dark GIS',
      name: 'Carto Dark'
    }
  };

  // On-the-fly Cassini-Soldner to WGS84 Lat/Lng converter for legacy datasets
  const toLatLonPoint = (pt) => {
    if (!pt || pt.length < 2) return [0, 0];
    const x = pt[0], y = pt[1];
    if (Math.abs(x) > 180 || Math.abs(y) > 180) {
      const lat0 = 2.7121205083 * Math.PI / 180;
      const lon0 = 101.9397026917 * Math.PI / 180;
      const a = 6378137.0, f = 1 / 298.2572221008916;
      const e2 = 2 * f - f * f;
      const M0 = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * lat0
        - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * lat0)
        + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * lat0)
        - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * lat0));
      const M1 = M0 + y;
      const mu1 = M1 / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));
      const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
      const phi1 = mu1
        + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu1)
        + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu1)
        + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu1);
      const N1 = a / Math.sqrt(1 - e2 * Math.sin(phi1) * Math.sin(phi1));
      const T1 = Math.tan(phi1) * Math.tan(phi1);
      const R1 = a * (1 - e2) / Math.pow(1 - e2 * Math.sin(phi1) * Math.sin(phi1), 1.5);
      const D = x / N1;
      const lat = phi1 - (N1 * Math.tan(phi1) / R1) * (
        D * D / 2 - (5 + 3 * T1 + 10 * (e2 / (1 - e2)) - 4 * (e2 / (1 - e2)) * (e2 / (1 - e2)) - 9 * (e2 / (1 - e2))) * Math.pow(D, 4) / 24
        + (61 + 90 * T1 + 298 * (e2 / (1 - e2)) + 45 * T1 * T1 - 252 * (e2 / (1 - e2))) * Math.pow(D, 6) / 720
      );
      const lon = lon0 + (
        D - (1 + 2 * T1 + (e2 / (1 - e2))) * Math.pow(D, 3) / 6
        + (5 - 2 * (e2 / (1 - e2)) + 28 * T1 - 3 * (e2 / (1 - e2)) * (e2 / (1 - e2)) + 8 * (e2 / (1 - e2)) + 24 * T1 * T1) * Math.pow(D, 5) / 120
      ) / Math.cos(phi1);
      return [lat * 180 / Math.PI, lon * 180 / Math.PI];
    }
    return [y, x];
  };

  // Parse GeoJSON coordinates -> Leaflet coordinates
  const parseCoordinates = (coords, geomType) => {
    if (!coords) return [];
    if (geomType === 'Polygon') {
      return coords[0].map(pt => toLatLonPoint(pt));
    } else if (geomType === 'MultiPolygon') {
      return coords.map(poly => poly[0].map(pt => toLatLonPoint(pt)));
    } else if (geomType === 'LineString' || geomType === 'Polyline') {
      return coords.map(pt => toLatLonPoint(pt));
    } else if (geomType === 'MultiLineString') {
      return coords.map(line => line.map(pt => toLatLonPoint(pt)));
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

  // Helper check if feature centroid falls within active viewport bounds
  const isFeatureInViewport = (centroid, bounds) => {
    if (!bounds || !centroid) return true;
    return bounds.contains(centroid);
  };

  const [showMobileBasemaps, setShowMobileBasemaps] = useState(false);

  return (
    <div className={`map-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Dense Layer Zoom Warning Overlay */}
      {Object.keys(layers).some(key => layers[key] && (key.includes('Polyline') || key.includes('Bdy') || key === 'ndcdbBdyPd')) && currentZoom < 14 && (
        <div className="map-zoom-notice">
          <Info size={14} color="#3b82f6" />
          <span>Sila zum masuk (Zoom ≥ 14) untuk paparan garisan sempadan polyline (229k rekod).</span>
        </div>
      )}

      {/* Floating Basemap Controls (Desktop & Mobile Popover) */}
      <div className="map-floating-bar">
        {/* Desktop Horizontal Basemap Selector */}
        <div className="basemap-selector desktop-only">
          <button 
            className={`basemap-btn ${basemap === 'esri_imagery' ? 'active' : ''}`}
            onClick={() => setBasemap('esri_imagery')}
            data-tooltip="ESRI Satelit"
            aria-label="ESRI Satelit"
          >
            <Globe size={13} />
            <span>ESRI Satelit</span>
          </button>
          <button 
            className={`basemap-btn ${basemap === 'gmaps_hybrid' ? 'active' : ''}`}
            onClick={() => setBasemap('gmaps_hybrid')}
            data-tooltip="Google Hybrid"
            aria-label="Google Hybrid"
          >
            <Layers size={13} />
            <span>Google Hybrid</span>
          </button>
          <button 
            className={`basemap-btn ${basemap === 'gmaps_satellite' ? 'active' : ''}`}
            onClick={() => setBasemap('gmaps_satellite')}
            data-tooltip="Google Satelit"
            aria-label="Google Satelit"
          >
            <Compass size={13} />
            <span>Google Satelit</span>
          </button>
          <button 
            className={`basemap-btn ${basemap === 'gmaps_roadmap' ? 'active' : ''}`}
            onClick={() => setBasemap('gmaps_roadmap')}
            data-tooltip="Google Peta"
            aria-label="Google Peta"
          >
            <Globe size={13} />
            <span>Google Peta</span>
          </button>
          <button 
            className={`basemap-btn ${basemap === 'carto_dark' ? 'active' : ''}`}
            onClick={() => setBasemap('carto_dark')}
            data-tooltip="Dark GIS"
            aria-label="Dark GIS"
          >
            <Moon size={13} />
            <span>Dark GIS</span>
          </button>

          <button 
            className="fullscreen-toggle-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Keluar Skrin Penuh (ESC)" : "Skrin Penuh"}
            data-tooltip={isFullscreen ? "Keluar Skrin Penuh" : "Skrin Penuh"}
            aria-label={isFullscreen ? "Keluar skrin penuh" : "Buka skrin penuh"}
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
        </div>

        {/* Mobile Floating Compact Basemap Icon Switcher */}
        <div className="mobile-basemap-wrap mobile-only">
          <button
            className="mobile-basemap-toggle-btn"
            onClick={() => setShowMobileBasemaps(!showMobileBasemaps)}
            title="Tukar Peta Asas"
          >
            <Layers size={16} />
          </button>

          {showMobileBasemaps && (
            <div className="mobile-basemap-popover">
              <button 
                className={`mobile-basemap-item ${basemap === 'esri_imagery' ? 'active' : ''}`}
                onClick={() => { setBasemap('esri_imagery'); setShowMobileBasemaps(false); }}
              >
                <Globe size={14} /> <span>ESRI Satelit</span>
              </button>
              <button 
                className={`mobile-basemap-item ${basemap === 'gmaps_hybrid' ? 'active' : ''}`}
                onClick={() => { setBasemap('gmaps_hybrid'); setShowMobileBasemaps(false); }}
              >
                <Layers size={14} /> <span>Google Hybrid</span>
              </button>
              <button 
                className={`mobile-basemap-item ${basemap === 'gmaps_satellite' ? 'active' : ''}`}
                onClick={() => { setBasemap('gmaps_satellite'); setShowMobileBasemaps(false); }}
              >
                <Compass size={14} /> <span>Google Satelit</span>
              </button>
              <button 
                className={`mobile-basemap-item ${basemap === 'gmaps_roadmap' ? 'active' : ''}`}
                onClick={() => { setBasemap('gmaps_roadmap'); setShowMobileBasemaps(false); }}
              >
                <Globe size={14} /> <span>Google Peta</span>
              </button>
              <button 
                className={`mobile-basemap-item ${basemap === 'carto_dark' ? 'active' : ''}`}
                onClick={() => { setBasemap('carto_dark'); setShowMobileBasemaps(false); }}
              >
                <Moon size={14} /> <span>Dark GIS</span>
              </button>
            </div>
          )}
        </div>
      </div>


      <MapContainer 
        center={NEGERI_SEMBILAN_BOUNDS.center} 
        zoom={NEGERI_SEMBILAN_BOUNDS.zoom} 
        preferCanvas={true}
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

        <MapEventsHandler 
          onMapClick={onMapClick} 
          onCursorMove={(lat, lng) => setCursorCoords({ lat, lng })}
          onZoomChange={(zoom) => setCurrentZoom(zoom)}
          onBoundsChange={(bounds) => setCurrentBounds(bounds)}
        />

        {/* Selected / Searched Location Highlight Polygon */}
        {selectedLocation && selectedLocation.feature && selectedLocation.feature.geometry && (
          <Polygon
            positions={parseCoordinates(selectedLocation.feature.geometry.coordinates, selectedLocation.feature.geometry.type)}
            pathOptions={{
              color: '#38bdf8',
              fillColor: '#0284c7',
              fillOpacity: 0.5,
              weight: 3,
              dashArray: '4, 4'
            }}
          />
        )}

        {/* Selected / Searched Location Marker */}
        {selectedLocation && selectedLocation.center && (
          <Marker position={selectedLocation.center}>
            <Popup>
              <div className="popup-card">
                <div className="popup-header">
                  <MapPin size={15} color="#38bdf8" /> {selectedLocation.label || 'Lokasi Dipilih'}
                </div>
                <div className="popup-body-text">
                  {selectedLocation.layerName && <div><strong>Lapisan:</strong> {selectedLocation.layerName}</div>}
                  {selectedLocation.properties && selectedLocation.properties.UPI && <div><strong>UPI:</strong> <code className="mono-val">{selectedLocation.properties.UPI}</code></div>}
                  {selectedLocation.properties && selectedLocation.properties.NOPW && <div><strong>NOPW:</strong> {selectedLocation.properties.NOPW}</div>}
                  {selectedLocation.properties && selectedLocation.properties.PA && <div><strong>PA:</strong> {selectedLocation.properties.PA}</div>}
                  {selectedLocation.properties && selectedLocation.properties.KELUASAN && <div><strong>Keluasan:</strong> {selectedLocation.properties.KELUASAN} m²</div>}
                  <div className="popup-coords">
                    Lat: {selectedLocation.center[0].toFixed(5)}° N, Lng: {selectedLocation.center[1].toFixed(5)}° E
                  </div>
                </div>
                <div className="popup-actions">
                  <a 
                    href={getGoogleMapsUrl(selectedLocation.center[0], selectedLocation.center[1])} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="gmaps-btn"
                  >
                    <ExternalLink size={12} /> Google Maps
                  </a>
                  <a 
                    href={getGoogleStreetViewUrl(selectedLocation.center[0], selectedLocation.center[1])} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="streetview-btn"
                  >
                    <Camera size={12} /> Street View
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

        {/* RENDER DYNAMIC SHP LAYERS */}
        {ALL_LAYERS_CONFIG.map(cfg => {
          if (!layers[cfg.id]) return null;
          const geojson = serembanGeoData[cfg.id];
          if (!geojson || !geojson.features) return null;

          // Performance Threshold Checks for Ultra-Dense Datasets (200k+ polylines)
          const isDensePolyline = cfg.type === 'polyline' || cfg.id.includes('Polyline') || cfg.id === 'ndcdbBdyPd';
          const isDenseLotPolygon = cfg.id.startsWith('ndcdbLot') || geojson.features.length > 20000;

          // Require Zoom >= 14 for 229k polyline dataset, Zoom >= 11 for 50k+ lot polygons
          if (isDensePolyline && currentZoom < 14) return null;
          if (isDenseLotPolygon && geojson.features.length > 50000 && currentZoom < 11) return null;

          return geojson.features.map((f, idx) => {
            if (!f.geometry) return null;
            const geomType = f.geometry.type;
            const centroid = getCentroid(f.geometry.coordinates, geomType);

            // Spatial Viewport Bounding Box Clipping: skip rendering features outside current screen viewport
            if (currentBounds && (isDensePolyline || isDenseLotPolygon || geojson.features.length > 5000)) {
              if (!isFeatureInViewport(centroid, currentBounds)) return null;
            }


            const positions = parseCoordinates(f.geometry.coordinates, geomType);
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
                          <Camera size={12} /> Street View
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
                            <div className="popup-val mono-val">{p.UPI}</div>
                          </div>
                        )}
                        {p.ADJPARCEL && (
                          <div>
                            <div className="popup-label">Parcel Bersebelahan</div>
                            <div className="popup-val mono-val">{p.ADJPARCEL}</div>
                          </div>
                        )}
                        {p.BEARING !== undefined && (
                          <div>
                            <div className="popup-label">Bearing Sempadan</div>
                            <div className="popup-val mono-val">{p.BEARING}°</div>
                          </div>
                        )}
                        {p.JARAK !== undefined && (
                          <div>
                            <div className="popup-label">Jarak Sempadan</div>
                            <div className="popup-val mono-val">{p.JARAK} m</div>
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

      {/* Professional GIS Canvas Footer Status Bar */}
      <footer className="map-status-bar">
        <div className="status-item">
          <span className="status-label">LAT:</span>
          <span className="status-value mono">{cursorCoords.lat.toFixed(5)}° N</span>
        </div>
        <div className="status-divider">|</div>
        <div className="status-item">
          <span className="status-label">LNG:</span>
          <span className="status-value mono">{cursorCoords.lng.toFixed(5)}° E</span>
        </div>
        <div className="status-divider">|</div>
        <div className="status-item">
          <span className="status-label">ZOOM:</span>
          <span className="status-value mono">Z{currentZoom}</span>
        </div>
        <div className="status-divider">|</div>
        <div className="status-item">
          <span className="status-label">CRS:</span>
          <span className="status-value mono">WGS 84 (EPSG:4326)</span>
        </div>
        <div className="status-right">
          <span className="status-tag">JUPEM Spatial Engine</span>
        </div>
      </footer>
    </div>
  );
}

