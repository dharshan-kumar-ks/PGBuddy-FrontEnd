import React, { useState } from 'react';
import TopNavigationBar from '../TopNavigationBar';
import BookingDetails from './BookingDetails';
import PenaltyStructure from './PenaltyStructure';
import Ledger from './Ledger';
import LedgerSummary from './LedgerSummary';
import './Stay.css';

function Stay() {
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' or 'payment-plans'

  // Sample data for LedgerSummary (can be fetched from an API)
  const summaryData = {
    dues: '₹45,001',
    amountPaid: '₹45,001',
    outstanding: '₹0',
  };

  return (
    <div className="home-container">
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
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('ledger')}
          >
            Ledger
          </button>
          <button
            className={`tab ${activeTab === 'penalty-structure' ? 'active' : ''}`}
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