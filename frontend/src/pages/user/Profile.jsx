import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import beautyPortrait from '../../assets/beauty-portrait.jpg';
import '../../styles/pages.css';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Redirect to login if no token is present
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Load profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const customerToken = localStorage.getItem('token');
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        });
        if (res.data.success && res.data.data) {
          const profile = res.data.data;
          setFormData({
            name: profile.name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            address: profile.address || '',
            city: profile.city || '',
            state: profile.state || '',
            pincode: profile.pincode || '',
            profileImage: profile.profileImage || '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Could not fetch user profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed base64 string
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData((prev) => ({
            ...prev,
            profileImage: dataUrl,
          }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const customerToken = localStorage.getItem('token');
    if (!customerToken) {
      setError('You must be logged in to save your profile.');
      setSaving(false);
      return;
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      });
      if (res.data.success) {
        setSuccess(true);
        // Update local storage user data
        localStorage.setItem('user', JSON.stringify(res.data.data));

        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <p>Loading profile details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Hero section */}
      <section className="profile-hero" style={{ backgroundImage: `url(${beautyPortrait})` }}>
        <div className="profile-hero-overlay" />
        <div className="profile-hero-content">
          <h1>My Profile</h1>
          <p>Update your contact settings, location, and account details.</p>
        </div>
      </section>

      {/* Profile Form Section */}
      <section className="profile-luxury-section">
        <div className="profile-luxury-container">
          {success && (
            <div className="success-message" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              ✅ Profile updated successfully
            </div>
          )}

          {error && (
            <div className="error-alert" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-grid-layout" noValidate>
            
            {/* Profile Avatar Selection Row */}
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrapper">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile Preview"
                    className="profile-avatar-preview"
                  />
                ) : (
                  <div className="profile-avatar-preview">
                    <FaUserCircle className="profile-avatar-default" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="profile-avatar-upload-btn"
                onClick={triggerFileInput}
              >
                <FaCamera style={{ marginRight: '8px' }} /> Change Picture
              </button>
            </div>

            {/* Form Fields: Full Name & Email */}
            <div className="profile-field-row">
              <div className="profile-field-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="profile-field-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            {/* Form Fields: Phone & Address */}
            <div className="profile-field-row">
              <div className="profile-field-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile number"
                />
              </div>

              <div className="profile-field-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address, building/flat no."
                />
              </div>
            </div>

            {/* Form Fields: City, State, Pincode */}
            <div className="profile-field-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="profile-field-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div className="profile-field-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>

              <div className="profile-field-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode / Postal Code"
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="profile-submit-btn-wrapper">
              <button
                type="submit"
                className="profile-save-btn"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                type="button"
                className="profile-save-btn"
                onClick={logout}
                style={{ backgroundColor: 'var(--secondary-color)' }}
              >
                Log Out
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
