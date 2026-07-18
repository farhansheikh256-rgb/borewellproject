import React from 'react';
import { motion } from 'framer-motion';

export default function WhyUs() {
  const points = [
    {
      title: 'Decades of Experience',
      description: 'With over 20 years in the borewell industry, we have encountered and solved every type of water problem. Our deep understanding of local geology ensures that we drill in the right spot, every time.',
    },
    {
      title: 'Advanced Modern Equipment',
      description: 'We utilize state-of-the-art sensor technology and high-power drilling rigs to guarantee precision. This reduces the time taken for projects and minimizes disruption to your property.',
    },
    {
      title: '24/7 Availability & Fast Response',
      description: 'Water emergencies do not wait for business hours. That is why our dedicated support team and technicians are on standby 24/7, ready to resolve sudden pump failures or dry wells immediately.',
    },
    {
      title: 'Transparent & Fair Pricing',
      description: 'We believe in honest work. Before we start any drilling or repair, we provide a comprehensive, transparent quote with no hidden fees. You only pay for the service you need.',
    }
  ];

  return (
    <div className="page-wrapper">
      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h1 className="text-display">Why Choose Dr. Water?</h1>
            <p className="text-body" style={{ maxWidth: '600px', margin: '1rem auto' }}>
              We are committed to delivering the most reliable, efficient, and cost-effective 
              borewell solutions. Here is why thousands of customers trust us with their water needs.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                {/* Text Content */}
                <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                    {index + 1}. {point.title}
                  </h2>
                  <p className="text-body" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                    {point.description}
                  </p>
                </div>

                {/* Image Placeholder */}
                <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '16/9', 
                    backgroundColor: '#e2dfd5', 
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid var(--border)'
                  }}>
                    <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>
                      [Image Justifying: {point.title}]
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
