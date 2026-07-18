import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaHardHat, FaBuilding, FaTractor } from 'react-icons/fa';

export default function ContractWorks() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaHardHat size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Contract Works</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Large-scale water system solutions for municipalities, commercial developments, and agricultural enterprises.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Capabilities</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Municipal Water Supplies:</strong> Design and drilling of high-yield wells for small towns and subdivisions.</li>
            <li><strong>Commercial Infrastructure:</strong> Pumping stations and filtration arrays for industrial applications and manufacturing.</li>
            <li><strong>Long-Term Maintenance Contracts:</strong> Scheduled preventative maintenance for property managers and HOAs to ensure zero downtime.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Industries We Serve</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaTractor color="var(--primary)" size={24} className="mb-2" />
              <h5>Agriculture</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>High-capacity irrigation wells designed to handle continuous seasonal pumping without degrading the aquifer.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaBuilding color="var(--primary)" size={24} className="mb-2" />
              <h5>Commercial Development</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Complete water system engineering for new commercial parks, ensuring compliance with all local health codes.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Planning a Large Project?</h3>
          <p className="mb-4">Partner with us for reliable execution and ongoing support on your commercial water systems.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Request a Consultation
          </a>
        </div>

      </div>
    </div>
  );
}
