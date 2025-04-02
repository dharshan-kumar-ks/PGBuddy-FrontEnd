import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import TicketFilterBox from './TicketFilterBox';
import TicketListBox from './TicketListBox'; // Import the new component
import './TicketListFullPage.css';

function TicketListFullPage() {
  const [tickets, setTickets] = useState([]); // State to hold tickets
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priorities: [],
    categories: [],
    statuses: [],
    dateRange: [null, null],
  });

  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userId');

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/tickets/user/${userId}`);
        setTickets(response.data); // Update state with fetched tickets
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (userId) {
      fetchTickets();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="ticket-list-full-page">
      <TopNavigationBar />
      <h1>Tickets</h1>
      <div className="content-wrapper">
        <div className="content-with-filter">
          <div className="left-side">
            <TicketListBox
              tickets={tickets}
              searchQuery={searchQuery}
              filters={filters}
              onSearchChange={setSearchQuery}
            />
          </div>
          <div className="right-side">
            <TicketFilterBox onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketListFullPage;