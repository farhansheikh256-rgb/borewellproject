import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaWrench, FaWater, FaInfoCircle } from 'react-icons/fa';

export default function LowPressure() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaWater size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Low Water Pressure Solutions</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Experiencing sputtering taps or a weak flow? Low water pressure from a well or borewell can disrupt your entire day. Here is what causes it and how we can fix it.
          </p>
        </div>

        <div className="problem-content mb-5">
          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Common Causes</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Clogged Intake Screens:</strong> Over time, sand, silt, and mineral deposits can accumulate around the pump’s intake screen or inside the impellers, restricting the water flow.</li>
            <li><strong>Falling Water Tables:</strong> If the groundwater level in your area has dropped, the pump may struggle to extract sufficient water and maintain pressure.</li>
            <li><strong>Leaking Pipes:</strong> A hole in the drop pipe or leaks in your home's plumbing system will cause a significant drop in pressure before it reaches the tap.</li>
            <li><strong>Pressure Tank Issues:</strong> A waterlogged pressure tank or incorrect air pressure settings can cause the pump to cycle improperly, mimicking low pressure.</li>
            <li><strong>Worn Pump Components:</strong> Continuous operation, especially in sandy water, wears down the impellers, reducing the pump's output capacity over time.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Recommended Solutions</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaWrench color="var(--primary)" size={24} className="mb-2" />
              <h5>System Inspection</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We pull the pump to inspect and clean the intake screen, clear debris, and check for worn impellers.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaInfoCircle color="var(--primary)" size={24} className="mb-2" />
              <h5>Tank & Pressure Switch Calibration</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We check the air pressure in your tank and recalibrate the pressure switch settings to ensure optimal cycling.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Need Your Pressure Restored?</h3>
          <p className="mb-4">Don't suffer through weak showers and sputtering faucets. Our experts have the tools to diagnose and fix your well system fast.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Contact Dr.Water Today
          </a>
        </div>

      </div>
    </div>
  );
}
