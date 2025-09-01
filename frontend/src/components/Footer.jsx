import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ padding: "20px", borderTop: "1px solid #ccc", marginTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
      
      {/* Info */}
      <div>
        <h4>Info</h4>
        <Link to="/about-us">About Us</Link><br />
        <Link to="/faq">FAQ</Link>
      </div>

      {/* Location & Contact */}
      <div>
        <h4>Location & Contact</h4>
        <p>123 Flower Street</p>
        <p>📞 123-456-7890</p>
      </div>

      {/* Social */}
      <div>
        <h4>Follow Us</h4>
        <a href="https://facebook.com" target="_blank">Facebook</a>
      </div>

    </footer>
  );
};

export default Footer;
