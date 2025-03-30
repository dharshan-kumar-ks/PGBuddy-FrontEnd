import React from 'react';
import './ElectricityUsage.css';
import '../Services.css';

function ElectricityUsage() {
  // Placeholder data (you can replace this with real data from an API or props)
  const stats = {
    dailyUsage: '3.2 kWh',
    monthlyUsage: '95 kWh',
    estimatedCost: '₹760', // Assuming a rate of ₹8 per kWh
  };

  return (
    <div className='electricityusage-container'> 
        <h2>Electricity Usage</h2>
    <div className="electricity-usage-container">
      <div className="usage-details">
        <div className="usage-item">
          <span className="usage-label">Daily Usage</span>
          <span className="usage-value">{stats.dailyUsage}</span>
        </div>
        <div className="usage-item">
          <span className="usage-label">Monthly Usage</span>
          <span className="usage-value">{stats.monthlyUsage}</span>
        </div>
        <div className="usage-item">
          <span className="usage-label">Estimated Cost</span>
          <span className="usage-value">{stats.estimatedCost}</span>
        </div>
        <button className="buy-button">Pay Bill</button>
      </div>
    </div>
    </div>
  );
}

export default ElectricityUsage;