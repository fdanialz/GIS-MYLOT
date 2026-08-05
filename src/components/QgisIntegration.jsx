import React, { useState } from 'react';
import { Download, Upload, Cpu, FileCode, Archive, ExternalLink, CheckCircle2 } from 'lucide-react';
import shp from 'shpjs';
import JSZip from 'jszip';
import { RIZAB_MELAYU_NS, HUTAN_SIMPAN_NS, RIZAB_ORANG_ASLI_NS } from '../data/negeriSembilanData';

export default function QgisIntegration({ onCustomDataImported }) {
  const [importedFileName, setImportedFileName] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [qgzMeta, setQgzMeta] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Export GeoJSON file function
  const downloadGeoJSON = (dataCollection, filename) => {
    const jsonStr = JSON.stringify(dataCollection, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.geojson`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Drag & Drop / File Upload (Supports .qgz, .zip Shapefiles, and .geojson)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImportedFileName(file.name);
    setIsProcessing(true);
    setImportStatus('Membaca fail...');
    setQgzMeta(null);

    const isQgz = file.name.endsWith('.qgz');
    const isZip = file.name.endsWith('.zip');

    if (isQgz) {
      // Process QGIS Project File (.qgz)
      try {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(file);
        let qgsFileName = Object.keys(zipContent.files).find(name => name.endsWith('.qgs'));
        
        if (qgsFileName) {
          const xmlText = await zipContent.files[qgsFileName].async('string');
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
          
          const title = xmlDoc.querySelector('title')?.textContent || file.name;
          const layerNodes = Array.from(xmlDoc.querySelectorAll('maplayer'));
          const layerNames = layerNodes.map(l => l.querySelector('layername')?.textContent).filter(Boolean);

          setQgzMeta({
            projectName: title,
            layerCount: layerNames.length,
            layers: layerNames
          });

          // Check if embedded geojson or shapefile exists in qgz
          const embeddedGeoJson = Object.keys(zipContent.files).find(name => name.endsWith('.geojson') || name.endsWith('.json'));
          if (embeddedGeoJson) {
            const geoText = await zipContent.files[embeddedGeoJson].async('string');
            const parsed = JSON.parse(geoText);
            onCustomDataImported(parsed, file.name);
            setImportStatus(`✅ Fail QGIS Project (.qgz) berjaya dibaca! Projek: "${title}". Lapisan diimport ke peta.`);
          } else {
            setImportStatus(`✅ Projek QGIS (.qgz) "${title}" berjaya dikesan! Mengandungi ${layerNames.length} lapisan.`);
          }
        } else {
          setImportStatus('❌ Fail .qgz tidak mengandungi skrip XML projek .qgs.');
        }
      } catch (err) {
        console.error('QGZ Read Error:', err);
        setImportStatus('❌ Ralat membaca fail Projek QGIS (.qgz).');
      } finally {
        setIsProcessing(false);
      }
    } else if (isZip) {
      // Process zipped Shapefile (.shp, .dbf, .shx, .prj)
      try {
        const arrayBuffer = await file.arrayBuffer();
        const geojson = await shp(arrayBuffer);
        const featureCollection = Array.isArray(geojson) ? geojson[0] : geojson;

        if (featureCollection && featureCollection.features) {
          onCustomDataImported(featureCollection, file.name);
          setImportStatus(`✅ Berjaya membaca Shapefile (.zip)! ${featureCollection.features.length} lot dipaparkan pada peta.`);
        } else {
          setImportStatus('❌ Fail Zip tidak mengandungi Shapefile (.shp) yang sah.');
        }
      } catch (err) {
        console.error('Shapefile read error:', err);
        setImportStatus('❌ Ralat memproses Shapefile ZIP. Pastikan zip mengandungi fail .shp dan .dbf.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Process GeoJSON / JSON file
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedGeoJSON = JSON.parse(event.target.result);
          if (parsedGeoJSON.type === 'FeatureCollection' || parsedGeoJSON.features) {
            onCustomDataImported(parsedGeoJSON, file.name);
            setImportStatus(`✅ Berjaya membaca GeoJSON! ${parsedGeoJSON.features ? parsedGeoJSON.features.length : 0} lot dipaparkan.`);
          } else {
            setImportStatus('❌ Fail tidak mempunyai struktur GeoJSON FeatureCollection yang sah.');
          }
        } catch (err) {
          setImportStatus('❌ Ralat membaca fail JSON/GeoJSON.');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="qgis-integration-panel">
      {/* Download QGIS Direct Software Link */}
      <div className="card-section" style={{ borderLeft: '4px solid #f59e0b' }}>
        <div className="card-title">
          <Cpu size={18} color="#f59e0b" /> Pemasangan & Integrasi QGIS
        </div>
        <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: '1.4' }}>
          <b>QGIS Desktop (Free & Open Source GIS):</b> Anda boleh memuat turun QGIS percuma dari laman rasmi untuk menyunting lot tanah Negeri Sembilan.
        </p>

        <a 
          href="https://www.qgis.org/" 
          target="_blank" 
          rel="noreferrer" 
          className="gmaps-btn"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', textDecoration: 'none', marginBottom: '0.5rem' }}
        >
          <ExternalLink size={14} /> Muat Turun QGIS dari QGIS.org
        </a>
      </div>

      {/* Import QGIS File (QGZ, Shapefile ZIP & GeoJSON) */}
      <div className="card-section" style={{ borderLeft: '4px solid #3b82f6' }}>
        <div className="card-title">
          <Upload size={18} color="#3b82f6" /> Pembaca Fail QGIS (.qgz, .zip, .geojson)
        </div>
        <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: '1.4' }}>
          Sistem ini **sedia membaca secara terus** fail projek QGIS <b>(.qgz)</b>, fail <b>Shapefile (.zip)</b>, dan <b>GeoJSON (.geojson)</b>!
        </p>

        <div className="form-group">
          <label className="form-label" style={{ fontWeight: 700, color: '#f59e0b' }}>
            Pilih Fail Projek QGIS (.qgz / .zip / .geojson):
          </label>
          <input 
            type="file" 
            accept=".qgz,.zip,.geojson,.json,.kml" 
            onChange={handleFileUpload}
            className="form-input" 
            style={{ padding: '0.5rem', cursor: 'pointer' }}
            disabled={isProcessing}
          />
        </div>

        {importStatus && (
          <div style={{ marginTop: '0.65rem', padding: '0.6rem', borderRadius: '6px', background: importStatus.includes('✅') ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${importStatus.includes('✅') ? '#10b981' : '#ef4444'}`, fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>
            {importStatus}
          </div>
        )}

        {/* Display QGZ Project Summary if available */}
        {qgzMeta && (
          <div style={{ marginTop: '0.75rem', padding: '0.65rem', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem' }}>
            <div style={{ fontWeight: 800, color: '#60a5fa', marginBottom: '0.35rem' }}>
              📋 Metadata Projek QGIS (.qgz):
            </div>
            <div>Nama Projek: <b>{qgzMeta.projectName}</b></div>
            <div>Jumlah Lapisan: <b>{qgzMeta.layerCount} Lapisan</b></div>
            <div style={{ marginTop: '0.35rem', color: '#94a3b8' }}>
              Senarai Lapisan: {qgzMeta.layers.slice(0, 5).join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Download QGIS Layer GeoJSON */}
      <div className="card-section">
        <div className="card-title">
          <Download size={18} color="#10b981" /> Eksport Lapisan ke QGIS Desktop
        </div>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
          Muat turun lapisan spasial Negeri Sembilan dalam format GeoJSON yang boleh dibuka terus dalam QGIS 3.x.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <button 
            onClick={() => downloadGeoJSON(RIZAB_MELAYU_NS, 'Tanah_Rizab_Melayu_NS_QGIS')} 
            className="btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <FileCode size={14} color="#ef4444" /> Muat Turun GeoJSON Rizab Melayu N.S.
          </button>

          <button 
            onClick={() => downloadGeoJSON(HUTAN_SIMPAN_NS, 'Hutan_Simpan_NS_QGIS')} 
            className="btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <FileCode size={14} color="#10b981" /> Muat Turun GeoJSON Hutan Simpan N.S.
          </button>

          <button 
            onClick={() => downloadGeoJSON(RIZAB_ORANG_ASLI_NS, 'Rizab_Orang_Asli_NS_QGIS')} 
            className="btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <FileCode size={14} color="#a855f7" /> Muat Turun GeoJSON Rizab Orang Asli N.S.
          </button>
        </div>
      </div>
    </div>
  );
}
