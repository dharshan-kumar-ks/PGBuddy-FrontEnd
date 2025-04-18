import React, { useEffect, useState } from 'react';
import './LedgerSummary.css';
import axios from 'axios';

function LedgerSummary() {
  const [details, setDetails] = useState({
    lateFee: '₹0',
    amountPaid: 'N/A',
    outstanding: 'N/A',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:8081/api/booking/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data || {};
        const amountPaid = data.totalAmountPaidTillDate ?? null;
        const outstanding = data.duesRemaining ?? null;

        setDetails({
          lateFee: '₹0',
          amountPaid: amountPaid !== null ? `₹${amountPaid.toLocaleString()}` : 'N/A',
          outstanding: outstanding !== null ? `₹${outstanding.toLocaleString()}` : 'N/A',
        });
      } catch (err) {
        console.error("Ledger fetch error:", err.message);
        setError(err.message);
        setDetails({
          lateFee: '₹0',
          amountPaid: 'N/A',
          outstanding: 'N/A',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePayRentClick = async () => {
    if (details.outstanding === '₹0') {
      alert('No dues left to pay');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const amountInPaise = parseInt(details.outstanding.replace(/₹|,/g, '')) * 100;

      // Step 1: Create Razorpay order
      const response = await axios.post(
        'http://localhost:8081/api/booking/pay',
        {
          amount: amountInPaise / 100, // Backend expects amount in rupees
          transactionDate: null,
          paymentStatus: null,
          userId: parseInt(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { transactionId: razorpayOrderId } = response.data;

      // Step 2: Setup Razorpay options
      const options = {
        key: 'rzp_test_96EzACs3yB6Q9o', // Replace with your actual Razorpay key
        amount: amountInPaise,
        currency: 'INR',
        name: 'PG Buddy',
        description: 'Rent Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          // Step 3: Send payment details to backend for signature verification
          try {
            const verifyResponse = await axios.post(
              'http://localhost:8081/api/payment/payment-success',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyResponse.status === 200) {
              alert('Payment successful!');
              window.location.reload(); // optional: refresh ledger after payment
            } else {
              alert('Payment verification failed!');
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation error:', err.message);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (loading) return <div>Loading ledger details...</div>;

  return (
    <div className="ledger-summary-container">
      <div className="ledger-summary-items">
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Late Fee</span>
          <span className="ledger-summary-value dues">{details.lateFee}</span>
        </div>
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">Amount Paid</span>
          <span className="ledger-summary-value">{details.amountPaid}</span>
        </div>
        <div className="ledger-summary-item">
          <span className="ledger-summary-label">OUTSTANDING</span>
          <div className="ledger-summary-outstanding-wrapper">
            <span className="ledger-summary-value">{details.outstanding}</span>
            {details.outstanding === '₹0' && (
              <span className="ledger-summary-no-dues">NO DUES</span>
            )}
          </div>
        </div>
      </div>

      <button className="ledger-summary-pay-bill-button" onClick={handlePayRentClick}>
        Pay Rent
      </button>
    </div>
  );
}

export default LedgerSummary;
