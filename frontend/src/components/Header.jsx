import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flowers/search?q=${value}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      setSuggestions([]);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">Nonimi Flora</span>
            <img
              src="/images/logo.jpg"
              alt="Nonimi Flora Logo"
              className="logo-image"
            />
          </Link>
        </div>

        <form className="search-bar-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for flowers..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li key={suggestion._id}>
                  <Link
                    to={`/search/${suggestion.name}`}
                    onClick={() => setSuggestions([])}
                  >
                    {suggestion.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && (
              <ul className="suggestions-list">
                <li className="no-results-item">
                  <span>Not available</span>
                </li>
              </ul>
            )
          )}
        </form>

        <div className="header-right">
          <div className="contact-info">
            <span className="contact-text">Nonimi Hotline</span>
            <span className="contact-number">+94 72 291 2965</span>
          </div>
          <div className="cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
        </div>
      </div>

      <nav className="nav">
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li className="dropdown">
            <span>Categories</span>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/category/birthday">Birthday</NavLink>
              </li>
              <li>
                <NavLink to="/category/graduation">Graduation</NavLink>
              </li>
              <li>
                <NavLink to="/category/valentine">Valentine</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/daily-deals" className={({ isActive }) => (isActive ? "active" : "")}>
              Daily Deals
            </NavLink>
          </li>
          <li>
            <NavLink to="/customize-orders" className={({ isActive }) => (isActive ? "active" : "")}>
              Customize Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className={({ isActive }) => (isActive ? "active" : "")}>
              Happy Customers
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;




