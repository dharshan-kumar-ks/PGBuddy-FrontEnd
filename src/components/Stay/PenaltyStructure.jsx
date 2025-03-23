import React from 'react';
import './PenaltyStructure.css';

function PenaltyStructure() {
  const penalties = [
    { date: '8th of each month', amount: '₹100' },
    { date: '11th of each month', amount: '₹300' },
    { date: '14th of each month', amount: '₹300' },
    { date: '17th of each month', amount: '₹600' },
    { date: '20th of each month', amount: '₹600' },
    { date: '23rd of each month', amount: '₹900' },
    { date: '26th of each month', amount: '₹900' },
    { date: '30th of each month', amount: '₹1,200' },
  ];

  return (
    <div className="penalty-structure-container">
      {/* Minimum Due Section */}
      <div className="minimum-due">
        <h2>Minimum Due</h2>
        <p>
          Total dues till 2nd of every month must be paid by 7th of the month. Otherwise penalty will be applied based on below structure.
        </p>
      </div>

      {/* Penalty Structure Section */}
      <div className="penalty-structure">
        <h2>Penalty Structure</h2>
        <p>
          If you don’t pay your total due amount by 7th of the month then we’ll penalise you based on the below structure.
        </p>
      </div>

      {/* Penalty Table */}
      <div className="penalty-table">
        <div className="table-header">
          <span className="header-date">Date</span>
          <span className="header-amount">Penalty Amount</span>
        </div>
        {penalties.map((penalty, index) => (
          <div key={index} className="table-row">
            <span className="row-date">{penalty.date}</span>
            <span className="row-amount">{penalty.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PenaltyStructure;