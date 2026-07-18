import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaFilter, FaShieldAlt, FaVial } from 'react-icons/fa';

export default function Filtration() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaFilter size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Water Filtration Treatment</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Ensure your family’s safety and comfort with advanced whole-house filtration systems customized for your unique well water chemistry.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Filtration Systems</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Iron & Sulfur Filters:</strong> Specialized oxidation systems that eliminate orange rust stains and "rotten egg" odors.</li>
            <li><strong>Water Softeners:</strong> Remove calcium and magnesium to prevent scale buildup in your pipes and water heater.</li>
            <li><strong>UV Purification:</strong> Chemical-free, ultraviolet light systems that neutralize harmful bacteria, viruses, and cysts.</li>
            <li><strong>Reverse Osmosis (RO):</strong> Point-of-use systems that provide ultra-pure, bottled-quality drinking water right at your sink.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Approach</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaVial color="var(--primary)" size={24} className="mb-2" />
              <h5>Science-Based Solutions</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We build systems based strictly on certified laboratory test results, ensuring we target exactly what is in your water.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaShieldAlt color="var(--primary)" size={24} className="mb-2" />
              <h5>Protect Your Home</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Proper filtration extends the life of your plumbing, water heater, dishwasher, and washing machine.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Ready for Better Water?</h3>
          <p className="mb-4">Schedule a consultation and water test to get a custom filtration recommendation.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Consult a Specialist
          </a>
        </div>

      </div>
    </div>
  );
}
