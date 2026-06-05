import React from 'react';
import PageHero from '../components/PageHero';
import BlogCard from '../components/BlogCard';
import beautyPortrait from '../assets/beauty-portrait.jpg';
import '../styles/pages.css';

const posts = [
  {
    title: '5 Daily Skincare Habits for Natural Glow',
    date: '2026-05-08',
    dateLabel: 'May 8, 2026',
    category: 'Skincare',
    description: 'Simple morning and evening habits that help your skin look fresh, balanced, and naturally radiant.',
  },
  {
    title: 'Benefits of Vitamin C Serum',
    date: '2026-05-12',
    dateLabel: 'May 12, 2026',
    category: 'Beauty Science',
    description: 'A clear guide to how vitamin C fits into a brightening routine and how to layer it comfortably.',
  },
  {
    title: 'How to Build a Simple Hair Care Routine',
    date: '2026-05-16',
    dateLabel: 'May 16, 2026',
    category: 'Hair Care',
    description: 'A practical routine for cleansing, conditioning, oiling, and weekly repair without overcomplicating your shelf.',
  },
  {
    title: 'Why Hydration Matters for Skin',
    date: '2026-05-20',
    dateLabel: 'May 20, 2026',
    category: 'Wellness',
    description: 'Hydration is more than drinking water. Learn how moisturizers, toners, and habits support a supple glow.',
  },
  {
    title: 'Natural Wellness Tips for Busy Students',
    date: '2026-05-24',
    dateLabel: 'May 24, 2026',
    category: 'Lifestyle',
    description: 'Compact wellness rituals for packed schedules, late study nights, and everyday energy.',
  },
  {
    title: 'Choosing the Right Products for Your Skin Type',
    date: '2026-05-28',
    dateLabel: 'May 28, 2026',
    category: 'Product Guide',
    description: 'How to read your skin needs and choose cleansers, serums, moisturizers, and SPF with more confidence.',
  },
];

const Blog = () => {
  return (
    <div className="blog-page">
      <PageHero
        eyebrow="Glow Notes"
        title="GlowCare Wellness Blog"
        subtitle="Beauty, skincare, hair care and wellness tips for your daily glow."
        backgroundImage={beautyPortrait}
      />

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
