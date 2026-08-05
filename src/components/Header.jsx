import React from 'react';
import { Download, FileText, Compass, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function Header({ 
  onOpenQgisModal, 
  onOpenReportModal, 
  isSidebarOpen, 
  setIsSidebarOpen 
}) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sidebar-toggle-header-btn"
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Buka Sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>

        {/* Official JUPEM Logo Badge */}
        <div className="brand-logo-container">
          <img 
            src="/jupem_logo.svg" 
            alt="Logo JUPEM" 
            className="jupem-brand-img"
          />
        </div>

        <div>
          <div className="brand-title">MYLOT RIZAB GIS</div>
          <div className="brand-subtitle">Portal Tanah Rizab Negeri Sembilan (TRM • Hutan • Orang Asli)</div>
        </div>
      </div>

      <div className="header-badges">
        <div className="badge-ns">
          <Compass size={13} /> Negeri Sembilan
        </div>
        <div className="badge-gmaps">
          🗺️ Google Maps Powered
        </div>
        <div className="badge-qgis">
          ⚡ QGIS Ready
        </div>

        <button 
          onClick={onOpenQgisModal}
          className="btn-secondary" 
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
        >
          <Download size={14} /> Integrasi QGIS
        </button>

        <button 
          onClick={onOpenReportModal}
          className="btn-primary" 
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
        >
          <FileText size={14} /> Laporan PDF
        </button>
      </div>
    </header>
  );
}
