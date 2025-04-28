import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProfilePage.css';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import AdminTopNavigationBar from '../../AdminPages/AdminNavigation/AdminTopNavigationBar';

// Renders the ProfilePage component to display and edit user profile information.
// Takes NavigationBar as input and returns a JSX element.
function ProfilePage({ NavigationBar }) {
  const location = useLocation(); // Access location to retrieve state

  // Map string identifiers to actual components for dynamic navigation bar rendering.
  const navigationBarMap = {
    AdminTopNavigationBar: AdminTopNavigationBar,
    TopNavigationBar: TopNavigationBar,
  };

  // Resolve the navigation bar component based on location state or fallback to default.
  const SelectedNavigationBar = navigationBarMap[location.state?.NavigationBar] || NavigationBar;

  // State to manage user profile details.
  const [user, setUser] = useState({
    fullName: '',
    dob: '',
    gender: 'MALE', // Default to uppercase value
    contactNumber: '',
    email: '',
    bloodGroup: '',
    address: '',
    companyName: '',
  });

  // State to toggle between view and edit modes.
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user details from the backend when the component mounts.
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (userId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Populate user state with fetched data.
          setUser({
            fullName: data.name || '',
            dob: data.dateOfBirth || '',
            gender: data.gender || 'MALE', // Ensure uppercase
            contactNumber: data.phoneNumber || '',
            email: data.email || '',
            bloodGroup: data.bloodGroup || '',
            address: data.address || '',
            companyName: data.companyName || '',
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  // Toggle between edit and view modes.
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle changes to input fields in edit mode.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Save updated user details to the backend.
  const handleSave = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // Format date to YYYY-MM-DD for backend compatibility.
    const formatDate = (date) => {
      if (!date) {
        console.warn('Date of Birth is empty. Sending null to backend.');
        return null; // Return null if the date is empty
      }
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        console.error('Invalid date format:', date);
        throw new Error('Invalid date format. Expected yyyy-MM-dd');
      }
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const userDetails = {
      id: parseInt(userId),
      name: user.fullName,
      phoneNumber: user.contactNumber,
      gender: user.gender, // Already in uppercase from select
      bloodGroup: user.bloodGroup,
      address: user.address,
      companyName: user.companyName,
      dateOfBirth: formatDate(user.dob),
      profilePicture: '',
      userType: 'RESIDENT',
    };

    console.log('Sending user details:', JSON.stringify(userDetails, null, 2));

    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/fill-details`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Update successful:', data);
        alert('Profile updated successfully!');
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Update error:', error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="profile-page-container">
      {/* Main container for the profile page layout. */}
      <SelectedNavigationBar />
      <div className="profile-content">
        {/* Page heading for profile information. */}
        <h1>Profile Information</h1>
        <div className="profile-card">
          {/* Header section displaying user's avatar and basic details. */}
          <div className="profile-header">
            <div className="profile-avatar">
              {/* Display the first letter of the user's name as an avatar. */}
              <span>{user.fullName.charAt(0)}</span>
            </div>
            <div className="profile-name">
              {/* Display user's full name and email. */}
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="profile-details">
            {/* Section for displaying and editing user details. */}
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
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
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
                  disabled // Typically email shouldn't be editable
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
                  <option value="">Select Blood Group</option>
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
                <span>{user.bloodGroup || 'Not specified'}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  rows={3}
                />
              ) : (
                <span>{user.address || 'Not specified'}</span>
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
                <span>{user.companyName || 'Not specified'}</span>
              )}
            </div>
          </div>
          <div className="profile-actions">
            {/* Buttons for toggling edit mode and saving changes. */}
            <button className="edit-button" onClick={isEditing ? handleSave : handleEditToggle}>
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button className="cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;