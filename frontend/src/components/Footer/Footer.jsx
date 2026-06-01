import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTint } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-logo">
              <FaTint />
              <span>AquaDrill</span>
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book">Book Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Borewell Drilling</Link></li>
              <li><Link to="/services">Pump Installation</Link></li>
              <li><Link to="/services">Water Testing</Link></li>
              <li><Link to="/services">Borewell Repair</Link></li>
              <li><Link to="/services">Motor Repair</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-links">
              <li>123, Borewell Avenue, Indore, MP</li>
              <li>+91 98765 43210</li>
              <li>contact@aquadrill.in</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AquaDrill Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
