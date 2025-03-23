import React from 'react';
import './WifiStats.css';

function WifiStats() {
  // Sample data (you can replace this with dynamic data from an API)
  const stats = {
    planName: 'Base Plan',
    resetDays: 23,
    userId: '23SETBA020',
    totalData: 105, // in GB
    speed: 40, // in Mbps
    maxDevices: 3,
    dataLeft: 57.01, // in GB
  };

  // Calculate the percentage of data used for the progress bar
  const dataUsedPercentage = (stats.dataLeft / stats.totalData) * 100;

  return (
    <div className="wifi-stats-container">
      {/* Header */}
      <div className="wifi-stats-header">
        <h3>{stats.planName}</h3>
        <span className="reset-badge">Resets in {stats.resetDays} Days</span>
      </div>

      {/* User ID */}
      <p className="wifi-stats-user-id">User ID: {stats.userId}</p>

      {/* Stats */}
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

      {/* Data Left with Progress Bar */}
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