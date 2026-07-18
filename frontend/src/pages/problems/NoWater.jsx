import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaExclamationTriangle, FaTintSlash, FaBolt, FaWrench } from 'react-icons/fa';

export default function NoWater() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container" style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="problem-hero text-center mb-5">
          <FaTintSlash size={50} color="var(--primary)" className="mb-3" />
          <h1 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '15px' }}>Sudden Loss of Water</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            A complete loss of water is stressful and potentially dangerous for your water heater. Follow these immediate steps to identify the issue and get your water flowing again.
          </p>
        </div>

        <div className="problem-content mb-5">
          <div style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '15px 20px', borderRadius: '5px', marginBottom: '30px' }}>
            <strong><FaExclamationTriangle /> Immediate Safety Step:</strong> Turn off your water heater immediately. Running a water heater without water can burn out heating elements or create dangerous pressure levels.
          </div>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Common Causes</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            <li><strong>Tripped Circuit Breakers:</strong> The most common and easily fixable cause of sudden pump failure is a tripped breaker in your electrical panel.</li>
            <li><strong>Closed Main Shut-Off Valve:</strong> Ensure your main water valve hasn't been accidentally closed or bumped.</li>
            <li><strong>Failed Well Pump:</strong> Well pumps have a finite lifespan. If the motor burns out or the pump fails mechanically, it will stop drawing water completely.</li>
            <li><strong>Pressure Switch Failure:</strong> The pressure switch tells the pump when to turn on and off. If it fails, the pump won't know it needs to run.</li>
            <li><strong>Frozen Pipes:</strong> During freezing weather, uninsulated pipes in attics, crawlspaces, or outside walls may freeze solid, blocking flow.</li>
          </ul>

          <h3 className="mb-3" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>Our Recommended Solutions</h3>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaBolt color="var(--primary)" size={24} className="mb-2" />
              <h5>Electrical & Switch Diagnosis</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>We test the control box, pressure switch, and electrical connections to rule out easily fixable electrical faults.</p>
            </div>
            <div className="solution-card" style={{ padding: '20px', background: 'var(--background)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <FaWrench color="var(--primary)" size={24} className="mb-2" />
              <h5>Pump Replacement</h5>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>If the pump has failed, we offer fast, professional pump extraction and replacement to restore your water supply immediately.</p>
            </div>
          </div>
        </div>

        <div className="cta-box text-center" style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(2, 132, 199, 0.05))', padding: '40px 20px', borderRadius: '15px', border: '1px solid var(--primary)' }}>
          <h3 className="mb-3">Need Emergency Assistance?</h3>
          <p className="mb-4">No water? No problem. Our emergency teams are ready to diagnose and repair your system quickly.</p>
          <a href="tel:+918855807186" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt /> Call Dr.Water Now
          </a>
        </div>

      </div>
    </div>
  );
}
