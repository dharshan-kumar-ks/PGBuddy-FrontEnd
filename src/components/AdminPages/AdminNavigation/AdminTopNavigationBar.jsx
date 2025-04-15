import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminTopNavigationBar.css';

function AdminTopNavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="top-nav">
      {/* Keep the Home icon to be highlighted when Home page is clicked or if Create tickets page is clicked */}
      <Link to="/admin-notice-page" className={`nav-item ${location.pathname === '/admin-notice-page' ? 'active' : ''}`}>
        <span className="icon">📃</span>
        <span>Notices</span>
      </Link>
      <Link
        to="/ticket-list-full-page"
        state={{ NavigationBar: 'AdminTopNavigationBar' }}
        className={`nav-item ${location.pathname === '/ticket-list-full-page' || location.pathname.startsWith('/ticket/') ? 'active' : ''}`}
      >
        <span className="icon">🎟️</span>
        <span>Tickets</span>
      </Link>
      <Link to="/admin-account" className={`nav-item ${location.pathname === '/admin-account' ? 'active' : '' || location.pathname === '/profile' ? 'active' : '' || location.pathname === '/knowledge-centre' ? 'active' : '' || location.pathname === '/feedback' ? 'active' : ''}`}>
        <span className="icon">👤</span>
        <span>Account</span>
      </Link>
    </nav>
  );
}

export default AdminTopNavigationBar;