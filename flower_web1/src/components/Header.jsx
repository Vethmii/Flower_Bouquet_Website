import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header>
      {/* Top Section */}
      <div className="top-header">
        <div className="logo">LOGO</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>
        <div className="header-icons">
          <span className="icon">👤</span>
          <span className="icon">🛒</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span>Categories ▾</span>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/birthday">Birthday</Link>
                </li>
                <li>
                  <Link to="/graduation">Graduation</Link>
                </li>
                <li>
                  <Link to="/valentine">Valentine</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#">Daily Deals</a>
          </li>
          <li>
            <a href="#">Customize Orders</a>
          </li>
          <li>
            <a href="#">Happy Customers</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

