import React from 'react';
import '../styles/testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      text: 'GlowCare products transformed my skin! The Hydrating Serum is a game-changer. Highly recommended!',
      rating: 5,
      image: '👩',
    },
    {
      id: 2,
      name: 'Ananya Patel',
      text: 'The quality and customer service are exceptional. I love the luxury feel of the packaging!',
      rating: 5,
      image: '👩‍🦰',
    },
    {
      id: 3,
      name: 'Zara Khan',
      text: 'Best investment for my skincare routine. I can see visible results within weeks!',
      rating: 5,
      image: '👩‍🦱',
    },
  ];

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Real experiences from our happy customers</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card card">
              <div className="stars">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <span className="author-avatar">{testimonial.image}</span>
                <span className="author-name">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
