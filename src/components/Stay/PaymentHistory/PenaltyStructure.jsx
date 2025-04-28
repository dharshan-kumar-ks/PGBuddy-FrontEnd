import React from 'react';
import './PenaltyStructure.css';

function PenaltyStructure() {
  // Penalty structure data
  const penalties = [
    { date: '8th of each month', amount: '₹100' }, // Penalty for 8th
    { date: '11th of each month', amount: '₹300' }, // Penalty for 11th
    { date: '14th of each month', amount: '₹300' }, // Penalty for 14th
    { date: '17th of each month', amount: '₹600' }, // Penalty for 17th
    { date: '20th of each month', amount: '₹600' }, // Penalty for 20th
    { date: '23rd of each month', amount: '₹900' }, // Penalty for 23rd
    { date: '26th of each month', amount: '₹900' }, // Penalty for 26th
    { date: '30th of each month', amount: '₹1,200' }, // Penalty for 30th
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
        {/* Table Header */}
        <div className="table-header">
          <span className="header-date">Date</span> {/* Header for penalty date */}
          <span className="header-amount">Penalty Amount</span> {/* Header for penalty amount */}
        </div>

        {/* Table Rows */}
        {penalties.map((penalty, index) => (
          <div key={index} className="table-row">
            <span className="row-date">{penalty.date}</span> {/* Display penalty date */}
            <span className="row-amount">{penalty.amount}</span> {/* Display penalty amount */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PenaltyStructure;