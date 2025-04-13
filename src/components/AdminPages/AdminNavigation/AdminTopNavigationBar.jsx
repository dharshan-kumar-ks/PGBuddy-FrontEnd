import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminTopNavigationBar.css';

function AdminTopNavigationBar() {
  const location = useLocation();

  return (
    <nav className="top-nav">
      {/* Keep the Home icon to be highlighted when Home page is clicked or if Create tickets page is clicked */}
      <Link to="/admin-notice-page" className={`nav-item ${location.pathname === '/admin-notice-page' ? 'active' : ''}`}>
        <span className="icon">📃</span>
        <span>Notices</span>
      </Link>
      {/* 
      <Link to="/food" className={`nav-item ${location.pathname === '/food' ? 'active' : ''}`}>
        <span className="icon">🍽️</span>
        <span>Food</span>
      </Link> 
      */}
      <Link to="/admin-account" className={`nav-item ${location.pathname === '/admin-account' ? 'active' : '' || location.pathname === '/admin-profile' ? 'active' : '' || location.pathname === '/admin-knowledge-centre' ? 'active' : '' || location.pathname === '/admin-feedback' ? 'active' : ''}`}>
        <span className="icon">👤</span>
        <span>Account</span>
      </Link>
    </nav>
  );
}

export default AdminTopNavigationBar;