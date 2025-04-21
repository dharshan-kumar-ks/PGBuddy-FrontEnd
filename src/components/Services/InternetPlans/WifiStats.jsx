import React, { useEffect, useState } from 'react';
import './WifiStats.css';

function WifiStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/internet/usage`, {
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
          planName: 'Base Plan',
          resetDays: calculateResetDays(data.resetDate),
          userId: data.userId,
          totalData: data.totalDataGb,
          speed: data.speedMbps,
          maxDevices: data.maxDevices,
          dataLeft: data.dataLeftGb,
        });
        setLoading(false);
      })
      .catch(() => {
        // Set default values if the data is not retrieved from the backend
        setStats({
          planName: 'Base Plan',
          resetDays: 0,
          userId: 'N/A',
          totalData: 0,
          speed: 40,
          maxDevices: 0,
          dataLeft: 0,
        });
        setLoading(false);
      });
  }, []);

  const calculateResetDays = (resetDate) => {
    const today = new Date();
    const reset = new Date(resetDate);
    const diffTime = reset - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dataUsedPercentage = stats.totalData > 0 ? (stats.dataLeft / stats.totalData) * 100 : 0;

  return (
    <div className="wifi-stats-container">
      <div className="wifi-stats-header">
        <h3>{stats.planName}</h3>
        <span className="reset-badge">Resets in {stats.resetDays} Days</span>
      </div>

      <p className="wifi-stats-user-id">User ID: {stats.userId}</p>

      <div className="wifi-stats-details">
        <div className="stat-item">
          <span className="stat-label">Total data</span>
          <span className="stat-value">{stats.totalData} GB</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Speed</span>
          <span className="stat-value">{stats.speed} Mbps</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Max. Devices</span>
          <span className="stat-value">{stats.maxDevices}</span>
        </div>
      </div>

      <div className="data-left-section">
        <div className="data-left-header">
          <span className="stat-label">Data Left</span>
          <span className="data-left-value">{stats.dataLeft} GB</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${dataUsedPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WifiStats;