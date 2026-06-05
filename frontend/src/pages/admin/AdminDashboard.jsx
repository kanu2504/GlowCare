import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { FaInbox, FaRegCheckCircle, FaExclamationCircle, FaUserClock, FaArrowRight, FaBoxOpen } from 'react-icons/fa';
import '../../styles/pages.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    contactedEnquiries: 0,
    closedEnquiries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        navigate('/admin/login', { replace: true });
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };

      try {
        setLoading(true);
        const [productsRes, enquiriesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/enquiries`, config)
        ]);

        const products = productsRes.data.data || [];
        const enquiries = enquiriesRes.data.data || [];

        const newCount = enquiries.filter((e) => e.status === 'New').length;
        const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
        const closedCount = enquiries.filter((e) => e.status === 'Closed').length;

        setStats({
          totalProducts: products.length,
          totalEnquiries: enquiries.length,
          newEnquiries: newCount,
          contactedEnquiries: contactedCount,
          closedEnquiries: closedCount,
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err);
        setError('Failed to load dashboard metrics');
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/admin/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="admin-dashboard-page" style={{ padding: '4rem 1rem' }}>
      <section className="page-header section" style={{ padding: '2rem 0', marginBottom: '2rem' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Playfair Display' }}>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || 'Administrator'}. Here is your customer enquiry overview.</p>
        </div>
      </section>

      <section className="dashboard-section section" style={{ padding: '1rem 0' }}>
        <div className="container">
          {loading && <p className="text-center">Loading operations dashboard...</p>}
          {error && <p className="text-center error-alert">{error}</p>}

          {!loading && !error && (
            <>
              {/* Stat Cards */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1.5rem', 
                  marginBottom: '3.5rem' 
                }}
              >
                {/* Total Products */}
                <div className="card" style={{ padding: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', display: 'flex' }}>
                    <FaBoxOpen />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--muted-text)', textTransform: 'uppercase' }}>Total Products</h3>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stats.totalProducts}</div>
                  </div>
                </div>

                {/* Total Enquiries */}
                <div className="card" style={{ padding: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', color: 'var(--secondary-color)', display: 'flex' }}>
                    <FaInbox />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--muted-text)', textTransform: 'uppercase' }}>Total Enquiries</h3>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stats.totalEnquiries}</div>
                  </div>
                </div>

                {/* New Enquiries */}
                <div className="card" style={{ padding: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', display: 'flex' }}>
                    <FaExclamationCircle />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--muted-text)', textTransform: 'uppercase' }}>New</h3>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-color)' }}>{stats.newEnquiries}</div>
                  </div>
                </div>

                {/* Contacted Enquiries */}
                <div className="card" style={{ padding: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', color: '#B88166', display: 'flex' }}>
                    <FaUserClock />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--muted-text)', textTransform: 'uppercase' }}>Contacted</h3>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#B88166' }}>{stats.contactedEnquiries}</div>
                  </div>
                </div>

                {/* Closed Enquiries */}
                <div className="card" style={{ padding: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', color: '#4E8752', display: 'flex' }}>
                    <FaRegCheckCircle />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--muted-text)', textTransform: 'uppercase' }}>Closed</h3>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#4E8752' }}>{stats.closedEnquiries}</div>
                  </div>
                </div>
              </div>

              {/* Management Operations Quick Links */}
              <h2 style={{ fontFamily: 'Playfair Display', marginBottom: '1.5rem', textAlign: 'left' }}>Management Portal Control</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                
                {/* Products Control Card */}
                <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--dark-accent)' }}>
                    Product Catalog
                  </h3>
                  <p style={{ color: 'var(--muted-text)', flexGrow: 1, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    View and inspect the products currently active on the GlowCare Wellness storefront. Monitor details such as category classification, pricing, image references, and summary descriptions.
                  </p>
                  <Link 
                    to="/admin/products" 
                    className="btn btn-primary" 
                    style={{ 
                      alignSelf: 'flex-start', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      padding: '0.8rem 1.8rem'
                    }}
                  >
                    <span>Manage Products</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                {/* Enquiries Card */}
                <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--dark-accent)' }}>
                    Customer Inquiries
                  </h3>
                  <p style={{ color: 'var(--muted-text)', flexGrow: 1, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    View and update customer enquiries regarding products. Filter by name, phone, or product interest and change statuses to New, Contacted, or Closed.
                  </p>
                  <Link 
                    to="/admin/enquiries" 
                    className="btn btn-primary" 
                    style={{ 
                      alignSelf: 'flex-start', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      padding: '0.8rem 1.8rem'
                    }}
                  >
                    <span>Manage Enquiries</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
