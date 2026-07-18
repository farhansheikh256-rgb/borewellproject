import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMountain, FaMapMarkedAlt, FaTruck } from 'react-icons/fa';

export default function BorewellDrilling() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaTruck size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Borewell Drilling</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Precision drilling through the toughest geological formations to secure a reliable, long-lasting water source for your property.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Drilling Process</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Site Surveying:</strong> Geologic assessments to locate the best spot for maximum water yield.</li>
            <li><strong>Rotary Drilling:</strong> Utilizing heavy-duty rotary drilling rigs capable of cutting through solid bedrock.</li>
            <li><strong>Casing & Grouting:</strong> Installing steel or PVC casing and sealing the well to protect against surface contamination.</li>
            <li><strong>Yield Testing:</strong> Rigorous pump testing to determine the well's exact gallons-per-minute (GPM) output.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Why We Stand Out</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaMountain color="var(--primary)" size={24} className="mb-2" />
              <h5>Hard Rock Specialists</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Our rigs are equipped with down-the-hole (DTH) hammers designed to power through granite and basalt.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaMapMarkedAlt color="var(--primary)" size={24} className="mb-2" />
              <h5>Local Knowledge</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Decades of experience drilling in the region means we know exactly where the aquifers are and how deep we need to go.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Ready to Drill?</h3>
          <p className="mb-4">Contact us to schedule a site survey and get a comprehensive estimate for your new well.</p>
          <a href="tel:+918830251172" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Get an Estimate
          </a>
        </div>

      </div>
    </div>
  );
}
