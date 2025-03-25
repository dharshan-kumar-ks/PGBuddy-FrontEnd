import React from 'react';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import TicketListFullPage from './TicketListFullPage'; // Added import for TicketListFullPage
import './ActiveTickets.css';

function ActiveTickets() {
  const navigate = useNavigate(); // Initialize useNavigate

  const tickets = [
    {
      id: 1,
      ticketNumber: '#AL-10087917',
      status: 'Open',
      raisedOn: '02 Feb’25, 1:00 PM',
      category: 'Payment & Billing',
    },
  ];

  const handleTicketListClick = () => {
    navigate('/ticket-list-full-page'); // Correct navigation logic
  };

  return (
    <div className="active-tickets-box">
      {tickets.length === 0 ? (
        <p className="no-tickets">No active tickets found.</p>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-header">
                <span className="ticket-number">{ticket.ticketNumber}</span>
                <span className={`status ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="ticket-details">
                <div className="detail-item">
                  <span className="label">Raised on:</span>
                  <span className="value">{ticket.raisedOn}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Category:</span>
                  <span className="value">{ticket.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="see-all-tickets-btn" onClick={() => handleTicketListClick()}>
        See all your tickets <span className="arrow">→</span>
      </button>
    </div>
  );
}

export default ActiveTickets;

