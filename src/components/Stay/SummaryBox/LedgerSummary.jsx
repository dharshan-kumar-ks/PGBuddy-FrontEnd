import React, { useEffect, useState } from 'react';
import './LedgerSummary.css';
import axios from 'axios';
import Razorpay from 'razorpay';


const LedgerSummary = () => {
  const handlePay = async () => {
    try {
      // Step 1: Call backend to create order
      const response = await axios.post('http://localhost:8081/api/booking/pay', {
        amount: 15000.0,
        transactionDate: null,
        paymentStatus: null,
        userId: 1,
      });

      const { transactionId: razorpayOrderId } = response.data;

      // Step 2: Set up Razorpay checkout options
      const options = {
        key: 'rzp_test_96EzACs3yB6Q9o', // replace with your Razorpay key
        amount: 15000 * 100, // in paise
        currency: 'INR',
        name: 'My Rent App',
        description: 'Rent Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          // Handle post-payment logic here
          console.log('Payment successful:', response);

          // OPTIONAL: Notify your backend for post-payment verification
          await axios.post('http://localhost:8081/api/payment/payment-success', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Step 3: Open Razorpay checkout UI
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pay Rent</h2>
      <button
        onClick={handlePay}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Pay Rent
      </button>
    </div>
  );
};

export default LedgerSummary;

