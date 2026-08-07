import React, { useState } from 'react';
import { Download, FileText, PanelLeftClose, PanelLeftOpen, Map, Building2, Trees, Waves, Sprout, Mountain, Sun, Moon, SlidersHorizontal, X } from 'lucide-react';

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
          title={isSidebarOpen ? "Tutup Panel" : "Buka Panel"}
          aria-label={isSidebarOpen ? "Tutup panel menu" : "Buka panel menu"}
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

      {/* Desktop District Selector Segmented Pills */}
      <div className="district-selector desktop-only" aria-label="Pilih daerah">
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

      {/* Mobile Single-Row Select Dropdown */}
      <div className="mobile-district-wrap mobile-only">
        <select 
          className="mobile-district-select"
          value={selectedDaerah}
          onChange={(e) => onSelectDaerah && onSelectDaerah(e.target.value)}
          aria-label="Pilih daerah mobile"
        >
          {districtList.map(d => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="header-actions desktop-only">
        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="theme-toggle-btn"
          title={theme === 'light' ? "Tukar ke Mod Gelap" : "Tukar ke Mod Terang"}
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

      {/* Mobile Header Menu Action Button */}
      <div className="mobile-actions-wrap mobile-only">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="sidebar-toggle-header-btn"
          title="Tindakan Tambahan"
        >
          {showMobileMenu ? <X size={16} /> : <SlidersHorizontal size={16} />}
        </button>

        {showMobileMenu && (
          <div className="mobile-actions-popover">
            <button 
              onClick={() => { onToggleTheme(); setShowMobileMenu(false); }}
              className="mobile-popover-item"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              <span>{theme === 'light' ? "Mod Gelap (Dark Mode)" : "Mod Terang (Light Mode)"}</span>
            </button>
            <button 
              onClick={() => { onOpenQgisModal(); setShowMobileMenu(false); }}
              className="mobile-popover-item"
            >
              <Download size={15} />
              <span>Integrasi QGIS Export</span>
            </button>
            <button 
              onClick={() => { onOpenReportModal(); setShowMobileMenu(false); }}
              className="mobile-popover-item primary"
            >
              <FileText size={15} />
              <span>Jana Laporan PDF</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}



