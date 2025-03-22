import React, { useState } from 'react';
import './InternetPlans.css';

function InternetPlans() {
  // State for the active tab
  const [activeTab, setActiveTab] = useState('data'); // 'data' or 'device'

  // Sample data for add-on plans (you can replace this with API data)
  const dataPlans = [
    {
      price: 236,
      data: '75 GB',
      validity: '22 days',
      badge: 'Recommended',
    },
    {
      price: 118,
      data: '30 GB',
      validity: '22 days',
      badge: 'Previously Bought',
    },
    {
      price: 23.6,
      data: '3 GB',
      validity: '22 days',
      badge: null,
    },
  ];

  const devicePlans = [
    {
      price: 100,
      data: '1 Device',
      validity: '30 days',
      badge: null,
    },
    {
      price: 180,
      data: '2 Devices',
      validity: '30 days',
      badge: 'Recommended',
    },
  ];

  // Select the plans based on the active tab
  const plans = activeTab === 'data' ? dataPlans : devicePlans;

  return (
    <div className="internet-plans-container">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Data Add-on
        </button>
        <button
          className={`tab ${activeTab === 'device' ? 'active' : ''}`}
          onClick={() => setActiveTab('device')}
        >
          Device Add-on
        </button>
      </div>

      {/* Plans List */}
      <div className="plans-list">
        {plans && plans.length > 0 ? (
          plans.map((plan, index) => (
            <div key={index} className="plan-item">
              <div className="plan-header">
                <span className="plan-price">₹{plan.price}</span>
                {plan.badge && <span className="plan-badge">{plan.badge}</span>}
              </div>
              <div className="plan-details">
                <div className="plan-detail-item">
                  <span className="detail-label">{activeTab === 'data' ? 'Data' : 'Devices'}</span>
                  <span className="detail-value">{plan.data}</span>
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Validity</span>
                  <span className="detail-value">{plan.validity}</span>
                </div>
              </div>
              <button className="buy-button">Buy</button>
            </div>
          ))
        ) : (
          <p>No plans available.</p>
        )}
      </div>
    </div>
  );
}

export default InternetPlans;