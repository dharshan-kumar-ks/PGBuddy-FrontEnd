import React, { useEffect, useState } from 'react';
import './ElectricityUsage.css';
import '../Services.css';

function ElectricityUsage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/electricity/usage`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Add token to the Authorization header
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setStats({
          dailyUsage: `${data.dailyUsageKwh} kWh`,
          monthlyUsage: `${data.monthlyUsageKwh} kWh`,
          estimatedCost: `₹${data.estimatedCost}`,
        });
        setLoading(false);
      })
      .catch(() => {
        // Set default values if the data is not retrieved from the backend
        setStats({
          dailyUsage: '0 kWh',
          monthlyUsage: '0 kWh',
          estimatedCost: '₹0',
        });
        setLoading(false);
      });
  }, []);

  function handlePayBill() {
    alert('Pay the bill on month end');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <button className="buy-button" onClick={handlePayBill}>Pay Bill</button>
      </div>
    </div>
    </div>
  );
}

export default ElectricityUsage;