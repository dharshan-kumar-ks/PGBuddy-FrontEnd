import React from 'react';
import LedgerSummary from './LedgerSummary';
import PaymentHistory from './PaymentHistory';
import './Ledger.css';

function Ledger({ dues = '₹0', amountPaid = '₹0', outstanding = '₹0' }) {
  return (
    <div className="ledger-container">
        {/* Ledger Summary- <LedgerSummary dues={dues} amountPaid={amountPaid} outstanding={outstanding} />*/}
      <PaymentHistory />
    </div>
  );
}

export default Ledger;