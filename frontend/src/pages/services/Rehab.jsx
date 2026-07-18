import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaTools, FaShower, FaSyringe } from 'react-icons/fa';

export default function Rehab() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaTools size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Well Cleaning & Rehab</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Restore your well's original yield and water quality through professional cleaning, chlorination, and hydrofracking.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Signs You Need Well Rehab</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Decreased Yield:</strong> Your well runs out of water faster than it used to.</li>
            <li><strong>Cloudy or Sandy Water:</strong> Sediment buildup at the bottom of the well is being sucked into the pump.</li>
            <li><strong>Slime on Filters:</strong> A jelly-like substance (iron bacteria) clogging your filters or plumbing fixtures.</li>
            <li><strong>Positive Bacteria Tests:</strong> Coliform or E. coli detected in your annual water test.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Rehab Techniques</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaSyringe color="var(--primary)" size={24} className="mb-2" />
              <h5>Shock Chlorination</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>A massive dose of chlorine is circulated throughout the well and plumbing to destroy iron bacteria and coliform.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaShower color="var(--primary)" size={24} className="mb-2" />
              <h5>Hydrofracking</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We inject highly pressurized water into the bedrock to flush out debris and open new water veins, dramatically increasing yield.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Bring Your Well Back to Life</h3>
          <p className="mb-4">Don't abandon an old well. Let us clean and rehabilitate it to save you money.</p>
          <a href="tel:+918830251172" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Request an Inspection
          </a>
        </div>

      </div>
    </div>
  );
}
