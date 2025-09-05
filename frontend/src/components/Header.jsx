import React from "react";  
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">Nonimi Flora</Link>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          
          <li className="dropdown">
            <span>Categories</span>
            <ul className="dropdown-menu">
              <li><Link to="/category/birthday">Birthday</Link></li>
              <li><Link to="/category/graduation">Graduation</Link></li>
              <li><Link to="/category/valentine">Valentine</Link></li>
            </ul>
          </li>

          <li><Link to="/daily-deals">Daily Deals</Link></li>
          <li><Link to="/customize-orders">Customize Orders</Link></li>
          <li><Link to="/feedback">Happy Customers</Link></li>
        </ul>
      </nav>

      {/* Right Section */}
      <div className="header-right">
        {/* Search bar on top */}
        <input type="text" placeholder="Search..." className="search-bar" />
        
        {/* Hotline and Cart in a row */}
        <div className="contact-cart">
          <div className="contact">
            <div className="hotline-label">Hotline</div>
            <div className="hotline-number">+94 77 123 4567</div>
          </div>
          <div className="cart">🛒</div>
        </div>
      </div>
    </header>
  );
};

export default Header;



