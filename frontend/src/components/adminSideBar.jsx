import React from 'react'
import { Link } from 'react-router-dom';
import './adminSideBar.css';

const adminSideBar = () => {
  return (
    <div className="admin-dashboard">
        <div id="sidebar" className="sidebar">
            <Link to ="/admin" className="active">🏠 Admin Dashboard</Link>
            <Link to ="#">👥 Manage Users</Link> {/*manageusers page not yet added */}
            <Link to ="/managedestinations">🗺️ Manage Destinations</Link>
            <Link to ="/managetours">📅 Manage Tours</Link>
            <Link to ="/managebookings">📑 Manage Bookings</Link>
            <Link to ="/login" className="logout">🔓 Logout</Link>
        </div>
    </div>
  )
}

export default adminSideBar