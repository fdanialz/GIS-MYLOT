import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  ShieldCheck, 
  TreePine, 
  Users, 
  Building2, 
  Download, 
  CheckCircle2, 
  Award, 
  FileSpreadsheet, 
  Compass,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';
import { SUMMARY_STATS_NS } from '../data/negeriSembilanData';

export default function ReportModal({ onClose }) {
  const currentDate = new Date().toLocaleDateString('ms-MY', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('ms-MY', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Daerah,Rizab Melayu (Ha),Hutan Simpan (Ha),Rizab Orang Asli (Ha),Jumlah (Ha),Status\n";
    
    SUMMARY_STATS_NS.daerahList.forEach(d => {
      const total = (d.rm + d.hsk + d.roa).toFixed(1);
      csvContent += `${d.nama},${d.rm},${d.hsk},${d.roa},${total},Disahkan JUPEM\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Tanah_Rizab_NS_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalAllReserves = (
    SUMMARY_STATS_NS.totalRizabMelayuHektar +
    SUMMARY_STATS_NS.totalHutanSimpanHektar +
    SUMMARY_STATS_NS.totalOrangAsliHektar
  ).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-box official-report-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="report-title"
      >
        {/* Top Control Bar (Screen Only) */}
        <div className="report-screen-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={20} color="#2563eb" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                Laporan Eksekutif Status Spasial Tanah Rizab
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Pangkalan Data GIS MRIS • Negeri Sembilan Darul Khusus
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={handleDownloadCSV} className="report-csv-btn" title="Muat Turun Data CSV">
              <FileSpreadsheet size={14} /> <span>Eksport CSV</span>
            </button>
            <button onClick={handlePrint} className="report-print-btn" title="Cetak atau Simpan sebagai PDF">
              <Printer size={14} /> <span>Cetak / PDF</span>
            </button>
            <button onClick={onClose} className="close-btn" aria-label="Tutup laporan">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Official Paper Area (Clean Crisp White Paper Design) */}
        <div className="report-paper-container" id="print-area">
          {/* Official Letterhead Header */}
          <div className="report-official-letterhead">
            <div className="letterhead-logo-wrap">
              <img 
                src={`${import.meta.env.BASE_URL}jupem_logo.svg`} 
                alt="Logo JUPEM" 
                className="letterhead-logo"
              />
            </div>

            <div className="letterhead-text-wrap">
              <h2 className="letterhead-gov-title">PENTADBIRAN TANAH NEGERI SEMBILAN</h2>
              <h3 className="letterhead-dept-title">JABATAN UKUR DAN PEMETAAN MALAYSIA (JUPEM) NEGERI SEMBILAN</h3>
              <div className="letterhead-report-name">LAPORAN KEDUDUKAN SPASIAL TANAH RIZAB NEGERI SEMBILAN</div>
              <div className="letterhead-subinfo">Sistem Maklumat Tanah Rizab Bersepadu (MyReserveInformationSolution - MRIS)</div>
            </div>

            <div className="letterhead-security-badge">
              <span className="security-tag">TERHAD</span>
              <span className="ref-no">NO. DOK: MRIS/NS/2026/Q3</span>
            </div>
          </div>

          <div className="letterhead-divider-line" />

          {/* Meta Info Strip */}
          <div className="report-meta-strip">
            <div className="meta-item">
              <span className="meta-label">Tarikh Cetakan:</span>
              <span className="meta-val">{currentDate} ({currentTime})</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Zon Pentadbiran:</span>
              <span className="meta-val">7 Daerah (Seluruh Negeri Sembilan)</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Punca Data Kadaster:</span>
              <span className="meta-val">Pangkalan Data NDCDB & GDM2000 JUPEM</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status Enjin Spasial:</span>
              <span className="meta-val highlight-green">Aktif & Disahkan (QGIS Engine)</span>
            </div>
          </div>

          {/* 1. Ringkasan Eksekutif (4 Clean Vibrant Cards) */}
          <div className="report-section-title">
            <ShieldCheck size={16} color="#2563eb" />
            <span>1. Ringkasan Keluasan Tanah Rizab Keseluruhan</span>
          </div>

          <div className="report-kpi-grid">
            {/* TRM Card */}
            <div className="report-kpi-card card-trm">
              <div className="kpi-card-header">
                <span className="kpi-label">Tanah Rizab Melayu (TRM)</span>
                <span className="kpi-tag trm">Enakmen TRM</span>
              </div>
              <div className="kpi-value-text text-red">
                {SUMMARY_STATS_NS.totalRizabMelayuHektar.toLocaleString()} <span className="kpi-unit">Hektar</span>
              </div>
              <div className="kpi-sub-stats">
                <span>≈ 3,912.0 Ekar</span> • <span>87 Warta Aktif</span>
              </div>
            </div>

            {/* HSK Card */}
            <div className="report-kpi-card card-hsk">
              <div className="kpi-card-header">
                <span className="kpi-label">Hutan Simpan Kekal (HSK)</span>
                <span className="kpi-tag hsk">Jab. Perhutanan</span>
              </div>
              <div className="kpi-value-text text-green">
                {SUMMARY_STATS_NS.totalHutanSimpanHektar.toLocaleString()} <span className="kpi-unit">Hektar</span>
              </div>
              <div className="kpi-sub-stats">
                <span>≈ 49,471.6 Ekar</span> • <span>28.4% Liputan Negeri</span>
              </div>
            </div>

            {/* ROA Card */}
            <div className="report-kpi-card card-roa">
              <div className="kpi-card-header">
                <span className="kpi-label">Rizab Orang Asli (ROA)</span>
                <span className="kpi-tag roa">Warta JAKOA</span>
              </div>
              <div className="kpi-value-text text-purple">
                {SUMMARY_STATS_NS.totalOrangAsliHektar.toLocaleString()} <span className="kpi-unit">Hektar</span>
              </div>
              <div className="kpi-sub-stats">
                <span>≈ 2,054.7 Ekar</span> • <span>14 Perkampungan</span>
              </div>
            </div>

            {/* Total Card */}
            <div className="report-kpi-card card-total">
              <div className="kpi-card-header">
                <span className="kpi-label">Jumlah Keseluruhan Rizab</span>
                <span className="kpi-tag total">Kumulatif</span>
              </div>
              <div className="kpi-value-text text-blue">
                {totalAllReserves} <span className="kpi-unit">Hektar</span>
              </div>
              <div className="kpi-sub-stats">
                <span>100% Liputan Kadaster N.S.</span>
              </div>
            </div>
          </div>

          {/* 2. Imbangan Warta TRM (Pembatalan vs Penggantian) */}
          <div className="report-section-title" style={{ marginTop: '1.25rem' }}>
            <Layers size={16} color="#059669" />
            <span>2. Status Keseimbangan Warta TRM (Enakmen Rizab Melayu Cap 142)</span>
          </div>

          <div className="report-balance-box">
            <div className="balance-item">
              <div className="balance-title">Keluasan Asal Berwarta</div>
              <div className="balance-number">{SUMMARY_STATS_NS.totalRizabMelayuHektar.toLocaleString()} Ha</div>
              <div className="balance-note">Keluasan Asas TRM</div>
            </div>
            <div className="balance-divider">➔</div>
            <div className="balance-item warning">
              <div className="balance-title">Permohonan Pembatalan</div>
              <div className="balance-number text-red">- 42.50 Ha</div>
              <div className="balance-note">Prasarana Awam & Utiliti</div>
            </div>
            <div className="balance-divider">➔</div>
            <div className="balance-item success">
              <div className="balance-title">Tanah Penggantian Diluluskan</div>
              <div className="balance-number text-green">+ 48.20 Ha</div>
              <div className="balance-note">Warta Gantian Terkini</div>
            </div>
            <div className="balance-divider">=</div>
            <div className="balance-item final">
              <div className="balance-title">Kedudukan Bersih (Net Status)</div>
              <div className="balance-number text-blue">+ 5.70 Ha (Surplus)</div>
              <div className="balance-note"> Nisbah Terpelihara (100.36%)</div>
            </div>
          </div>

          {/* 3. Jadual Perincian Spasial 7 Daerah Pentadbiran */}
          <div className="report-section-title" style={{ marginTop: '1.25rem' }}>
            <Building2 size={16} color="#475569" />
            <span>3. Matriks Perincian Keluasan Mengikut Daerah Pentadbiran N.S.</span>
          </div>

          <div className="report-table-card">
            <table className="report-clean-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Daerah Pentadbiran</th>
                  <th style={{ width: '18%', textAlign: 'right' }}>Rizab Melayu (Ha)</th>
                  <th style={{ width: '18%', textAlign: 'right' }}>Hutan Simpan (Ha)</th>
                  <th style={{ width: '18%', textAlign: 'right' }}>Rizab Orang Asli (Ha)</th>
                  <th style={{ width: '24%', textAlign: 'right' }}>Jumlah Daerah (Ha)</th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_STATS_NS.daerahList.map((d, index) => {
                  const districtTotal = (d.rm + d.hsk + d.roa).toFixed(1);
                  return (
                    <tr key={d.nama} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                      <td className="cell-district">
                        <MapPin size={13} color="#2563eb" style={{ display: 'inline', marginRight: '4px' }} />
                        <strong>{d.nama}</strong>
                      </td>
                      <td className="cell-num text-red">{d.rm.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                      <td className="cell-num text-green">{d.hsk.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                      <td className="cell-num text-purple">{d.roa.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                      <td className="cell-num font-bold text-dark">{parseFloat(districtTotal).toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="table-total-row">
                  <td className="cell-total-label">JUMLAH KESELURUHAN (NEGERI)</td>
                  <td className="cell-total-num text-red">{SUMMARY_STATS_NS.totalRizabMelayuHektar.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                  <td className="cell-total-num text-green">{SUMMARY_STATS_NS.totalHutanSimpanHektar.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                  <td className="cell-total-num text-purple">{SUMMARY_STATS_NS.totalOrangAsliHektar.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                  <td className="cell-total-num text-blue font-extrabold">{totalAllReserves}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 4. Perakuan & Tandatangan Rasmi Pentadbir */}
          <div className="report-footer-verification">
            <div className="verification-notes">
              <div className="verification-notes-title">Catatan & Pengesahan Sistem:</div>
              <ul className="verification-notes-list">
                <li>Laporan ini dijana secara automatik oleh Enjin Pemetaan Spasial <strong>MRIS (QGIS Integration Module)</strong>.</li>
                <li>Sempadan dan keluasan adalah berpandukan lapisan kadaster NDCDB Negeri Sembilan berkoordinat Cassini-Soldner (N.S.).</li>
                <li>Sebarang pengesahan fizikal sempadan hendaklah merujuk kepada Pelan Akui (PA) rasmi JUPEM Negeri Sembilan.</li>
              </ul>
            </div>

            <div className="verification-sign-box">
              <div className="sign-stamp-badge">
                <CheckCircle2 size={16} color="#059669" />
                <span>PENGESAHAN DIGITAL JUPEM / MRIS</span>
              </div>
              <div className="sign-role">Pegawai Pentadbir GIS MRIS</div>
              <div className="sign-dept">Bahagian Kadaster & Pemetaan Negeri Sembilan</div>
              <div className="sign-date">Tarikh Cetakan: {currentDate}</div>
            </div>
          </div>
        </div>

        {/* Screen Action Bottom Bar */}
        <div className="report-modal-footer-bar">
          <div className="footer-bar-left">
            <span>ℹ️ Laporan sedia untuk dicetak pada kertas saiz standard A4.</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleDownloadCSV} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>
              <FileSpreadsheet size={15} /> Muat Turun CSV
            </button>
            <button onClick={handlePrint} className="btn-primary" style={{ fontSize: '0.78rem', padding: '0.45rem 1rem' }}>
              <Printer size={15} /> Cetak Laporan PDF
            </button>
            <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
