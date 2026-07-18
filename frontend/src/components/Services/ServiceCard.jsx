import React, { useRef, useState, useEffect } from 'react';
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

export default function ServiceCard({ service, index = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
  const delay = (index % 3) * 120;

  return (
    <div
      ref={ref}
      className="glass-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {service.popular && <div className="popular-badge">Popular</div>}
      <div className="service-icon-wrapper"><Icon /></div>
      <h3>{service.name}</h3>
      <p className="text-muted mb-3">{service.description}</p>
      <span className="service-price">{service.price}</span>
      <Link to="/book" className="btn-outline" style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
        Book Now
      </Link>
    </div>
  );
}
