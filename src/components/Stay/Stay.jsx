import React, { useState } from 'react';
import TopNavigationBar from '../TopNavigationBar';
import BookingDetails from './BookingDetails';
import PenaltyStructure from './PenaltyStructure';
import LedgerSummary from './LedgerSummary';
import PaymentHistory from './PaymentHistory';
import './Stay.css';

function Stay() {
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' or 'payment-plans'

  return (
    <div className="home-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Stay Section */}
      <section className="stay-section">
        <h1>Payment and Contract Details</h1>

        {/* Booking Details */}
        <BookingDetails />

        {/* Penalty Structure */}
        <PenaltyStructure />

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('ledger')}
          >
            Ledger
          </button>
          <button
            className={`tab ${activeTab === 'payment-plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment-plans')}
          >
            Payment Plans
          </button>
        </div>

        {/* Ledger Content */}
        {activeTab === 'ledger' && (
          <>
            <LedgerSummary />
          </>
        )}

        {/* Placeholder for Payment Plans */}
        {activeTab === 'payment-plans' && (
          <div className="placeholder">
            <p>Payment Plans content coming soon...</p>
          </div>
        )}

      </section>
    </div>
  );
}

export default Stay;