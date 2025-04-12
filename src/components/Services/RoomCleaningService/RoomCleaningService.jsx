import React, { useEffect, useState } from 'react';
import './RoomCleaningService.css';

function RoomCleaningService() {
  const [cleaningData, setCleaningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch('http://localhost:8081/api/roomcleaning/usage', {
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
        // Format the cleaningDate to '12 Apr\'25' format if it's not 'N/A'
        const formattedDate = data.cleaningDate !== 'N/A' 
          ? new Date(data.cleaningDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: '2-digit',
            }).replace(/ (\d{2})$/, "'$1")
          : 'N/A';

        setCleaningData({ ...data, cleaningDate: formattedDate });
        setLoading(false);
      })
      .catch(() => {
        // Set default values if the data is not retrieved from the backend
        setCleaningData({
          cleaningDate: 'N/A',
          cost: 0,
          userId: 'N/A',
        });
        setLoading(false);
      });
  }, []);

  const handleRequestCleaning = () => {
    console.log('Cleaning request submitted');
    alert('Cleaning request submitted! We will schedule your cleaning soon.');

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch('http://localhost:8081/api/roomcleaning/request', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to request room cleaning');
        }
        return response.text();
      })
      .then((message) => {
        console.log(message);
        alert(message);
      })
      .catch((err) => {
        console.error(err.message);
        alert(err.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2>Room Cleaning</h2>
      <div className="room-cleaning-container">
        <div className="cleaning-info">
          <div className="info-item">
            <span className="label">Last Cleaning</span>
            <span className="value">{cleaningData.cleaningDate}</span>
          </div>
          <div className="info-item">
            <span className="label">Cost</span>
            <span className="value">₹{cleaningData.cost} per session</span>
          </div>
        </div>
        <button className="request-button" onClick={handleRequestCleaning}>
          Request Cleaning
        </button>
      </div>
    </>
  );
}

export default RoomCleaningService;