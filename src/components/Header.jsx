import React from 'react';
import { Download, FileText, Compass, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function Header({ 
  onOpenQgisModal, 
  onOpenReportModal, 
  isSidebarOpen, 
  setIsSidebarOpen,
  selectedDaerah,
  onSelectDaerah
}) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sidebar-toggle-header-btn"
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Buka Sidebar"}
          aria-label={isSidebarOpen ? "Sembunyikan sidebar" : "Buka sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>

        {/* Official JUPEM Logo Badge */}
        <div className="brand-logo-container">
          <img 
            src={`${import.meta.env.BASE_URL}jupem_logo.svg`} 
            alt="Logo JUPEM" 
            className="jupem-brand-img"
          />
        </div>

        <div className="brand-copy">
          <div className="brand-title">MyRizab</div>
          <div className="brand-subtitle">Portal Tanah Rizab Negeri Sembilan (TRM • Hutan • Orang Asli)</div>
        </div>
      </div>

      <div className="header-badges">
        {/* Quick Daerah Selector */}
        <div className="district-selector" aria-label="Pilih daerah">
          {[
            { id: 'all', label: '🗺️ Semua' },
            { id: 'seremban', label: '🏙️ Seremban' },
            { id: 'jempol', label: '🌲 Jempol' },
            { id: 'pd', label: '🏖️ Port Dickson' },
            { id: 'rembau', label: '🌾 Rembau' },
            { id: 'tampin', label: '⛰️ Tampin' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => onSelectDaerah && onSelectDaerah(d.id)}
              className={`district-btn ${selectedDaerah === d.id ? 'active' : ''}`}
              style={{
                fontWeight: selectedDaerah === d.id ? 700 : 500,
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="badge-gmaps">
          🗺️ Google Maps Powered
        </div>
        <div className="badge-qgis">
          ⚡ QGIS Ready
        </div>

        <button 
          onClick={onOpenQgisModal}
          className="btn-secondary header-action-btn"
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
        >
          <Download size={14} /> Integrasi QGIS
        </button>

        <button 
          onClick={onOpenReportModal}
          className="btn-primary header-action-btn"
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
        >
          <FileText size={14} /> Laporan PDF
        </button>
      </div>
    </header>
  );
}
