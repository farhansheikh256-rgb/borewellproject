import React from 'react';

export default function About() {
  return (
    <div>
      <div className="py-5 text-center" style={{ background: 'var(--surface-2)', paddingTop: '120px' }}>
        <div className="container">
          <h1 className="section-title">About Dr.Water</h1>
          <p className="section-subtitle mb-0">Digging deep since 2009 to provide sustainable water solutions.</p>
        </div>
      </div>
      
      <div className="py-5">
        <div className="container">
          <div className="glass-card mb-5">
            <h2 className="mb-3 text-accent">Our Story</h2>
            <p className="text-muted">
              Dr.Water was founded with a mission to address the growing water scarcity issues by providing 
              reliable, efficient, and technologically advanced borewell drilling services. Over the past 15 years, 
              we have grown from a single rig operation to one of the largest and most trusted borewell service 
              providers in the state.
            </p>
            <p className="text-muted">
              We specialize in deep tube well drilling, utilizing high-power rig machines capable of drilling through 
              the toughest rock formations. Our team of experienced hydro-geologists ensures the highest success rate 
              in striking water.
            </p>
          </div>
          
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="glass-card">
              <h3 className="text-accent">Our Mission</h3>
              <p className="text-muted">To provide sustainable and accessible groundwater solutions through innovative drilling technologies and expert geological analysis.</p>
            </div>
            <div className="glass-card">
              <h3 className="text-accent">Our Vision</h3>
              <p className="text-muted">To be the most trusted name in water infrastructure, ensuring every household and farm has access to clean and reliable water.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
