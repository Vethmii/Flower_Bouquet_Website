import React, { useState } from "react";
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
          <li><a href="#">Home</a></li>
          <li 
            className="dropdown" 
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a href="#">Categories ▾</a>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="/birthday">Birthday</a></li>
                <li><a href="/graduation">Graduation</a></li>
                <li><a href="/valentine">Valentine</a></li>
              </ul>
            )}
          </li>
          <li><a href="#">Daily Deals</a></li>
          <li><a href="#">Customize Orders</a></li>
          <li><a href="#">Happy Customers</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
