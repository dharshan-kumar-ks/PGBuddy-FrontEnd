import React, { useEffect, useState } from 'react';
import './LedgerSummary.css';
import axios from 'axios';

function LedgerSummary() {
  const [details, setDetails] = useState({
    lateFee: '₹0', // Default late fee
    amountPaid: 'N/A', // Default amount paid
    outstanding: 'N/A', // Default outstanding amount
  });
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch ledger details from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });

        const data = response.data || {};
        const amountPaid = data.totalAmountPaidTillDate ?? null; // Total amount paid
        const outstanding = data.duesRemaining ?? null; // Outstanding dues

        // Update state with fetched data
        setDetails({
          lateFee: '₹0', // Default late fee
          amountPaid: amountPaid !== null ? `₹${amountPaid.toLocaleString()}` : 'N/A', // Format amount paid
          outstanding: outstanding !== null ? `₹${outstanding.toLocaleString()}` : 'N/A', // Format outstanding amount
        });
      } catch (err) {
        console.error("Ledger fetch error:", err.message); // Log error message
        setError(err.message); // Set error state
        // Set default values in case of an error
        setDetails({
          lateFee: '₹0',
          amountPaid: 'N/A',
          outstanding: 'N/A',
        });
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  // Handle "Pay Rent" button click
  const handlePayRentClick = async () => {
    if (details.outstanding === '₹0') {
      alert('No dues left to pay'); // Show message if no dues are left
      return;
    }

    try {
      const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const amountInPaise = parseInt(details.outstanding.replace(/₹|,/g, '')) * 100; // Convert amount to paise

      // Step 1: Create Razorpay order
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/pay`,
        {
          amount: amountInPaise / 100, // Backend expects amount in rupees
          transactionDate: null,
          paymentStatus: null,
          userId: parseInt(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );

      const { transactionId: razorpayOrderId } = response.data; // Extract Razorpay order ID

      // Step 2: Setup Razorpay options
      const options = {
        key: 'rzp_test_96EzACs3yB6Q9o', // Replace with your actual Razorpay key
        amount: amountInPaise, // Amount in paise
        currency: 'INR',
        name: 'PG Buddy',
        description: 'Rent Payment',
        order_id: razorpayOrderId, // Razorpay order ID
        handler: async function (response) {
          // Step 3: Send payment details to backend for signature verification
          try {
            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/booking/payment-success`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Add token to Authorization header
                },
              }
            );

            if (verifyResponse.status === 200) {
              alert('Payment successful!'); // Show success message
              window.location.reload(); // Refresh ledger after payment
            } else {
              alert('Payment verification failed!'); // Show failure message
            }
          } catch (err) {
            console.error('Payment verification error:', err); // Log error
            alert('Payment verification failed!'); // Show failure message
          }
        },
        prefill: {
          name: 'John Doe', // Prefill name
          email: 'johndoe@example.com', // Prefill email
          contact: '9999999999', // Prefill contact
        },
        theme: {
          color: '#3399cc', // Razorpay theme color
        },
      };

      const rzp = new window.Razorpay(options); // Initialize Razorpay
      rzp.open(); // Open Razorpay payment window
    } catch (err) {
      console.error('Payment initiation error:', err.message); // Log error
      alert('Failed to initiate payment. Please try again.'); // Show error message
    }
  };

  // Display loading message while data is being fetched
  if (loading) return <div>Loading ledger details...</div>;

  return (
    <div className="ledger-summary-container">
      {/* Ledger Summary Items */}
      <div className="ledger-summary-items">
        {/* Late Fee */}
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Late Fee</span>
          <span className="ledger-summary-value dues">{details.lateFee}</span>
        </div>

        {/* Amount Paid */}
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Amount Paid</span>
          <span className="ledger-summary-value">{details.amountPaid}</span>
        </div>

        {/* Outstanding Amount */}
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">OUTSTANDING</span>
          <div className="ledger-summary-outstanding-wrapper">
            <span className="ledger-summary-value">{details.outstanding}</span>
            {details.outstanding === '₹0' && (
              <span className="ledger-summary-no-dues">NO DUES</span> )} {/* Display "No Dues" if outstanding is ₹0 */}
          </div>
        </div>
      </div>

      {/* Pay Rent Button */}
      <button className="ledger-summary-pay-bill-button" onClick={handlePayRentClick}>
        Pay Rent
      </button>
    </div>
  );
}

export default LedgerSummary;
