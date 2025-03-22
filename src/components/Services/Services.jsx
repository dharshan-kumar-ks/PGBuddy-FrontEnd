import React from 'react';
import TopNavigationBar from '../TopNavigationBar';
import InternetUsage from './InternetUsage';
import ElectricityUsage from './ElectricityUsage';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      {/* Top Navigation */}
      <TopNavigationBar />
      
      {/* Internet Usage Components (Side by Side) */}
      <div className="internet-usage-wrapper">
        <InternetUsage />
        <ElectricityUsage />
      </div>
  </div>
  );
}

export default Services;