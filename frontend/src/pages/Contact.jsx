import React from 'react';
import ContactInfo from '../components/Contact/ContactInfo';

export default function Contact() {
  return (
    <div>
      <div className="py-5 text-center" style={{ background: 'var(--surface-2)', paddingTop: '120px' }}>
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle mb-0">Get in touch for inquiries, quotes, or emergency services.</p>
        </div>
      </div>
      
      <div className="py-5">
        <div className="container booking-layout">
          <div>
            <ContactInfo />
          </div>
          <div>
            <div className="glass-card" style={{ height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
              <p className="text-muted text-center p-4">
                [Map Integration Placeholder]<br/><br/>
                In a real application, an interactive Google Map or Leaflet map would be embedded here showing the office location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
