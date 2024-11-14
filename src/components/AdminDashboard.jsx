import React from 'react';
import './AdminDashboard.css';
import SideBar from './adminSideBar.jsx';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <SideBar />

            <div id="content" className="content">
                <div className="container">
                    <h2>Admin Dashboard</h2>

                    <div className="metrics">
                        <h4>Site Metrics</h4>
                        <div className="metric-cards">
                            <div className="metric-card">
                                <h3>Total Users</h3>
                                <p><span id="TotalUsers">0</span></p>
                            </div>
                            <div className="metric-card">
                                <h3>Total Bookings</h3>
                                <p><span id="TotalBookings">0</span></p>
                            </div>
                            <div className="metric-card">
                                <h3>Total Tours</h3>
                                <p><span id="TotalTours">0</span></p>
                            </div>
                        </div>

                        <div className="metric-cards">
                            <div className="metric-card">
                                <h3>Total Destinations</h3>
                                <p><span id="TotalDestinations">0</span></p>
                            </div>
                            <div className="metric-card">
                                <h3>Total Queries</h3>
                                <p><span id="TotalQueries">0</span></p>
                            </div>
                            <div className="metric-card">
                                <h3>Total Ratings</h3>
                                <p><span id="TotalRatings">0</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
