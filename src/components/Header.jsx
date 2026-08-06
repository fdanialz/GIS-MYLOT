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

        <div>
          <div className="brand-title">MyRizab</div>
          <div className="brand-subtitle">Portal Tanah Rizab Negeri Sembilan (TRM • Hutan • Orang Asli)</div>
        </div>
      </div>

      <div className="header-badges">
        {/* Quick Daerah Selector */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#1e293b', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
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
              style={{
                background: selectedDaerah === d.id ? '#3b82f6' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.22rem 0.5rem',
                fontSize: '0.7rem',
                fontWeight: selectedDaerah === d.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'background 0.2s'
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
