import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import beautyServices from '../../assets/beauty-services.jpg';
import '../../styles/pages.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in as admin, redirect to admin dashboard immediately
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUserStr = localStorage.getItem('adminUser');
    let isAdmin = false;
    if (adminUserStr) {
      try {
        const parsed = JSON.parse(adminUserStr);
        isAdmin = parsed?.role === 'admin';
      } catch (e) {}
    }
    if (adminToken && isAdmin) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in all credentials');
      return;
    }

    try {
      setLoading(true);
      console.log("Admin login API URL:", `${API_BASE_URL}/auth/admin-login`);
      const response = await axios.post(`${API_BASE_URL}/auth/admin-login`, { email, password });
      const { token, user } = response.data;

      if (!user || user.role !== 'admin') {
        setError('Access denied. You do not have administrator permissions.');
        return;
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error('Failed API Call Details:', {
        url: `${API_BASE_URL}/auth/admin-login`,
        status: err.response?.status || 'No Status Code',
        response: err.response?.data || err.message,
      });
      setError(err.response?.data?.message || 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page" style={{ 
      padding: '6rem 1rem',
      background: `linear-gradient(var(--admin-bg-overlay, rgba(252, 243, 238, 0.85)), var(--admin-bg-overlay, rgba(252, 243, 238, 0.85))), url(${beautyServices}) no-repeat center center / cover`,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '3rem 2.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '72px', 
                height: '72px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--surface-background)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-color)',
                fontSize: '2rem',
                marginBottom: '1rem'
              }}
            >
              <FaShieldAlt />
            </div>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--dark-accent)' }}>Admin Portal</h1>
            <p style={{ color: 'var(--muted-text)', fontSize: '0.95rem', margin: 0 }}>GlowCare Wellness Dashboard Login</p>
          </div>

          {error && (
            <div 
              className="error-alert" 
              style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                marginBottom: '1.5rem', 
                fontSize: '0.9rem', 
                fontWeight: '600',
                backgroundColor: 'rgba(199, 74, 52, 0.1)',
                border: '1px solid rgba(199, 74, 52, 0.2)',
                color: '#C74A34',
                textAlign: 'left'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Address */}
            <div className="floating-group" style={{ marginBottom: '1.5rem' }}>
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={email ? 'has-value' : ''}
                placeholder=""
                disabled={loading}
                required
              />
              <label htmlFor="email">Admin Email Address</label>
            </div>

            {/* Password */}
            <div className="floating-group" style={{ marginBottom: '2rem' }}>
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className={password ? 'has-value' : ''}
                placeholder=""
                style={{ paddingRight: '3rem' }}
                disabled={loading}
                required
              />
              <label htmlFor="password">Security Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted-text)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  zIndex: 3
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                minHeight: '52px', 
                borderRadius: '14px', 
                fontSize: '1.05rem', 
                fontWeight: '700',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              disabled={loading}
            >
              {loading ? 'Verifying Credentials...' : 'Authenticate'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: 'var(--muted-text)' }}>
            <span style={{ fontWeight: '500' }}>Tip: Use the default seed account:</span>
            <div style={{ fontFamily: 'monospace', margin: '0.5rem 0', padding: '0.4rem', backgroundColor: 'var(--surface-background)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              admin@glowcare.com / Admin@123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
