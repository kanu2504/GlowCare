import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaMortarPestle, FaPumpSoap, FaSpa, FaTint } from 'react-icons/fa';
import '../styles/categories.css';

const categories = [
  {
    name: 'Skincare',
    icon: FaTint,
    description: 'Premium cleansers, toners, serums, SPF, and moisturizers',
  },
  {
    name: 'Hair Care',
    icon: FaSpa,
    description: 'Oils, shampoos, and repair masks for smooth routines',
  },
  {
    name: 'Wellness',
    icon: FaLeaf,
    description: 'Herbal teas and everyday rituals for balanced living',
  },
  {
    name: 'Supplements',
    icon: FaMortarPestle,
    description: 'Daily vitamin, immunity, and protein wellness support',
  },
  {
    name: 'Beauty Products',
    icon: FaPumpSoap,
    description: 'Care tools and beauty essentials for polished self-care',
  },
];

const Categories = () => {
  return (
    <section className="categories section">
      <div className="container">
        <div className="section-title">
          <h2>Shop Beauty Categories</h2>
          <p>Explore curated GlowCare essentials for beauty and wellness routines</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="category-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
