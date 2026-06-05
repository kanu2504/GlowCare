import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import beautyServices from '../assets/beauty-services.jpg';
import '../styles/pages.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim() && !formData.password) {
      newErrors.submit = 'Please enter email and password.';
      setErrors(newErrors);
      return false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      // Customer login page should never allow admin login
      if (result.user.role === 'admin') {
        setErrors({ submit: 'Admin accounts must use the Admin Portal to log in.' });
        return;
      }
      
      // Determine message to show
      setSuccessMsg(result.message || 'Login successful');
      
      setTimeout(() => {
        const pendingProduct = localStorage.getItem('pendingEnquiryProduct');
        if (pendingProduct) {
          localStorage.removeItem('pendingEnquiryProduct');
          navigate('/enquiry', { state: { productName: pendingProduct }, replace: true });
        } else {
          const from = location.state?.from?.pathname || '/products';
          const navOptions = { replace: true };
          if (from === '/enquiry' && location.state?.productName) {
            navOptions.state = { productName: location.state.productName };
          }
          navigate(from, navOptions);
        }
      }, 1000);
    } else {
      setErrors({ submit: result.error });
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google login setup is pending. Please use email and password.');
  };

  return (
    <div className="login-page">
      {/* Scoped CSS Inject block for Login section */}
      <style>{`
        .login-hero {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url(${beautyServices});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          text-align: center;
          color: #fff;
          padding: 4rem 1rem;
        }

        .login-hero-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.45);
          z-index: 1;
        }

        .login-hero-content {
          position: relative;
          z-index: 2;
          max-width: 840px;
          animation: loginFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes loginFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          color: #fff !important;
          font-family: 'Playfair Display', serif;
          margin-bottom: 1.2rem;
          font-weight: 800;
          line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .login-hero p {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.95) !important;
          line-height: 1.65;
          margin: 0 auto;
          max-width: 720px;
          text-shadow: 0 1px 5px rgba(0,0,0,0.2);
        }

        .login-luxury-section {
          padding: 4rem 1rem 6rem;
          background-color: var(--background-color);
        }

        .login-luxury-container {
          max-width: 480px;
          width: 90%;
          margin: -120px auto 0;
          position: relative;
          z-index: 10;
          border-radius: 30px;
          padding: 50px 40px;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.4);
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        body.dark-mode .login-luxury-container {
          background-color: rgba(42, 33, 29, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 768px) {
          .login-hero {
            min-height: 460px;
          }
          
          .login-luxury-container {
            width: 95%;
            padding: 40px 25px;
            margin-top: -80px;
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="login-hero">
        <div className="login-hero-overlay" />
        <div className="login-hero-content">
          <h1>Customer Login</h1>
          <p>
            Access your GlowCare account and continue exploring our wellness products.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="login-luxury-section">
        <div className="login-luxury-container">
          {/* Success Messages */}
          {successMsg && (
            <div 
              className="success-message" 
              style={{ 
                marginBottom: '1.5rem', 
                padding: '0.8rem', 
                borderRadius: '10px', 
                backgroundColor: 'rgba(78, 135, 82, 0.1)', 
                border: '1px solid rgba(78, 135, 82, 0.2)', 
                color: '#4E8752', 
                fontSize: '0.9rem', 
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              ✅ {successMsg}
            </div>
          )}

          {/* Error Messages */}
          {errors.submit && (
            <div 
              className="error-alert" 
              style={{ 
                marginBottom: '1.5rem', 
                padding: '0.8rem', 
                borderRadius: '10px', 
                backgroundColor: 'rgba(199, 74, 52, 0.1)', 
                border: '1px solid rgba(199, 74, 52, 0.2)', 
                color: '#C74A34', 
                fontSize: '0.9rem', 
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              ⚠️ {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Address Field */}
            <div className="floating-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formData.email ? 'has-value' : ''}
                placeholder=""
                disabled={loading}
              />
              <label htmlFor="email">Email Address</label>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="floating-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={formData.password ? 'has-value' : ''}
                placeholder=""
                style={{ paddingRight: '3rem' }}
                disabled={loading}
              />
              <label htmlFor="password">Password</label>
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
                  minHeight: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Remember Me */}
            <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '1.25rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500', marginBottom: 0, fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={{ width: 'auto', cursor: 'pointer', margin: 0 }}
                  disabled={loading}
                />
                Remember Me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', minHeight: '52px', borderRadius: '14px', marginTop: '1rem', fontSize: '1.05rem' }}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGoogleSignIn}
              style={{
                width: '100%',
                minHeight: '52px',
                borderRadius: '14px',
                marginTop: '0.8rem',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem'
              }}
              disabled={loading}
            >
              {/* Inline Google G Logo SVG */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.2rem' }}>
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                <path d="M3.964 10.707a5.412 5.412 0 010-3.414V4.961H.957a8.997 8.997 0 000 8.08l3.007-2.334z" fill="#FBBC05" />
                <path d="M9 3.58c1.32 0 2.507.454 3.44 1.347l2.58-2.58C13.463.89 11.426 0 9 0A8.997 8.997 0 00.957 4.961l3.007 2.333c.708-2.127 2.692-3.714 5.036-3.714z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
