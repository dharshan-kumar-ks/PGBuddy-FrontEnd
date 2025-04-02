import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './TicketListBox.css';

function TicketListBox({ tickets, searchQuery, filters, onSearchChange }) {
  const navigate = useNavigate(); // Define navigate using useNavigate
  const [userNames, setUserNames] = useState({}); // State to store user names

  useEffect(() => {
    const fetchUserNames = async () => {
      const uniqueUserIds = [...new Set(tickets.map((ticket) => ticket.assignedTo))]; // Get unique user IDs
      const userNameMap = {};

      for (const userId of uniqueUserIds) {
        if (userId) {
          try {
            console.log(`Fetching user name for userId: ${userId}`); // Debug log
            const response = await axios.get(`http://localhost:8081/api/users/${userId}`); // Changed POST to GET
            console.log(`Response for userId ${userId}:`, response.data); // Debug log
            userNameMap[userId] = response.data.name || response.data.email || 'Unknown User'; // Fallback to email or placeholder if name is null
          } catch (error) {
            console.error(`Error fetching user name for userId ${userId}:`, error);
          }
        }
      }

      console.log('Final userNameMap:', userNameMap); // Debug log
      setUserNames(userNameMap); // Update state with user names
    };

    fetchUserNames();
  }, [tickets]);

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
      priority: priorityMapping[ticket.priority] || ticket.priority, // Map priority to match filter box
      status: statusMapping[ticket.status] || ticket.status, // Map status to match filter box
    }))
    .filter((ticket) => {
      const matchesSearch =
        String(ticket.id).toLowerCase().includes(searchQuery.toLowerCase()) || // Convert ticket.id to string
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ticket.assignedTo && String(ticket.assignedTo).toLowerCase().includes(searchQuery.toLowerCase())); // Handle assignedTo being null or undefined

      const matchesPriority =
        filters.priorities.length === 0 || filters.priorities.includes(ticket.priority);

      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(ticket.category);

      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(ticket.status);

      const ticketDate = ticket.requestDate
        ? new Date(
            ticket.requestDate.split(',')[0].split('/').reverse().join('-') + ' ' + ticket.requestDate.split(',')[1]
          )
        : null; // Handle missing or undefined requestDate

      const matchesDate =
        !filters.dateRange[0] ||
        !filters.dateRange[1] ||
        (ticketDate && ticketDate >= filters.dateRange[0] && ticketDate <= filters.dateRange[1]);

      return matchesSearch && matchesPriority && matchesCategory && matchesStatus && matchesDate;
    });

  const handleTicketClick = (ticket) => {
    navigate(`/ticket/${ticket.id}`, { state: { ticket } });
  };

  return (
    <div className="ticket-list-box">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
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
              <th>Request Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} onClick={() => handleTicketClick(ticket)} style={{ cursor: 'pointer' }}>
                <td>#{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>
                  <span className={`priority ${(ticket.priority || '').toLowerCase()}`}>{ticket.priority}</span>
                </td>
                <td>
                  <span className="category">
                    <i className={`icon-${(ticket.category || '').toLowerCase()}`}></i>
                    {ticket.category}
                  </span>
                </td>
                <td>{userNames[ticket.assignedTo] || ticket.assignedTo}</td>
                <td>
                  <span className={`status ${(ticket.status || '').toLowerCase()}`}>{ticket.status}</span>
                </td>
                <td>{ticket.requestDate}</td>
                <td>
                  <button className="more-options">...</button>
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
