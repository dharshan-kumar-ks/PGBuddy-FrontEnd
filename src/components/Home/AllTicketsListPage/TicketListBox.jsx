import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './TicketListBox.css';

function TicketListBox({ tickets, searchQuery, filters, onSearchChange }) {
  const navigate = useNavigate(); // Define navigate using useNavigate

  // Filter tickets based on search query and filters
  const filteredTickets = tickets.filter((ticket) => {
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
              {/*<th><input type="checkbox" /></th>*/}
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
              <tr
              key={ticket.id}
              onClick={() => handleTicketClick(ticket)}
              style={{ cursor: 'pointer' }}>
                {/*<td><input type="checkbox" /></td>*/}
                <td>#{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>
                  <span className={`priority ${(ticket.priority || '').toLowerCase()}`}> {/* Ensure priority is not undefined */}
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <span className="category">
                    <i className={`icon-${(ticket.category || '').toLowerCase()}`}></i> {/* Ensure category is not undefined */}
                    {ticket.category}
                  </span>
                </td>
                <td>{ticket.assignedTo}</td>
                <td>
                  <span className={`status ${(ticket.status || '').toLowerCase()}`}> {/* Ensure status is not undefined */}
                    {ticket.status}
                  </span>
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
