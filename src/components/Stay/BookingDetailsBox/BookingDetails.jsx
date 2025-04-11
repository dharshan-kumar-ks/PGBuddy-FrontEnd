import React, { useEffect, useState } from 'react';
import './BookingDetails.css';

function BookingDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch(`http://localhost:8081/api/booking/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setDetails({
            tenure: 'N/A',
            monthlyFee: 'N/A',
            discount: 'N/A',
            discountAmount: 'N/A',
          });
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;

        const formatDate = (dateString) => {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          return new Date(dateString).toLocaleDateString('en-GB', options);
        };

        const transformedDetails = {
          tenure: data?.tenureStartDate && data?.tenureEndDate
            ? `${formatDate(data.tenureStartDate)} - ${formatDate(data.tenureEndDate)}`
            : 'N/A',
          monthlyFee: data?.monthlyRent != null ? `₹${data.monthlyRent.toLocaleString()}` : 'N/A',
          discount: data?.discountPercent != null ? `${data.discountPercent}% off` : 'N/A',
          discountAmount: (data?.monthlyRent != null && data?.discountPercent != null)
            ? `₹${(data.monthlyRent * (data.discountPercent / 100)).toLocaleString()}`
            : 'N/A',
        };
        setDetails(transformedDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Booking fetch error:", err.message);
        setError(err.message);
        setDetails({
          tenure: 'N/A',
          monthlyFee: 'N/A',
          discount: 'N/A',
          discountAmount: 'N/A',
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading booking details...</div>;
  if (error) return <div>Error: {error}</div>;

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
