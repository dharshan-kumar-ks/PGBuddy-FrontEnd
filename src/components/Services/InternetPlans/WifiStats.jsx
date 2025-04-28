import React, { useEffect, useState } from 'react';
import './WifiStats.css';

function WifiStats() {
  const [stats, setStats] = useState(null); // State to hold WiFi statistics
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch WiFi usage data from the backend
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/internet/usage`, {
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
          planName: 'Base Plan', // Default plan name
          resetDays: calculateResetDays(data.resetDate), // Calculate days until reset
          userId: data.userId, // User ID
          totalData: data.totalDataGb, // Total data in GB
          speed: data.speedMbps, // Internet speed in Mbps
          maxDevices: data.maxDevices, // Maximum number of devices
          dataLeft: data.dataLeftGb, // Remaining data in GB
        });
        setLoading(false); // Set loading to false
      })
      .catch(() => {
        // Handle errors by setting default values
        setStats({
          planName: 'Base Plan',
          resetDays: 0,
          userId: 'N/A',
          totalData: 0,
          speed: 40, // Default speed
          maxDevices: 0,
          dataLeft: 0,
        });
        setLoading(false); // Set loading to false
      });
  }, []);

  // Calculate the number of days until the data reset date
  const calculateResetDays = (resetDate) => {
    const today = new Date();
    const reset = new Date(resetDate);
    const diffTime = reset - today; // Difference in milliseconds
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
  };

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate the percentage of data used
  const dataUsedPercentage = stats.totalData > 0 ? (stats.dataLeft / stats.totalData) * 100 : 0;

  return (
    <div className="wifi-stats-container">
      {/* Header Section */}
      <div className="wifi-stats-header">
        <h3>{stats.planName}</h3> {/* Display plan name */}
        <span className="reset-badge">Resets in {stats.resetDays} Days</span> {/* Display reset days */}
      </div>

      {/* User ID */}
      <p className="wifi-stats-user-id">User ID: {stats.userId}</p>

      {/* WiFi Details */}
      <div className="wifi-stats-details">
        {/* Total Data */}
        <div className="stat-item">
          <span className="stat-label">Total data</span>
          <span className="stat-value">{stats.totalData} GB</span>
        </div>

        {/* Speed */}
        <div className="stat-item">
          <span className="stat-label">Speed</span>
          <span className="stat-value">{stats.speed} Mbps</span>
        </div>

        {/* Maximum Devices */}
        <div className="stat-item">
          <span className="stat-label">Max. Devices</span>
          <span className="stat-value">{stats.maxDevices}</span>
        </div>
      </div>

      {/* Data Left Section */}
      <div className="data-left-section">
        <div className="data-left-header">
          <span className="stat-label">Data Left</span>
          <span className="data-left-value">{stats.dataLeft} GB</span> {/* Display remaining data */}
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${dataUsedPercentage}%` }} // Set width based on data used percentage
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WifiStats;