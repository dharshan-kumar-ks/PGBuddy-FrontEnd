import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import BookingDetails from './BookingDetailsBox/BookingDetails';
import PenaltyStructure from './PaymentHistory/PenaltyStructure';
import Ledger from './PaymentHistory/Ledger';
import LedgerSummary from './SummaryBox/LedgerSummary';
import './Stay.css';

function Stay() {
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' or 'payment-plans'
  const [summaryData, setSummaryData] = useState({
    dues: '₹45,001',
    amountPaid: '₹45,001',
    outstanding: '₹0',
  });

  /*
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get('http://localhost:8081/api/stay', {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });
      setSummaryData(response.data);
    };

    fetchData();
  }, []);
  */

  return (
    <div className="stay-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Stay Section */}
      <section className="stay-section">
        <h1>Payment and Contract Details</h1>

        {/* Booking Details */}
        <BookingDetails />

        {/* Penalty Structure  -  <PenaltyStructure />*/}
    
        <LedgerSummary 
          dues={summaryData.dues} 
          amountPaid={summaryData.amountPaid} 
          outstanding={summaryData.outstanding} 
        />

        {/* Tabs */}
        <div className="stay-tabs">
          <button
            className={`stay-tab ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('ledger')}
          >
            Ledger
          </button>
          <button
            className={`stay-tab ${activeTab === 'penalty-structure' ? 'active' : ''}`}
            onClick={() => setActiveTab('penalty-structure')}
          >
            Penalty Structure 
          </button>
        </div>

        {/* Ledger Content */}
        {activeTab === 'ledger' && (
          <Ledger
            dues={summaryData.dues}
            amountPaid={summaryData.amountPaid}
            outstanding={summaryData.outstanding}
          />
        )}

        {/* Penalty Structure Content */}
        {activeTab === 'penalty-structure' && <PenaltyStructure />}
      </section>
    </div>
  );
}

export default Stay;