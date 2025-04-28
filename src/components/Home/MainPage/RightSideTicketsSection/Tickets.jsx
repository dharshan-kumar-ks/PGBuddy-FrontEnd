import React from 'react';
import ActiveTickets from './ActiveTickets'; // Component to display active tickets
import CreateTicket from './CreateTicket'; // Component to create a new ticket
import './Tickets.css';

function Tickets() {
  return (
    <section className="tickets">
      {/* Section heading */}
      <h2>Tickets</h2>

      {/* Display the most recent active ticket */}
      <ActiveTickets />

      {/* Display the ticket creation options */}
      <CreateTicket />
    </section>
  );
}

export default Tickets;