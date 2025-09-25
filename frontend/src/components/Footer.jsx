import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Us (formerly Info) */}
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li>
              <Link to="/about-us" className="footer-link">About Us</Link>
            </li>
            <li>
              <Link to="/faq" className="footer-link">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Follow Us (moved to Info's place) */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a
            href="https://www.facebook.com/profile.php?id=61577699414577&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Facebook
          </a>
        </div>

        {/* Contact (moved to Quick Links' place) */}
        <div className="footer-section">
          <h4>Contact</h4>
          <a
            href="https://wa.me/94722912965"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            📞 +94 722 912 965
          </a>
          <a href="mailto:info@nonimiflora.com" className="footer-link">
            ✉️ info@nonimiflora.com
          </a>
        </div>

        {/* Location (moved to Follow Us' place) */}
        <div className="footer-section">
          <h4>Location</h4>
          <iframe
            title="Nonimi Flora Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63363.85391892934!2d79.889737!3d6.865422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a6f3f75f!2sNugegoda!5e0!3m2!1sen!2slk!4v1678327590000!5m2!1sen!2slk"
            width="200"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Nonimi Flora. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;






