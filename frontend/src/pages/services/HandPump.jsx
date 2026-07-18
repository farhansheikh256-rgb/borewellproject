import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaTint, FaWrench, FaTools } from 'react-icons/fa';

export default function HandPump() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaTint size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Hand Pump Service</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Reliable, off-grid water access. We specialize in the installation, maintenance, and repair of manual hand pumps.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Why Choose a Hand Pump?</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Emergency Backup:</strong> Ensure you have drinking water during extended power outages.</li>
            <li><strong>Off-Grid Living:</strong> Perfect for remote cabins or agricultural properties without electrical access.</li>
            <li><strong>Durability:</strong> Modern hand pumps are built with stainless steel and can draw water from depths over 300 feet.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Services</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaTools color="var(--primary)" size={24} className="mb-2" />
              <h5>New Installations</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We install high-quality deep well and shallow well manual pumps alongside your existing electric pump.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaWrench color="var(--primary)" size={24} className="mb-2" />
              <h5>Repairs & Rebuilds</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We replace worn leathers, seals, and check valves on older, historic hand pumps to restore them to full working order.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Secure Your Water Supply</h3>
          <p className="mb-4">Get peace of mind with a manual backup pump. Contact us for a quote on installation.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Request a Quote
          </a>
        </div>

      </div>
    </div>
  );
}
