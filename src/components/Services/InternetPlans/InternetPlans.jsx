import React, { useState, useEffect } from 'react';
import './InternetPlans.css';

function InternetPlans() {
  const [activeTab, setActiveTab] = useState('data'); // 'data' or 'device'
  const [dataPlans, setDataPlans] = useState([]);
  const [devicePlans, setDevicePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchDataPlans = fetch('http://localhost:8081/api/internet/data-add-ons', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data add-ons');
      }
      return response.json();
    });

    const fetchDevicePlans = fetch('http://localhost:8081/api/internet/device-add-ons', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch device add-ons');
      }
      return response.json();
    });

    Promise.all([fetchDataPlans, fetchDevicePlans])
      .then(([dataAddOns, deviceAddOns]) => {
        setDataPlans(
          dataAddOns.map((plan) => ({
            price: plan.price,
            data: `${plan.data} GB`,
            validity: `${plan.validity} days`,
            badge: plan.recommended ? 'Recommended' : null,
          }))
        );

        setDevicePlans(
          deviceAddOns.map((plan) => ({
            price: plan.price,
            data: `${plan.devices} Device${plan.devices > 1 ? 's' : ''}`,
            validity: `${plan.validity} days`,
            badge: plan.recommended ? 'Recommended' : null,
          }))
        );

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <div className="plan-item no-data-box">
            <div className="no-data-message">
              <p>Loading...</p>
            </div>
          </div>
        ) : error || !plans || plans.length === 0 ? (
          <div className="plan-item no-data-box">
            <div className="no-data-message">
              <p>No plans are available to show now. Please try again later.</p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default InternetPlans;
