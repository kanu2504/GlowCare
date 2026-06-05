import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import beautyShop from '../assets/beauty-shop.jpg';
import '../styles/productCard.css';

const ProductCard = ({ product }) => {
  const productId = product._id || product.id;
  const rating = product.rating || 4.6;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEnquireClick = () => {
    if (!isAuthenticated) {
      localStorage.setItem('pendingEnquiryProduct', product.name);
      navigate('/login');
    } else {
      navigate('/enquiry', { state: { productName: product.name } });
    }
  };

  return (
    <Link to={`/products/${productId}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image-container">
          <img
            src={product.image || product.imageUrl}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = beautyShop;
            }}
          />
          <div className="product-overlay">
            <span className="view-details">View Details</span>
          </div>
        </div>

        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>

          <div className="product-rating" aria-label={`${rating} out of 5 rating`}>
            <span>Rating</span>
            <strong>{rating.toFixed(1)}</strong>
          </div>

          <div className="product-footer">
            <span className="product-price">Rs. {product.price}</span>
            {product.stock > 0 ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleEnquireClick();
                }}
                className="product-badge"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'inline-block',
                }}
              >
                Enquire
              </button>
            ) : (
              <span className="product-badge" style={{ backgroundColor: 'var(--muted-text)' }}>
                View
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
