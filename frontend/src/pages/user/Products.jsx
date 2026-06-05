import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/api';
import { shopCategories } from '../../data/glowcareProducts';
import beautyShop from '../../assets/beauty-shop.jpg';
import '../../styles/pages.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedCategory = searchParams.get('category') || 'All';

  // Base list of categories + any custom categories loaded dynamically
  const defaultCategories = ['wellness', 'beauty', 'consultation'];
  const categories = ['All', ...new Set([...defaultCategories, ...products.map(p => p.category?.toLowerCase() || '')])].filter(Boolean);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch ShopBeauty products:", error);
      setProducts([]);
      setError('Server is unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productCategory = product.category?.toLowerCase().trim();
    const activeCategory = selectedCategory?.toLowerCase().trim();

    if (!activeCategory || activeCategory === "all") return true;

    return productCategory === activeCategory;
  });

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <div className="products-page">
      <PageHero
        eyebrow="GlowCare Shop"
        title="Shop Beauty"
        subtitle="Explore premium skincare, hair care, wellness and beauty products."
        backgroundImage={beautyShop}
      />

      <section className="products-section section">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter">
            <h3>Filter by Category</h3>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${
                    selectedCategory.toLowerCase() === category.toLowerCase() ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="text-center">Loading products...</p>}
          {error && <p className="text-center error-alert">{error}</p>}

          {!loading && filteredProducts.length === 0 && (
            <p className="text-center">No products found in this category</p>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="products-grid grid grid-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
