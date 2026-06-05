import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaChartBar, FaInbox, FaHome, FaSignOutAlt, FaBoxOpen } from 'react-icons/fa';
import beautyServices from '../assets/beauty-services.jpg';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const adminUserStr = localStorage.getItem('adminUser');
  let adminUser = user;
  if (adminUserStr) {
    try {
      adminUser = JSON.parse(adminUserStr);
    } catch (e) {}
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      {/* Sidebar */}
      <aside 
        style={{ 
          width: '280px', 
          backgroundColor: 'var(--card-background)', 
          borderRight: '1px solid var(--border-color)', 
          display: 'flex', 
          flexDirection: 'column',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh'
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span 
            style={{ 
              backgroundColor: 'var(--accent-color)', 
              color: '#fff', 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.25rem'
            }}
          >
            G
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px', color: 'var(--dark-accent)' }}>GlowCare Admin</span>
        </div>

        {/* User Info Bar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Signed in as</span>
          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-color)', marginTop: '0.2rem' }}>{adminUser?.name || 'Admin'}</span>
        </div>

        {/* Sidebar Navigation */}
        <nav style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          <NavLink 
            to="/admin/dashboard" 
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              fontWeight: '600',
              color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
              backgroundColor: isActive ? 'var(--surface-background)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s'
            })}
          >
            <FaChartBar />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              fontWeight: '600',
              color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
              backgroundColor: isActive ? 'var(--surface-background)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s'
            })}
          >
            <FaBoxOpen />
            <span>Manage Products</span>
          </NavLink>

          <NavLink 
            to="/admin/enquiries" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              fontWeight: '600',
              color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
              backgroundColor: isActive ? 'var(--surface-background)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s'
            })}
          >
            <FaInbox />
            <span>Manage Enquiries</span>
          </NavLink>
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              fontWeight: '600',
              color: 'var(--text-color)',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            <FaHome />
            <span>Back to Website</span>
          </Link>

          <button 
            onClick={handleLogoutClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1rem',
              borderRadius: '10px',
              fontWeight: '600',
              color: '#C74A34',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        height: '100vh', 
        padding: '0 2rem',
        background: `linear-gradient(var(--admin-bg-overlay, rgba(252, 243, 238, 0.85)), var(--admin-bg-overlay, rgba(252, 243, 238, 0.85))), url(${beautyServices}) no-repeat center center / cover`
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
