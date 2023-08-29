import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/Mock.css';

function Mock() {
  const { step } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleNext = () => {
    // Implement logic to handle next step if needed
  };

  return (
    <div className="mock-container">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="hamburger-icon" onClick={handleToggleSidebar}>
          <div className={`bar ${sidebarOpen ? 'open' : ''}`} />
          <div className={`bar ${sidebarOpen ? 'open' : ''}`} />
          <div className={`bar ${sidebarOpen ? 'open' : ''}`} />
        </div>
        <ul className="menu">
          <li><Link to="/mock/audio" onClick={handleSidebarClose}>Audio/Video</Link></li>
          <li><Link to="/mock/step1" onClick={handleSidebarClose}>Resume</Link></li>
          <li><Link to="/" onClick={handleSidebarClose}>Logout</Link></li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome to this page</h1>
      </div>
    </div>
  );
}

export default Mock;
