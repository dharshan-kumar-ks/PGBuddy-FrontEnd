import React from 'react';
import './PaymentHistory.css';

function PaymentHistory() {
  const payments = [
    {
      date: '02 MAR',
      type: 'Payment Received',
      amount: '₹14,444',
      details: 'via PAYTM SDK 202503…',
    },
    {
      date: '01 MAR',
      type: 'Instalment 2',
      amount: '₹13,285',
      details: "01 Mar'25 – 31 Mar'25",
    },
    {
      date: '28 FEB',
      type: 'Reimbursement of Utility Electricity Charges',
      amount: '₹1,160',
      details: "01 Feb'25 – 28 Feb'25",
    },
  ];

  return (
    <div className="payment-history-container">
      {payments && payments.length > 0 ? (
        payments.map((payment, index) => (
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
        ))
      ) : (
        <p>No payment history available.</p>
      )}
    </div>
  );
}

export default PaymentHistory;