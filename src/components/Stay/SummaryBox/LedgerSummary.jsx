import React, { useEffect, useState } from 'react';
import './LedgerSummary.css';

function LedgerSummary() {
  const [details, setDetails] = useState({
    lateFee: '₹0',
    amountPaid: '₹0',
    outstanding: '₹0',
  });
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
        setDetails({
          lateFee: '₹0', // Static value as per requirement
          amountPaid: `₹${data.totalAmountPaidTillDate.toLocaleString()}`,
          outstanding: `₹${data.duesRemaining.toLocaleString()}`,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handlePayRentClick = () => {
    if (details.outstanding === '₹0') {
      alert('No dues left to pay');
    } else {
      // Logic for payment can be added here
      alert('Redirecting to payment gateway...');
    }
  };

  if (loading) {
    return <div>Loading ledger details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ledger-summary-container">
      {/* Summary Items */}
      <div className="ledger-summary-items">
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Late Fee</span>
          <span className="ledger-summary-value dues">{details.lateFee}</span>
        </div>
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Amount Paid</span>
          <span className="ledger-summary-value">{details.amountPaid}</span>
        </div>
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">OUTSTANDING</span>
          <div className="ledger-summary-outstanding-wrapper">
            <span className="ledger-summary-value">{details.outstanding}</span>
            {details.outstanding === '₹0' && <span className="ledger-summary-no-dues">NO DUES</span>}
          </div>
        </div>
      </div>

      {/* Pay Bill Button */}
      <button className="ledger-summary-pay-bill-button" onClick={handlePayRentClick}>Pay Rent</button>
    </div>
  );
}

export default LedgerSummary;