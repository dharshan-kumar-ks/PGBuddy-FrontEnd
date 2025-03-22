import React from 'react';
import './Food.css';
import TopNavigationBar from './TopNavigationBar';

function Home() {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      <TopNavigationBar />
      <div>Home Page</div>
    </div>
  ); 
}

export default Home;