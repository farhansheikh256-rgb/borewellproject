import React from 'react';
import { Link } from 'react-router-dom';
import { GiDrill } from 'react-icons/gi';
import { 
  LuArrowDownToLine, 
  LuDroplet, 
  LuWrench, 
  LuSettings, 
  LuHammer,
  LuTruck,
  LuBadgeCheck,
  LuWaves,
  LuPackage,
  LuHardHat
} from 'react-icons/lu';

export default function ServiceCard({ service }) {
  // Dynamically assign icons based on service name and category
  const getIcon = (name = '', category = '') => {
    const text = (name + ' ' + category).toLowerCase();
    
    if (text.includes('contract')) return LuHardHat;
    if (text.includes('drill')) return GiDrill;
    if (text.includes('sleeve')) return LuArrowDownToLine;
    if (text.includes('tanker') || text.includes('truck')) return LuTruck;
    if (text.includes('texmo') || text.includes('cri') || text.includes('kirloskar') || text.includes('brand')) return LuBadgeCheck;
    if (text.includes('emergency') || text.includes('dewater')) return LuWaves;
    if (text.includes('motor') || text.includes('rewind')) return LuSettings;
    if (text.includes('repair') || text.includes('maintenance')) return LuWrench;
    if (text.includes('pump') || text.includes('water')) return LuDroplet;
    if (text.includes('accessor')) return LuPackage;
    
    return LuHammer;
  };

  const Icon = getIcon(service.name, service.category);

  return (
    <div className="glass-card">
      {service.popular && <div className="popular-badge">Popular</div>}
      <div className="service-icon-wrapper">
        <Icon />
      </div>
      <h3>{service.name}</h3>
      <p className="text-muted mb-3">{service.description}</p>
      <span className="service-price">{service.price}</span>
      <Link to="/book" className="btn-outline" style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
        Book Now
      </Link>
    </div>
  );
}
