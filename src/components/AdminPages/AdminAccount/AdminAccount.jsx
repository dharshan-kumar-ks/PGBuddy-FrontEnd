import React, { useEffect, useState } from 'react';
import './AdminAccount.css';
import AdminTopNavigationBar from '../AdminNavigation/AdminTopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSupport, MdFeedback, MdRateReview } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

// Renders the AdminAccount component to display admin account details and navigation options.
// Takes no input and returns a JSX element representing the admin account page.
function AdminAccount() {
  // React Router hook for navigation.
  const navigate = useNavigate();

  // State variables to store admin name and ID.
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve admin ID and token from localStorage.
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (userId) {
      // Fetch admin details from the backend.
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update state with fetched admin details.
          setUserName(data.name);
          setUserId(data.id);
        })
        .catch((error) => {
          console.error('Error fetching admin data:', error);
          // Set default values on error.
          setUserName('unknown');
          setUserId('unknown');
        });
    } else {
      // Set default values if admin ID is not found.
      setUserName('unknown');
      setUserId('unknown');
    }
  }, []);

  return (
    <div className="account-container">
      {/* Render the top navigation bar for admin. */}
      <AdminTopNavigationBar />

      <div className="profile-header">
        {/* Display admin profile icon, name, and ID. */}
        <FaUserCircle className="profile-icon" />
        <h2>{userName}</h2>
        <p className="user-id">User ID: {userId}</p>
        <p className="location">
          {/* Display admin's location. */}
          <BsHouseDoor /> Seattle House
        </p>
        <button
          className="logout-section"
          onClick={() => {
            // Clear admin data from localStorage and navigate to login page.
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          <AiOutlineLogout className="logout-icon" /> Log out
        </button>
      </div>

      <div className="options-section">
        {/* Navigation buttons for profile, knowledge centre, and support. */}
        <button className="option-card" onClick={() => navigate('/profile', { state: { NavigationBar: 'AdminTopNavigationBar' },}) }>
          <IoSettingsSharp /> Profile Information
        </button>
        <button className="option-card" onClick={() => navigate('/knowledge-centre', { state: { NavigationBar: 'AdminTopNavigationBar' },}) }>
          <IoSettingsSharp /> Knowledge Centre
        </button>
        <button className="option-card" onClick={() => navigate('/ticket-list-full-page')}>
          <IoSettingsSharp /> Support
        </button>
      </div>

      <div className="support-section">
        <div className="support-options">
          {/* Buttons for sharing feedback and rating the app. */}
          <button className="option-card" onClick={() => navigate('/feedback', { state: { NavigationBar: 'AdminTopNavigationBar' },}) }>
            <MdFeedback /> Share Feedback
          </button>
          <button className="option-card" onClick={() => navigate('/feedback', { state: { NavigationBar: 'AdminTopNavigationBar' },}) }>
            <MdRateReview /> Rate our App
          </button>
        </div>
        {/* Footer section with developer credit. */}
        <p>Made with ❤️ by</p>
        <h3>Dharshan Kumar</h3>
      </div>
    </div>
  );
}

export default AdminAccount;