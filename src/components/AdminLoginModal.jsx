import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  X, 
  CheckCircle2, 
  XCircle, 
  LogIn, 
  Eye, 
  EyeOff,
  AlertTriangle
} from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Alert popup states: 'none', 'error', 'success'
  const [statusPopup, setStatusPopup] = useState('none');
  const [popupMessage, setPopupMessage] = useState('');

  if (!isOpen) return null;

  const handleCloseAll = () => {
    setEmail('');
    setPassword('');
    setStatusPopup('none');
    setPopupMessage('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setPopupMessage('Sila masukkan emel dan kata laluan lengkap.');
      setStatusPopup('error');
      return;
    }

    // Verify credentials
    if (cleanEmail === 'adminns@gmail.com' && cleanPassword === 'adminns@gmail.com') {
      setPopupMessage('Emel dan kata laluan adalah betul. Anda telah berjaya log masuk sebagai Pentadbir MRIS.');
      setStatusPopup('success');

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            email: 'adminns@gmail.com',
            name: 'Pentadbir Negeri Sembilan',
            role: 'Super Admin'
          });
        }
        handleCloseAll();
      }, 1500);
    } else {
      setPopupMessage('Emel atau kata laluan yang dimasukkan adalah salah. Sila pastikan maklumat log masuk anda tepat.');
      setStatusPopup('error');
    }
  };

  return (
    <div className="modal-overlay" onClick={handleCloseAll}>
      <div className="admin-login-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="admin-login-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="admin-header-shield-icon">
              <ShieldCheck size={22} color="#6366f1" />
            </div>
            <div>
              <div className="admin-login-title">Log Masuk Pentadbir</div>
              <div className="admin-login-subtitle">Portal MRIS Tanah Rizab Melayu N.S.</div>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleCloseAll}
            className="close-btn"
            title="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="admin-login-body">
          {/* Main Login Form */}
          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Email Input */}
            <div className="admin-form-group">
              <label className="admin-form-label">Emel Pentadbir:</label>
              <div className="admin-input-wrapper">
                <Mail size={15} className="admin-input-icon" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan emel anda"
                  className="admin-form-input"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="admin-form-group">
              <label className="admin-form-label">Kata Laluan:</label>
              <div className="admin-input-wrapper">
                <Lock size={15} className="admin-input-icon" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata laluan anda"
                  className="admin-form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-password-toggle-btn"
                  title={showPassword ? "Sembunyi kata laluan" : "Papar kata laluan"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="admin-login-submit-btn"
            >
              <LogIn size={16} />
              <span>Log Masuk</span>
            </button>
          </form>
        </div>
      </div>

      {/* Pop-up Alert: Emel/Password Salah atau Berjaya */}
      {statusPopup !== 'none' && (
        <div className="modal-overlay" style={{ zIndex: 2500 }} onClick={() => statusPopup === 'error' && setStatusPopup('none')}>
          <div 
            className={`admin-alert-popup ${statusPopup === 'success' ? 'popup-success' : 'popup-error'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-alert-icon-wrap">
              {statusPopup === 'success' ? (
                <CheckCircle2 size={44} color="#10b981" />
              ) : (
                <XCircle size={44} color="#ef4444" />
              )}
            </div>

            <div className="admin-alert-title">
              {statusPopup === 'success' ? 'Berjaya Log Masuk!' : 'Emel atau Kata Laluan Salah'}
            </div>

            <div className="admin-alert-desc">
              {popupMessage}
            </div>

            {statusPopup === 'error' ? (
              <button 
                type="button"
                onClick={() => setStatusPopup('none')}
                className="admin-alert-action-btn error-btn"
              >
                Cuba Semula
              </button>
            ) : (
              <div className="admin-alert-loading">
                <span className="admin-alert-loading-dot" /> Sedang memuatkan paparan...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
