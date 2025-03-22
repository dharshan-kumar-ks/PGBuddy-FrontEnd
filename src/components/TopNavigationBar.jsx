import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavigationBar.css';

function TopNavigationBar() {
  const location = useLocation();

  return (
    <nav className="top-nav">
      <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
        <span className="icon">🏠</span>
        <span>Home</span>
      </Link>
      <Link to="/food" className={`nav-item ${location.pathname === '/food' ? 'active' : ''}`}>
        <span className="icon">🍽️</span>
        <span>Food</span>
      </Link>
      <Link to="/stay" className={`nav-item ${location.pathname === '/stay' ? 'active' : ''}`}>
        <span className="icon">🛏️</span>
        <span>Stay</span>
      </Link>
      <Link to="/cafe" className={`nav-item ${location.pathname === '/cafe' ? 'active' : ''}`}>
        <span className="icon">☕</span>
        <span>Cafe</span>
      </Link>
      <Link to="/services" className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}>
        <span className="icon">⚡️</span>
        <span>Services</span>
      </Link>
      <Link to="/account" className={`nav-item ${location.pathname === '/account' ? 'active' : ''}`}>
        <span className="icon">👤</span>
        <span>Account</span>
      </Link>
    </nav>
  );
}

export default TopNavigationBar;