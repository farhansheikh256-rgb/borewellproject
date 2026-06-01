import React from 'react';
import { Link } from 'react-router-dom';
import { GiDrill } from 'react-icons/gi';
import { FaWater, FaWrench, FaCog, FaShieldAlt, FaTools } from 'react-icons/fa';
import { MdScience } from 'react-icons/md';

const iconMap = {
  drill: GiDrill,
  pump: FaWater,
  test: MdScience,
  repair: FaWrench,
  motor: FaCog,
  casing: FaShieldAlt,
  default: FaTools
};

export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || iconMap.default;

  return (
    <div className="glass-card">
      {service.popular && <div className="popular-badge">Popular</div>}
      <div className="service-icon-wrapper">
        <Icon />
      </div>
      <h3>{service.name}</h3>
      <p className="text-muted mb-3">{service.description}</p>
      <span className="service-price">{service.price}</span>
      <Link to="/book" className="btn-outline" style={{ display: 'block', textAlign: 'center' }}>
        Book Now
      </Link>
    </div>
  );
}
