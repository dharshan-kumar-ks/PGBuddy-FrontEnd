import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LedgerSummary from '../SummaryBox/LedgerSummary'; // Component to display ledger summary
import PaymentHistory from './PaymentHistory'; // Component to display payment history
import './Ledger.css';

function Ledger({ dues = '₹0', amountPaid = '₹0', outstanding = '₹0' }) {
  const [ledgerData, setLedgerData] = useState(null); // State to hold ledger data

  // Fetch ledger data from the backend
  useEffect(() => {
    const fetchLedgerData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ledger`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
        setLedgerData(response.data); // Update state with fetched ledger data
      } catch (error) {
        console.error('Error fetching ledger data:', error); // Log error if API call fails
      }
    };

    fetchLedgerData(); // Fetch ledger data on component mount
  }, []);

  return (
    <div className="ledger-container">
      {/* Display Ledger Summary if ledger data is available */}
      {ledgerData && (
        <LedgerSummary
          dues={ledgerData.dues} // Pass dues to LedgerSummary
          amountPaid={ledgerData.amountPaid} // Pass amount paid to LedgerSummary
          outstanding={ledgerData.outstanding} // Pass outstanding amount to LedgerSummary
        />
      )}

      {/* Display Payment History */}
      <PaymentHistory />
    </div>
  );
}

export default Ledger;