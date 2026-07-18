import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title, parent }) {
  return (
    <div style={{ padding: '120px 20px 80px', minHeight: '60vh', background: 'var(--surface)' }}>
      <div className="container text-center">
        <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{parent}</h3>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>{title}</h1>
        <p className="text-muted mb-5" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          This page is currently under construction. Please check back later for full content and details regarding {title.toLowerCase()}.
        </p>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    </div>
  );
}
