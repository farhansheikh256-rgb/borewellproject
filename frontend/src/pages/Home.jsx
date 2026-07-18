import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt } from 'react-icons/fa';

import ServicesGrid from '../components/Services/ServicesGrid';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { services, loading } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasShown = sessionStorage.getItem('emergencyPopupShown');
    if (!hasShown) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('emergencyPopupShown', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => setShowPopup(false);
  
  const popularServices = services.filter(s => s.popular);

  return (
    <div>
      {/* 1. Enhanced Hero Section */}
      <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src="/hero-bg.png" 
          alt="Borewell Water Source" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))', zIndex: 1 }}></div>
        
        <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge" style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid var(--primary)', borderRadius: '30px', color: 'white', background: 'rgba(2, 132, 199, 0.4)', marginBottom: '20px', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Family Owned & Operated Since 2005
          </div>
          <h1 className="mb-4" style={{ fontWeight: 800, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontSize: '3.5rem', lineHeight: '1.2' }}>
            From Ground to Life – <br/><span style={{ color: 'var(--primary)' }}>Reliable Borewell Solutions.</span>
          </h1>
          <p className="section-subtitle mb-4" style={{ color: '#000000', fontWeight: 600, textShadow: '0 1px 15px rgba(255,255,255,0.9), 0 0 5px rgba(255,255,255,0.5)', fontSize: '1.3rem', maxWidth: '750px', margin: '0 auto', letterSpacing: '0.5px' }}>
            Serving Nagpur and the Surrounding Regions. Precision drilling and complete water solutions through the toughest geological formations.
          </p>
          <div className="hero-cta-group mt-4" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
             <Link to="/contact" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>Request Service</Link>
             <Link to="/about" className="btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem', color: '#fff', borderColor: '#fff' }}>Learn More</Link>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px', fill: 'var(--surface)' }}>
                <path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,68 500,68c154.895,0 250,-65 250,-65l0,95l-1000,0l0,-60Z" opacity="0.4" />
                <path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,73 500,73c154.895,0 250,-45 250,-45l0,70l-1000,0l0,-60Z" opacity="0.4" />
                <path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,78 500,78c154.895,0 250,-30 250,-30l0,50l-1000,0l0,-60Z" opacity="1" />
            </svg>
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="py-5" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Our Products & Services</h2>
          <p className="section-subtitle">We offer a wide range of borewell and water solutions for residential, commercial, and agricultural needs.</p>
          
          {loading ? <p className="text-center">Loading services...</p> : <ServicesGrid services={popularServices} />}
        </div>
      </section>

      {/* 3. Stats & Certifications Banner */}
      <section className="py-5" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div className="stats-banner-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', alignItems: 'center' }}>
            <div className="text-center">
               <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: 700 }}>Licensed, Certified<br/>& Bonded</h3>
               <p style={{ opacity: 0.8, margin: 0 }}>Professional guarantee for your peace of mind.</p>
            </div>
            <div className="text-center stats-banner-divider">
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>2,500+</h2>
               <h6 style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '10px', fontWeight: 500 }}>Customers Served</h6>
            </div>
            <div className="text-center">
               <h2 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>15+</h2>
               <h6 style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '10px', fontWeight: 500 }}>Years Experience</h6>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us? Section */}
      <section className="py-5" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <div className="why-choose-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <h2 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)' }}>Why Choose Us?</h2>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2.2', color: 'var(--text)' }}>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> 100% Satisfaction Guarantee</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> Fast Response Time</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> Knowledgeable & Skillful Staff</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> Excellent Customer Service</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> Reliable & Professional</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> 24/7 Emergency Service</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> Fair & Transparent Pricing</li>
                <li><strong style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</strong> Comprehensive Services</li>
              </ul>
              <Link to="/about" className="btn-primary mt-4">Learn More About Us</Link>
            </div>
            <div>
               <div className="glass-card text-center" style={{ padding: '50px 30px', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: '80px', height: '80px', background: 'rgba(2, 132, 199, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="var(--primary)" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M255.8 48C217 122.9 128 221.7 128 319.4c0 71.9 57.2 128.6 128 128.6 70.8 0 128-56.7 128-128.6 0-97.7-89.1-196.5-128.2-271.4z"></path></svg>
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: '15px' }}>The Dr. Water Guarantee</h3>
                  <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>We ensure the highest standards of water quality, efficient well performance, and durable equipment installations for all our clients across the state.</p>
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
        <div className="container text-center" style={{ padding: '30px', background: 'rgba(2, 132, 199, 0.05)', borderRadius: '12px', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
           <h3 style={{ color: 'var(--primary)', fontWeight: 800, margin: 0, fontSize: '2rem' }}>Fast Emergency Service Available</h3>
           <p className="text-muted mt-2 mb-0" style={{ fontSize: '1.2rem' }}>Call us 24/7 at <strong><a href="tel:+918855807186" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88558 07186</a></strong></p>
        </div>
      </section>

      {/* Emergency Popup */}
      <AnimatePresence>
        {showPopup && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '0px',
                maxWidth: '750px',
                width: '100%',
                position: 'relative',
                display: 'flex',
                flexWrap: 'wrap',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                border: '4px solid #01579b'
              }}
            >
              <button 
                onClick={closePopup}
                style={{
                  position: 'absolute', top: '10px', right: '15px',
                  background: 'none', border: 'none', fontSize: '24px',
                  color: '#333', cursor: 'pointer', zIndex: 10
                }}
                aria-label="Close"
              >
                <FaTimes />
              </button>

              {/* Left Pane */}
              <div style={{ 
                flex: '1 1 300px', 
                padding: '50px 30px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: 'white'
              }}>
                <h2 style={{ color: '#01579b', fontWeight: 900, marginBottom: '25px', fontSize: '2.2rem', lineHeight: '1.1' }}>
                  EMERGENCY<br/>SERVICE
                </h2>
                
                <p style={{ fontWeight: 800, fontSize: '1rem', color: '#111', margin: '5px 0' }}>
                  7 DAYS A WEEK FROM 7AM-8PM.
                </p>
                <p style={{ fontWeight: 800, fontSize: '1rem', color: '#111', margin: '15px 0 25px 0' }}>
                  PHONES ARE ANSWERED 24/7.
                </p>
                
                <h1 style={{ color: '#00a35c', fontSize: '4rem', fontWeight: 900, margin: '0 0 20px 0', transform: 'scaleY(1.5)', textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>
                  CALL NOW!
                </h1>
                
                <a 
                  href="tel:+918855807186" 
                  style={{ 
                    display: 'block',
                    backgroundColor: '#00a35c', 
                    color: 'white',
                    width: '90%', 
                    padding: '12px', 
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                  onClick={closePopup}
                >
                  +91 88558 07186
                </a>
              </div>

              {/* Right Pane */}
              <div style={{ 
                flex: '1 1 300px', 
                position: 'relative',
                background: `
                  linear-gradient(225deg, #01579b 15%, #00a35c 15%, #00a35c 18%, transparent 18%),
                  linear-gradient(15deg, #01579b 25%, #00a35c 25%, #00a35c 30%, transparent 30%),
                  white
                `,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px'
              }}>
                 <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                   <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#607d8b', lineHeight: 1 }}>
                     WE'RE HERE
                   </div>
                   <div style={{ fontSize: '3rem', fontWeight: 900, color: '#01579b', lineHeight: 1, marginBottom: '30px' }}>
                     TO HELP
                   </div>
                   
                   {/* "No Water" Logo */}
                   <div style={{ width: '180px', height: '180px', margin: '0 auto', position: 'relative' }}>
                     <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#00a35c" strokeWidth="10" />
                       <path d="M50 15 C50 15 25 50 25 65 A 25 25 0 0 0 75 65 C75 50 50 15 50 15 Z" fill="#b3e5fc" stroke="#01579b" strokeWidth="1.5" />
                       <path d="M45 25 C45 25 30 50 30 65 A 20 20 0 0 0 70 65 C70 50 45 25 45 25 Z" fill="#e1f5fe" />
                       <line x1="18" y1="82" x2="82" y2="18" stroke="#00a35c" strokeWidth="10" />
                     </svg>
                   </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
