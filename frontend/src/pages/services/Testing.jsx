import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaVial, FaMicroscope, FaCheckCircle } from 'react-icons/fa';

export default function Testing() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaVial size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Water Quality Testing</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Comprehensive laboratory water testing to identify hidden contaminants and ensure your family's water is safe to drink.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Why Test Your Water?</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Health & Safety:</strong> Unlike municipal water, private wells are not regulated by the EPA. It's the homeowner's responsibility to ensure the water is safe.</li>
            <li><strong>Invisible Threats:</strong> Dangerous contaminants like arsenic, lead, and nitrates cannot be seen, tasted, or smelled.</li>
            <li><strong>Filtration Baseline:</strong> You cannot design an effective water filtration system without first knowing exactly what needs to be removed.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>What We Test For</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaMicroscope color="var(--primary)" size={24} className="mb-2" />
              <h5>Bacteria & Pathogens</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We check for Total Coliform and E. coli, which can indicate contamination from surface runoff or failing septic systems.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaCheckCircle color="var(--primary)" size={24} className="mb-2" />
              <h5>Chemical & Mineral Analysis</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Comprehensive breakdown of pH, hardness, iron, manganese, nitrates, arsenic, and heavy metals.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">When Was Your Last Water Test?</h3>
          <p className="mb-4">The CDC recommends testing your well water at least once a year. Schedule yours today.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Book a Water Test
          </a>
        </div>

      </div>
    </div>
  );
}
