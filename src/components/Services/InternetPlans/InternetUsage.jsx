import React from 'react';
//import TopNavigationBar from '../../Navigation/TopNavigationBar';
import WifiStats from './WifiStats';
import InternetPlans from './InternetPlans';
import '../Services.css';

function InternetUsage() {
  return (
    <div className="internetusage-container">
      {/* Services Section */}
      <section className="internetusage-section">
        {/* Heading */}
        <h2>Internet Usage</h2>

        {/* Wi-Fi Stats Indicator */}
        <WifiStats />

        {/* Internet Add-On Plans */}
        <InternetPlans />
        
      </section>
    </div>
  );
}

export default InternetUsage;