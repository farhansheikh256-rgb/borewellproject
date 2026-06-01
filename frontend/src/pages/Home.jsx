import React from 'react';
import Hero3D from '../components/Hero3D/Hero3D';
import ServicesGrid from '../components/Services/ServicesGrid';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { services, loading } = useAppContext();
  
  const popularServices = services.filter(s => s.popular);

  return (
    <div>
      <Hero3D />
      
      <section className="py-5" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Our Popular Services</h2>
          <p className="section-subtitle">We offer a wide range of borewell and water solutions for residential, commercial, and agricultural needs.</p>
          
          {loading ? <p className="text-center">Loading services...</p> : <ServicesGrid services={popularServices} />}
        </div>
      </section>

      <section className="py-5" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Our streamlined process ensures a hassle-free experience from booking to water supply.</p>
          <HowItWorks />
        </div>
      </section>
      
      <section className="py-5" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title text-center mb-5">AquaDrill Impact</h2>
          <div className="stats-grid">
            <div className="stat-card text-center">
              <div className="stat-value">15+</div>
              <div className="stat-title text-accent">Years Experience</div>
            </div>
            <div className="stat-card text-center">
              <div className="stat-value">2500+</div>
              <div className="stat-title text-accent">Borewells Drilled</div>
            </div>
            <div className="stat-card text-center">
              <div className="stat-value">2000+</div>
              <div className="stat-title text-accent">Happy Customers</div>
            </div>
            <div className="stat-card text-center">
              <div className="stat-value">25+</div>
              <div className="stat-title text-accent">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: 'linear-gradient(to bottom, var(--surface-2), var(--surface))' }}>
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mb-5">Don't just take our word for it. Read reviews from our satisfied clients across the state.</p>
          <Testimonials />
        </div>
      </section>
    </div>
  );
}
