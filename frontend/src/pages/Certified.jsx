import React from 'react';
import { motion } from 'framer-motion';

export default function Certified() {
  return (
    <div className="page-wrapper">
      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h1 className="text-display">Our Certifications</h1>
            <p className="text-body" style={{ maxWidth: '600px', margin: '1rem auto' }}>
              We are a fully licensed and government-certified borewell service provider. 
              Transparency and trust are at the core of our operations.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* GST Bill Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}
            >
              <div>
                <h2>GST Registration</h2>
                <p className="text-body" style={{ marginTop: '1rem' }}>
                  Dr. Water operates with complete tax compliance and transparency. 
                  Our GST certification ensures that all our transactions are legitimate, 
                  protecting both our clients and our business integrity.
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--surface-2)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                {/* Placeholder for GST Bill Image */}
                <div style={{ width: '100%', height: '300px', backgroundColor: '#e2dfd5', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>[Insert GST Bill Image Here]</span>
                </div>
              </div>
            </motion.div>

            {/* License Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}
            >
              <div style={{ order: 2 }}>
                <h2>Official Borewell License</h2>
                <p className="text-body" style={{ marginTop: '1rem' }}>
                  We are certified by the central ground water authority to conduct borewell drilling 
                  and related services. Our license guarantees that we adhere strictly to environmental 
                  safety guidelines and local regulations.
                </p>
              </div>
              <div style={{ order: 1, backgroundColor: 'var(--surface-2)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                {/* Placeholder for License Image */}
                <div style={{ width: '100%', height: '300px', backgroundColor: '#e2dfd5', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>[Insert License Image Here]</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
