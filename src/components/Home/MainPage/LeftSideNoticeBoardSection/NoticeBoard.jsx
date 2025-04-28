import React, { useState, useEffect } from 'react';
import './NoticeBoard.css';
import axios from 'axios'; // Import axios for API calls

function NoticeBoard() {
/*
  const [notices, setNotices] = useState([
    { id: 1, author: "PG Incharge", title: "Dinner Menu Update: Special Paneer Dish Added Tonight", day: "Today", time: "08:00 AM", bookmarked: false },
    { id: 2, author: "PG Incharge", title: "Hot Water Supply Interruption: 9 AM - 11 AM", day: "Today", time: "07:30 AM", bookmarked: false },
    { id: 3, author: "PG Incharge", title: "Room Cleaning Schedule: 2nd Floor Cleaning at 3 PM", day: "Tomorrow", time: "10:00 AM", bookmarked: false },
    { id: 4, author: "PG Incharge", title: "Laundry Service Delay: Collection at 6 PM Instead of 5 PM", day: "Sept 18", time: "12:00 PM", bookmarked: false },
    { id: 5, author: "PG Incharge", title: "WiFi Maintenance: Network Downtime from 2 AM - 4 AM", day: "Sept 17", time: "09:00 PM", bookmarked: false },
  ]);
  */

  // State to hold notices fetched from the backend
  const [notices, setNotices] = useState([]);

  // State for search term and pagination
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering notices
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const noticesPerPage = 7; // Number of notices to display per page

  // State to toggle filter mode (bookmarked notices only)
  const [filterBookmarked, setFilterBookmarked] = useState(false);

  // Fetch notices from the backend API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notices`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
        // console.log('API Response:', response.data); // Debug log to check API response
        const formattedNotices = response.data.map((notice) => ({
          id: notice.id,
          author: notice.authorName, // Author of the notice
          title: notice.title, // Title of the notice
          day: notice.createdAtDay, // Day of creation
          time: notice.createdAtTime, // Time of creation
          bookmarked: notice.bookmarked, // Bookmark status
        }));

        setNotices(formattedNotices); // Update state with formatted notices
      } catch (error) {
        console.error('Error fetching notices:', error); // Log error if API call fails
      }
    };

    fetchNotices(); // Fetch notices on component mount
  }, []);

  // Filter notices based on search term and bookmarked state
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Match search term with title
      notice.author.toLowerCase().includes(searchTerm.toLowerCase()); // Match search term with author
    const matchesFilter = !filterBookmarked || notice.bookmarked; // Match bookmarked filter
    return matchesSearch && matchesFilter;
  });

  // Calculate total pages based on filtered notices
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  // Scroll to top whenever the currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Reset to the first page when the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate the notices to display on the current page
  const startIndex = (currentPage - 1) * noticesPerPage;
  const endIndex = startIndex + noticesPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  // Handle bookmark toggle
  const toggleBookmark = async (id) => {
    try {
      const noticeToToggle = notices.find((notice) => notice.id === id); // Find the notice to toggle
      if (!noticeToToggle) {
        console.warn(`Notice with id ${id} not found.`);
        return;
      }

      const newBookmarkedStatus = !noticeToToggle.bookmarked; // Toggle bookmark status
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Send POST request to update bookmark status
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notices/${id}/bookmark`,
        newBookmarkedStatus,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );

      // Update the state to reflect the change
      const updatedNotices = notices.map((notice) =>
        notice.id === id ? { ...notice, bookmarked: newBookmarkedStatus } : notice
      );
      setNotices(updatedNotices); // Update notices state
    } catch (error) {
      console.error('Error updating bookmark status:', error); // Log error if API call fails
    }
  };

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update current page state
  };

  // Generate pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtonsBeforeEllipsis = 4; // Show first 4 pages before ellipsis

    // Add first few pages (e.g., 1, 2, 3, 4)
    for (let i = 1; i <= Math.min(maxButtonsBeforeEllipsis, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis if there are more pages before the last two
    if (totalPages > maxButtonsBeforeEllipsis + 2) {
      buttons.push(<span key="ellipsis-1" className="ellipsis">...</span>);
    }

    // Add last two pages if they are not already included
    if (totalPages > maxButtonsBeforeEllipsis) {
      for (let i = Math.max(maxButtonsBeforeEllipsis + 1, totalPages - 1); i <= totalPages; i++) {
        if (!buttons.some((button) => button.key === i.toString())) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </button>
          );
        }
      }
    }

    return buttons;
  };

  return (
    <section className="noticeboard">
      {/* Heading */}
      <h2>Notice Board</h2>

      {/* Search Bar and Filter Button */}
      <div className="search-bar-container">
        <button
          className="filter-button"
          onClick={() => setFilterBookmarked(!filterBookmarked)} // Toggle bookmarked filter
        >
          {filterBookmarked ? "Show All" : "Filter"} {/* Toggle button text */}
        </button>
        <div className="search-bar-wrapper">
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={handleSearchChange} // Update search term
          />
        </div>
      </div>

      {/* Notice List Box */}
      <div className="notice-box">
        {filteredNotices.length === 0 ? (
          <p className="no-results">No notices found.</p> // Display message if no notices match
        ) : (
          <table className="notice-table">
            <tbody>
              {currentNotices.map((notice) => (
                <tr key={notice.id} className="notice-item">
                  <td className="bookmark-column">
                    <span
                      className={`bookmark-icon ${notice.bookmarked ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(notice.id)} // Toggle bookmark
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill={notice.bookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4v16l6-6 6 6V4z" />
                      </svg>
                    </span>
                  </td>
                  <td className="author-column">{notice.author}</td> {/* Display author */}
                  <td className="title-column">
                    <a href="#" className="notice-title">
                      {notice.title} {/* Display title */}
                    </a>
                  </td>
                  <td className="day-column">{notice.day}</td> {/* Display day */}
                  <td className="time-column">{notice.time}</td> {/* Display time */}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {filteredNotices.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)} // Go to previous page
              disabled={currentPage === 1} // Disable if on the first page
            >
              &lt;
            </button>
            {getPaginationButtons()} {/* Render pagination buttons */}
            <button
              onClick={() => handlePageChange(currentPage + 1)} // Go to next page
              disabled={currentPage === totalPages} // Disable if on the last page
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default NoticeBoard;