import React, { useEffect, useState } from 'react';
import './ElectricityUsage.css';
import '../Services.css';

function ElectricityUsage() {
  const [stats, setStats] = useState(null); // State to hold electricity usage statistics
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch electricity usage data from the backend
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/electricity/usage`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to the Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data'); // Throw error if response is not OK
        }
        return response.json(); // Parse response JSON
      })
      .then((data) => {
        // Update state with fetched data
        setStats({
          dailyUsage: `${data.dailyUsageKwh} kWh`, // Daily electricity usage
          monthlyUsage: `${data.monthlyUsageKwh} kWh`, // Monthly electricity usage
          estimatedCost: `₹${data.estimatedCost}`, // Estimated cost
        });
        setLoading(false); // Set loading to false
      })
      .catch(() => {
        // Handle errors by setting default values
        setStats({
          dailyUsage: '0 kWh',
          monthlyUsage: '0 kWh',
          estimatedCost: '₹0',
        });
        setLoading(false); // Set loading to false
      });
  }, []);

  // Handle "Pay Bill" button click
  function handlePayBill() {
    alert('Pay the bill on month end'); // Display a placeholder alert
  }

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="electricityusage-container">
      {/* Section heading */}
      <h2>Electricity Usage</h2>

      {/* Electricity usage details */}
      <div className="electricity-usage-container">
        <div className="usage-details">
          {/* Daily Usage */}
          <div className="usage-item">
            <span className="usage-label">Daily Usage</span>
            <span className="usage-value">{stats.dailyUsage}</span>
          </div>

          {/* Monthly Usage */}
          <div className="usage-item">
            <span className="usage-label">Monthly Usage</span>
            <span className="usage-value">{stats.monthlyUsage}</span>
          </div>

          {/* Estimated Cost */}
          <div className="usage-item">
            <span className="usage-label">Estimated Cost</span>
            <span className="usage-value">{stats.estimatedCost}</span>
          </div>

          {/* Pay Bill Button */}
          <button className="buy-button" onClick={handlePayBill}>
            Pay Bill
          </button>
        </div>
      </div>
    </div>
  );
}

export default ElectricityUsage;