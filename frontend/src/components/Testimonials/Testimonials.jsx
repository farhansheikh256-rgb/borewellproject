import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      location: 'Nagpur, Maharashtra',
      initials: 'RS',
      text: 'Excellent service! The team was highly professional and found water at 400ft just as they predicted.'
    },
    {
      id: 2,
      name: 'Amit Verma',
      location: 'Bhopal, MP',
      initials: 'AV',
      text: 'Dr.Water installed a submersible pump in our old borewell. It works perfectly now. Highly recommended.'
    },
    {
      id: 3,
      name: 'Neha Singh',
      location: 'Ujjain, MP',
      initials: 'NS',
      text: 'Very transparent pricing and prompt response. The drilling was done without any hassle to our property.'
    }
  ];

  return (
    <div className="testimonials-grid">
      {reviews.map(review => (
        <div key={review.id} className="glass-card">
          <div className="stars">
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          </div>
          <p>"{review.text}"</p>
          <div className="author-info">
            <div className="author-avatar">{review.initials}</div>
            <div className="author-details">
              <h5>{review.name}</h5>
              <p>{review.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
