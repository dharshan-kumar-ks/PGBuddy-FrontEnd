import React, { useEffect, useState } from 'react';
import './LedgerSummary.css';
import axios from 'axios';

function LedgerSummary() {
  const [details, setDetails] = useState({
    lateFee: '₹0',
    amountPaid: 'N/A',
    outstanding: 'N/A',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:8081/api/booking/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data || {};
        const amountPaid = data.totalAmountPaidTillDate ?? null;
        const outstanding = data.duesRemaining ?? null;

        setDetails({
          lateFee: '₹0',
          amountPaid: amountPaid !== null ? `₹${amountPaid.toLocaleString()}` : 'N/A',
          outstanding: outstanding !== null ? `₹${outstanding.toLocaleString()}` : 'N/A',
        });
      } catch (err) {
        console.error("Ledger fetch error:", err.message);
        setError(err.message);
        setDetails({
          lateFee: '₹0',
          amountPaid: 'N/A',
          outstanding: 'N/A',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePayRentClick = () => {
    if (details.outstanding === '₹0') {
      alert('No dues left to pay');
    } else {
      alert('Redirecting to payment gateway...');
    }
  };

  if (loading) return <div>Loading ledger details...</div>;

  return (
    <div className="ledger-summary-container">

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
            {details.outstanding === '₹0' && (
              <span className="ledger-summary-no-dues">NO DUES</span>
            )}
          </div>
        </div>
      </div>

      <button className="ledger-summary-pay-bill-button" onClick={handlePayRentClick}>
        Pay Rent
      </button>
    </div>
  );
}

export default LedgerSummary;
