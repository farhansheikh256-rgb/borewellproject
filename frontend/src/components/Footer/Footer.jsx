import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTint, FaChevronRight } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-logo">
              <FaTint />
              <span>Dr.Water</span>
            </Link>
            <p className="footer-desc mt-3">
              Professional borewell drilling, repair, and maintenance services. We dig deep to ensure you never run out of water.
            </p>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/book" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center', padding: '8px 16px', fontSize: '0.9rem', width: '100%', marginTop: '5px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'white' }} />
                  <span>Book Now</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li>
                <Link to="/services" state={{ category: 'drilling' }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Borewell Drilling</span>
                </Link>
              </li>
              <li>
                <Link to="/services" state={{ category: 'pump' }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Pump Installation</span>
                </Link>
              </li>
              <li>
                <Link to="/services" state={{ category: 'testing' }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Water Testing</span>
                </Link>
              </li>
              <li>
                <Link to="/services" state={{ category: 'repair' }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Borewell Repair</span>
                </Link>
              </li>
              <li>
                <Link to="/services" state={{ category: 'repair' }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaChevronRight style={{ fontSize: '0.75rem', color: 'var(--accent)' }} />
                  <span>Motor Repair</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-links">
              <li>123, Borewell Avenue, Indore, MP</li>
              <li><a href="tel:+918830251172" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88302 51172</a></li>
              <li>contact@drwater.in</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Dr.Water Services. All rights reserved.
            {' | '}
            <Link to="/admin" style={{ opacity: 0.6, fontSize: '0.95rem', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.6}>
              Admin Portal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
