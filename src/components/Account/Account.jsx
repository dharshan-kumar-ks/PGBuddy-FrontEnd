import React, { useEffect, useState } from 'react';
import './Account.css';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSupport, MdFeedback, MdRateReview } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

function Account() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (userId) {
      fetch(`http://localhost:8081/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
          setUserId(data.id); // Set the user ID dynamically
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUserName('unknown'); // Set default username on error
          setUserId('unknown'); // Set default user ID on error
        });
    } else {
      setUserName('unknown'); // Set default username if userId is not found
      setUserId('unknown'); // Set default user ID if userId is not found
    }
  }, []);

  return (
    <div className="account-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h2>{userName}</h2>
        <p className="user-id">User ID: {userId}</p>
        <p className="location">
          <BsHouseDoor /> Seattle House
        </p>
        <button
          className="logout-section"
          onClick={() => {
            localStorage.removeItem('userId'); // Clear userId from localStorage
            localStorage.removeItem('userRole'); // Clear userRole from localStorage
            localStorage.removeItem('token'); // Clear token from localStorage
            navigate('/login');
          }}
        >
          <AiOutlineLogout className="logout-icon" /> Log out
        </button>
      </div>

      <div className="options-section">
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
          <button className="option-card" onClick={() => navigate('/feedback', { state: { NavigationBar: 'TopNavigationBar' } })}>
            <MdFeedback /> Share Feedback
          </button>
          <button className="option-card" onClick={() => navigate('/feedback', { state: { NavigationBar: 'TopNavigationBar' } })}>
            <MdRateReview /> Rate our App
          </button>
        </div>
        <p>Made with ❤️ by</p>
        <h3>Dharshan Kumar</h3>
      </div>
    </div>
  );
}

export default Account;