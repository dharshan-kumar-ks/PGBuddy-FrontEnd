import React from 'react';
import TopNavigationBar from '../TopNavigationBar';
import InternetUsage from './InternetUsage';
import ElectricityUsage from './ElectricityUsage';
import RoomCleaningService from './RoomCleaningService';
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