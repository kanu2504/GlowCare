import React from 'react';
import {
  FaComments,
  FaHeadset,
  FaLeaf,
  FaListAlt,
  FaPumpSoap,
  FaShoppingBag,
} from 'react-icons/fa';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import beautyServices from '../assets/beauty-services.jpg';
import '../styles/pages.css';

const services = [
  {
    icon: FaPumpSoap,
    title: 'Skincare Consultation',
    description: 'Get clear guidance for cleansers, serums, moisturizers, SPF, and routines that match your skin needs.',
    cta: 'Start Consultation',
  },
  {
    icon: FaLeaf,
    title: 'Hair Care Guidance',
    description: 'Build a smoother hair routine with oiling, shampoo, repair masks, and weekly care suggestions.',
    cta: 'Plan Hair Care',
  },
  {
    icon: FaShoppingBag,
    title: 'Wellness Product Recommendations',
    description: 'Find teas, supplements, and daily wellness essentials that fit your lifestyle and comfort level.',
    cta: 'Get Recommendations',
  },
  {
    icon: FaListAlt,
    title: 'Beauty Routine Planning',
    description: 'Turn scattered products into a simple morning, evening, and weekly ritual that feels easy to follow.',
    cta: 'Build Routine',
  },
  {
    icon: FaHeadset,
    title: 'Customer Support',
    description: 'Ask product, order, and usage questions with friendly support before or after your purchase.',
    cta: 'Contact Support',
  },
  {
    icon: FaComments,
    title: 'Product Enquiry Assistance',
    description: 'Share what you are looking for and receive help choosing the most suitable GlowCare products.',
    cta: 'Send Enquiry',
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <PageHero
        eyebrow="GlowCare Services"
        title="Our Wellness Services"
        subtitle="Personalized beauty and wellness support for your self-care journey."
        backgroundImage={beautyServices}
      />

      <section className="section">
        <div className="container">
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
