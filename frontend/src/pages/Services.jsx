import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServicesGrid from '../components/Services/ServicesGrid';
import { useAppContext } from '../context/AppContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Services() {
  const { services, loading } = useAppContext();
  const location = useLocation();
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    if (location.state?.category) {
      setExpandedCategory(location.state.category);
    }
  }, [location.state]);

  const hierarchy = [
    {
      name: 'Borewell',
      subtitle: 'Drilling • Contract Work',
      boxTitle: 'Services Included'
    },
    {
      name: 'New Motor & Pumps',
      subtitle: 'Texmo • CRI • Kirloskar',
      boxTitle: 'Available Brands'
    },
    {
      name: 'Repairing & Maintenance',
      subtitle: 'Pump • Motor • Rewinding',
      boxTitle: 'Repair Services'
    },
    {
      name: 'Dewatering',
      subtitle: 'Water Tanker Services',
      boxTitle: 'Services'
    }
  ];

  const toggleCategory = (catName) => {
    setExpandedCategory(expandedCategory === catName ? null : catName);
  };

  return (
    <div>
      <div className="py-5 text-center" style={{ background: 'var(--surface-2)', paddingTop: '120px' }}>
        <div className="container">
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle mb-0">Comprehensive borewell and water solutions tailored to your needs.</p>
        </div>
      </div>
      
      <div className="py-5">
        <div className="container">
          {loading ? (
            <p className="text-center">Loading services...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
              {hierarchy.map(cat => {
                const isExpanded = expandedCategory === cat.name;
                const catServices = services.filter(s => s.category === cat.name);
                
                return (
                  <div key={cat.name} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div 
                      onClick={() => toggleCategory(cat.name)}
                      style={{ 
                        padding: '24px 30px', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        background: isExpanded ? 'rgba(2, 132, 199, 0.05)' : 'transparent',
                        borderBottom: isExpanded ? '1px solid var(--glass-border)' : 'none',
                        transition: 'background 0.3s'
                      }}
                    >
                      <div>
                        <h2 style={{ marginBottom: '8px', color: 'var(--primary)' }}>{cat.name}</h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>{cat.subtitle}</p>
                      </div>
                      <div style={{ color: 'var(--primary)', fontSize: '1.5rem', transition: 'transform 0.3s' }}>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="animate-slide-up" style={{ padding: '40px 30px', background: 'var(--surface)' }}>
                        <h4 className="text-accent mb-4" style={{ textAlign: 'center', fontSize: '1.4rem' }}>{cat.boxTitle}</h4>
                        <ServicesGrid services={catServices} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
