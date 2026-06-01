import React, { useState } from 'react';
import ServicesGrid from '../components/Services/ServicesGrid';
import { useAppContext } from '../context/AppContext';

export default function Services() {
  const { services, loading } = useAppContext();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'drilling', 'pump', 'testing', 'repair'];

  const filteredServices = filter === 'All' 
    ? services 
    : services.filter(s => s.category === filter);

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
          <div className="mb-5 d-flex justify-content-center" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`btn-outline ${filter === cat ? 'active' : ''}`}
                style={filter === cat ? { background: 'var(--accent)', color: 'var(--surface)' } : {}}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          
          {loading ? <p className="text-center">Loading services...</p> : <ServicesGrid services={filteredServices} />}
        </div>
      </div>
    </div>
  );
}
