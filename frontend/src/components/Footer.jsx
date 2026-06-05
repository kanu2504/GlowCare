import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaPinterestP, 
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-luxury">
      <style>{`
        .footer-luxury {
          background: linear-gradient(180deg, #F7E9DF 0%, #E8C5AC 100%) !important;
          color: var(--dark-accent) !important;
          padding: 4rem 0 2rem !important;
          margin-top: 4rem !important;
          transition: background 0.25s ease, color 0.25s ease !important;
        }

        body.dark-mode .footer-luxury {
          background: linear-gradient(180deg, #241711 0%, #1A120B 100%) !important;
          color: #F5E6D3 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
      
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Shop</h3>
            <ul>
              <li>
                <Link to="/products?category=Skincare">Skincare</Link>
              </li>
              <li>
                <Link to="/products?category=Hair%20Care">Hair Care</Link>
              </li>
              <li>
                <Link to="/products?category=Wellness">Wellness</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li>
                <Link to="/services">Consultation</Link>
              </li>
              <li>
                <Link to="/services">Beauty Rituals</Link>
              </li>
              <li>
                <Link to="/services">Wellness Advice</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Details</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <FaEnvelope style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <span>support@glowcarewellness.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <FaPhoneAlt style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <FaMapMarkerAlt style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <span>Jodhpur, Rajasthan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-branding">
            <p>&copy; {currentYear} GlowCare Wellness. All rights reserved.</p>
            <p>Luxury beauty, crafted with confidence.</p>
          </div>

          <div className="footer-social">
            <a href="#instagram" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#facebook" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#pinterest" aria-label="Pinterest">
              <FaPinterestP />
            </a>
            <a href="#linkedin" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
