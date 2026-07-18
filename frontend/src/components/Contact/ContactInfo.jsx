import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <div className="info-panel glass-card">
      <h3 className="mb-4 text-white">Contact Information</h3>
      
      <div className="info-item">
        <FaPhoneAlt />
        <div>
          <h5 className="mb-1">Phone</h5>
          <p className="text-muted mb-0"><a href="tel:+918830251172" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88302 51172</a></p>
        </div>
      </div>
      
      <div className="info-item">
        <FaEnvelope />
        <div>
          <h5 className="mb-1">Email</h5>
          <p className="text-muted mb-0">contact@drwater.in</p>
        </div>
      </div>
      
      <div className="info-item">
        <FaMapMarkerAlt />
        <div>
          <h5 className="mb-1">Address</h5>
          <p className="text-muted mb-0">123, Borewell Avenue,<br/>Indore, MP 452001</p>
        </div>
      </div>
      
      <div className="info-item">
        <FaClock />
        <div>
          <h5 className="mb-1">Business Hours</h5>
          <p className="text-muted mb-0">Mon - Sat: 8:00 AM - 8:00 PM<br/>Sun: Emergency Only</p>
        </div>
      </div>
      
      <div className="mt-5 p-3" style={{ background: 'rgba(0,194,255,0.1)', border: '1px solid var(--accent)', borderRadius: '8px' }}>
        <h5 className="text-accent mb-2">Emergency Service 24/7</h5>
        <p className="text-sm mb-0">For emergency pump repair or motor failures, call us immediately at the number above.</p>
      </div>
    </div>
  );
}
