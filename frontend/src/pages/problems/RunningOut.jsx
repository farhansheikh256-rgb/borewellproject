import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaDatabase, FaTools, FaChartLine } from 'react-icons/fa';

export default function RunningOut() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaChartLine size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Low Yield & Dry Well Solutions</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            A well that frequently runs out of water is incredibly frustrating. Learn how to manage a low-yield aquifer and explore permanent upgrades to secure your water supply.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Understanding Low Yield</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
            When you run out of water during heavy usage (like doing laundry while someone showers), it means your well pump is extracting water faster than the surrounding aquifer can recharge the borehole. 
          </p>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Seasonal Droughts:</strong> Groundwater levels naturally fluctuate, often dipping to their lowest points during late summer or extended droughts.</li>
            <li><strong>Clogged Aquifer Fractures:</strong> Over time, the rock fractures that feed your well can become blocked by mineral scale (calcium) or iron bacteria, drastically slowing recharge rates.</li>
            <li><strong>Pump Placed Too High:</strong> Sometimes, simply lowering the pump deeper into the existing borehole can access untapped reserve water.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Recommended Solutions</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaDatabase color="var(--primary)" size={24} className="mb-2" />
              <h5>Storage Tank (Reservoir) Systems</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>The most effective solution for low-yield wells. A large tank stores water pumped slowly over 24 hours, and a booster pump delivers it to your home on-demand.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaTools color="var(--primary)" size={24} className="mb-2" />
              <h5>Well Rehabilitation & Deepening</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We can clean the well to remove scale/bacteria blockages, hydrofrack to open new water veins, or drill deeper if the aquifer allows.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Tired of Waiting for Water?</h3>
          <p className="mb-4">Let our experts design a custom storage system or rehabilitate your well to ensure you never run dry again.</p>
          <a href="tel:+918830251172" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Discuss Your Options
          </a>
        </div>

      </div>
    </div>
  );
}
