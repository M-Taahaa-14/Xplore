import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkedAlt, FaComments, FaUser, FaQuestionCircle, FaInfoCircle, FaStar, FaSun, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Track sidebar state (open or minimized)

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Clear user session from localStorage
    sessionStorage.clear(); // Optionally clear sessionStorage if you're using it
    document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear cookies, if needed
    window.location.href = '/login'; // Redirect to login page
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '<' : '>'}
      </div>
      <div className="sidebar-links">
        <Link to="/home" className="sidebar-link">
          <FaHome /> {isOpen && 'Home'}
        </Link>
        <Link to="/tours" className="sidebar-link">
          <FaMapMarkedAlt /> {isOpen && 'Tours'}
        </Link>
        <Link to="/chat" className="sidebar-link">
          <FaComments /> {isOpen && 'Chatroom'}
        </Link>
        <Link to="/userprofile" className="sidebar-link">
          <FaUser /> {isOpen && 'User Profile'}
        </Link>
        <Link to="/faqs" className="sidebar-link">
          <FaQuestionCircle /> {isOpen && 'FAQs'}
        </Link>
        <Link to="/aboutus" className="sidebar-link">
          <FaInfoCircle /> {isOpen && 'About Us'}
        </Link>
        <Link to="/feedback" className="sidebar-link">
          <FaStar /> {isOpen && 'Feedback'}
        </Link>
        <Link to="/tourguide" className="sidebar-link">
          <FaMapMarkedAlt /> {isOpen && 'Tour Guides'}
        </Link>
        <Link to="/weather" className="sidebar-link">
          <FaSun /> {isOpen && 'Weather'}
        </Link>
      </div>
      <div className="sidebar-footer">
      <Link to="/logout" className="sidebar-link" onClick={handleLogout}>
      <FaSignOutAlt /> {isOpen && 'Logout'}
    </Link>
      </div>
    </div>
  );
};

export default Sidebar;
