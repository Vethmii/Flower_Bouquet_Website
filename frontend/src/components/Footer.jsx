import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Nonimi Flora is dedicated to crafting elegant flower bouquets for every occasion. 
            <Link to="/about-us" className="footer-link"> Learn more</Link>
          </p>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>📞 +94 77 123 4567</p>
          <p>📍 Colombo, Sri Lanka</p>
          <p>✉️ info@nonimiflora.com</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            <li><Link to="/daily-deals" className="footer-link">Daily Deals</Link></li>
            <li><Link to="/customize-orders" className="footer-link">Customize Orders</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Nonimi Flora. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
