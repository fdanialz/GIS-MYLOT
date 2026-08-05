import React from 'react';
import { BarChart3, Shield, TreePine, Users, PieChart } from 'lucide-react';
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
  const chartData = {
    labels: SUMMARY_STATS_NS.daerahList.map(d => d.nama),
    datasets: [
      {
        label: 'Rizab Melayu (Ha)',
        data: SUMMARY_STATS_NS.daerahList.map(d => d.rm),
        backgroundColor: 'rgba(239, 68, 68, 0.85)',
        borderColor: '#ef4444',
        borderWidth: 1
      },
      {
        label: 'Hutan Simpan (Ha)',
        data: SUMMARY_STATS_NS.daerahList.map(d => d.hsk),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderColor: '#10b981',
        borderWidth: 1
      },
      {
        label: 'Rizab Orang Asli (Ha)',
        data: SUMMARY_STATS_NS.daerahList.map(d => d.roa),
        backgroundColor: 'rgba(168, 85, 247, 0.85)',
        borderColor: '#a855f7',
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

  return (
    <div className="dashboard-panel">
      {/* Cards Grid */}
      <div className="stat-card-grid">
        <div className="stat-card" style={{ borderLeftColor: '#ef4444' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Shield size={14} color="#ef4444" /> RIZAB MELAYU
          </div>
          <div className="stat-val" style={{ color: '#ef4444' }}>{SUMMARY_STATS_NS.totalRizabMelayuHektar}</div>
          <div className="stat-unit">Hektar Warta (N.S.)</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <TreePine size={14} color="#10b981" /> HUTAN SIMPAN
          </div>
          <div className="stat-val" style={{ color: '#10b981' }}>{SUMMARY_STATS_NS.totalHutanSimpanHektar}</div>
          <div className="stat-unit">Hektar (HSK N.S.)</div>
        </div>
      </div>

      <div className="stat-card-grid">
        <div className="stat-card" style={{ borderLeftColor: '#a855f7' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={14} color="#a855f7" /> RIZAB ORANG ASLI
          </div>
          <div className="stat-val" style={{ color: '#a855f7' }}>{SUMMARY_STATS_NS.totalOrangAsliHektar}</div>
          <div className="stat-unit">Hektar Perkampungan</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: '#f59e0b' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <PieChart size={14} color="#f59e0b" /> DAERAH N.S.
          </div>
          <div className="stat-val" style={{ color: '#f59e0b' }}>7</div>
          <div className="stat-unit">Daerah Pentadbiran</div>
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
