import React, { useState } from 'react';
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt
} from 'react-icons/fa';
import beautyPortrait from '../../assets/beauty-portrait.jpg';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import '../../styles/pages.css';

const initialFormState = {
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  queryType: '',
  message: '',
};

const contactInfo = [
  {
    icon: FaEnvelope,
    title: 'Email',
    text: 'support@glowcarewellness.com',
  },
  {
    icon: FaPhoneAlt,
    title: 'Phone',
    text: '+91 98765 43210',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Location',
    text: 'Jodhpur, Rajasthan',
  },
  {
    icon: FaClock,
    title: 'Working Hours',
    text: 'Mon-Sat, 10 AM - 6 PM',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Full Name is required';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Mobile Number is required';
    } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone)) {
      nextErrors.phone = 'Enter a valid mobile number';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!formData.city.trim()) {
      nextErrors.city = 'City / State is required';
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Complete Delivery Address is required';
    }

    if (!formData.queryType) {
      nextErrors.queryType = 'Order Related Query selection is required';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Message / Special Instructions is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      
      if (response.data.success) {
        setSuccessMessage('✅ Thank you for contacting GlowCare Wellness. Your inquiry has been sent successfully!');
        setFormData(initialFormState);
        setErrors({});
      } else {
        setErrors({ submit: response.data.message || 'Failed to submit inquiry. Please try again.' });
      }
    } catch (err) {
      console.error('Failed API Call Details:', {
        url: `${API_BASE_URL}/contact`,
        status: err.response?.status || 'No Status Code',
        response: err.response?.data || err.message,
      });
      setErrors({ submit: 'Failed to connect to backend server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Scoped CSS Inject block for Contact section */}
      <style>{`
        .contact-hero {
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

        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.45);
          z-index: 1;
        }

        .contact-hero-content {
          position: relative;
          z-index: 2;
          max-width: 840px;
          animation: contactFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes contactFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          color: #fff !important;
          font-family: 'Playfair Display', serif;
          margin-bottom: 1.2rem;
          font-weight: 800;
          line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .contact-hero p {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.95) !important;
          line-height: 1.65;
          margin: 0 auto;
          max-width: 720px;
          text-shadow: 0 1px 5px rgba(0,0,0,0.2);
        }

        .contact-luxury-section {
          padding: 4rem 1rem 6rem;
          background-color: var(--background-color);
        }

        .contact-luxury-container {
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

        body.dark-mode .contact-luxury-container {
          background-color: rgba(42, 33, 29, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Form layout details */
        .contact-grid-layout {
          display: grid;
          gap: 28px;
        }

        .contact-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .contact-field-group {
          display: flex;
          flex-direction: column;
        }

        .contact-field-group label {
          display: block;
          margin-bottom: 12px;
          color: var(--dark-accent);
          font-weight: 700;
          font-size: 0.95rem;
          text-align: left;
        }

        .contact-field-group input,
        .contact-field-group select,
        .contact-field-group textarea {
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

        .contact-field-group textarea {
          height: 200px;
          padding: 1.25rem;
          resize: vertical;
        }

        .contact-field-group input:focus,
        .contact-field-group select:focus,
        .contact-field-group textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 5px rgba(184, 129, 102, 0.16);
        }

        .contact-field-group input:hover,
        .contact-field-group select:hover,
        .contact-field-group textarea:hover {
          border-color: var(--secondary-color);
        }

        .contact-submit-btn-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }

        .contact-submit-btn {
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

        .contact-submit-btn:hover {
          background-color: var(--dark-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }

        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-required-indicator {
          color: #C74A34;
          margin-left: 0.25rem;
        }

        /* 2-Column, 2-Row Cards Grid styling */
        .contact-custom-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-top: 4.5rem;
        }

        .contact-custom-info-grid .card {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: var(--card-background);
          border: 1px solid var(--border-color);
          border-radius: 24px;
        }

        .contact-custom-info-grid h3 {
          font-size: 1.25rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          color: var(--dark-accent);
          font-weight: 700;
        }

        body.dark-mode .contact-custom-info-grid h3 {
          color: #ffffff;
        }

        .contact-custom-info-grid p {
          margin: 0;
          color: var(--muted-text);
          font-size: 1.0rem;
        }

        .info-icon {
          color: var(--accent-color);
        }

        /* Responsiveness rules */
        @media (max-width: 992px) {
          .contact-luxury-container {
            width: 90%;
            padding: 50px;
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            min-height: 460px;
          }
          
          .contact-luxury-container {
            width: 95%;
            padding: 40px 25px;
            margin-top: -80px;
          }
          
          .contact-field-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .contact-grid-layout {
            gap: 24px;
          }
        }

        @media (max-width: 576px) {
          .contact-custom-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <h1>Contact GlowCare</h1>
          <p>
            We're here to help with orders, product recommendations, shipping inquiries, and beauty consultations.
          </p>
        </div>
      </section>

      {/* Main Luxury Section */}
      <section className="contact-luxury-section">
        <div className="contact-luxury-container">
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errors.submit && <div className="error-alert">{errors.submit}</div>}

          <form onSubmit={handleSubmit} className="contact-grid-layout" noValidate>
            {/* ROW 1: Full Name | Phone Number */}
            <div className="contact-field-row">
              <div className="contact-field-group">
                <label htmlFor="name">
                  Full Name<span className="contact-required-indicator">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="contact-field-group">
                <label htmlFor="phone">
                  Mobile Number<span className="contact-required-indicator">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            {/* ROW 2: Email Address | City / State */}
            <div className="contact-field-row">
              <div className="contact-field-group">
                <label htmlFor="email">
                  Email Address<span className="contact-required-indicator">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="contact-field-group">
                <label htmlFor="city">
                  City / State<span className="contact-required-indicator">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city and state"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
            </div>

            {/* ROW 3: Product Interest Dropdown (Full Width) */}
            <div className="contact-field-group">
              <label htmlFor="queryType">
                Order Related Query<span className="contact-required-indicator">*</span>
              </label>
              <select
                id="queryType"
                name="queryType"
                value={formData.queryType}
                onChange={handleChange}
              >
                <option value="" disabled hidden>Select an inquiry type</option>
                <option value="Product Information">Product Information</option>
                <option value="Order Status">Order Status</option>
                <option value="Shipping & Delivery">Shipping & Delivery</option>
                <option value="Return & Refund">Return & Refund</option>
                <option value="Beauty Consultation">Beauty Consultation</option>
                <option value="Bulk Orders">Bulk Orders</option>
                <option value="Other">Other</option>
              </select>
              {errors.queryType && <span className="error-message">{errors.queryType}</span>}
            </div>

            {/* ROW 4: Complete Address (Full Width) */}
            <div className="contact-field-group">
              <label htmlFor="address">
                Complete Delivery Address<span className="contact-required-indicator">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            {/* ROW 5: Message / Special Instructions (Full Width) */}
            <div className="contact-field-group">
              <label htmlFor="message">
                Message / Special Instructions<span className="contact-required-indicator">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="6"
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {/* ROW 6: Centered Submit Button */}
            <div className="contact-submit-btn-wrapper">
              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </div>
          </form>

          {/* Cards Grid placed below the centered form container */}
          <div className="contact-custom-info-grid">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="contact-info-card card">
                  <Icon className="info-icon" aria-hidden="true" style={{ fontSize: '2rem' }} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
