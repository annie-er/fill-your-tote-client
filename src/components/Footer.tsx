import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-message">
          <h1>Thank you for your curiosity.</h1>
        </div>
        
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/logo-footer.png" alt="Fill your tote!" className="logo-image" />
          </div>
          
          <div className="footer-columns">
            <div className="footer-column">
              <h3>explore</h3>
              <ul>
                <li><Link to="/drawings">drawings</Link></li>
                <li><Link to="/shop">shop</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>learn</h3>
              <ul>
                <li><Link to="/about">story</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>let's talk shop</h3>
              <ul>
                <li>questions? comments?</li>
              </ul>
              <div className="contact-button-wrapper">
                <Link to="/contact" className="contact-button">
                  contact
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;