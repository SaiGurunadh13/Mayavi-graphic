import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-brand">MAYAVI</span>
        </div>
        
        <nav className="footer-center">
          <a href="#experience" className="footer-link">EXPERIENCE</a>
          <a href="#technology" className="footer-link">TECHNOLOGY</a>
          <a href="#product" className="footer-link">PRODUCT</a>
          <a href="#contact" className="footer-link">CONTACT</a>
        </nav>
        
        <div className="footer-right">
          <div className="social-icon">IG</div>
          <div className="social-icon">TW</div>
          <div className="social-icon">YT</div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 MAYAVI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
