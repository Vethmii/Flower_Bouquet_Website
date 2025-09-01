import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // we’ll use this for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Nonimi Flora</Link>
      </div>

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

      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="contact">📞 +94 77 123 4567</div>
        <div className="cart">🛒</div>
      </div>
    </header>
  );
};

export default Header;
