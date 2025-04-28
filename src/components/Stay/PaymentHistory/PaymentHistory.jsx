import React, { useEffect, useState } from 'react';
import './PaymentHistory.css';

function PaymentHistory() {
  const [payments, setPayments] = useState([]); // State to hold payment history
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch payment history from the backend
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
    console.log('Retrieved userId from localStorage:', userId);

    if (!userId) {
      setError('User ID not found in localStorage'); // Set error if user ID is missing
      setLoading(false); // Stop loading
      return;
    }

    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/booking/transactions/${userId}`; // API endpoint for payment history
    console.log('Fetching data from API:', apiUrl);

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    })
      .then((response) => {
        console.log('API response status:', response.status); // Log response status
        if (!response.ok) {
          throw new Error(`Failed to fetch payment transactions. Status: ${response.status}`); // Throw error if response is not OK
        }
        return response.json(); // Parse response JSON
      })
      .then((data) => {
        console.log('API response data:', data); // Log fetched data

        // Transform the fetched data into the required format
        const transformedPayments = data.map((transaction) => {
          const date = new Date(transaction.transactionDate); // Parse transaction date
          const day = date.getDate().toString().padStart(2, '0'); // Format day
          const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase(); // Format month
          const year = date.getFullYear().toString().slice(-2); // Format year
          const details = transaction.transactionDate !== 'N/A' 
            ? `01 ${month}'${year} – 31 ${month}'${year}` // Format details
            : 'N/A';

          return {
            date: transaction.transactionDate !== 'N/A' ? `${day} ${month}` : 'N/A', // Format date
            type: transaction.paymentStatus === 'SUCCESS' ? 'Payment Received' : 'Payment Failed', // Determine payment type
            amount: `₹${transaction.amount.toLocaleString()}`, // Format amount
            details, // Add details
          };
        });

        setPayments(transformedPayments); // Update state with transformed payments
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error('Error fetching payment transactions:', err); // Log error
        setError('no-payments'); // Set error state
        setLoading(false); // Stop loading
      });
  }, []);

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading payment history...</div>;
  }

  // Display message if no payments are found or an error occurred
  if (error === 'no-payments' || payments.length === 0) {
    return (
      <div className="penalty-structure-container">
        <div className="minimum-due">
          <h2>You have no payment history yet.</h2>
          <p>Once you make a payment, it will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      {/* Render each payment item */}
      {payments.map((payment, index) => (
        <div key={index} className="payment-item">
          {/* Payment Date */}
          <div className="date-wrapper">
            <span className="date">{payment.date}</span>
          </div>

          {/* Payment Details */}
          <div className="payment-details">
            <span className="type">{payment.type}</span> {/* Payment type */}
            <span className="details">{payment.details}</span> {/* Payment details */}
          </div>

          {/* Payment Amount */}
          <div className="amount-wrapper">
            <span className="amount">{payment.amount}</span> {/* Payment amount */}
            <span className="arrow"></span> {/* Placeholder for arrow */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentHistory;