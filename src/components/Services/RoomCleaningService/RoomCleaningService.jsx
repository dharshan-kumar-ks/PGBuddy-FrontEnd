import React, { useEffect, useState } from 'react';
import './RoomCleaningService.css';

function RoomCleaningService() {
  const [cleaningData, setCleaningData] = useState(null); // State to hold room cleaning data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch room cleaning data from the backend
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roomcleaning/usage`, {
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
        // Format the cleaningDate to '12 Apr'25' format if it's not 'N/A'
        const formattedDate = data.cleaningDate !== 'N/A' 
          ? new Date(data.cleaningDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: '2-digit',
            }).replace(/ (\d{2})$/, "'$1") // Format date to '12 Apr'25'
          : 'N/A';

        setCleaningData({ ...data, cleaningDate: formattedDate }); // Update state with formatted data
        setLoading(false); // Set loading to false
      })
      .catch(() => {
        // Handle errors by setting default values
        setCleaningData({
          cleaningDate: 'N/A', // Default cleaning date
          cost: 0, // Default cost
          userId: 'N/A', // Default user ID
        });
        setLoading(false); // Set loading to false
      });
  }, []);

  // Handle "Request Cleaning" button click
  const handleRequestCleaning = () => {
    console.log('Cleaning request submitted'); // Log the request
    alert('Cleaning request submitted! We will schedule your cleaning soon.'); // Show success message

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roomcleaning/request`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json', // Set content type to JSON
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to request room cleaning'); // Throw error if response is not OK
        }
        return response.text(); // Parse response text
      })
      .then((message) => {
        console.log(message); // Log the response message
        alert(message); // Show success message
      })
      .catch((err) => {
        console.error(err.message); // Log error message
        alert(err.message); // Show error message
      });
  };

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Section Heading */}
      <h2>Room Cleaning</h2>

      {/* Room Cleaning Details */}
      <div className="room-cleaning-container">
        <div className="cleaning-info">
          {/* Last Cleaning Date */}
          <div className="info-item">
            <span className="label">Last Cleaning</span>
            <span className="value">{cleaningData.cleaningDate}</span>
          </div>

          {/* Cleaning Cost */}
          <div className="info-item">
            <span className="label">Cost</span>
            <span className="value">₹{cleaningData.cost} per session</span>
          </div>
        </div>

        {/* Request Cleaning Button */}
        <button className="request-button" onClick={handleRequestCleaning}>
          Request Cleaning
        </button>
      </div>
    </>
  );
}

export default RoomCleaningService;