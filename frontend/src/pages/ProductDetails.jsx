import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import beautyShop from '../assets/beauty-shop.jpg';
import '../styles/pages.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}?t=${Date.now()}`);
        const data = response.data.product || response.data;
        console.log("Fetched product:", data);
        
        // Ensure safe fallback values so the UI never crashes
        const normalizedData = {
          ...data,
          imageUrl: data.imageUrl || data.image || '',
          image: data.image || data.imageUrl || '',
          description: data.description || data.fullDescription || '',
          fullDescription: data.fullDescription || data.description || '',
          benefits: Array.isArray(data.benefits) && data.benefits.length > 0 
            ? data.benefits 
            : ['Premium quality', 'Thoughtful daily care', 'GlowCare approved'],
          stock: typeof data.stock === 'number' ? data.stock : 20,
          rating: typeof data.rating === 'number' ? data.rating : 4.6
        };
        
        setProduct(normalizedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <p className="text-center">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <p className="text-center error-alert">
            {error || 'Product not found'}
          </p>
          <div className="text-center mt-3">
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <section className="page-header section">
        <div className="container">
          <h1>{product.name}</h1>
          <p>{product.category} product details and enquiry information</p>
        </div>
      </section>

      <section className="product-details-section section">
        <div className="container">
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="back-link">
            Back to {product.category}
          </Link>

          <div className="product-details-grid">
            <div className="product-image-section">
              <img
                src={product.image}
                alt={product.name}
                className="product-detail-image"
                onError={(event) => {
                  event.currentTarget.src = beautyShop;
                }}
              />
            </div>

            <div className="product-info-section">
              <div className="product-category-detail">{product.category}</div>
              <h2 className="product-detail-name">{product.name}</h2>

              <div className="product-price-section">
                <span className="product-detail-price">Rs. {product.price}</span>
                <span className="product-in-stock">{product.stock > 0 ? `${product.stock} in stock` : 'Available on enquiry'}</span>
              </div>

              <div className="product-detail-rating">Rating {product.rating.toFixed(1)} / 5</div>
              <p className="product-short-desc">{product.shortDescription}</p>

              <div className="product-features">
                <h3>Product Details</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-benefits">
                <h3>Benefits</h3>
                <ul>
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>
                      <FaCheckCircle aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-actions">
                <button
                  type="button"
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate('/enquiry', { state: { productName: product.name } });
                    } else {
                      localStorage.setItem('pendingEnquiryProduct', product.name);
                      navigate('/login', {
                        state: {
                          from: { pathname: '/enquiry' },
                          productName: product.name
                        }
                      });
                    }
                  }}
                  className="btn btn-primary btn-large"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  Enquire About This Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
