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
      <div className="header">
        <h3>BOOKING DETAILS</h3>
        <a href="#" className="view-details">View details</a>
      </div>
      <div className="details">
        <div className="detail-item">
          <span className="label">Tenure</span>
          <span className="value">{details.tenure}</span>
        </div>
        <div className="detail-item">
          <span className="label">Average Monthly Fee (incl. taxes)</span>
          <span className="value">{details.monthlyFee}</span>
        </div>
        <div className="detail-item">
          <span className="label">Total Discount</span>
          <div className="discount-wrapper">
            <span className="discount-badge">{details.discount}</span>
            <span className="value">{details.discountAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;