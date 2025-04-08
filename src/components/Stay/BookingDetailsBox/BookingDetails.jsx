import React, { useEffect, useState } from 'react';
import './BookingDetails.css';

function BookingDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/booking/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        return response.json();
      })
      .then((data) => {
        const formatDate = (dateString) => {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          return new Date(dateString).toLocaleDateString('en-GB', options);
        };

        const transformedDetails = {
          tenure: `${formatDate(data.tenureStartDate)} - ${formatDate(data.tenureEndDate)}`,
          monthlyFee: `₹${data.monthlyRent.toLocaleString()}`,
          discount: `${data.discountPercent}% off`,
          discountAmount: `₹${(data.monthlyRent * (data.discountPercent / 100)).toLocaleString()}`,
        };
        setDetails(transformedDetails);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading booking details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="booking-details-container">
      <div className="booking-header">
        <h3>BOOKING DETAILS</h3>
        <a href="#" className="booking-view-details">View details</a>
      </div>
      <div className="booking-details">
        <div className="booking-detail-item">
          <span className="booking-label">Tenure</span>
          <span className="booking-value">{details.tenure}</span>
        </div>
        <div className="booking-detail-item">
          <span className="booking-label">Average Monthly Fee (incl. taxes)</span>
          <span className="booking-value">{details.monthlyFee}</span>
        </div>
        <div className="booking-detail-item">
          <span className="booking-label">Total Discount</span>
          <div className="booking-discount-wrapper">
            <span className="booking-discount-badge">{details.discount}</span>
            <span className="booking-value">{details.discountAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;