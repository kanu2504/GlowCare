import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaAngleDown,
  FaBars,
  FaMoon,
  FaSun,
  FaTimes,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa';
import { shopCategories } from '../data/glowcareProducts';
import '../styles/navbar.css';

const Navbar = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  // Hide the standard public navbar if we are inside the admin dashboard panel
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  useEffect(() => {
    setIsMenuOpen(false);
    setIsShopOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleShop = () => {
    setIsShopOpen((prev) => !prev);
  };

  if (isAdminPath) {
    return null;
  }

  return (
    <header className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-mark">G</span>
          <span>GlowCare</span>
        </Link>

        <nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>Home</span>
          </NavLink>

          <div
            className={`nav-dropdown ${isShopOpen ? 'open' : ''}`}
            onMouseEnter={() => isDesktop && setIsShopOpen(true)}
            onMouseLeave={() => isDesktop && setIsShopOpen(false)}
          >
            <button type="button" className="nav-link shop-link" onClick={toggleShop}>
              <span>Shop Beauty</span>
              <FaAngleDown className="dropdown-icon" aria-hidden="true" />
            </button>
            <div className="dropdown-menu" aria-label="Shop Beauty categories">
              {shopCategories.map((item) => (
                <Link key={item} to={`/products?category=${encodeURIComponent(item)}`} className="dropdown-link">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>Blog</span>
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>About</span>
          </NavLink>

          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>Services</span>
          </NavLink>

          <div className="navbar-actions mobile-actions">
            {isAuthenticated ? (
              <>
                {!isAdmin && (
                  <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Profile
                  </NavLink>
                )}
                <button 
                  type="button" 
                  onClick={logout} 
                  className="login-button" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.40rem', cursor: 'pointer' }}
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => `login-button ${isActive ? 'active' : ''}`}>
                Login
              </NavLink>
            )}
            <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>

        <div className="navbar-actions desktop-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {!isAdmin && (
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
                  <FaUser size={13} />
                  <span>Profile</span>
                </NavLink>
              )}
              <button 
                type="button" 
                onClick={logout} 
                className="login-button" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px'
                }}
              >
                <FaSignOutAlt size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `login-button ${isActive ? 'active' : ''}`}>
              Login
            </NavLink>
          )}
          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
