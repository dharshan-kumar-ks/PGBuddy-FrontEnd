import React from 'react';
import TopNavigationBar from '../TopNavigationBar';
import NoticeBoard from './NoticeBoard';
import Tickets from './Tickets';
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