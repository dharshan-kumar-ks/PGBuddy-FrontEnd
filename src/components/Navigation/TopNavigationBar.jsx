import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavigationBar.css';

function TopNavigationBar() {
  const location = useLocation(); // Hook to get the current route location

  return (
    <nav className="top-nav">
      {/* Home link: Highlighted when on Home, Create Ticket, Ticket List, or Individual Ticket pages */}
      <Link
        to="/home"
        className={`nav-item ${
          location.pathname === '/home' || 
          location.pathname.includes('/create-ticket-full-page') || 
          location.pathname.includes('/ticket-list-full-page') || 
          location.pathname.startsWith('/ticket/') 
            ? 'active' 
            : ''
        }`}
      >
        <span className="icon">🏠</span>
        <span>Home</span>
      </Link>

      {/* Food link: Highlighted when on the Food page */}
      <Link to="/food" className={`nav-item ${location.pathname === '/food' ? 'active' : ''}`}>
        <span className="icon">🍽️</span>
        <span>Food</span>
      </Link>

      {/* Stay link: Highlighted when on the Stay page */}
      <Link to="/stay" className={`nav-item ${location.pathname === '/stay' ? 'active' : ''}`}>
        <span className="icon">🛏️</span>
        <span>Stay</span>
      </Link>

      {/* Cafe link: Highlighted when on the Cafe or Order History pages */}
      <Link
        to="/cafe"
        className={`nav-item ${
          location.pathname === '/cafe' || location.pathname === '/order-history' ? 'active' : ''
        }`}
      >
        <span className="icon">☕</span>
        <span>Cafe</span>
      </Link>

      {/* Services link: Highlighted when on the Services page */}
      <Link to="/services" className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}>
        <span className="icon">⚡️</span>
        <span>Services</span>
      </Link>

      {/* Account link: Highlighted when on Account-related pages */}
      <Link
        to="/account"
        className={`nav-item ${
          location.pathname === '/account' || 
          location.pathname === '/profile' || 
          location.pathname === '/knowledge-centre' || 
          location.pathname === '/feedback' 
            ? 'active' 
            : ''
        }`}
      >
        <span className="icon">👤</span>
        <span>Account</span>
      </Link>
    </nav>
  );
}

export default TopNavigationBar;