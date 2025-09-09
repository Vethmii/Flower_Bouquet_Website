import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Info Section */}
        <div className="footer-section">
          <h3>Info</h3>
          <ul className="footer-links">
            <li>
              <Link to="/about-us" className="footer-link">
                About Nonimi Flora
              </Link>
            </li>
            <li>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/Nonimi_Flora"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook-icon"
            >
              <div className="fb-icon">f</div>
            </a>
            <a
              href="https://wa.me/94722912965"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon whatsapp-link"
            >
              <div className="contact-phone">
                <span className="whatsapp-icon">📱</span>
                <span>+94 72 291 2965</span>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section contact-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p className="contact-address">
              Nonimi Flora,<br />
              Gangodawila,<br />
              Nugegoda (Online<br />
              Business Store)
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className="footer-section location-section">
          <h3>Location</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2847737086544!2d79.88891331477!3d6.865181520014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a1b49956a8d%3A0x6c2c8b8b0b8b0b8b!2sGangodawila%2C%20Nugegoda!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk"
              width="200"
              height="120"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nonimi Flora Location"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;