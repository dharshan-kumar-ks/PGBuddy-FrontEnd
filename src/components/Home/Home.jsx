import React from 'react';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import NoticeBoard from './MainPage/LeftSideNoticeBoardSection/NoticeBoard';
import Tickets from './MainPage/RightSideTicketsSection/Tickets';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <TopNavigationBar />

      {/* Main content area with a two-column layout */}
      <div className="home-wrapper">
        {/* Left Column: Displays the NoticeBoard section */}
        <div className="left-column">
          <NoticeBoard />
        </div>

        {/* Right Column: Displays the Tickets section */}
        <div className="right-column">
          <Tickets />
        </div>
      </div>
    </div>
  );
}

export default Home;