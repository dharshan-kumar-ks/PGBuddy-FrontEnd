import React, { useState } from 'react';
import TopNavigationBar from '../../../Navigation/TopNavigationBar';
import TicketFilterBox from './TicketFilterBox';
import TicketListBox from './TicketListBox'; // Import the new component
import './TicketListFullPage.css';

function TicketListFullPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priorities: [],
    categories: [],
    statuses: [],
    dateRange: [null, null],
  });

  // Sample ticket data (you can replace this with API data)
  const tickets = [
    { id: 'TC-192', title: 'Help, I order wrong product...', priority: 'High', category: 'Incident', assignedTo: 'Santi Caroza', status: 'Pending', requestDate: '07/11/2023, 06:25AM' },
    { id: 'TC-191', title: 'My Suggestion for this product', priority: 'Low', category: 'Suggestion', assignedTo: 'Fast Response', status: 'Resolved', requestDate: '06/11/2023, 11:47PM' },
    { id: 'TC-190', title: 'Can I use the TV in bathroom?', priority: 'Medium', category: 'Question', assignedTo: 'Arlene McCoy', status: 'Pending', requestDate: '06/11/2023, 05:31AM' },
    { id: 'TC-189', title: 'Your offline store is dirty', priority: 'Low', category: 'Suggestion', assignedTo: 'Darlene Robertson', status: 'Resolved', requestDate: '05/11/2023, 09:05PM' },
    { id: 'TC-188', title: 'Can I get the free battery for...', priority: 'Low', category: 'Question', assignedTo: 'Jerome Bell', status: 'Pending', requestDate: '04/11/2023, 02:30PM' },
    { id: 'TC-187', title: "I can't move this stroller, it's...", priority: 'Medium', category: 'Problem', assignedTo: 'Cody Fisher', status: 'Pending', requestDate: '04/11/2023, 11:28AM' },
    { id: 'TC-186', title: 'Help! My Package is lost', priority: 'Low', category: 'Incident', assignedTo: 'Courtney Henry', status: 'Resolved', requestDate: '03/11/2023, 10:10AM' },
    { id: 'TC-185', title: 'This remote TV is broken, can...', priority: 'Medium', category: 'Problem', assignedTo: 'Leslie Alexander', status: 'Pending', requestDate: '31/10/2023, 04:13PM' },
  ];

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