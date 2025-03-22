import React from 'react';
import './Account.css';
import TopNavigationBar from './TopNavigationBar';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSupport, MdFeedback, MdRateReview } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

function Account() {
  return (
    <div className="account-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h2>K S Dharsharkumar</h2>
        <p className="user-id">User ID: 23SETBA020</p>
        <p className="location"><BsHouseDoor /> Seattle House</p>
      </div>

      <div className="options-section">
        <div className="option-card"><IoSettingsSharp /> Profile Information</div>
        <div className="option-card"><IoSettingsSharp /> Knowledge Centre</div>
        <div className="option-card"><IoSettingsSharp /> App Settings</div>
      </div>

      <div className="support-section">
        <h3><MdSupport className="support-icon" /> Support</h3>
        <p>Looking for a quick resolution?</p>
        <div className="support-options">
          <div className="option-card"><MdFeedback /> Share Feedback</div>
          <div className="option-card"><MdRateReview /> Rate our App</div>
        </div>
      </div>

      <div className="logout-section">
        <AiOutlineLogout className="logout-icon" /> Log out
      </div>
    </div>
  );
}

export default Account;
