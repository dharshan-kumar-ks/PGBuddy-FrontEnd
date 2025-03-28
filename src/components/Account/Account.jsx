import React from 'react';
import './Account.css';
import TopNavigationBar from '../TopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSupport, MdFeedback, MdRateReview } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

function Account() {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h2>K S Dharsharkumar</h2>
        <p className="user-id">User ID: 23SETBA020</p>
        <p className="location">
          <BsHouseDoor /> Seattle House
        </p>
        <button className="logout-section" onClick={() => navigate('/login')}>
          <AiOutlineLogout className="logout-icon" /> Log out
        </button>
      </div>

      <div className="options-section">
        <button className="option-card" onClick={() => navigate('/profile')}>
          <IoSettingsSharp /> Profile Information
        </button>
        <button className="option-card" onClick={() => navigate('/knowledge-centre')}>
          <IoSettingsSharp /> Knowledge Centre
        </button>
        <button className="option-card" onClick={() => navigate('/ticket-list-full-page')}>
          <IoSettingsSharp /> Support
        </button>
      </div>

      <div className="support-section">
        <div className="support-options">
          <button className="option-card" onClick={() => navigate('/feedback')}>
            <MdFeedback /> Share Feedback
          </button>
          <button className="option-card" onClick={() => navigate('/feedback')}>
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