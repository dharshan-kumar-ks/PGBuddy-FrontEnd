import React from 'react';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import NoticeBoard from './MainPage/LeftSideNoticeBoardSection/NoticeBoard';
import Tickets from './MainPage/RightSideTicketsSection/Tickets';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Two-Column Layout */}
      <div className="home-wrapper">
        {/* Left Column: NoticeBoard */}
        <div className="left-column">
          <NoticeBoard />
        </div>

        {/* Right Column: Tickets */}
        <div className="right-column">
         {/* <Tickets /> */}
         <Tickets />
        </div>
      </div>
    </div>
  );
}

export default Home;