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
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input
  const [filters, setFilters] = useState({
    priorities: [], // Filter by priorities
    categories: [], // Filter by categories
    statuses: [], // Filter by statuses
    dateRange: [null, null], // Filter by date range
  });

  // Retrieve userId and userRole from localStorage
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole'); // Determine if the user is an admin or regular user
  const NavigationBar = userRole === 'ADMIN' ? AdminTopNavigationBar : TopNavigationBar; // Use appropriate navigation bar

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      try {
        // Determine the API endpoint based on user role
        const endpoint = userRole === 'ADMIN'
          ? `${import.meta.env.VITE_BACKEND_URL}/api/tickets/all` // Admin fetches all tickets
          : `${import.meta.env.VITE_BACKEND_URL}/api/tickets/user/${userId}`; // Regular user fetches their tickets

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });

        console.log('Response for tickets:', response.data); // Debug log
        setTickets(response.data); // Update state with fetched tickets
      } catch (error) {
        console.error('Error fetching tickets:', error); // Log error if API call fails
      }
    };

    if (userId) {
      fetchTickets(); // Fetch tickets if userId is available
    } else {
      console.error('User ID not found in localStorage'); // Log error if userId is missing
    }
  }, [userId]); // Re-run effect if userId changes

  // Handle filter changes from the TicketFilterBox
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update filters state
  };

  const location = useLocation(); // Get current location (if needed for additional logic)

  return (
    <div className="ticket-list-full-page">
      {/* Render appropriate navigation bar based on user role */}
      <NavigationBar />
      <h1>Tickets</h1>
      <div className="content-wrapper">
        <div className="content-with-filter">
          {/* Left side: Ticket list */}
          <div className="left-side">
            <TicketListBox
              tickets={tickets} // Pass tickets to TicketListBox
              searchQuery={searchQuery} // Pass search query
              filters={filters} // Pass filters
              onSearchChange={setSearchQuery} // Handle search input changes
            />
          </div>
          {/* Right side: Filter box */}
          <div className="right-side">
            <TicketFilterBox onFilterChange={handleFilterChange} /> {/* Handle filter changes */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketListFullPage;