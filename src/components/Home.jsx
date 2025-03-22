import React, { useState, useEffect } from 'react';
import './Home.css';
import TopNavigationBar from './TopNavigationBar';

function Home() {
  // Sample notices data
  const notices = [
    {
      id: 1,
      author: "Admin",
      title: "PhD Viva Voce of Ms. Poonam S. Jaiswal (Biotechnology)",
      day: "Yesterday",
      time: "00:00 PM",
      bookmarked: false,
    },
    {
      id: 2,
      author: "Placement Office",
      title: "Webstaff Co. Ltd: Submission of bio-data for pre-final year students",
      day: "Yesterday",
      time: "00:00 PM",
      bookmarked: false,
    },
    {
      id: 3,
      author: "Admin",
      title: "Appointment of Faculty Coordinator for Cognizance 2019",
      day: "Yesterday",
      time: "00:00 PM",
      bookmarked: false,
    },
    {
      id: 4,
      author: "General Section",
      title: "Sports Preliminary Coaching Camp",
      day: "Sept 17",
      time: "00:00 PM",
      bookmarked: false,
    },
    {
      id: 5,
      author: "Placement Office",
      title: "Advaita18 Update - Event Registration Invitation - Xcelerate, Pinnacle and Sphinxv",
      day: "Sept 17",
      time: "00:00 PM",
      bookmarked: false,
    },
    {
      id: 6,
      author: "Placement Office",
      title: "KLA Tencor (Software Engineer): Submission of bio-data for pre-final year students",
      day: "Sept 17",
      time: "00:00 PM",
      bookmarked: false,
    },
    {
      id: 7,
      author: "Admin",
      title: "Notification (74th Meeting of Senate): Admission of Sponsored candidate(s) for PG Diploma & M Tech programs",
      day: "Sept 17",
      time: "00:00 PM",
      bookmarked: false,
    },
  ];

  // State for search term and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5; // Number of notices per page

  // Filter notices based on search term
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle bookmark toggle (placeholder functionality)
  const toggleBookmark = (id) => {
    console.log(`Toggling bookmark for notice ${id}`);
    // Add logic to update the bookmarked state in the notices array
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
    <div className="home-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Noticeboard Section */}
      <section className="noticeboard">
        {/* Heading */}
        <h2>Notice Board</h2>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
                        📑
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
    </div>
  );
}

export default Home;