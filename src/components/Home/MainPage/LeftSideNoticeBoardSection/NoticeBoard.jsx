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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 7; // Ensure this is set to 7

  // State to toggle filter mode
  const [filterBookmarked, setFilterBookmarked] = useState(false);

  // Fetch notices from the backend API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/notices');
        // console.log('API Response:', response.data); // Debug log to check API response
        const formattedNotices = response.data.map((notice) => ({
          id: notice.id,
          author: notice.authorName,
          title: notice.title,
          day: notice.createdAtDay,
          time: notice.createdAtTime,
          bookmarked: notice.bookmarked,
        }));
        // console.log('Formatted Notices:', formattedNotices); // Debug log to check formatted data
        setNotices(formattedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  // Filter notices based on search term and bookmarked state
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterBookmarked || notice.bookmarked;
    return matchesSearch && matchesFilter;
  });

  // Calculate total pages based on filtered notices
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  // Scroll to top whenever the currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate the notices to display on the current page
  const startIndex = (currentPage - 1) * noticesPerPage;
  const endIndex = startIndex + noticesPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle bookmark toggle (placeholder functionality)
  const toggleBookmark = (id) => {
    const updatedNotices = notices.map((notice) =>
      notice.id === id ? { ...notice, bookmarked: !notice.bookmarked } : notice
    );
    setNotices(updatedNotices); // Update state to trigger re-render
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          onClick={() => setFilterBookmarked(!filterBookmarked)}
        >
          {filterBookmarked ? "Show All" : "Filter"}
        </button>
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-bar"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Notice List Box */}
      <div className="notice-box">
        {filteredNotices.length === 0 ? (
          <p className="no-results">No notices found.</p>
        ) : (
          <table className="notice-table">
            <tbody>
              {currentNotices.map((notice) => (
                <tr key={notice.id} className="notice-item">
                  <td className="bookmark-column">
                    <span
                      className={`bookmark-icon ${notice.bookmarked ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(notice.id)}
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
                  <td className="author-column">{notice.author}</td>
                  <td className="title-column">
                    <a href="#" className="notice-title">
                      {notice.title}
                    </a>
                  </td>
                  <td className="day-column">{notice.day}</td>
                  <td className="time-column">{notice.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination (only show if there are notices) */}
        {filteredNotices.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getPaginationButtons()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
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