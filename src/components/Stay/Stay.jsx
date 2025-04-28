import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import BookingDetails from './BookingDetailsBox/BookingDetails';
import PenaltyStructure from './PaymentHistory/PenaltyStructure';
import Ledger from './PaymentHistory/Ledger';
import LedgerSummary from './SummaryBox/LedgerSummary';
import './Stay.css';

function Stay() {
  const [activeTab, setActiveTab] = useState('ledger'); // State to track the active tab ('ledger' or 'penalty-structure')
  const [summaryData, setSummaryData] = useState({
    dues: '₹45,001', // Default dues
    amountPaid: '₹45,001', // Default amount paid
    outstanding: '₹0', // Default outstanding amount
  });

  /*
  // Uncomment this useEffect to fetch summary data from the backend
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get('http://localhost:8081/api/stay', {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });
      setSummaryData(response.data); // Update state with fetched data
    };

    fetchData(); // Fetch data on component mount
  }, []);
  */

  return (
    <div className="stay-container">
      {/* Top Navigation Bar */}
      <TopNavigationBar />

      {/* Stay Section */}
      <section className="stay-section">
        {/* Page Heading */}
        <h1>Payment and Contract Details</h1>

        {/* Booking Details Section */}
        <BookingDetails />

        {/* Ledger Summary Section */}
        <LedgerSummary 
          dues={summaryData.dues} // Pass dues to LedgerSummary
          amountPaid={summaryData.amountPaid} // Pass amount paid to LedgerSummary
          outstanding={summaryData.outstanding} // Pass outstanding amount to LedgerSummary
        />

        {/* Tabs for switching between Ledger and Penalty Structure */}
        <div className="stay-tabs">
          {/* Ledger Tab */}
          <button
            className={`stay-tab ${activeTab === 'ledger' ? 'active' : ''}`} // Highlight active tab
            onClick={() => setActiveTab('ledger')} // Set active tab to 'ledger'
          >
            Ledger
          </button>

          {/* Penalty Structure Tab */}
          <button
            className={`stay-tab ${activeTab === 'penalty-structure' ? 'active' : ''}`} // Highlight active tab
            onClick={() => setActiveTab('penalty-structure')} // Set active tab to 'penalty-structure'
          >
            Penalty Structure
          </button>
        </div>

        {/* Ledger Content */}
        {activeTab === 'ledger' && (
          <Ledger
            dues={summaryData.dues} // Pass dues to Ledger
            amountPaid={summaryData.amountPaid} // Pass amount paid to Ledger
            outstanding={summaryData.outstanding} // Pass outstanding amount to Ledger
          />
        )}

        {/* Penalty Structure Content */}
        {activeTab === 'penalty-structure' && <PenaltyStructure />}
      </section>
    </div>
  );
}

export default Stay;