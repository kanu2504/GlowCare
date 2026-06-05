import React from 'react';

const PageHero = ({ eyebrow, title, subtitle, backgroundImage }) => {
  return (
    <section
      className="page-hero"
      style={backgroundImage ? { '--page-hero-image': `url(${backgroundImage})` } : undefined}
    >
      <div className="page-hero-content container">
        {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;
