import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ServicesGrid from '../components/Services/ServicesGrid';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import { useAppContext } from '../context/AppContext';

// ─── Intersection Observer reveal hook ────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible, delay];
}

// ─── Reveal wrapper ────────────────────────────────────────────────────────
function Reveal({ children, from = 'bottom', delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  const translate = {
    bottom: 'translateY(60px)',
    left: 'translateX(-60px)',
    right: 'translateX(60px)',
    top: 'translateY(-40px)',
    fade: 'none',
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate[from] || 'translateY(60px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated counter ──────────────────────────────────────────────────────
function CountUp({ end, duration = 1800 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const num = parseInt(end.replace(/\D/g, ''));
    const startT = Date.now();
    const step = () => {
      const p = Math.min((Date.now() - startT) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);
  const display = end.includes('+') ? count + '+' : count;
  return <span ref={ref}>{display}</span>;
}

// ─── Scroll-scrubbed Video Hero ────────────────────────────────────────────
// The video plays frame-by-frame as you scroll — just like Apple's website.
// Container is 500vh tall. The sticky inner panel holds the video.
// Overlay text fades in/out at different scroll points.
function VideoScrollHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [textPhase, setTextPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile viewport detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scrubber with passive event listening, conditional RAF loop, and seek throttling
  useEffect(() => {
    if (isMobile) return; // Skip scroll scrub behavior on mobile

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;
    let isLooping = false;
    let lastSeekTime = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const updateVideoTime = (progressVal) => {
      const vid = videoRef.current;
      if (!vid || !vid.duration || isNaN(vid.duration)) return;

      const now = performance.now();
      // Throttle seeking to max once every 33ms (approx 30fps) to prevent decoding lag
      if (now - lastSeekTime > 33 || Math.abs(progressVal - targetProgress) < 0.001) {
        // Map 0.0-1.0 progress to only the first 55% of the video duration (upper two frames)
        vid.currentTime = progressVal * 0.55 * vid.duration;
        lastSeekTime = now;
      }
    };

    const tick = () => {
      // Smoothly interpolate progress
      currentProgress = lerp(currentProgress, targetProgress, 0.1);

      // Stop loop if we are close enough to target
      if (Math.abs(currentProgress - targetProgress) < 0.0005) {
        currentProgress = targetProgress;
        updateVideoTime(currentProgress);
        setProgress(currentProgress);
        if (currentProgress < 0.5) setTextPhase(0);
        else setTextPhase(1);
        
        isLooping = false;
        if (rafId) cancelAnimationFrame(rafId);
        return;
      }

      updateVideoTime(currentProgress);
      setProgress(currentProgress);
      if (currentProgress < 0.5) setTextPhase(0);
      else setTextPhase(1);

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      targetProgress = Math.min(Math.max(0, -rect.top) / totalScroll, 1);

      // Start the animation loop if it's not already running
      if (!isLooping) {
        isLooping = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial paint
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const textReveal = (show, fromBelow = true) => ({
    position: 'absolute',
    zIndex: 4,
    width: '100%',
    padding: '0 20px',
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : `translateY(${fromBelow ? '40px' : '-40px'})`,
    transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
    pointerEvents: show ? 'auto' : 'none',
    textAlign: 'center',
  });

  if (isMobile) {
    return (
      <div style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#0a0f1c' }}>
        {/* Loop playing background video on mobile */}
        <video
          src="/scroll-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 1,
            opacity: 0.6,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(10,15,28,0.7), rgba(10,15,28,0.95))',
        }} />
        
        <div className="container text-center" style={{ position: 'relative', zIndex: 3, padding: '40px 15px 20px 15px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '12px' }}>
            ADVANCED BOREWELL ENGINEERING
          </div>
          <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: '2.1rem', lineHeight: 1.1, marginBottom: '14px' }}>
            We Dig Deep<br />So You Don't Have To
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            30+ years of precision drilling and complete water solutions across Nagpur for homes, farms &amp; industries.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', padding: '12px 16px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '12px', maxWidth: '480px', margin: '15px auto' }}>
            {[['2500+', 'CUSTOMERS'], ['30+', 'YEARS EXP.'], ['24/7', 'EMERGENCY']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '1px' }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>Request Service</Link>
            <Link to="/about" className="btn-outline" style={{ padding: '10px 24px', fontSize: '0.9rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Learn More</Link>
          </div>
        </div>

      </div>
    );
  }

  return (
    // 300vh gives 3 full viewport-heights of scroll travel (2 stages)
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0a0f1c',
      }}>

        {/* ── Full-screen video (paused, scrubbed by scroll) ── */}
        <video
          ref={videoRef}
          src="/scroll-hero.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 1,
            opacity: 0.75,
          }}
        />

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: `linear-gradient(
            to bottom,
            rgba(10,15,28,0.65) 0%,
            rgba(10,15,28,0.4) 40%,
            rgba(10,15,28,0.75) 100%
          )`,
        }} />

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '3px', zIndex: 10,
          width: `${progress * 100}%`,
          background: 'var(--primary)',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px rgba(0,229,255,0.6)',
        }} />

        {/* ── Text Phase 0: Welcome ── */}
        <div style={textReveal(textPhase === 0)}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '16px' }}>
            ADVANCED BOREWELL ENGINEERING
          </div>
          <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.05, marginBottom: '20px' }}>
            We Dig Deep<br />So You Don't Have To
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px' }}>
            Scroll to explore our story
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>SCROLL DOWN</p>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--primary), transparent)', animation: 'heroPulse 1.8s ease-in-out infinite' }} />
          </div>
        </div>

        {/* ── Text Phase 1: Nagpur, Stats & CTA Combined ── */}
        <div style={textReveal(textPhase === 1, false)}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '14px' }}>
            TRUSTED SINCE 1995
          </div>
          <h1 className="gradient-text-cyan" style={{ fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', lineHeight: 1.1, marginBottom: '14px' }}>
            Powering Water<br />Across Nagpur
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            30+ years of precision drilling and complete water solutions for
            <strong style={{ color: 'var(--primary)' }}> homes, farms &amp; industries.</strong>
          </p>
          
          {/* Stat pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', padding: '15px 24px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '12px', maxWidth: '540px', margin: '15px auto' }}>
            {[['2,500+', 'CUSTOMERS'], ['30+', 'YEARS EXP.'], ['24/7', 'EMERGENCY']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '1.5px' }}>{l}</div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '15px' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '12px 30px', fontSize: '0.95rem' }}>Request Service</Link>
            <Link to="/about" className="btn-outline" style={{ padding: '12px 30px', fontSize: '0.95rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Learn More</Link>
          </div>
        </div>

        {/* Side progress dots */}
        <div style={{ position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 5 }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: '6px',
              height: i === textPhase ? '26px' : '6px',
              borderRadius: '3px',
              background: i === textPhase ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s ease',
            }} />
          ))}
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
      {/* ══ VIDEO SCROLL HERO (500vh sticky) ══════════════════════════════ */}
      <VideoScrollHero />

      <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)' }}>

        {/* ══ SERVICES ══════════════════════════════════════════════════ */}
        <section className="py-5">
          <div className="container">
            <Reveal from="bottom">
              <h2 className="section-title">Our Products &amp; Services</h2>
              <p className="section-subtitle">A wide range of borewell and water solutions for residential, commercial, and agricultural needs.</p>
            </Reveal>
            <div style={{ marginTop: '40px' }}>
              {loading ? <p className="text-center">Loading services...</p> : <ServicesGrid services={popularServices} />}
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
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, lineHeight: 1 }}><CountUp end="2500+" /></h2>
                  <h6 style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '8px', fontWeight: 500 }}>Customers Served</h6>
                </div>
              </Reveal>
              <Reveal from="right" delay={300}>
                <div className="text-center">
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, lineHeight: 1 }}><CountUp end="30+" /></h2>
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
                    {['100% Satisfaction Guarantee', 'Fast Response Time', 'Knowledgeable & Skillful Staff', 'Excellent Customer Service', 'Reliable & Professional', '24/7 Emergency Service', 'Fair & Transparent Pricing', 'Comprehensive Services'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span>
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
            <Reveal from="bottom" delay={150}><HowItWorks /></Reveal>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══════════════════════════════════════════════ */}
        <section className="py-5" style={{ background: 'linear-gradient(to bottom, var(--surface-2), var(--surface))' }}>
          <div className="container">
            <Reveal from="bottom">
              <h2 className="section-title">Don't Take Our Word For It</h2>
              <p className="section-subtitle mb-5">Read reviews from our satisfied clients across the region.</p>
            </Reveal>
            <Reveal from="bottom" delay={100}><Testimonials /></Reveal>
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
