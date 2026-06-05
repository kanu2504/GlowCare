import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero';
import Categories from '../../components/Categories';
import Testimonials from '../../components/Testimonials';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/api';
import { mergeProductData } from '../../data/glowcareProducts';
import { FaGem, FaLeaf, FaShippingFast, FaTags } from 'react-icons/fa';
import '../../styles/pages.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(mergeProductData(data.data || []).filter((product) => product.featured).slice(0, 6));
        setError(null);
      } catch (err) {
        setProducts(mergeProductData().filter((product) => product.featured).slice(0, 6));
        setError(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <Hero />

      <Categories />

      {/* Featured Products Section */}
      <section className="featured-section section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Discover our best-selling wellness & beauty products</p>
          </div>

          {loading && <p className="text-center">Loading products...</p>}
          {error && <p className="text-center error-alert">{error}</p>}

          {!loading && !error && (
            <div className="products-grid grid grid-3">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose GlowCare Section */}
      <section className="why-choose section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose GlowCare?</h2>
            <p>Experience luxury and quality like never before</p>
          </div>

          <div className="features-grid grid grid-4">
            <div className="feature-card card">
              <div className="feature-icon"><FaGem /></div>
              <h3>Premium Quality</h3>
              <p>Handpicked ingredients for the best results</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon"><FaLeaf /></div>
              <h3>Natural & Organic</h3>
              <p>100% natural and eco-friendly products</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon"><FaShippingFast /></div>
              <h3>Fast Delivery</h3>
              <p>Quick and secure shipping to your doorstep</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon"><FaTags /></div>
              <h3>Best Price</h3>
              <p>Luxury products at affordable prices</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Home;
