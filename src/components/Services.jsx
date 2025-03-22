import React from 'react';
import TopNavigationBar from './TopNavigationBar';
import WifiStats from './WifiStats';
//import InternetPlans from './InternetPlans';
import './Services.css';

function Services() {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Services Section */}
      <section className="services-section">
        {/* Heading */}
        <h2>Internet Plans</h2>

        {/* Wi-Fi Stats Indicator */}
        <WifiStats />

        {/* <InternetPlans /> Internet Add-On Plans */}
        
      </section>
    </div>
  );
}

export default Services;