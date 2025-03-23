import React from 'react';
import ActiveTickets from './ActiveTickets';
import CreateTicket from './CreateTicket';
import './Tickets.css';

function Tickets() {
  return (
    <section className="tickets">
      <h2>Tickets</h2>
      <ActiveTickets />
      <CreateTicket />
    </section>
  );
}

export default Tickets;