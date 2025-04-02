import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiveTickets.css';
import axios from 'axios';

function ActiveTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]); // State to hold tickets

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        const response = await axios.get(`http://localhost:8081/api/tickets/user/${userId}`);
        setTickets(response.data); // Update state with fetched tickets
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketListClick = () => {
    navigate('/ticket-list-full-page');
  };

  const mostRecentTicket = tickets.length > 0 ? tickets[tickets.length - 1] : null; // Get the most recent ticket

  return (
    <div className="active-tickets-box">
      {mostRecentTicket ? (
        <div className="ticket-item">
          <div className="ticket-header">
            <span className="ticket-number">{mostRecentTicket.ticketNumber || `#AL-${mostRecentTicket.id}`}</span>
            <span className={`status ${mostRecentTicket.status.toLowerCase()}`}>{mostRecentTicket.status}</span>
          </div>
          <div className="ticket-details">
            <div className="detail-item">
              <span className="label">Raised on:</span>
              <span className="value">{mostRecentTicket.createdAt ? new Date(mostRecentTicket.createdAt).toLocaleString() : 'N/A'}</span> {/* Display the createdAt field value */}
            </div>
            <div className="detail-item">
              <span className="label">Category:</span>
              <span className="value">{mostRecentTicket.category || 'N/A'}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-tickets">No active tickets found.</p>
      )}
      <button className="see-all-tickets-btn" onClick={() => handleTicketListClick()}>
        See all your tickets <span className="arrow">→</span>
      </button>
    </div>
  );
}

export default ActiveTickets;

