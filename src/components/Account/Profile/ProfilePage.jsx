import React, { useState } from 'react';
import './ProfilePage.css';
import TopNavigationBar from '../../TopNavigationBar';

function ProfilePage() {
  // Sample user data (you can replace this with actual data from a backend or state management)
  const [user, setUser] = useState({
    fullName: 'John Doe',
    dob: '1990-05-15',
    gender: 'Male',
    contactNumber: '+91 98765 43210',
    email: 'john.doe@example.com',
    bloodGroup: 'O+',
    address: '1234 Maple Street, Springfield, IL 62704',
    companyName: 'Tech Innovations Pvt. Ltd.',
  });

  // State to toggle edit mode (placeholder for now)
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // In a real app, you would save the updated details to a backend here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="profile-page-container">
      <TopNavigationBar />
      <div className="profile-content">
        <h1>Profile Information</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{user.fullName.charAt(0)}</span>
            </div>
            <div className="profile-name">
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.dob}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span>{user.gender}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Contact Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="contactNumber"
                  value={user.contactNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.contactNumber}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Blood Group</label>
              {isEditing ? (
                <select
                  name="bloodGroup"
                  value={user.bloodGroup}
                  onChange={handleInputChange}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <span>{user.bloodGroup}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.address}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="companyName"
                  value={user.companyName}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.companyName}</span>
              )}
            </div>
          </div>
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;