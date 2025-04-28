import React from 'react';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import InternetUsage from './InternetPlans/InternetUsage'; // Component to display internet usage details
import ElectricityUsage from './ElectricityUsage/ElectricityUsage'; // Component to display electricity usage details
import RoomCleaningService from './RoomCleaningService/RoomCleaningService'; // Component to display room cleaning services
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      {/* Top Navigation Bar */}
      <TopNavigationBar />
      
      {/* Main layout for the services page */}
      <div className="services-layout">
        {/* Left Section: Displays internet usage details */}
        <div className="left-section">
          <InternetUsage />
        </div>

        {/* Right Section: Displays electricity usage and room cleaning services */}
        <div className="right-section">
          <ElectricityUsage />
          <RoomCleaningService />
        </div>
      </div>
    </div>
  );
}

export default Services;