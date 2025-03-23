import React from 'react';
import './BookingDetails.css';

function BookingDetails() {
  const details = {
    tenure: "01 Feb'25 – 30 Apr'25",
    monthlyFee: '₹32,240',
    discount: '4% off',
    discountAmount: '₹2,541',
  };

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