import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ServicesGrid from '../components/Services/ServicesGrid';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import { useAppContext } from '../context/AppContext';

// ─── Intersection Observer hook for scroll-reveal ─────────────────────────
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reveal wrapper ────────────────────────────────────────────────────────
function Reveal({ children, from = 'bottom', delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  const translate = { bottom: 'translateY(60px)', left: 'translateX(-60px)', right: 'translateX(60px)', top: 'translateY(-40px)' };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate[from],
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated counter ──────────────────────────────────────────────────────
function CountUp({ end, suffix = '', duration = 1800 }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const num = parseInt(end.replace(/\D/g, ''));
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);
  const display = end.includes('+') ? count + '+' : end.includes('/') ? end : count + suffix;
  return <span ref={ref}>{display}</span>;
}

// ─── Scroll-driven Hero (sticky 2-phase) ──────────────────────────────────
function ScrollHero() {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      setPhase(scrolled < window.innerHeight * 0.5 ? 0 : 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slide = (show, fromBelow = false) => ({
    position: 'absolute', zIndex: 2,
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : `translateY(${fromBelow ? '60px' : '-60px'})`,
    transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1)',
    pointerEvents: show ? 'auto' : 'none',
    padding: '0 20px', width: '100%',
  });

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* BG image */}
        <img src="/hero-bg.png" alt="Borewell" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, transform: phase >= 1 ? 'scale(1.07)' : 'scale(1)', transition: 'transform 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,28,0.88), rgba(10,15,28,0.97))', zIndex: 1 }} />
        {/* Glow orb */}
        <div style={{ position: 'absolute', width: phase >= 1 ? '900px' : '500px', height: phase >= 1 ? '900px' : '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', transition: 'width 1.2s ease, height 1.2s ease', zIndex: 1, pointerEvents: 'none' }} />

        {/* Phase 0 */}
        <div className="container text-center" style={slide(phase === 0)}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '16px' }}>
            ADVANCED BOREWELL ENGINEERING
          </div>
          <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: '1.05', marginBottom: '48px' }}>
            We Dig Deep<br />So You Don't Have To
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>SCROLL TO EXPLORE</p>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--primary), transparent)', animation: 'heroPulse 1.8s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Phase 1 */}
        <div className="container text-center" style={slide(phase === 1, true)}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '14px' }}>TRUSTED SINCE 1995</div>
          <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: '1.1', marginBottom: '16px' }}>
            Powering Water<br />Across Nagpur
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 28px', lineHeight: 1.7 }}>
            30+ years of precision drilling and complete water solutions for <strong style={{ color: 'var(--primary)' }}>homes, farms &amp; industries.</strong>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', padding: '22px 32px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '14px', maxWidth: '620px', margin: '0 auto 28px' }}>
            {[['2,500+', 'CUSTOMERS'], ['30+', 'YEARS EXP.'], ['24/7', 'EMERGENCY']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '5px', letterSpacing: '1.5px' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '13px 34px' }}>Request Service</Link>
            <Link to="/about" className="btn-outline" style={{ padding: '13px 34px', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Learn More</Link>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 5 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: '6px', height: i === phase ? '26px' : '6px', borderRadius: '3px', background: i === phase ? 'var(--primary)' : 'rgba(255,255,255,0.2)', transition: 'all 0.4s ease' }} />
          ))}
        </div>

        {/* Wave */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 10 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '70px', fill: 'var(--surface)' }}>
            <path d="M0,40c0,0 120,-38 250,-38c130,0 345,78 500,78c155,0 250,-30 250,-30l0,50l-1000,0Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Main Home Page ────────────────────────────────────────────────────────
export default function Home() {
  const { services, loading } = useAppContext();
  const popularServices = services.filter(s => s.popular);

  return (
    <div>
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <ScrollHero />

      <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)' }}>

        {/* ══ SERVICES ══════════════════════════════════════════════════ */}
        <section className="py-5">
          <div className="container">
            <Reveal from="bottom">
              <h2 className="section-title">Our Products &amp; Services</h2>
              <p className="section-subtitle">A wide range of borewell and water solutions for residential, commercial, and agricultural needs.</p>
            </Reveal>
            <div style={{ marginTop: '40px' }}>
              {loading ? (
                <p className="text-center">Loading services...</p>
              ) : (
                <ServicesGrid services={popularServices} />
              )}
            </div>
          </div>
        </section>

        {/* ══ STATS BANNER ══════════════════════════════════════════════ */}
        <section className="py-5" style={{ background: 'var(--primary)', color: 'white', overflow: 'hidden' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', alignItems: 'center' }}>
              <Reveal from="left" delay={0}>
                <div className="text-center">
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: 700 }}>Licensed, Certified<br />&amp; Bonded</h3>
                  <p style={{ opacity: 0.85, margin: 0, fontSize: '0.95rem' }}>Professional guarantee for your peace of mind.</p>
                </div>
              </Reveal>
              <Reveal from="bottom" delay={150}>
                <div className="text-center">
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>
                    <CountUp end="2500+" />
                  </h2>
                  <h6 style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '8px', fontWeight: 500 }}>Customers Served</h6>
                </div>
              </Reveal>
              <Reveal from="right" delay={300}>
                <div className="text-center">
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>
                    <CountUp end="30+" />
                  </h2>
                  <h6 style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '8px', fontWeight: 500 }}>Years Experience</h6>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ═════════════════════════════════════════════ */}
        <section className="py-5" style={{ background: 'var(--surface-2)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
              <Reveal from="left">
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '24px' }}>Why Choose Us?</h2>
                  <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.4', color: 'var(--text)' }}>
                    {['100% Satisfaction Guarantee', 'Fast Response Time', 'Knowledgeable & Skillful Staff', 'Excellent Customer Service', 'Reliable & Professional', '24/7 Emergency Service', 'Fair & Transparent Pricing', 'Comprehensive Services'].map((item, i) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', animation: `none` }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/about" className="btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>Learn More About Us</Link>
                </div>
              </Reveal>
              <Reveal from="right" delay={100}>
                <div className="glass-card text-center" style={{ padding: '50px 30px', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
                  <div style={{ width: '80px', height: '80px', background: 'rgba(0,229,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg fill="var(--primary)" height="40" width="40" viewBox="0 0 512 512"><path d="M255.8 48C217 122.9 128 221.7 128 319.4c0 71.9 57.2 128.6 128 128.6 70.8 0 128-56.7 128-128.6 0-97.7-89.1-196.5-128.2-271.4z" /></svg>
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: '14px' }}>The Dr. Water Guarantee</h3>
                  <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>We ensure the highest standards of water quality, efficient well performance, and durable equipment installations for all our clients.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════ */}
        <section className="py-5" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <Reveal from="bottom">
              <h2 className="section-title text-center">How It Works</h2>
              <p className="section-subtitle text-center">Our streamlined process ensures a hassle-free experience from booking to water supply.</p>
            </Reveal>
            <Reveal from="bottom" delay={150}>
              <HowItWorks />
            </Reveal>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══════════════════════════════════════════════ */}
        <section className="py-5" style={{ background: 'linear-gradient(to bottom, var(--surface-2), var(--surface))' }}>
          <div className="container">
            <Reveal from="bottom">
              <h2 className="section-title">Don't Take Our Word For It</h2>
              <p className="section-subtitle mb-5">Read reviews from our satisfied clients across the region.</p>
            </Reveal>
            <Reveal from="bottom" delay={100}>
              <Testimonials />
            </Reveal>
          </div>
        </section>

        {/* ══ EMERGENCY CTA ═════════════════════════════════════════════ */}
        <section className="py-5" style={{ background: 'var(--surface)' }}>
          <Reveal from="bottom">
            <div className="container text-center" style={{ padding: '40px', background: 'rgba(0,229,255,0.05)', borderRadius: '16px', border: '1px solid rgba(0,229,255,0.2)' }}>
              <h3 style={{ color: 'var(--primary)', fontWeight: 800, margin: 0, fontSize: '2rem' }}>Fast Emergency Service Available</h3>
              <p className="text-muted mt-2 mb-0" style={{ fontSize: '1.2rem' }}>
                Call us 24/7 at <strong><a href="tel:+918855807186" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88558 07186</a></strong>
              </p>
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  );
}
