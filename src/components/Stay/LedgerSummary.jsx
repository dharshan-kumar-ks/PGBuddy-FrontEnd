import React from 'react';
import './LedgerSummary.css';

function LedgerSummary({ dues = '₹0', amountPaid = '₹0', outstanding = '₹0' }) {
  return (
    <div className="ledger-summary-container">
      {/* Summary Items */}
      <div className="ledger-summary-items">
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">DUES TILL DATE</span>
          <span className="ledger-summary-value dues">{dues}</span>
        </div>
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Amount Paid</span>
          <span className="ledger-summary-value">{amountPaid}</span>
        </div>
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">OUTSTANDING</span>
          <div className="ledger-summary-outstanding-wrapper">
            <span className="ledger-summary-value">{outstanding}</span>
            {outstanding === '₹0' && <span className="ledger-summary-no-dues">NO DUES</span>}
          </div>
        </div>
      </div>

      {/* Pay Bill Button */}
      {outstanding >= '₹0' && (
        <button className="ledger-summary-pay-bill-button">Pay Rent</button>
      )}
    </div>
  );
}

export default LedgerSummary;