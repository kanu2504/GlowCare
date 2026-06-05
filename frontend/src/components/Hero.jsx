import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero.css';

// Keep the image inside src/assets and import it relatively.
import heroImage from '../assets/beauty-portrait.jpg';

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-content container">
        <div className="hero-copy">
          <span className="eyebrow">GlowCare Signature</span>
          <h1>Luxury beauty rituals for radiant skin.</h1>
          <p>
            Discover premium wellness products and curated treatments designed to
            nourish your skin, restore balance, and leave you glowing from within.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="hero-button primary">
              Shop the Collection
            </Link>
            <Link to="/enquiry" className="hero-button secondary">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
