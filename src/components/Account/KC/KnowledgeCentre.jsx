import React from 'react';
import './KnowledgeCentre.css';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import AdminTopNavigationBar from '../../AdminPages/AdminNavigation/AdminTopNavigationBar';
import { useLocation } from 'react-router-dom';

// Sample staff data (you can replace this with actual data from a backend)
const staffData = [
  {
    id: 1,
    name: 'Arun Kumar',
    role: 'Residence Captain',
    contactNumber: '+91 98765 43210',
    profilePicture: '/staff/arun-kumar.jpg', // Replace with actual image path
  },
  {
    id: 2,
    name: 'Meena Ramesh',
    role: 'Residence Assistant Captain',
    contactNumber: '+91 87654 32109',
    profilePicture: '/staff/meena-ramesh.jpg',
  },
  {
    id: 3,
    name: 'Karthik Subramanian',
    role: 'Cook',
    contactNumber: '+91 76543 21098',
    profilePicture: '/staff/karthik-subramanian.jpg',
  },
  {
    id: 4,
    name: 'Sundar Rajan',
    role: 'Helper',
    contactNumber: '+91 65432 10987',
    profilePicture: '/staff/sundar-rajan.jpg',
  },
  {
    id: 5,
    name: 'Vigneshwaran',
    role: 'Plumber',
    contactNumber: '+91 54321 09876',
    profilePicture: '/staff/vigneshwaran.jpg',
  },
];

// Grouped house rules with sub-headings
const groupedHouseRules = [
  {
    heading: 'Smoking, Drugs & Alcohol',
    rules: [
      'No smoking or consumption of alcohol is allowed within the premises.',
      'Betting and gambling are strictly prohibited within the premises.',
    ],
  },
  {
    heading: 'Care of Rooms and Common Area',
    rules: [
      'Maintain hygiene in shared spaces, including the kitchen, bathrooms, and common areas.',
      'Keep your room and personal belongings tidy; regular cleaning is mandatory.',
    ],
  },
  {
    heading: 'Conduct & Behaviour',
    rules: [
      'No loud noises or music after 10:00 PM to ensure a peaceful environment for all residents.',
      'Respect the privacy and belongings of other residents.',
    ],
  },
  {
    heading: 'Food',
    rules: [
      'Food waste should be disposed of properly in designated bins.',
      'Avoid excessive food wastage; take only what you can consume.',
    ],
  },
  {
    heading: 'General',
    rules: [
      'Lights and electrical appliances must be turned off when not in use to save energy.',
      'Report any maintenance issues to the Residence Captain immediately.',
      'Payment of rent and other dues must be made on time, by the 5th of each month.',
    ],
  },
  {
    heading: 'Visitors',
    rules: [
      'Guests are not allowed to stay overnight without prior permission from the Residence Captain.',
      'Visitors must adhere to the house rules during their stay.',
    ],
  },
];

function KnowledgeCentre({ NavigationBar }) {
  const location = useLocation(); // Access location to retrieve state

  // Map string identifiers to actual components
  const navigationBarMap = {
    AdminTopNavigationBar: AdminTopNavigationBar,
    TopNavigationBar: TopNavigationBar,
  };

  // Resolve the navigation bar component
  const ResolvedNavigationBar = navigationBarMap[location.state?.NavigationBar] || NavigationBar;

  return (
    <div className="knowledge-centre-container">
      <ResolvedNavigationBar />
      <div className="knowledge-centre-content">
        {/* Left Section: House Rules */}
        <div className="house-rules-section">
          <h2>House Rules</h2>
          <p>These rules are designed to ensure a safe, comfortable, and respectful living environment for all residents.</p>
          {groupedHouseRules.map((group, index) => (
            <div key={index} className="rules-group">
              <h3>{group.heading}</h3>
              <ul className="rules-list">
                {group.rules.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className="rule-item">
                    <span className="rule-number">{ruleIndex + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Section: Staff Details */}
        <div className="staff-details-section">
          <h2>Staff Details</h2>
          <p>Contact our staff for any assistance or queries.</p>
          <div className="staff-list">
            {staffData.map((staff) => (
              <div key={staff.id} className="staff-card">
                <img
                  src={staff.profilePicture}
                  alt={staff.name}
                  className="staff-picture"
                  onError={(e) => {
                    e.target.src = 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'; // Updated fallback image
                  }}
                />
                <div className="staff-info">
                  <h3>{staff.name}</h3>
                  <p className="staff-role">{staff.role}</p>
                  <p className="staff-contact">{staff.contactNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeCentre;