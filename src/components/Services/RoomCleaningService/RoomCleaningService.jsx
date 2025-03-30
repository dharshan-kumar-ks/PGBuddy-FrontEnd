import React from 'react';
import './RoomCleaningService.css';

function RoomCleaningService() {
  const handleRequestCleaning = () => {
    // Placeholder for request logic
    console.log('Cleaning request submitted');
    alert('Cleaning request submitted! We will schedule your cleaning soon.');
  };

  return (
    <>
      <h2>Room Cleaning</h2>
      <div className="room-cleaning-container">
        <div className="cleaning-info">
          <div className="info-item">
            <span className="label">Last Cleaning</span>
            <span className="value">15 Mar’25</span>
          </div>
          <div className="info-item">
            <span className="label">Cost</span>
            <span className="value">₹100 per session</span>
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