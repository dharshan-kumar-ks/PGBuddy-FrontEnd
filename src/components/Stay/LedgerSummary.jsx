import React from 'react';
import './LedgerSummary.css';

function LedgerSummary({ dues = '₹0', amountPaid = '₹0', outstanding = '₹0' }) {
  return (
    <div className="ledger-summary-container">
      {/* Summary Items */}
      <div className="summary-items">
        <div className="summary-item">
          <span className="label">DUES TILL DATE</span>
          <span className="value dues">{dues}</span>
        </div>
        <div className="summary-item">
          <span className="label">Amount Paid</span>
          <span className="value">{amountPaid}</span>
        </div>
        <div className="summary-item">
          <span className="label">OUTSTANDING</span>
          <div className="outstanding-wrapper">
            <span className="value">{outstanding}</span>
            {outstanding === '₹0' && <span className="no-dues">NO DUES</span>}
          </div>
        </div>
      </div>

      {/* Pay Bill Button */}
      {outstanding >= '₹0' && (
        <button className="pay-bill-button">Pay Rent</button>
      )}
    </div>
  );
}

export default LedgerSummary;