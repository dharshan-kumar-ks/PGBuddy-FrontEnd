import React, { useEffect, useState } from 'react';
import './PaymentHistory.css';

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    console.log('Retrieved userId from localStorage:', userId);

    if (!userId) {
      setError('User ID not found in localStorage');
      setLoading(false);
      return;
    }

    const apiUrl = `http://localhost:8081/api/booking/transactions/${userId}`;
    console.log('Fetching data from API:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log('API response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch payment transactions. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API response data:', data);
        const transformedPayments = data.map((transaction) => {
          const date = new Date(transaction.transactionDate);
          const day = date.getDate().toString().padStart(2, '0');
          const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
          const year = date.getFullYear().toString().slice(-2);
          const details = transaction.transactionDate !== 'N/A' 
            ? `01 ${month}'${year} – 31 ${month}'${year}`
            : 'N/A';

          return {
            date: transaction.transactionDate !== 'N/A' ? `${day} ${month}` : 'N/A',
            type: 'Payment Received',
            amount: `₹${transaction.amount.toLocaleString()}`,
            details,
          };
        });
        setPayments(transformedPayments);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching payment transactions:', err);
        setError('Unable to load payment history. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading payment history...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <img src="/public/error-icon.png" alt="Error" className="error-icon" />
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="no-payments-container">
        <img src="/public/history-icon.png" alt="No Payments" className="no-payments-icon" />
        <p className="no-payments-message">You have no payment history yet.</p>
        <p className="no-payments-subtext">Once you make a payment, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      {payments.map((payment, index) => (
        <div key={index} className="payment-item">
          <div className="date-wrapper">
            <span className="date">{payment.date}</span>
          </div>
          <div className="payment-details">
            <span className="type">{payment.type}</span>
            <span className="details">{payment.details}</span>
          </div>
          <div className="amount-wrapper">
            <span className="amount">{payment.amount}</span>
            <span className="arrow"></span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentHistory;