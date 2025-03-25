import React from 'react';
import './TicketListBox.css';

function TicketListBox({ tickets, searchQuery, filters, onSearchChange }) {
  // Filter tickets based on search query and filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      filters.priorities.length === 0 || filters.priorities.includes(ticket.priority);

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(ticket.category);

    const matchesStatus =
      filters.statuses.length === 0 || filters.statuses.includes(ticket.status);

    const ticketDate = new Date(
      ticket.requestDate.split(',')[0].split('/').reverse().join('-') + ' ' + ticket.requestDate.split(',')[1]
    );
    const matchesDate =
      !filters.dateRange[0] ||
      !filters.dateRange[1] ||
      (ticketDate >= filters.dateRange[0] && ticketDate <= filters.dateRange[1]);

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus && matchesDate;
  });

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
              <th>
                <input type="checkbox" />
              </th>
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
              <tr key={ticket.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>#{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>
                  <span className={`priority ${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <span className="category">
                    <i className={`icon-${ticket.category.toLowerCase()}`}></i>
                    {ticket.category}
                  </span>
                </td>
                <td>{ticket.assignedTo}</td>
                <td>
                  <span className={`status ${ticket.status.toLowerCase()}`}>
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
