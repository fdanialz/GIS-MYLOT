import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, X, CheckCircle2, AlertCircle, Sparkles, LogIn, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('adminns@gmail.com');
  const [password, setPassword] = useState('adminns@gmail.com');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Required credentials: adminns@gmail.com / adminns@gmail.com
    if (cleanEmail === 'adminns@gmail.com' && cleanPassword === 'adminns@gmail.com') {
      setIsSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            email: 'adminns@gmail.com',
            name: 'Pentadbir Negeri Sembilan',
            role: 'Super Admin'
          });
        }
        setIsSuccess(false);
        onClose();
      }, 700);
    } else {
      setErrorMsg('Kredensial tidak sah. Sila masukkan emel dan kata laluan: adminns@gmail.com');
    }
  };

  const handleQuickAutofill = () => {
    setEmail('adminns@gmail.com');
    setPassword('adminns@gmail.com');
    setErrorMsg('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
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
            onClick={onClose}
            className="close-btn"
            title="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="admin-login-body">
          {isSuccess ? (
            <div className="admin-login-success-view">
              <div className="admin-success-circle">
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#10b981', marginTop: '0.5rem' }}>
                Log Masuk Berjaya!
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Selamat kembali, Pentadbir Negeri Sembilan (adminns@gmail.com).
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="admin-login-form">
              {/* Quick Preset Badge */}
              <div className="admin-preset-badge" onClick={handleQuickAutofill} title="Klik untuk autofill kredensial rasmi">
                <Sparkles size={13} color="#6366f1" />
                <span>Kredensial Rasmi: <strong>adminns@gmail.com</strong></span>
              </div>

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
                    placeholder="adminns@gmail.com"
                    className="admin-form-input"
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
                    placeholder="••••••••••••"
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

              {/* Error Message */}
              {errorMsg && (
                <div className="admin-error-box">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                className="admin-login-submit-btn"
              >
                <LogIn size={16} />
                <span>Log Masuk Sebagai Admin</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
