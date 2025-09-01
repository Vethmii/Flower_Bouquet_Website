import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{
      padding: "10px 20px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
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
        <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          <li><Link to="/">Home</Link></li>

          {/* Categories dropdown */}
          <li style={{ position: "relative" }}>
            <span style={{ cursor: "pointer" }}>Categories ▼</span>
            <ul style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#fff",
              padding: "10px",
              listStyle: "none",
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }}>
              <li><Link to="/category/birthday">Birthday</Link></li>
              <li><Link to="/category/valentine">Valentine</Link></li>
              <li><Link to="/category/graduation">Graduation</Link></li>
            </ul>
          </li>

          <li><Link to="/daily-deals">Daily Deals</Link></li>
          <li><Link to="/customize-orders">Customize Orders</Link></li>
          <li><Link to="/feedback">Happy Customers</Link></li>
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
