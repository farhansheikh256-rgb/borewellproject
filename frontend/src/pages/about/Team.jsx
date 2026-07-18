import React from 'react';
import { motion } from 'framer-motion';

export default function Team() {
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
            <h1 className="text-display">Meet Our Team</h1>
            <p className="text-body" style={{ maxWidth: '800px', margin: '1rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
              At Dr. Water, our strength lies in our people. We are a family of dedicated engineers, 
              geologists, and technicians who are passionate about delivering reliable water solutions. 
              With decades of combined field experience, our team approaches every project with 
              unwavering commitment, ensuring that you receive the highest standard of service 
              from the first consultation to the final installation. We don't just drill wells; 
              we build lasting relationships built on trust and expertise.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {/* Team Member 1 Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#e2dfd5', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>[Image Placeholder]</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>[Team Member Name]</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>[Job Title / Role]</p>
            </motion.div>

            {/* Team Member 2 Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#e2dfd5', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>[Image Placeholder]</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>[Team Member Name]</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>[Job Title / Role]</p>
            </motion.div>

            {/* Team Member 3 Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#e2dfd5', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>[Image Placeholder]</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>[Team Member Name]</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>[Job Title / Role]</p>
            </motion.div>

            {/* Team Member 4 Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#e2dfd5', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>[Image Placeholder]</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>[Team Member Name]</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>[Job Title / Role]</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
