import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ post }) => {
  return (
    <article className="blog-card card">
      <div className="blog-card-meta">
        <span>{post.category}</span>
        <time dateTime={post.date}>{post.dateLabel}</time>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <button type="button" className="text-button">
        Read More <FaArrowRight aria-hidden="true" />
      </button>
    </article>
  );
};

export default BlogCard;
