import React from 'react';
import { Download, FileText, PanelLeftClose, PanelLeftOpen, Map, Building2, Trees, Waves, Sprout, Mountain, Sun, Moon } from 'lucide-react';

export default function Header({ 
  onOpenQgisModal, 
  onOpenReportModal, 
  isSidebarOpen, 
  setIsSidebarOpen,
  selectedDaerah,
  onSelectDaerah,
  theme = 'light',
  onToggleTheme
}) {
  const districtList = [
    { id: 'all', label: 'Semua Daerah', icon: Map },
    { id: 'seremban', label: 'Seremban', icon: Building2 },
    { id: 'jempol', label: 'Jempol', icon: Trees },
    { id: 'pd', label: 'Port Dickson', icon: Waves },
    { id: 'rembau', label: 'Rembau', icon: Sprout },
    { id: 'tampin', label: 'Tampin', icon: Mountain }
  ];

  return (
    <header className="app-header">
      <div className="brand-section">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sidebar-toggle-header-btn"
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Buka Sidebar"}
          aria-label={isSidebarOpen ? "Sembunyikan sidebar" : "Buka sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
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
          <div className="brand-subtitle">Portal Spasial Tanah Rizab Negeri Sembilan</div>
        </div>
      </div>

      <div className="header-badges">
        {/* Clean District Selector Segmented Pills */}
        <div className="district-selector" aria-label="Pilih daerah">
          {districtList.map(d => {
            const IconComponent = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => onSelectDaerah && onSelectDaerah(d.id)}
                className={`district-btn ${selectedDaerah === d.id ? 'active' : ''}`}
              >
                <IconComponent size={13} />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        <div className="header-actions">
          {/* Theme Toggle Button (Light/Dark Mode) */}
          <button 
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? "Tukar ke Mod Gelap (Dark Mode)" : "Tukar ke Mod Terang (Light Mode)"}
            aria-label="Tukar Tema"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            <span className="theme-toggle-text">{theme === 'light' ? "Dark Mode" : "Light Mode"}</span>
          </button>

          <button 
            onClick={onOpenQgisModal}
            className="btn-header-action btn-secondary"
          >
            <Download size={14} /> <span>QGIS Export</span>
          </button>

          <button 
            onClick={onOpenReportModal}
            className="btn-header-action btn-primary"
          >
            <FileText size={14} /> <span>Laporan PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}


