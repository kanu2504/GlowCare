import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import beautyPortrait from '../../assets/beauty-portrait.jpg';
import '../../styles/pages.css';

const Enquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: location.state?.productName || '',
    message: '',
  });

  useEffect(() => {
    if (location.state?.productName) {
      setFormData((prev) => ({
        ...prev,
        product: location.state.productName,
      }));
    }
  }, [location.state]);

  const defaultProducts = [
    'GlowCare Vitamin C Serum',
    'GlowCare Herbal Face Wash',
    'GlowCare Aloe Moisturizing Cream',
    'GlowCare Sunscreen SPF 50',
    'GlowCare Rose Water Toner',
    'GlowCare Hair Strength Oil',
    'GlowCare Keratin Shampoo',
    'GlowCare Hair Repair Mask',
  ];

  const isCustomProduct = formData.product && !defaultProducts.includes(formData.product);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation function matching exact schema
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name && !formData.fullName) {
      newErrors.name = 'Full Name is required';
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.product && !formData.productInterest) {
      newErrors.product = 'Please select a product';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      name: formData.name || formData.fullName,
      phone: formData.phone,
      email: formData.email,
      product: formData.product || formData.productInterest,
      message: formData.message || formData.specialInstructions,
    };

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/enquiries`, payload);

      if (response.data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          product: '',
          message: '',
        });

        // Redirect after 1 second
        setTimeout(() => {
          setSuccess(false);
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Enquiry submit error diagnostics:', {
        url: `${API_BASE_URL}/enquiries`,
        status: error.response?.status || 'No Status Code',
        response: error.response?.data || error.message,
      });
      setErrors({ submit: error.response?.data?.message || 'Failed to submit enquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-page">
      {/* Scoped CSS Inject block for Enquiry section */}
      <style>{`
        .enquiry-hero {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url(${beautyPortrait});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          text-align: center;
          color: #fff;
          padding: 4rem 1rem;
        }

        .enquiry-hero-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.45);
          z-index: 1;
        }

        .enquiry-hero-content {
          position: relative;
          z-index: 2;
          max-width: 840px;
          animation: enquiryFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes enquiryFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .enquiry-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          color: #fff !important;
          font-family: 'Playfair Display', serif;
          margin-bottom: 1.2rem;
          font-weight: 800;
          line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .enquiry-hero p {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.95) !important;
          line-height: 1.65;
          margin: 0 auto;
          max-width: 720px;
          text-shadow: 0 1px 5px rgba(0,0,0,0.2);
        }

        .enquiry-luxury-section {
          padding: 4rem 1rem 6rem;
          background-color: var(--background-color);
        }

        .enquiry-luxury-container {
          max-width: 1200px;
          width: 80%;
          margin: -120px auto 0;
          position: relative;
          z-index: 10;
          border-radius: 30px;
          padding: 60px 70px;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.4);
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        body.dark-mode .enquiry-luxury-container {
          background-color: rgba(42, 33, 29, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Enquiry fields grid details */
        .enquiry-grid-layout {
          display: grid;
          gap: 28px;
        }

        .enquiry-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .enquiry-field-group {
          display: flex;
          flex-direction: column;
        }

        .enquiry-field-group label {
          display: block;
          margin-bottom: 12px;
          color: var(--dark-accent);
          font-weight: 700;
          font-size: 0.95rem;
          text-align: left;
        }

        .enquiry-field-group input,
        .enquiry-field-group select,
        .enquiry-field-group textarea {
          width: 100%;
          height: 60px;
          padding: 0 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: 14px;
          background-color: var(--card-background);
          color: var(--text-color);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .enquiry-field-group textarea {
          height: 200px;
          padding: 1.25rem;
          resize: vertical;
        }

        .enquiry-field-group input:focus,
        .enquiry-field-group select:focus,
        .enquiry-field-group textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 5px rgba(184, 129, 102, 0.16);
        }

        .enquiry-field-group input:hover,
        .enquiry-field-group select:hover,
        .enquiry-field-group textarea:hover {
          border-color: var(--secondary-color);
        }

        .enquiry-submit-btn-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }

        .enquiry-submit-btn {
          width: 220px;
          height: 60px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 999px;
          background-color: var(--accent-color);
          color: #fff;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .enquiry-submit-btn:hover {
          background-color: var(--dark-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }

        .enquiry-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .enquiry-required-indicator {
          color: #C74A34;
          margin-left: 0.25rem;
        }

        /* Responsiveness rules */
        @media (max-width: 992px) {
          .enquiry-luxury-container {
            width: 90%;
            padding: 50px;
          }
        }

        @media (max-width: 768px) {
          .enquiry-hero {
            min-height: 460px;
          }
          
          .enquiry-luxury-container {
            width: 95%;
            padding: 40px 25px;
            margin-top: -80px;
          }
          
          .enquiry-field-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .enquiry-grid-layout {
            gap: 24px;
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="enquiry-hero">
        <div className="enquiry-hero-overlay" />
        <div className="enquiry-hero-content">
          <h1>Beauty & Wellness Enquiries</h1>
          <p>
            We are here to assist you with products, orders, consultations, and personalized beauty solutions.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="enquiry-luxury-section">
        <div className="enquiry-luxury-container">
          {success && (
            <div className="success-message">
              ✅ Thank you for your enquiry! We'll get back to you soon.
            </div>
          )}

          {errors.submit && (
            <div className="error-alert">{errors.submit}</div>
          )}

          <form onSubmit={handleSubmit} className="enquiry-grid-layout" noValidate>
            {/* ROW 1: Full Name | Phone Number */}
            <div className="enquiry-field-row">
              <div className="enquiry-field-group">
                <label htmlFor="name">
                  Full Name<span className="enquiry-required-indicator">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="enquiry-field-group">
                <label htmlFor="phone">
                  Phone Number<span className="enquiry-required-indicator">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* ROW 2: Email Address | Product Interest */}
            <div className="enquiry-field-row">
              <div className="enquiry-field-group">
                <label htmlFor="email">
                  Email Address<span className="enquiry-required-indicator">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="enquiry-field-group">
                <label htmlFor="product">
                  Product Interest Dropdown<span className="enquiry-required-indicator">*</span>
                </label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                >
                  <option value="">Select a product</option>
                  {defaultProducts.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                  {isCustomProduct && (
                    <option value={formData.product}>
                      {formData.product}
                    </option>
                  )}
                </select>
                {errors.product && (
                  <span className="error-message">{errors.product}</span>
                )}
              </div>
            </div>

            {/* ROW 3: Message (Full Width) */}
            <div className="enquiry-field-group">
              <label htmlFor="message">
                Message / Special Instructions
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              ></textarea>
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            {/* ROW 4: Centered Submit Button */}
            <div className="enquiry-submit-btn-wrapper">
              <button
                type="submit"
                className="enquiry-submit-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;
