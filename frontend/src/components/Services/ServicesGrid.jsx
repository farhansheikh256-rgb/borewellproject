import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServicesGrid({ services }) {
  if (!services || services.length === 0) {
    return <p className="text-center text-muted">No services found.</p>;
  }

  return (
    <div className="services-grid">
      {services.map((service, index) => (
        <ServiceCard key={service._id || service.id} service={service} index={index} />
      ))}
    </div>
  );
}
