import React from 'react';
import AdminTopNavigationBar from '../AdminNavigation/AdminTopNavigationBar';
import NoticeBoard from '../../Home/MainPage/LeftSideNoticeBoardSection/NoticeBoard';
import PostBox from './PostBox.jsx';
import './AdminNoticePage.css';

function AdminNoticePage() {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      <AdminTopNavigationBar />

      {/* Two-Column Layout */}
      <div className="home-wrapper">
        {/* Left Column: NoticeBoard */}
        <div className="left-column">
          <NoticeBoard />
        </div>

        {/* Right Column: Tickets */}
        <div className="right-column">
          <PostBox />
        </div>
      </div>
    </div>
  );
}

export default AdminNoticePage;