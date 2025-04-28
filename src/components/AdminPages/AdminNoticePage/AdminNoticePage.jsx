import React from 'react';
import AdminTopNavigationBar from '../AdminNavigation/AdminTopNavigationBar';
import NoticeBoard from '../../Home/MainPage/LeftSideNoticeBoardSection/NoticeBoard';
import PostBox from './PostBox.jsx';
import './AdminNoticePage.css';

// Renders the AdminNoticePage component to display notices and post management for admins.
// Takes no input and returns a JSX element representing the admin notice page.
function AdminNoticePage() {
  return (
    <div className="home-container">
      {/* Render the top navigation bar for admin. */}
      <AdminTopNavigationBar />

      {/* Two-column layout for notices and post management. */}
      <div className="home-wrapper">
        {/* Left column: Notice board section. */}
        <div className="left-column">
          <NoticeBoard />
        </div>

        {/* Right column: Post management section. */}
        <div className="right-column">
          <PostBox />
        </div>
      </div>
    </div>
  );
}

export default AdminNoticePage;