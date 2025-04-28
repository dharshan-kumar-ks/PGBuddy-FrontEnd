import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiveTickets.css';
import axiosInstance from '../../../../axiosConfig'; // Import axios instance for API calls

function ActiveTickets() {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [tickets, setTickets] = useState([]); // State to hold tickets

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/tickets/user/${userId}`); // Fetch tickets for the user
        setTickets(response.data); // Update state with fetched tickets
      } catch (error) {
        console.error('Error fetching tickets:', error); // Log error if API call fails
      }
    };

    fetchTickets(); // Fetch tickets on component mount
  }, []);

  // Navigate to the full ticket list page
  const handleTicketListClick = () => {
    navigate('/ticket-list-full-page');
  };

  // Get the most recent ticket (last in the list)
  const mostRecentTicket = tickets.length > 0 ? tickets[tickets.length - 1] : null;

  return (
    <div className="active-tickets-box">
      {/* Display the most recent ticket if available */}
      {mostRecentTicket ? (
        <div className="ticket-item">
          {/* Ticket Header */}
          <div className="ticket-header">
            <span className="ticket-number">
              {mostRecentTicket.ticketNumber || `#AL-${mostRecentTicket.id}`} {/* Display ticket number */}
            </span>
            <span className={`status ${mostRecentTicket.status.toLowerCase()}`}>
              {mostRecentTicket.status} {/* Display ticket status */}
            </span>
          </div>

          {/* Ticket Details */}
          <div className="ticket-details">
            {/* Raised On */}
            <div className="detail-item">
              <span className="label">Raised on:</span>
              <span className="value">
                {mostRecentTicket.createdAt
                  ? new Date(mostRecentTicket.createdAt).toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    }) // Format the created date
                  : 'N/A'}
              </span>
            </div>

            {/* Category */}
            <div className="detail-item">
              <span className="label">Category:</span>
              <span className="value">{mostRecentTicket.category || 'N/A'}</span> {/* Display category */}
            </div>
          </div>
        </div>
      ) : (
        // Display message if no active tickets are found
        <p className="no-tickets">No active tickets found.</p>
      )}

      {/* Button to navigate to the full ticket list */}
      <button className="see-all-tickets-btn" onClick={() => handleTicketListClick()}>
        See all your tickets <span className="arrow">→</span>
      </button>
    </div>
  );
}

export default ActiveTickets;

