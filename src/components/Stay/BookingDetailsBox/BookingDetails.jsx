import React, { useEffect, useState } from 'react';
import './BookingDetails.css';

function BookingDetails() {
  const [details, setDetails] = useState(null); // State to hold booking details
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch booking details from the backend
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/booking/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Set default values if the response is not OK
          setDetails({
            tenure: 'N/A',
            monthlyFee: 'N/A',
            discount: 'N/A',
            discountAmount: 'N/A',
          });
          setLoading(false); // Set loading to false
          return null;
        }
        return response.json(); // Parse response JSON
      })
      .then((data) => {
        if (!data) return;

        // Format date to 'DD Month YYYY' format
        const formatDate = (dateString) => {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          return new Date(dateString).toLocaleDateString('en-GB', options);
        };

        // Transform the fetched data into the required format
        const transformedDetails = {
          tenure: data?.tenureStartDate && data?.tenureEndDate
            ? `${formatDate(data.tenureStartDate)} - ${formatDate(data.tenureEndDate)}` // Format tenure dates
            : 'N/A',
          monthlyFee: data?.monthlyRent != null ? `₹${data.monthlyRent.toLocaleString()}` : 'N/A', // Format monthly fee
          discount: data?.discountPercent != null ? `${data.discountPercent}% off` : 'N/A', // Format discount percentage
          discountAmount: (data?.monthlyRent != null && data?.discountPercent != null)
            ? `₹${(data.monthlyRent * (data.discountPercent / 100)).toLocaleString()}` // Calculate discount amount
            : 'N/A',
        };
        setDetails(transformedDetails); // Update state with transformed details
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        console.error("Booking fetch error:", err.message); // Log error message
        setError(err.message); // Set error state
        // Set default values in case of an error
        setDetails({
          tenure: 'N/A',
          monthlyFee: 'N/A',
          discount: 'N/A',
          discountAmount: 'N/A',
        });
        setLoading(false); // Set loading to false
      });
  }, []);

  // Display loading message while data is being fetched
  if (loading) return <div>Loading booking details...</div>;

  // Display error message if an error occurred
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="booking-details-container">
      {/* Header Section */}
      <div className="booking-header">
        <h3>BOOKING DETAILS</h3>
        <a href="#" className="booking-view-details">View details</a> {/* Placeholder for viewing more details */}
      </div>

      {/* Booking Details Section */}
      <div className="booking-details">
        {/* Tenure */}
        <div className="booking-detail-item">
          <span className="booking-label">Tenure</span>
          <span className="booking-value">{details.tenure}</span> {/* Display tenure */}
        </div>

        {/* Average Monthly Fee */}
        <div className="booking-detail-item">
          <span className="booking-label">Average Monthly Fee (incl. taxes)</span>
          <span className="booking-value">{details.monthlyFee}</span> {/* Display monthly fee */}
        </div>

        {/* Total Discount */}
        <div className="booking-detail-item">
          <span className="booking-label">Total Discount</span>
          <div className="booking-discount-wrapper">
            <span className="booking-discount-badge">{details.discount}</span> {/* Display discount percentage */}
            <span className="booking-value">{details.discountAmount}</span> {/* Display discount amount */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
