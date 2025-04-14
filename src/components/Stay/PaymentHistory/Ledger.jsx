import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LedgerSummary from '../SummaryBox/LedgerSummary';
import PaymentHistory from './PaymentHistory';
import './Ledger.css';

function Ledger({ dues = '₹0', amountPaid = '₹0', outstanding = '₹0' }) {
  const [ledgerData, setLedgerData] = useState(null);

  /*
  useEffect(() => {
    const fetchLedgerData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get('http://localhost:8081/api/ledger', {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });
      setLedgerData(response.data);
    };

    fetchLedgerData();
  }, []);
  */

  return (
    <div className="ledger-container">
      {ledgerData && (
        <LedgerSummary
          dues={ledgerData.dues}
          amountPaid={ledgerData.amountPaid}
          outstanding={ledgerData.outstanding}
        />
      )}
      <PaymentHistory />
    </div>
  );
}

export default Ledger;