import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle Enter key press in search input
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="header-container">
      {/* Top Header Section */}
      <div className="top-header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Nonimi Flora" className="logo-img" />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="search-section">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="text" 
              placeholder="Search flowers..." 
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="header-right">
          <div className="contact-info">
            <div className="hotline-text">Nonimi Hotline</div>
            <div className="phone-number">+94 72 291 2965</div>
          </div>
          <div className="user-actions">
            
            
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          
          <li className="dropdown">
            <span className="nav-link dropdown-trigger">Categories ▼</span>
            <ul className="dropdown-menu">
              <li><Link to="/category/birthday">Birthday</Link></li>
              <li><Link to="/category/graduation">Graduation</Link></li>
              <li><Link to="/category/valentine">Valentine</Link></li>
            </ul>
          </li>
          
          <li><Link to="/daily-deals" className="nav-link">Daily Deals</Link></li>
          <li><Link to="/customize-orders" className="nav-link">Customize Orders</Link></li>
          <li><Link to="/happy-customers" className="nav-link">Happy Customers</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;