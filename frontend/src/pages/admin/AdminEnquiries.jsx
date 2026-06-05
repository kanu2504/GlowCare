import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import '../../styles/pages.css';

const AdminEnquiries = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search filter states matching PDF requirements: name, phone, product
  const [filterName, setFilterName] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filterProduct, setFilterProduct] = useState('');

  // Modal detail states
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAdminHeaders = () => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login', { replace: true });
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
  };

  const fetchEnquiries = async () => {
    const config = getAdminHeaders();
    if (!config) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/enquiries`, config);
      setEnquiries(response.data.data || []);
      setFilteredEnquiries(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load enquiries');
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Multi-input filtering logic for Name, Phone, and Product
  useEffect(() => {
    let filtered = enquiries;

    if (filterName.trim()) {
      filtered = filtered.filter((e) =>
        e.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterPhone.trim()) {
      filtered = filtered.filter((e) =>
        e.phone.includes(filterPhone)
      );
    }

    if (filterProduct.trim()) {
      filtered = filtered.filter((e) =>
        e.product.toLowerCase().includes(filterProduct.toLowerCase())
      );
    }

    setFilteredEnquiries(filtered);
  }, [filterName, filterPhone, filterProduct, enquiries]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer inquiry?')) return;

    const config = getAdminHeaders();
    if (!config) return;

    try {
      await axios.delete(`${API_BASE_URL}/enquiries/${id}`, config);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert('Failed to delete inquiry. Please try again.');
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login', { replace: true });
      }
    }
  };

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  // Dashboard calculation stats
  const totalInquiries = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const closedCount = enquiries.filter((e) => e.status === 'Closed').length;

  return (
    <div className="admin-enquiries-page">
      <section className="page-header section">
        <div className="container">
          <h1>Customer Inquiry Dashboard</h1>
          <p>View, manage and respond to customer inquiries</p>
        </div>
      </section>

      <section className="admin-section section">
        <div className="container">
          {/* Dashboard Stats Cards */}
          <div className="dashboard-cards-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="dashboard-stat-card card">
              <h3>Total Inquiries</h3>
              <div className="card-value">{totalInquiries}</div>
            </div>
            <div className="dashboard-stat-card card">
              <h3>New Enquiries</h3>
              <div className="card-value" style={{ color: 'var(--accent-color)' }}>{newCount}</div>
            </div>
            <div className="dashboard-stat-card card">
              <h3>Contacted</h3>
              <div className="card-value" style={{ color: 'var(--secondary-color)' }}>{contactedCount}</div>
            </div>
            <div className="dashboard-stat-card card">
              <h3>Closed</h3>
              <div className="card-value" style={{ color: 'var(--green-accent)' }}>{closedCount}</div>
            </div>
          </div>

          {/* Search Filters Row (Name, Phone, Product) */}
          <div className="admin-search-section card" style={{ marginBottom: '2rem' }}>
            <div className="search-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="searchName" style={{ fontSize: '0.85rem' }}>Search by Name</label>
                <input
                  type="text"
                  id="searchName"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Customer name..."
                  style={{ padding: '0.65rem 0.95rem', borderRadius: '10px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="searchPhone" style={{ fontSize: '0.85rem' }}>Search by Mobile Number</label>
                <input
                  type="text"
                  id="searchPhone"
                  value={filterPhone}
                  onChange={(e) => setFilterPhone(e.target.value)}
                  placeholder="Mobile number..."
                  style={{ padding: '0.65rem 0.95rem', borderRadius: '10px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="searchProduct" style={{ fontSize: '0.85rem' }}>Search by Product</label>
                <input
                  type="text"
                  id="searchProduct"
                  value={filterProduct}
                  onChange={(e) => setFilterProduct(e.target.value)}
                  placeholder="Product name..."
                  style={{ padding: '0.65rem 0.95rem', borderRadius: '10px' }}
                />
              </div>
            </div>
            
            {(filterName || filterPhone || filterProduct) && (
              <button
                className="btn btn-outline"
                onClick={() => {
                  setFilterName('');
                  setFilterPhone('');
                  setFilterProduct('');
                }}
                style={{ marginTop: '1rem', minHeight: '34px', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {loading && <p className="text-center">Loading inquiries...</p>}
          {error && <p className="text-center error-alert">{error}</p>}

          {/* Empty State */}
          {!loading && !error && filteredEnquiries.length === 0 && (
            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--muted-text)', margin: 0 }}>
                No customer inquiries match the search filters.
              </p>
            </div>
          )}

          {/* Enquiries Table Scroll Container */}
          {!loading && !error && filteredEnquiries.length > 0 && (
            <div className="admin-table-scroll">
              <table className="admin-enquiries-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Mobile Number</th>
                    <th>Email Address</th>
                    <th>Product Interest</th>
                    <th style={{ textAlign: 'center' }}>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((enquiry) => {
                    return (
                      <tr key={enquiry._id}>
                        <td className="enquiry-name-cell" title={enquiry.name}>
                          {enquiry.name}
                        </td>
                        <td>{enquiry.phone}</td>
                        <td>
                          <div className="enquiry-email" title={enquiry.email}>
                            {enquiry.email}
                          </div>
                        </td>
                        <td>
                          <div className="enquiry-product" title={enquiry.product}>
                            {enquiry.product}
                          </div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="enquiry-actions">
                            <button
                              type="button"
                              className="btn-action-view"
                              onClick={() => handleView(enquiry)}
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn-action-delete"
                              onClick={() => handleDelete(enquiry._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* View Detail Overlay Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2 style={{ fontFamily: 'Playfair Display', color: 'var(--dark-accent)' }}>Inquiry Details</h2>
            
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <h4>Customer Name</h4>
              <p style={{ fontWeight: '600' }}>{selectedEnquiry.name}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
                <div>
                  <h4>Mobile Number</h4>
                  <p>{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <h4>Email Address</h4>
                  <p>{selectedEnquiry.email}</p>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4>Product Interest</h4>
                <p style={{ fontWeight: '600', color: 'var(--accent-color)' }}>{selectedEnquiry.product}</p>
              </div>

              <h4>Message / Special Instructions</h4>
              <p style={{ whiteSpace: 'pre-wrap', backgroundColor: 'var(--surface-background)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                {selectedEnquiry.message}
              </p>

              <h4>Received Date</h4>
              <p>{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
