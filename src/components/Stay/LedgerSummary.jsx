import React from 'react';
import './LedgerSummary.css';

function LedgerSummary() {
  const summary = {
    dues: '₹45,001',
    amountPaid: '₹45,001',
    outstanding: '₹0',
  };

  return (
    <div className="ledger-summary-container">
      <div className="summary-item">
        <span className="label">DUES TILL DATE</span>
        <span className="value dues">{summary.dues}</span>
      </div>
      <div className="summary-item">
        <span className="label">Amount Paid</span>
        <span className="value">{summary.amountPaid}</span>
      </div>
      <div className="summary-item">
        <span className="label">OUTSTANDING</span>
        <div className="outstanding-wrapper">
          <span className="value">{summary.outstanding}</span>
          <span className="no-dues">NO DUES</span>
        </div>
      </div>
    </div>
  );
}

export default LedgerSummary;