import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Mock existing reviews
  const existingReviews = [
    { id: 1, name: 'Rajesh Kumar', text: 'Excellent service! They fixed my borewell pump in just a few hours. Very professional.', rating: 5, date: '2023-10-12' },
    { id: 2, name: 'Priya Sharma', text: 'The water testing was thorough and explained well. Highly recommend Dr. Water.', rating: 4, date: '2023-11-05' },
    { id: 3, name: 'Amit Singh', text: 'Prompt response when we had no water. The new pump installation was smooth.', rating: 5, date: '2023-11-20' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send this to the backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      e.target.reset();
    }, 3000);
  };

  return (
    <div className="page-wrapper">
      {/* Header Section */}
      <section className="section" style={{ backgroundColor: 'var(--surface-2)', paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-display">Customer Reviews</h1>
            <p className="text-body" style={{ maxWidth: '600px', margin: '1rem auto' }}>
              Your feedback helps us grow and continue providing the best borewell services. 
              Read what our clients have to say, or share your own experience!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Write a Review Section */}
      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ backgroundColor: 'var(--surface-2)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}
            >
              <h2 style={{ marginBottom: '1.5rem' }}>Write a Review</h2>
              {submitted ? (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#d4edda', color: '#155724', borderRadius: '0.5rem' }}>
                  <p style={{ fontWeight: 'bold' }}>Thank you for your review!</p>
                  <p>Your feedback has been submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Name</label>
                    <input type="text" id="name" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }} />
                  </div>
                  
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Rating</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                          <label key={index} style={{ cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="rating" 
                              value={ratingValue} 
                              onClick={() => setRating(ratingValue)}
                              style={{ display: 'none' }}
                              required
                            />
                            <FaStar 
                              size={30} 
                              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(0)}
                              style={{ transition: 'color 0.2s' }}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reviewText" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Review</label>
                    <textarea id="reviewText" rows="5" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', resize: 'vertical' }}></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', padding: '1rem', width: '100%' }}>
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>

            {/* Display Reviews */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 style={{ marginBottom: '1.5rem' }}>Recent Feedback</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {existingReviews.map((review) => (
                  <div key={review.id} style={{ backgroundColor: 'var(--surface-2)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{review.name}</h3>
                      <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{review.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                      {[...Array(5)].map((star, i) => (
                        <FaStar key={i} size={16} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                      ))}
                    </div>
                    <p className="text-body" style={{ margin: 0 }}>"{review.text}"</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
