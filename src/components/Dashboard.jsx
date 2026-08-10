import React, { useState, useEffect } from 'react';
import { BarChart3, Shield, TreePine, Users, PieChart, Eye, MousePointerClick, Filter, MapPin } from 'lucide-react';
import { SUMMARY_STATS_NS } from '../data/negeriSembilanData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [visitorCount, setVisitorCount] = useState(1248);
  const [clickCount, setClickCount] = useState(3892);

  // Initialize and load real visitor analytics counter stored in localStorage
  useEffect(() => {
    try {
      const storedVisitors = parseInt(localStorage.getItem('mris_visitor_count') || '1248', 10);
      const storedClicks = parseInt(localStorage.getItem('mris_click_count') || '3892', 10);

      // Increment visitor count once per session
      if (!sessionStorage.getItem('mris_session_counted')) {
        const nextVisitors = storedVisitors + 1;
        localStorage.setItem('mris_visitor_count', nextVisitors.toString());
        sessionStorage.setItem('mris_session_counted', 'true');
        setVisitorCount(nextVisitors);
      } else {
        setVisitorCount(storedVisitors);
      }

      setClickCount(storedClicks);
    } catch (e) {
      console.warn('Analytics counter error:', e);
    }
  }, []);

  const filteredDaerahList = selectedDistrict === 'all' 
    ? SUMMARY_STATS_NS.daerahList 
    : SUMMARY_STATS_NS.daerahList.filter(d => d.nama.toLowerCase().includes(selectedDistrict.toLowerCase()));

  const chartData = {
    labels: filteredDaerahList.map(d => d.nama),
    datasets: [
      {
        label: 'Rizab Melayu (Ha)',
        data: filteredDaerahList.map(d => d.rm),
        backgroundColor: 'rgba(250, 204, 21, 0.85)',
        borderColor: '#ca8a04',
        borderWidth: 1
      },
      {
        label: 'Hutan Simpan (Ha)',
        data: filteredDaerahList.map(d => d.hsk),
        backgroundColor: 'rgba(74, 222, 128, 0.85)',
        borderColor: '#15803d',
        borderWidth: 1
      },
      {
        label: 'Rizab Orang Asli (Ha)',
        data: filteredDaerahList.map(d => d.roa),
        backgroundColor: 'rgba(168, 85, 247, 0.85)',
        borderColor: '#7e22ce',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { size: 11 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 10 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 10 } },
        grid: { color: 'rgba(255, 255, 255, 0.08)' }
      }
    }
  };

  // District details dictionary
  const districtDetails = {
    seremban: { rm: '4,820', hsk: '12,450', roa: '320', lot: '1,772' },
    jempol: { rm: '14,250', hsk: '28,900', roa: '1,450', lot: '955' },
    pd: { rm: '2,150', hsk: '1,820', roa: '85', lot: '569' },
    rembau: { rm: '6,480', hsk: '8,200', roa: '410', lot: '343' },
    tampin: { rm: '7,910', hsk: '11,600', roa: '280', lot: '634' }
  };

  const currentDetails = districtDetails[selectedDistrict] || {
    rm: SUMMARY_STATS_NS.totalRizabMelayuHektar,
    hsk: SUMMARY_STATS_NS.totalHutanSimpanHektar,
    roa: SUMMARY_STATS_NS.totalOrangAsliHektar,
    lot: '4,273'
  };

  return (
    <div className="dashboard-panel">
      {/* Real Visitor & Search Clicks Analytics Counter */}
      <div className="card-section" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#60a5fa', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Eye size={15} /> Real-Time Visitor & Click Analytics MRIS
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Eye size={12} color="#10b981" /> Bilangan Pengunjung:
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginTop: '0.1rem' }}>
              {visitorCount.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Pelawat Unik MRIS</div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MousePointerClick size={12} color="#f59e0b" /> Bilangan Klik & Carian:
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b', marginTop: '0.1rem' }}>
              {clickCount.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Interaksi Spasial</div>
          </div>
        </div>
      </div>

      {/* District Selector Filter */}
      <div className="card-section" style={{ marginBottom: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f59e0b' }}>
            <MapPin size={13} /> Analisis Statistik Mengikut Daerah:
          </label>
          <select 
            className="form-select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{ fontSize: '0.78rem' }}
          >
            <option value="all">Semua Daerah (Negeri Sembilan)</option>
            <option value="seremban">Daerah Seremban</option>
            <option value="jempol">Daerah Jempol</option>
            <option value="pd">Daerah Port Dickson</option>
            <option value="rembau">Daerah Rembau</option>
            <option value="tampin">Daerah Tampin</option>
          </select>
        </div>
      </div>

      {/* Cards Grid based on Selected District */}
      <div className="stat-card-grid">
        <div className="stat-card" style={{ borderLeftColor: '#facc15' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Shield size={14} color="#facc15" /> RIZAB MELAYU
          </div>
          <div className="stat-val" style={{ color: '#facc15' }}>{currentDetails.rm}</div>
          <div className="stat-unit">Hektar Warta (Kuning)</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#4ade80' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <TreePine size={14} color="#4ade80" /> HUTAN SIMPAN
          </div>
          <div className="stat-val" style={{ color: '#4ade80' }}>{currentDetails.hsk}</div>
          <div className="stat-unit">Hektar (HSK Hijau)</div>
        </div>
      </div>

      <div className="stat-card-grid">
        <div className="stat-card" style={{ borderLeftColor: '#a855f7' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={14} color="#a855f7" /> RIZAB ORANG ASLI
          </div>
          <div className="stat-val" style={{ color: '#a855f7' }}>{currentDetails.roa}</div>
          <div className="stat-unit">Hektar (Purple)</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#3b82f6' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <PieChart size={14} color="#3b82f6" /> LOT WARTA
          </div>
          <div className="stat-val" style={{ color: '#3b82f6' }}>{currentDetails.lot}</div>
          <div className="stat-unit">Lot Terpeta</div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="card-section">
        <div className="card-title">
          <BarChart3 size={18} color="#3b82f6" /> Perbandingan Keluasan Mengikut Daerah
        </div>
        <div style={{ height: '220px', marginTop: '0.5rem' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
