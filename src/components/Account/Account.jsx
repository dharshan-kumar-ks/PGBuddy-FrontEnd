import React, { useEffect, useState } from 'react';
import './Account.css';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSupport, MdFeedback, MdRateReview } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

// Renders the Account component to display user account details and navigation options.
// Takes no input and returns a JSX element representing the account page.
function Account() {
  // React Router hook for navigation.
  const navigate = useNavigate();

  // State variables to store user name and ID.
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve user ID and token from localStorage.
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId) {
      // Fetch user details from the backend.
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update state with fetched user details.
          setUserName(data.name);
          setUserId(data.id);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          // Set default values on error.
          setUserName('unknown');
          setUserId('unknown');
        });
    } else {
      // Set default values if user ID is not found.
      setUserName('unknown');
      setUserId('unknown');
    }
  }, []);

  return (
    <div className="account-container">
      {/* Render the top navigation bar. */}
      <TopNavigationBar />

      <div className="profile-header">
        {/* Display user profile icon, name, and ID. */}
        <FaUserCircle className="profile-icon" />
        <h2>{userName}</h2>
        <p className="user-id">User ID: {userId}</p>
        <p className="location">
          {/* Display user's location. */}
          <BsHouseDoor /> Seattle House
        </p>
        <button
          className="logout-section"
          onClick={() => {
            // Clear user data from localStorage and navigate to login page.
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
        <button className="option-card" onClick={() => navigate('/profile', { state: { NavigationBar: 'TopNavigationBar' } })}>
          <IoSettingsSharp /> Profile Information
        </button>
        <button className="option-card" onClick={() => navigate('/knowledge-centre', { state: { NavigationBar: 'TopNavigationBar' } })}>
          <IoSettingsSharp /> Knowledge Centre
        </button>
        <button className="option-card" onClick={() => navigate('/ticket-list-full-page')}>
          <IoSettingsSharp /> Support
        </button>
      </div>

      <div className="support-section">
        <div className="support-options">
          {/* Buttons for sharing feedback and rating the app. */}
          <button className="option-card" onClick={() => navigate('/feedback', { state: { NavigationBar: 'TopNavigationBar' } })}>
            <MdFeedback /> Share Feedback
          </button>
          <button className="option-card" onClick={() => navigate('/feedback', { state: { NavigationBar: 'TopNavigationBar' } })}>
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

export default Account;