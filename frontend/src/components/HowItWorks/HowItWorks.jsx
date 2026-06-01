import React from 'react';
import { FaPhoneAlt, FaMapMarkedAlt, FaWater } from 'react-icons/fa';
import { GiDrill } from 'react-icons/gi';

export default function HowItWorks() {
  const steps = [
    { id: 1, title: 'Contact Us', desc: 'Call us or book an enquiry online.', icon: FaPhoneAlt },
    { id: 2, title: 'Site Survey', desc: 'Our experts survey your location for water points.', icon: FaMapMarkedAlt },
    { id: 3, title: 'Drilling', desc: 'We deploy rigs and drill to the required depth.', icon: GiDrill },
    { id: 4, title: 'Water Supply', desc: 'Pumps installed and water flows to your premises.', icon: FaWater },
  ];

  return (
    <div className="steps-container">
      {steps.map(step => {
        const Icon = step.icon;
        return (
          <div key={step.id} className="step-item animate-fade-in">
            <div className="step-circle">
              <Icon />
              <div className="step-num">{step.id}</div>
            </div>
            <h4>{step.title}</h4>
            <p className="text-muted">{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
