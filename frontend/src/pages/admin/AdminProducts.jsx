import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import api, { updateProduct } from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaBoxOpen, FaStar } from 'react-icons/fa';
import '../../styles/pages.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const categories = ['Skincare', 'Hair Care', 'Wellness', 'Beauty', 'Consultation'];

  const [formData, setFormData] = useState({
    name: '',
    category: 'Skincare',
    price: '',
    stock: 20,
    rating: 4.6,
    shortDescription: '',
    description: '',
    image: '',
    benefits: []
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);

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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products/admin/all');
      setProducts(res.data.products || res.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching admin products:', err);
      setError('Failed to load products list.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showFeedback = (msg, isSuccess = true) => {
    if (isSuccess) {
      setSuccessMsg(msg);
      setError(null);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setError(msg);
      setSuccessMsg('');
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' || name === 'stock' ? parseFloat(value) || '' : value
    }));
    // Clear validation error on change
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Product name is required';
    if (!formData.image?.trim()) errors.image = 'Image URL is required';
    if (formData.price === '' || formData.price < 0) errors.price = 'Valid price is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.shortDescription?.trim()) errors.shortDescription = 'Short description is required';
    if (!formData.description?.trim()) errors.description = 'Full description is required';
    if (formData.rating === '' || formData.rating < 0 || formData.rating > 5) {
      errors.rating = 'Rating must be between 0 and 5';
    }
    if (formData.stock === '' || formData.stock < 0) {
      errors.stock = 'Valid stock level is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedProductId(null);
    setFormData({
      name: '',
      category: 'Skincare',
      price: '',
      stock: 20,
      rating: 4.6,
      shortDescription: '',
      description: '',
      image: '',
      benefits: ['Premium quality', 'Thoughtful daily care', 'GlowCare approved']
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setSelectedProductId(product._id);
    setFormData({
      name: product.name || '',
      category: product.category || 'Skincare',
      price: product.price !== undefined ? product.price : '',
      stock: product.stock !== undefined ? product.stock : 20,
      rating: product.rating !== undefined ? product.rating : 4.6,
      shortDescription: product.shortDescription || '',
      description: product.description || product.fullDescription || '',
      image: product.image || product.imageUrl || '',
      benefits: Array.isArray(product.benefits) ? product.benefits : []
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const editingProduct = modalMode === 'edit';
  const closeModal = () => setIsModalOpen(false);

  const isSaveDisabled = 
    !formData.name?.trim() || 
    !formData.image?.trim() || 
    formData.price === '' || 
    formData.price === null || 
    formData.price === undefined || 
    Number(formData.price) < 0 || 
    !formData.category || 
    !formData.shortDescription?.trim() || 
    !formData.description?.trim() || 
    formData.rating === '' || 
    formData.rating === null || 
    formData.rating === undefined || 
    Number(formData.rating) < 0 || 
    Number(formData.rating) > 5;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setFormSubmitting(true);
      await api.post('/products', formData);
      showFeedback('Product added successfully!');
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      showFeedback('An error occurred. Please verify form details and permissions.', false);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login', { replace: true });
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setFormSubmitting(true);

      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        rating: Number(formData.rating),
        stock: Number(formData.stock),
        image: formData.image,
        shortDescription: formData.shortDescription,
        description: formData.description,
        benefits: formData.benefits
      };

      console.log("Updating product:", selectedProductId, payload);

      const response = await updateProduct(selectedProductId, payload);

      if (response) {
        await fetchProducts();
        closeModal();
        alert("Product updated successfully");
      }
    } catch (error) {
      console.error("Update product failed:", error);
      alert(error.response?.data?.message || "Product update failed");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteClick = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    if (!window.confirm(`WARNING: This action is permanent. Confirm deletion of "${product.name}".`)) return;

    try {
      setLoading(true);
      await api.delete(`/products/${product._id}`);
      showFeedback('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      showFeedback('Failed to delete product. Please try again.', false);
      setLoading(false);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login', { replace: true });
      }
    }
  };

  return (
    <div className="admin-products-page admin-products-container">
      <section className="page-header section" style={{ padding: '2rem 0', marginBottom: '2rem' }}>
        <div className="admin-products-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display', margin: 0 }}>Product Catalog</h1>
            <p style={{ margin: '0.5rem 0 0 0' }}>Manage product records listed on the GlowCare Wellness storefront</p>
          </div>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleOpenAddModal}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.8rem 1.8rem',
              borderRadius: '12px' 
            }}
          >
            <FaPlus />
            <span>Add New Product</span>
          </button>
        </div>
      </section>

      <section className="admin-section section" style={{ padding: '1rem 0' }}>
        <div className="admin-products-container">
          {successMsg && <div className="success-message">{successMsg}</div>}
          {error && <div className="error-alert">{error}</div>}

          {loading && <p className="text-center">Loading product catalog...</p>}

          {!loading && products.length === 0 && (
            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--muted-text)', margin: 0 }}>
                No products are currently seeded in the database. Add a new product to begin.
              </p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div style={{ overflowX: 'auto', width: '100%', paddingBottom: '1rem' }}>
              <div className="admin-products-table">
                {/* Header row matching grid columns */}
                <div className="admin-product-row" style={{
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  color: 'var(--muted-text)',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  marginBottom: '10px',
                  padding: '12px 32px'
                }}>
                  <div>Image</div>
                  <div>Product Name</div>
                  <div>Category</div>
                  <div>Price</div>
                  <div>Rating</div>
                  <div>Short Description</div>
                  <div style={{ textAlign: 'right' }}>Actions</div>
                </div>

                {products.map((product) => (
                  <div key={product._id} className="admin-product-row card" style={{ margin: 0 }}>
                    {/* Image */}
                    <div>
                      <img 
                        src={product.image || product.imageUrl} 
                        alt={product.name} 
                        className="admin-product-image"
                      />
                    </div>

                    {/* Product Info (Name) */}
                    <div className="admin-product-info" style={{
                      maxHeight: '2.8em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.name}
                    </div>

                    {/* Category */}
                    <div>
                      <span className="admin-product-category">
                        {product.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="admin-product-price">
                      Rs. {product.price}
                    </div>

                    {/* Rating */}
                    <div className="admin-product-rating" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <FaStar size={16} />
                      <span>{product.rating !== undefined ? product.rating.toFixed(1) : '4.6'}</span>
                    </div>

                    {/* Description */}
                    <div className="admin-product-desc">
                      {product.shortDescription}
                    </div>

                    {/* Actions */}
                    <div className="admin-product-actions">
                      <button
                        type="button"
                        className="btn-action-view"
                        onClick={() => handleOpenEditModal(product)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.55rem 1rem', borderRadius: '10px' }}
                      >
                        <FaEdit size={12} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() => handleDeleteClick(product)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.55rem 1rem', borderRadius: '10px', marginLeft: 0 }}
                      >
                        <FaTrash size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add/Edit Product Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 'min(100%, 650px)', padding: '2.5rem' }}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close form">
              <FaTimes />
            </button>
            <h2 style={{ fontFamily: 'Playfair Display', color: 'var(--dark-accent)', marginBottom: '1.8rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              {modalMode === 'add' ? 'Add New Product' : 'Edit Product Details'}
            </h2>

            <form id="editProductForm" onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Product Name */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="name">Product Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="e.g. GlowCare Therapy Cream"
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                {/* Price / Cost */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="price">Price (Rs.) *</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 450"
                    min="0"
                  />
                  {formErrors.price && <span className="error-message">{formErrors.price}</span>}
                </div>

                {/* Rating */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="rating">Rating (0 - 5) *</label>
                  <input 
                    type="number" 
                    id="rating" 
                    name="rating" 
                    value={formData.rating} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 4.6"
                    step="0.1"
                    min="0"
                    max="5"
                  />
                  {formErrors.rating && <span className="error-message">{formErrors.rating}</span>}
                </div>

                {/* Stock Level */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="stock">Stock Level *</label>
                  <input 
                    type="number" 
                    id="stock" 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 20"
                    min="0"
                  />
                  {formErrors.stock && <span className="error-message">{formErrors.stock}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {/* Category Dropdown */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="category">Category *</label>
                  <select 
                    id="category" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {formErrors.category && <span className="error-message">{formErrors.category}</span>}
                </div>

                {/* Image URL */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="image">Product Image URL *</label>
                  <input 
                    type="text" 
                    id="image" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    placeholder="https://images.pexels.com/..."
                  />
                  {formErrors.image && <span className="error-message">{formErrors.image}</span>}
                </div>
              </div>

              {/* Short Description */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="shortDescription">Short Description *</label>
                <input 
                  type="text" 
                  id="shortDescription" 
                  name="shortDescription" 
                  value={formData.shortDescription} 
                  onChange={handleInputChange} 
                  placeholder="Enter a brief, one-sentence product tagline"
                />
                {formErrors.shortDescription && <span className="error-message">{formErrors.shortDescription}</span>}
              </div>

              {/* Full Description */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="description">Full Description *</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Enter the detailed product information"
                  style={{ minHeight: '100px' }}
                />
                {formErrors.description && <span className="error-message">{formErrors.description}</span>}
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" form="editProductForm" className="save-btn" disabled={isSaveDisabled || formSubmitting}>
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
