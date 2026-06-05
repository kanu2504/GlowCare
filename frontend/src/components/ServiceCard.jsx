import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <article className="service-card card">
      <div className="service-icon">
        <Icon aria-hidden="true" />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <Link to="/contact" className="btn btn-secondary">
        {service.cta}
      </Link>
    </article>
  );
};

export default ServiceCard;
