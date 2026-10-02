import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="#">MAYAVI</a>
          </div>
          
          <div className="navbar-links desktop-only">
            <a href="#experience">EXPERIENCE</a>
            <a href="#design">DESIGN</a>
            <a href="#technology">TECHNOLOGY</a>
            <a href="#product">PRODUCT</a>
          </div>
          
          <div className="navbar-actions desktop-only">
            <button className="btn-enter-vr">ENTER VR &rarr;</button>
          </div>

          <div className="navbar-mobile-toggle mobile-only" onClick={toggleMenu}>
            <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#experience" onClick={toggleMenu}>EXPERIENCE</a>
          <a href="#design" onClick={toggleMenu}>DESIGN</a>
          <a href="#technology" onClick={toggleMenu}>TECHNOLOGY</a>
          <a href="#product" onClick={toggleMenu}>PRODUCT</a>
          <button className="btn-enter-vr mobile-btn">ENTER VR &rarr;</button>
        </div>
      </div>
    </>
  );
}
