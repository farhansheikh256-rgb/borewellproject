import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTint, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // States for mobile dropdown accordions
  const [openDropdown, setOpenDropdown] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown('');
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? '' : name);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'navbar-transparent'} ${isHome ? 'navbar-home' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Dr.Water Logo" className="nav-logo-img" />
          <span>Dr.Water</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          
          {/* Water Problems Dropdown */}
          <div className="nav-item-dropdown">
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>Water Problems</span>
            <FaChevronDown className="dropdown-icon" />
            <div className="dropdown-menu">
              <Link to="/problems/low-pressure">Low Water Pressure</Link>
              <Link to="/problems/no-water">No Water</Link>
              <Link to="/problems/poor-quality">Poor Well Water Quality</Link>
              <Link to="/problems/running-out">Running Out of Water</Link>
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="nav-item-dropdown">
            <Link to="/services" style={{ padding: 0 }}>Services +</Link>
            <FaChevronDown className="dropdown-icon" />
            <div className="dropdown-menu">
              <Link to="/services">All Products & Services</Link>
              <Link to="/services/pumps">Water Well Pumps</Link>
              <Link to="/services/filtration">Water Filtration Treatment</Link>
              <Link to="/services/testing">Water Quality Testing</Link>
              <Link to="/services/rehab">Well Cleaning and Rehab</Link>
              <Link to="/services/hand-pump">Hand Pump Service</Link>
              <Link to="/services/contract">Contract Works</Link>
              <Link to="/services/drilling">Borewell Drilling</Link>
            </div>
          </div>

          {/* About Dropdown */}
          <div className="nav-item-dropdown">
            <Link to="/about" style={{ padding: 0 }}>About</Link>
            <FaChevronDown className="dropdown-icon" />
            <div className="dropdown-menu">
              <Link to="/about/team">Meet Our Team</Link>
              <Link to="/about/why-us">Why Choose Us?</Link>
            </div>
          </div>

          <Link to="/certified">Certified</Link>

          <Link to="/reviews">Reviews</Link>

          <Link to="/contact">Contact</Link>
          <Link to="/book" className="btn-primary">Book Now</Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          
          <div className="mobile-dropdown">
            <button onClick={() => toggleDropdown('problems')} className="mobile-dropdown-btn">
              Water Problems <FaChevronDown style={{ transform: openDropdown === 'problems' ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            {openDropdown === 'problems' && (
              <div className="mobile-dropdown-content">
                <Link to="/problems/low-pressure" onClick={closeMenu}>Low Water Pressure</Link>
                <Link to="/problems/no-water" onClick={closeMenu}>No Water</Link>
                <Link to="/problems/poor-quality" onClick={closeMenu}>Poor Well Water Quality</Link>
                <Link to="/problems/running-out" onClick={closeMenu}>Running Out of Water</Link>
              </div>
            )}
          </div>

          <div className="mobile-dropdown">
            <button onClick={() => toggleDropdown('services')} className="mobile-dropdown-btn">
              Services + <FaChevronDown style={{ transform: openDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            {openDropdown === 'services' && (
              <div className="mobile-dropdown-content">
                <Link to="/services" onClick={closeMenu}>All Products & Services</Link>
                <Link to="/services/pumps" onClick={closeMenu}>Water Well Pumps</Link>
                <Link to="/services/filtration" onClick={closeMenu}>Water Filtration Treatment</Link>
                <Link to="/services/testing" onClick={closeMenu}>Water Quality Testing</Link>
                <Link to="/services/rehab" onClick={closeMenu}>Well Cleaning and Rehab</Link>
                <Link to="/services/hand-pump" onClick={closeMenu}>Hand Pump Service</Link>
                <Link to="/services/contract" onClick={closeMenu}>Contract Works</Link>
                <Link to="/services/drilling" onClick={closeMenu}>Borewell Drilling</Link>
              </div>
            )}
          </div>

          <div className="mobile-dropdown">
            <button onClick={() => toggleDropdown('about')} className="mobile-dropdown-btn">
              About <FaChevronDown style={{ transform: openDropdown === 'about' ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            {openDropdown === 'about' && (
              <div className="mobile-dropdown-content">
                <Link to="/about/team" onClick={closeMenu}>Meet Our Team</Link>
                <Link to="/about/why-us" onClick={closeMenu}>Why Choose Us?</Link>
              </div>
            )}
          </div>

          <Link to="/certified" onClick={closeMenu}>Certified</Link>

          <Link to="/reviews" onClick={closeMenu}>Reviews</Link>

          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/book" className="btn-primary" onClick={closeMenu} style={{ marginTop: '20px' }}>Book Now</Link>
        </div>
      </div>
    </nav>
  );
}
