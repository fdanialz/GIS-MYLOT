import React from 'react';
import { X, Printer, FileText, CheckCircle2, Shield, TreePine, Users } from 'lucide-react';
import { SUMMARY_STATS_NS } from '../data/negeriSembilanData';

export default function ReportModal({ onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: '750px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText color="#3b82f6" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>LAPORAN STATUS SPASIAL TANAH RIZAB NEGERI SEMBILAN</h3>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <div className="modal-body" id="print-area">
          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <h4 style={{ color: '#f59e0b', fontSize: '1rem' }}>PENTADBIRAN TANAH NEGERI SEMBILAN</h4>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tarikh Cetakan: {new Date().toLocaleDateString('ms-MY')}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700 }}>
                Dihasilkan oleh Portal MyLot Rizab GIS (QGIS Engine)
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)' }}>
                <Shield size={16} color="#ef4444" style={{ margin: '0 auto' }} />
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Rizab Melayu</div>
                <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '1.1rem' }}>{SUMMARY_STATS_NS.totalRizabMelayuHektar} Ha</div>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.3)' }}>
                <TreePine size={16} color="#10b981" style={{ margin: '0 auto' }} />
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Hutan Simpan</div>
                <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>{SUMMARY_STATS_NS.totalHutanSimpanHektar} Ha</div>
              </div>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(168,85,247,0.3)' }}>
                <Users size={16} color="#a855f7" style={{ margin: '0 auto' }} />
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Rizab Orang Asli</div>
                <div style={{ fontWeight: 800, color: '#a855f7', fontSize: '1.1rem' }}>{SUMMARY_STATS_NS.totalOrangAsliHektar} Ha</div>
              </div>
            </div>

            <h5 style={{ fontSize: '0.85rem', color: '#f8fafc', marginBottom: '0.5rem' }}>Perincian Mengikut Daerah Pentadbiran N.S.:</h5>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                  <th style={{ padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>Daerah</th>
                  <th style={{ padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>Rizab Melayu (Ha)</th>
                  <th style={{ padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>Hutan Simpan (Ha)</th>
                  <th style={{ padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>Rizab Orang Asli (Ha)</th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_STATS_NS.daerahList.map(d => (
                  <tr key={d.nama} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.45rem', fontWeight: 600 }}>{d.nama}</td>
                    <td style={{ padding: '0.45rem', color: '#fca5a5' }}>{d.rm}</td>
                    <td style={{ padding: '0.45rem', color: '#6ee7b7' }}>{d.hsk}</td>
                    <td style={{ padding: '0.45rem', color: '#d8b4fe' }}>{d.roa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePrint} className="btn-primary">
              <Printer size={16} /> Cetak Laporan PDF / Print
            </button>
            <button onClick={onClose} className="btn-secondary">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
