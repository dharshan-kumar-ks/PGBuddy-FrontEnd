import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './TicketListBox.css';

function TicketListBox({ tickets, searchQuery, filters, onSearchChange }) {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [userNames, setUserNames] = useState({}); // State to store user names mapped by user IDs

  // Fetch user names for assigned tickets
  useEffect(() => {
    const fetchUserNames = async () => {
      const uniqueUserIds = [...new Set(tickets.map((ticket) => ticket.assignedTo))]; // Extract unique user IDs
      const userNameMap = {};
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      for (const userId of uniqueUserIds) {
        if (userId) {
          try {
            console.log(`Fetching user name for userId: ${userId}`); // Debug log
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
              },
            });
            console.log(`Response for userId ${userId}:`, response.data); // Debug log
            userNameMap[userId] = response.data.name || response.data.email || 'Unknown User'; // Fallback to email or placeholder if name is null
          } catch (error) {
            console.error(`Error fetching user name for userId ${userId}:`, error); // Log error
          }
        }
      }

      console.log('Final userNameMap:', userNameMap); // Debug log
      setUserNames(userNameMap); // Update state with user names
    };

    fetchUserNames();
  }, [tickets]); // Re-run effect when tickets change

  // Priority and status mappings for display
  const priorityMapping = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
  };

  const statusMapping = {
    PENDING: 'Pending',
    RESOLVED: 'Resolved',
  };

  // Filter tickets based on search query and filters
  const filteredTickets = tickets
    .map((ticket) => ({
      ...ticket,
      priority: priorityMapping[ticket.priority] || ticket.priority, // Map priority to display-friendly format
      status: statusMapping[ticket.status] || ticket.status, // Map status to display-friendly format
    }))
    .filter((ticket) => {
      const matchesSearch =
        String(ticket.id).toLowerCase().includes(searchQuery.toLowerCase()) || // Search by ticket ID
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by title
        (ticket.assignedTo && String(ticket.assignedTo).toLowerCase().includes(searchQuery.toLowerCase())); // Search by assignedTo

      const matchesPriority =
        filters.priorities.length === 0 || filters.priorities.includes(ticket.priority); // Filter by priority

      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(ticket.category); // Filter by category

      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(ticket.status); // Filter by status

      const ticketDate = ticket.requestDate
        ? new Date(
            ticket.requestDate.split(',')[0].split('/').reverse().join('-') + ' ' + ticket.requestDate.split(',')[1]
          )
        : null; // Parse requestDate into a Date object

      const matchesDate =
        !filters.dateRange[0] ||
        !filters.dateRange[1] ||
        (ticketDate && ticketDate >= filters.dateRange[0] && ticketDate <= filters.dateRange[1]); // Filter by date range

      return matchesSearch && matchesPriority && matchesCategory && matchesStatus && matchesDate; // Combine all filters
    });

  // Handle ticket row click to navigate to ticket details
  const handleTicketClick = (ticket) => {
    navigate(`/ticket/${ticket.id}`, { state: { ticket } }); // Navigate to ticket details page
  };

  return (
    <div className="ticket-list-box">
      {/* Search bar for filtering tickets */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)} // Update search query
        />
      </div>

      {/* Tickets table */}
      <div className="tickets-table">
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Created At</th> {/* New column for created date */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} onClick={() => handleTicketClick(ticket)} style={{ cursor: 'pointer' }}>
                <td>#{ticket.id}</td> {/* Display ticket ID */}
                <td>{ticket.title}</td> {/* Display ticket title */}
                <td>
                  <span className={`priority ${(ticket.priority || '').toLowerCase()}`}>{ticket.priority}</span> {/* Display priority */}
                </td>
                <td>
                  <span className="category">
                    <i className={`icon-${(ticket.category || '').toLowerCase()}`}></i> {/* Display category icon */}
                    {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1).toLowerCase()} {/* Display category */}
                  </span>
                </td>
                <td>{userNames[ticket.assignedTo] || ticket.assignedTo}</td> {/* Display assigned user */}
                <td>
                  <span className={`status ${(ticket.status || '').toLowerCase()}`}>{ticket.status}</span> {/* Display status */}
                </td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td> {/* Display created date */}
                <td>
                  <button className="more-options">...</button> {/* Placeholder for more options */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketListBox;
