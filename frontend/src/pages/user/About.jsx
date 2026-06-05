import React from 'react';
import { FaAward, FaHeart, FaLeaf, FaShieldAlt, FaSpa, FaTags } from 'react-icons/fa';
import PageHero from '../../components/PageHero';
import beautyPortrait from '../../assets/beauty-portrait.jpg';
import '../../styles/pages.css';

const reasons = [
  {
    icon: FaLeaf,
    title: 'Ingredient-Led Care',
    description: 'Products are selected around gentle, useful ingredients that support daily beauty and wellness rituals.',
  },
  {
    icon: FaAward,
    title: 'Premium Experience',
    description: 'Every touchpoint is designed to feel polished, reliable, and easy to use from discovery to enquiry.',
  },
  {
    icon: FaShieldAlt,
    title: 'Trusted Guidance',
    description: 'Our recommendations focus on practical routines, clear product choices, and customer confidence.',
  },
];

const values = [
  'Natural Care',
  'Quality Products',
  'Customer Trust',
  'Affordable Wellness',
  'Modern Beauty Solutions',
];

const About = () => {
  return (
    <div className="about-page">
      <PageHero
        eyebrow="Our Story"
        title="About GlowCare Wellness"
        subtitle="A premium wellness brand focused on beauty, care and confidence."
        backgroundImage={beautyPortrait}
      />

      <section className="section split-section">
        <div className="container split-grid">
          <div>
            <span className="page-eyebrow">Brand Story</span>
            <h2>Wellness that feels warm, useful, and beautifully simple.</h2>
          </div>
          <div>
            <p>
              GlowCare Wellness was created for people who want beauty care that feels premium without becoming complicated. Our collection brings together skincare, hair care, wellness, supplements, and beauty essentials that fit real routines.
            </p>
            <p>
              We believe a good product should be easy to understand, enjoyable to use, and supported by clear guidance. From a daily face wash to a calming tea ritual, GlowCare helps customers choose confidently.
            </p>
          </div>
        </div>
      </section>

      <section className="section mission-section">
        <div className="container mission-grid">
          <div className="mission-card card">
            <FaHeart className="mission-icon" aria-hidden="true" />
            <h3>Mission</h3>
            <p>To make premium beauty and wellness accessible through thoughtful products, useful education, and customer-first support.</p>
          </div>
          <div className="mission-card card">
            <FaSpa className="mission-icon" aria-hidden="true" />
            <h3>Vision</h3>
            <p>To become a trusted wellness brand where modern customers discover routines that help them feel cared for every day.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>Premium care, honest guidance, and a softer shopping experience.</p>
          </div>
          <div className="info-card-grid">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="info-card card">
                  <Icon className="info-icon" aria-hidden="true" />
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Values</h2>
            <p>The principles behind every GlowCare recommendation.</p>
          </div>
          <div className="values-list">
            {values.map((value) => (
              <div key={value} className="value-pill">
                <FaTags aria-hidden="true" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
