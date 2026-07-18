import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaFlask, FaFilter, FaVial } from 'react-icons/fa';

export default function PoorQuality() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaFlask size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Poor Water Quality Solutions</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Cloudy water, metallic tastes, or "rotten egg" smells? Poor well water quality is common, but easily treatable with the right approach.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Identifying the Problem</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Sediment (Sand/Grit):</strong> Cloudiness or grit at the bottom of your glass usually indicates mechanical sediment entering the well screen.</li>
            <li><strong>Iron (Red or Clear):</strong> Visible rust-colored particles (ferric iron) or water that runs clear but stains fixtures brown over time (dissolved ferrous iron).</li>
            <li><strong>Odors (Rotten Egg):</strong> A sulfur or rotten egg smell typically points to hydrogen sulfide gas or sulfur-reducing bacteria in the well.</li>
            <li><strong>Hardness:</strong> Excessive calcium and magnesium cause scale buildup on appliances, dry skin, and poor soap lathering.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Recommended Solutions</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaVial color="var(--primary)" size={24} className="mb-2" />
              <h5>Laboratory Water Testing</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We never guess. The essential first step is a certified lab test to identify exact contaminant levels (pH, iron, bacteria, hardness).</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaFilter color="var(--primary)" size={24} className="mb-2" />
              <h5>Custom Filtration Chains</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Depending on the results, we install spin-down sediment filters, oxidation systems for iron/sulfur, water softeners, or UV disinfection systems.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Ready for Clean, Clear Water?</h3>
          <p className="mb-4">Stop buying bottled water and protect your home's appliances. Schedule a comprehensive water test with our experts today.</p>
          <a href="tel:+918830251172" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Book a Water Test
          </a>
        </div>

      </div>
    </div>
  );
}
