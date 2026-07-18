import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ServicesGrid from '../components/Services/ServicesGrid';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import { useAppContext } from '../context/AppContext';

// Scroll-pinned hero – 2 scroll phases
function ScrollHero() {
  const [phase, setPhase] = useState(0); // 0=intro, 1=stats, 2=released
  const phaseRef = useRef(0);
  const lockedRef = useRef(true);

  useEffect(() => {
    // Keep ref in sync so wheel handler always has fresh value
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const onWheel = (e) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = phaseRef.current;
      const next = Math.max(0, Math.min(2, cur + dir));
      if (next !== cur) {
        if (next === 2) {
          // Phase 2 → release lock so normal scroll works
          lockedRef.current = false;
        }
        setPhase(next);
        phaseRef.current = next;
      }
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < 30) return;
      touchStartY = e.touches[0].clientY;
      const dir = dy > 0 ? 1 : -1;
      const cur = phaseRef.current;
      const next = Math.max(0, Math.min(2, cur + dir));
      if (next !== cur) {
        if (next === 2) lockedRef.current = false;
        setPhase(next);
        phaseRef.current = next;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // When phase=2, scroll body back to top of next section smoothly
  useEffect(() => {
    if (phase === 2) {
      const nextSection = document.getElementById('main-content');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [phase]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background image */}
      <img
        src="/hero-bg.png"
        alt="Borewell"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
          transform: phase >= 1 ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, rgba(10,15,28,0.88), rgba(10,15,28,0.97))',
        zIndex: 1, transition: 'opacity 0.8s',
      }} />
      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        width: phase >= 1 ? '700px' : '500px', height: phase >= 1 ? '700px' : '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        transition: 'width 1.2s ease, height 1.2s ease',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* ---- PHASE 0: Intro ---- */}
      <div className="container text-center" style={{
        position: 'absolute', zIndex: 2,
        opacity: phase === 0 ? 1 : 0,
        transform: phase === 0 ? 'translateY(0px)' : 'translateY(-70px)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: phase === 0 ? 'auto' : 'none',
      }}>
        <div style={{ display: 'inline-block', marginBottom: '18px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--primary-light)' }}>
          ADVANCED BOREWELL ENGINEERING
        </div>
        <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: '1.05', marginBottom: '50px' }}>
          We Dig Deep<br />So You Don't Have To
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>
            SCROLL TO EXPLORE
          </p>
          <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
        </div>
      </div>

      {/* ---- PHASE 1: Stats & CTA ---- */}
      <div className="container text-center" style={{
        position: 'absolute', zIndex: 2,
        opacity: phase === 1 ? 1 : 0,
        transform: phase === 1 ? 'translateY(0px)' : (phase === 0 ? 'translateY(80px)' : 'translateY(-70px)'),
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: phase === 1 ? 'auto' : 'none',
      }}>
        <div style={{ display: 'inline-block', marginBottom: '18px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--primary-light)' }}>
          TRUSTED SINCE 1995
        </div>
        <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', lineHeight: '1.1', marginBottom: '18px' }}>
          Powering Water<br />Across Nagpur
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          30+ years of precision drilling and complete water solutions for{' '}
          <strong style={{ color: 'var(--primary)' }}>homes, farms &amp; industries.</strong>
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap',
          padding: '24px 32px',
          background: 'rgba(0,229,255,0.05)',
          border: '1px solid rgba(0,229,255,0.15)',
          borderRadius: '14px',
          maxWidth: '640px', margin: '0 auto 36px',
        }}>
          {[['2,500+', 'CUSTOMERS SERVED'], ['30+', 'YEARS EXPERIENCE'], ['24/7', 'EMERGENCY']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '5px', letterSpacing: '1.5px' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn-primary" style={{ padding: '13px 34px', fontSize: '1rem' }}>Request Service</Link>
          <Link to="/about" className="btn-outline" style={{ padding: '13px 34px', fontSize: '1rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Learn More</Link>
        </div>

        {/* Scroll hint */}
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>
            SCROLL TO CONTINUE
          </p>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
        </div>
      </div>

      {/* Progress dots (right side) */}
      <div style={{
        position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 5,
      }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            width: '6px',
            height: i === Math.min(phase, 1) ? '26px' : '6px',
            borderRadius: '3px',
            background: i === Math.min(phase, 1) ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>

      {/* Wave divider */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 10 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px', fill: 'var(--surface)' }}>
          <path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,78 500,78c154.895,0 250,-30 250,-30l0,50l-1000,0l0,-60Z" />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const { services, loading } = useAppContext();
  const popularServices = services.filter(s => s.popular);

  return (
    <div>
      {/* Scroll-locked Hero */}
      <section className="hero-section" style={{ position: 'sticky', top: 0, zIndex: 0 }}>
        <ScrollHero />
      </section>

      {/* Anchor for scroll-jump */}
      <div id="main-content" style={{ position: 'relative', zIndex: 1, background: 'var(--surface)' }}>

        {/* 2. Services Section */}
        <section className="py-5">
          <div className="container">
            <h2 className="section-title">Our Products &amp; Services</h2>
            <p className="section-subtitle">We offer a wide range of borewell and water solutions for residential, commercial, and agricultural needs.</p>
            {loading ? <p className="text-center">Loading services...</p> : <ServicesGrid services={popularServices} />}
          </div>
        </section>

        {/* 3. Stats & Certifications Banner */}
        <section className="py-5" style={{ background: 'var(--primary)', color: 'white' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', alignItems: 'center' }}>
              <div className="text-center">
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: 700 }}>Licensed, Certified<br />&amp; Bonded</h3>
                 <p style={{ opacity: 0.8, margin: 0 }}>Professional guarantee for your peace of mind.</p>
              </div>
              <div className="text-center">
                 <h2 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>2,500+</h2>
                 <h6 style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '10px', fontWeight: 500 }}>Customers Served</h6>
              </div>
              <div className="text-center">
                 <h2 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>30+</h2>
                 <h6 style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '10px', fontWeight: 500 }}>Years Experience</h6>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us */}
        <section className="py-5" style={{ background: 'var(--surface-2)' }}>
          <div className="container">
            <div className="why-choose-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <div>
                <h2 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)' }}>Why Choose Us?</h2>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2.2', color: 'var(--text)' }}>
                  {['100% Satisfaction Guarantee','Fast Response Time','Knowledgeable & Skillful Staff','Excellent Customer Service','Reliable & Professional','24/7 Emergency Service','Fair & Transparent Pricing','Comprehensive Services'].map(item => (
                    <li key={item}><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong>{item}</li>
                  ))}
                </ul>
                <Link to="/about" className="btn-primary mt-4">Learn More About Us</Link>
              </div>
              <div>
                 <div className="glass-card text-center" style={{ padding: '50px 30px', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(0,229,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="var(--primary)" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M255.8 48C217 122.9 128 221.7 128 319.4c0 71.9 57.2 128.6 128 128.6 70.8 0 128-56.7 128-128.6 0-97.7-89.1-196.5-128.2-271.4z"></path></svg>
                    </div>
                    <h3 style={{ fontWeight: 700, marginBottom: '15px' }}>The Dr. Water Guarantee</h3>
                    <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>We ensure the highest standards of water quality, efficient well performance, and durable equipment installations for all our clients.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. How It Works */}
        <section className="py-5" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <h2 className="section-title text-center">How It Works</h2>
            <p className="section-subtitle text-center">Our streamlined process ensures a hassle-free experience from booking to water supply.</p>
            <HowItWorks />
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="py-5" style={{ background: 'linear-gradient(to bottom, var(--surface-2), var(--surface))' }}>
          <div className="container">
            <h2 className="section-title">Don't Take Our Word For It</h2>
            <p className="section-subtitle mb-5">Read reviews from our satisfied clients across the region.</p>
            <Testimonials />
          </div>
        </section>

        {/* 7. Emergency Service */}
        <section className="py-5" style={{ background: 'var(--surface)' }}>
          <div className="container text-center" style={{ padding: '30px', background: 'rgba(0,229,255,0.05)', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.2)' }}>
             <h3 style={{ color: 'var(--primary)', fontWeight: 800, margin: 0, fontSize: '2rem' }}>Fast Emergency Service Available</h3>
             <p className="text-muted mt-2 mb-0" style={{ fontSize: '1.2rem' }}>Call us 24/7 at <strong><a href="tel:+918855807186" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88558 07186</a></strong></p>
          </div>
        </section>

      </div>
    </div>
  );
}
