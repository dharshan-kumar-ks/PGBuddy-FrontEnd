import React from 'react';
import TopNavigationBar from '../TopNavigationBar';
import './OrderHistoryPage.css';

function HistoryPage() {
  return (
    <div className="history-page">
      <TopNavigationBar />
      <h1>Order History</h1>
      <p>Your past orders will be displayed here.</p>
    </div>
  );
}

export default HistoryPage;
