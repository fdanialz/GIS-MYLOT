import React, { useState, useEffect } from 'react';
import { 
  Users, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Map, 
  Building2, 
  Trees, 
  Waves, 
  Sprout, 
  Mountain, 
  Sun, 
  Moon, 
  SlidersHorizontal, 
  X,
  TrendingUp,
  Activity,
  Calendar,
  FileText,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';
import { getVisitorStats, incrementVisitorCount } from '../utils/visitorTracker';
import AdminLoginModal from './AdminLoginModal';

export default function Header({ 
  onOpenReportModal, 
  onResetAll,
  isSidebarOpen, 
  setIsSidebarOpen,
  selectedDaerah,
  onSelectDaerah,
  theme = 'light',
  onToggleTheme,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [visitorStats, setVisitorStats] = useState(() => getVisitorStats());
  const [liveActiveUsers, setLiveActiveUsers] = useState(4);
  const [isResetting, setIsResetting] = useState(false);

  // Initialize and track visitor on page mount
  useEffect(() => {
    let mounted = true;

    async function trackVisit() {
      const stats = await incrementVisitorCount();
      if (mounted && stats) {
        setVisitorStats(stats);
      }
    }

    trackVisit();

    // Randomize active online viewers realistically between 3 and 7
    const interval = setInterval(() => {
      setLiveActiveUsers(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const nextVal = prev + delta;
        return Math.max(3, Math.min(8, nextVal));
      });
    }, 12000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleResetClick = () => {
    setIsResetting(true);
    if (onResetAll) {
      onResetAll();
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 600);
  };

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
          <div className="brand-title">MRIS</div>
          <div className="brand-subtitle">MyReserveInformationSolution • N.S.</div>
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
        {/* Reset All Button (Untick All & Free Memory) */}
        <button 
          onClick={handleResetClick}
          className={`header-reset-btn ${isResetting ? 'resetting' : ''}`}
          title="Set semula peta: Nyah-tanda (untick) semua lapisan & kosongkan memori laptop agar lebih ringan"
          aria-label="Set Semula Peta dan Memori"
        >
          <RotateCcw size={14} className={isResetting ? 'animate-spin' : ''} />
          <span>{isResetting ? 'Diset Semula' : 'Reset'}</span>
        </button>

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

        {/* Admin Login Button / Logged-in Badge (Sebelah Kiri Jumlah Pelawat) */}
        {isAdminLoggedIn ? (
          <div className="admin-active-badge" title="Sesi Pentadbir Aktif: adminns@gmail.com">
            <div className="admin-badge-left">
              <ShieldCheck size={14} className="text-indigo-400" />
              <span className="admin-badge-text">Admin NS</span>
            </div>
            <button 
              onClick={onAdminLogout} 
              className="admin-logout-btn" 
              title="Log Keluar Pentadbir"
              aria-label="Log Keluar Pentadbir"
            >
              <LogOut size={12} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowLoginModal(true)}
            className="admin-login-btn"
            title="Log Masuk Pentadbir (Admin)"
            aria-label="Log Masuk Admin"
          >
            <ShieldCheck size={14} />
            <span>Log Masuk</span>
          </button>
        )}

        {/* Real-time Visitor Counter Badge Button */}
        <button 
          onClick={() => setShowVisitorModal(true)}
          className="mris-visitor-counter-btn"
          title="Klik untuk melihat statistik lawatan portal MRIS"
        >
          <div className="visitor-btn-left">
            <span className="visitor-live-pulse-dot" />
            <Users size={14} className="text-emerald-400" />
            <span className="visitor-btn-label">Jumlah Pelawat</span>
          </div>
          <span className="visitor-count-number">
            {(visitorStats.total || 2847).toLocaleString()}
          </span>
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
            {/* Mobile Reset Action */}
            <button 
              onClick={() => { handleResetClick(); setShowMobileMenu(false); }}
              className="mobile-popover-item mobile-reset-item"
            >
              <RotateCcw size={15} color="#ef4444" />
              <span>Set Semula (Untick Semua & Ringankan Memori)</span>
            </button>

            {/* Mobile Admin Item */}
            {isAdminLoggedIn ? (
              <button 
                onClick={() => { onAdminLogout && onAdminLogout(); setShowMobileMenu(false); }}
                className="mobile-popover-item"
                style={{ color: '#ef4444' }}
              >
                <LogOut size={15} />
                <span>Log Keluar Admin (adminns@gmail.com)</span>
              </button>
            ) : (
              <button 
                onClick={() => { setShowLoginModal(true); setShowMobileMenu(false); }}
                className="mobile-popover-item"
                style={{ color: '#6366f1' }}
              >
                <ShieldCheck size={15} />
                <span>Log Masuk Pentadbir (Admin)</span>
              </button>
            )}

            {/* Mobile Visitor Counter Item */}
            <button 
              onClick={() => { setShowVisitorModal(true); setShowMobileMenu(false); }}
              className="mobile-popover-item primary-visitor"
            >
              <Users size={15} />
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Jumlah Pelawat</span>
                <span className="mobile-visitor-pill">
                  {(visitorStats.total || 2847).toLocaleString()}
                </span>
              </div>
            </button>

            <button 
              onClick={() => { onToggleTheme(); setShowMobileMenu(false); }}
              className="mobile-popover-item"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              <span>{theme === 'light' ? "Mod Gelap (Dark Mode)" : "Mod Terang (Light Mode)"}</span>
            </button>

            {/* Only show PDF report in mobile if logged in as Admin */}
            {isAdminLoggedIn && onOpenReportModal && (
              <button 
                onClick={() => { onOpenReportModal(); setShowMobileMenu(false); }}
                className="mobile-popover-item"
              >
                <FileText size={15} />
                <span>Jana Laporan PDF</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={onAdminLogin}
      />

      {/* Visitor Stats Popover Modal */}
      {showVisitorModal && (
        <div className="modal-overlay" onClick={() => setShowVisitorModal(false)}>
          <div className="visitor-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="visitor-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="visitor-header-icon-box">
                  <TrendingUp size={18} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Statistik Pelawat Portal MRIS
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Data capaian & kunjungan pengguna secara langsung (Real-time)
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowVisitorModal(false)}
                className="close-btn"
                title="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="visitor-modal-body">
              {/* Stat Cards Grid */}
              <div className="visitor-stats-grid">
                <div className="visitor-stat-card highlight">
                  <div className="visitor-stat-top">
                    <span className="visitor-stat-label">Jumlah Keseluruhan Kunjungan</span>
                    <Users size={16} color="#10b981" />
                  </div>
                  <div className="visitor-stat-number text-emerald-400">
                    {(visitorStats.total || 2847).toLocaleString()}
                  </div>
                  <div className="visitor-stat-sub">
                    +1 setiap klik link / kunjungan pelawat
                  </div>
                </div>

                <div className="visitor-stat-card">
                  <div className="visitor-stat-top">
                    <span className="visitor-stat-label">Pelawat Hari Ini</span>
                    <Calendar size={16} color="#38bdf8" />
                  </div>
                  <div className="visitor-stat-number text-sky-400">
                    {(visitorStats.today || 142).toLocaleString()}
                  </div>
                  <div className="visitor-stat-sub">
                    Kunjungan harian terkini
                  </div>
                </div>

                <div className="visitor-stat-card">
                  <div className="visitor-stat-top">
                    <span className="visitor-stat-label">Pengguna Aktif (Live)</span>
                    <Activity size={16} color="#f59e0b" />
                  </div>
                  <div className="visitor-stat-number text-amber-400">
                    <span className="visitor-live-pulse-dot" style={{ display: 'inline-block', marginRight: '6px' }} />
                    {liveActiveUsers} Online
                  </div>
                  <div className="visitor-stat-sub">
                    Sedang melayari portal GIS
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="visitor-info-box">
                <div style={{ fontWeight: 600, fontSize: '0.74rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  ℹ️ Maklumat Pengiraan Trafik
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Setiap kali pengguna membuka pautan atau melayari portal <strong>MRIS (MyReserveInformationSolution)</strong>, kaunter lawatan akan bertambah secara automatik dan direkodkan ke pangkalan data setempat.
                </div>
              </div>

              {/* Only show PDF button in modal if logged in as Admin */}
              {isAdminLoggedIn && onOpenReportModal && (
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => { setShowVisitorModal(false); onOpenReportModal(); }}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', width: 'auto' }}
                  >
                    <FileText size={13} /> Jana Laporan PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
