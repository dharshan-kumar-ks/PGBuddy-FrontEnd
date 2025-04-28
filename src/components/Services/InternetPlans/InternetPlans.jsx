import React, { useState, useEffect } from 'react';
import './InternetPlans.css';
import axios from 'axios';

function InternetPlans() {
  const [activeTab, setActiveTab] = useState('data'); // State to track the active tab ('data' or 'device')
  const [dataPlans, setDataPlans] = useState([]); // State to hold data add-on plans
  const [devicePlans, setDevicePlans] = useState([]); // State to hold device add-on plans
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch data and device plans from the backend
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // Fetch data add-ons
    const fetchDataPlans = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/internet/data-add-ons`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data add-ons'); // Throw error if response is not OK
      }
      return response.json(); // Parse response JSON
    });

    // Fetch device add-ons
    const fetchDevicePlans = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/internet/device-add-ons`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch device add-ons'); // Throw error if response is not OK
      }
      return response.json(); // Parse response JSON
    });

    // Fetch both data and device plans concurrently
    Promise.all([fetchDataPlans, fetchDevicePlans])
      .then(([dataAddOns, deviceAddOns]) => {
        // Map data add-ons to the required format
        setDataPlans(
          dataAddOns.map((plan) => ({
            packId: plan.packId,
            price: plan.price,
            data: `${plan.data} GB`, // Data in GB
            validity: `${plan.validity} days`, // Validity in days
            badge: plan.recommended ? 'Recommended' : null, // Add badge if recommended
          }))
        );

        // Map device add-ons to the required format
        setDevicePlans(
          deviceAddOns.map((plan) => ({
            packId: plan.packId,
            price: plan.price,
            data: `${plan.devices} Device${plan.devices > 1 ? 's' : ''}`, // Number of devices
            validity: `${plan.validity} days`, // Validity in days
            badge: plan.recommended ? 'Recommended' : null, // Add badge if recommended
          }))
        );

        setLoading(false); // Set loading to false after fetching data
      })
      .catch((err) => {
        setError(err.message); // Set error message if fetching fails
        setLoading(false); // Set loading to false
      });
  }, []);

  // Handle "Buy" button click
  const handleBuy = (packId) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const endpoint =
      activeTab === 'data'
        ? `${import.meta.env.VITE_BACKEND_URL}/api/internet/update/data/${packId}` // Endpoint for data add-ons
        : `${import.meta.env.VITE_BACKEND_URL}/api/internet/update/device/${packId}`; // Endpoint for device add-ons

    // Make API call to purchase the selected plan
    axios
      .post(endpoint, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then((response) => {
        alert(response.data); // Show success message
      })
      .catch((error) => {
        alert('Failed to recharge. Please try again.');
      });
  };

  // Determine which plans to display based on the active tab
  const plans = activeTab === 'data' ? dataPlans : devicePlans;

  return (
    <div className="internet-plans-container">
      {/* Tabs for switching between Data and Device add-ons */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'data' ? 'active' : ''}`} // Highlight active tab
          onClick={() => setActiveTab('data')} // Set active tab to 'data'
        >
          Data Add-on
        </button>
        <button
          className={`tab ${activeTab === 'device' ? 'active' : ''}`} // Highlight active tab
          onClick={() => setActiveTab('device')} // Set active tab to 'device'
        >
          Device Add-on
        </button>
      </div>

      {/* Plans List */}
      <div className="plans-list">
        {loading ? (
          // Display loading message while data is being fetched
          <div className="plan-item no-data-box">
            <div className="no-data-message">
              <p>Loading...</p>
            </div>
          </div>
        ) : error || !plans || plans.length === 0 ? (
          // Display error or no data message if no plans are available
          <div className="plan-item no-data-box">
            <div className="no-data-message">
              <p>No plans are available to show now. Please try again later.</p>
            </div>
          </div>
        ) : (
          // Display the list of plans
          plans.map((plan, index) => (
            <div key={index} className="plan-item">
              <div className="plan-header">
                <span className="plan-price">₹{plan.price}</span> {/* Display plan price */}
                {plan.badge && <span className="plan-badge">{plan.badge}</span>} {/* Display badge if available */}
              </div>
              <div className="plan-details">
                <div className="plan-detail-item">
                  <span className="detail-label">{activeTab === 'data' ? 'Data' : 'Devices'}</span> {/* Label for data or devices */}
                  <span className="detail-value">{plan.data}</span> {/* Display data or devices */}
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Validity</span> {/* Label for validity */}
                  <span className="detail-value">{plan.validity}</span> {/* Display validity */}
                </div>
              </div>
              <button className="buy-button" onClick={() => handleBuy(plan.packId)}>Buy</button> {/* Buy button */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InternetPlans;
