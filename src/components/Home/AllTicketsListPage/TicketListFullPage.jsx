import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import TicketFilterBox from './TicketFilterBox';
import TicketListBox from './TicketListBox'; // Import the new component
import './TicketListFullPage.css';
import AdminTopNavigationBar from '../../AdminPages/AdminNavigation/AdminTopNavigationBar';
import { useLocation } from 'react-router-dom';

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
  const userRole = localStorage.getItem('userRole'); // Retrieve user role from localStorage
  const NavigationBar = userRole === 'ADMIN' ? AdminTopNavigationBar : TopNavigationBar;

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      try {
        const endpoint = userRole === 'ADMIN'
          ? 'http://localhost:8081/api/tickets/all'
          : `http://localhost:8081/api/tickets/user/${userId}`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });

        console.log('Response for tickets:', response.data); // Debug log
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

  const location = useLocation();

  return (
    <div className="ticket-list-full-page">
      <NavigationBar />
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