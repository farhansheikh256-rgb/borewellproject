import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaCogs, FaTachometerAlt, FaWater } from 'react-icons/fa';

export default function Pumps() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaCogs size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Water Well Pumps</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            We provide expert installation, maintenance, and repair of residential and commercial water well pumps to keep your water flowing reliably.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Pump Services</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Submersible Pumps:</strong> High-efficiency pumps installed deep underground, known for reliability and longevity.</li>
            <li><strong>Jet Pumps:</strong> Ideal for shallow wells, mounted above ground for easy maintenance.</li>
            <li><strong>Constant Pressure Systems:</strong> Upgrades that provide "city-like" water pressure regardless of how many fixtures are running.</li>
            <li><strong>Pump Sizing & Installation:</strong> We calculate your exact household demand to install a perfectly sized pump that won't short-cycle or burn out prematurely.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Why Choose Dr.Water?</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaTachometerAlt color="var(--primary)" size={24} className="mb-2" />
              <h5>Precision Diagnostics</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We test the electrical load and mechanical output of your pump before recommending costly replacements.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaWater color="var(--primary)" size={24} className="mb-2" />
              <h5>Premium Brands</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We only install top-tier, industry-leading pump brands backed by robust warranties.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Need Pump Service?</h3>
          <p className="mb-4">Whether you need a brand new installation or emergency repairs, our technicians are ready.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Book a Service
          </a>
        </div>

      </div>
    </div>
  );
}
