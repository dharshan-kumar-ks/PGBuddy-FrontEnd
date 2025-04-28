import React from 'react';
//import TopNavigationBar from '../../Navigation/TopNavigationBar'; // Uncomment if TopNavigationBar is needed
import WifiStats from './WifiStats'; // Component to display Wi-Fi usage statistics
import InternetPlans from './InternetPlans'; // Component to display internet add-on plans
import '../Services.css';

function InternetUsage() {
  return (
    <div className="internetusage-container">
      {/* Internet Usage Section */}
      <section className="internetusage-section">
        {/* Section Heading */}
        <h2>Internet Usage</h2>

        {/* Wi-Fi Stats Indicator */}
        <WifiStats /> {/* Displays current Wi-Fi usage statistics */}

        {/* Internet Add-On Plans */}
        <InternetPlans /> {/* Displays available internet add-on plans */}
      </section>
    </div>
  );
}

export default InternetUsage;