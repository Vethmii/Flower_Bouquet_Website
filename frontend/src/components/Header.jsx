import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "10px 20px", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Logo */}
      <div>
        <h2>Flower Bouquet</h2>
      </div>

      {/* Search bar */}
      <div>
        <input type="text" placeholder="Search..." style={{ padding: "5px" }} />
      </div>

      {/* Navigation */}
      <nav>
        <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
          <li><Link to="/">Home</Link></li>
          <li>
            Categories
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Link to="/daily-deals">Daily Deals</Link></li>
              <li><Link to="/customize-orders">Customize Orders</Link></li>
              <li><Link to="/feedback">Happy Customers</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Contact & Cart */}
      <div>
        <span>📞 123-456-7890</span>
        <Link to="/cart" style={{ marginLeft: "10px" }}>🛒 Cart</Link>
      </div>
    </header>
  );
};

export default Header;
