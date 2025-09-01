import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: "20px", borderTop: "1px solid #ccc", marginTop: "20px" }}>
      <div>
        <h4>About Us</h4>
        <p>Flower Bouquet Website</p>
      </div>
      <div>
        <h4>Location & Contact</h4>
        <p>123 Flower Street</p>
        <p>📞 123-456-7890</p>
      </div>
      <div>
        <h4>Follow Us</h4>
        <a href="https://facebook.com" target="_blank">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
