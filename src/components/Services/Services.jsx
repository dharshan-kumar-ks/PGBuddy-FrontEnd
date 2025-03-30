import React from 'react';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import InternetUsage from './InternetPlans/InternetUsage';
import ElectricityUsage from './ElectricityUsage/ElectricityUsage';
import RoomCleaningService from './RoomCleaningService/RoomCleaningService';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      {/* Top Navigation */}
      <TopNavigationBar />
      
      {/* Layout Update */}
      <div className="services-layout">
        {/* Left Section */}
        <div className="left-section">
          <InternetUsage />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <ElectricityUsage />
          <RoomCleaningService />
        </div>
      </div>
    </div>
  );
}

export default Services;