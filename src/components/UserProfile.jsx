import React, { useEffect, useState } from "react";
import "./UserProfile.css"; // Create a CSS file for styling.

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchUserBookings();
    fetchUserWishlist();
  }, []);

  const fetchUserProfile = async () => {
    // Mock API call. Replace with real API endpoint.
    const response = await fetch("/api/user-profile");
    const data = await response.json();
    setUserProfile(data);
  };

  const fetchUserBookings = async () => {
    // Mock API call. Replace with real API endpoint.
    const response = await fetch("/api/bookings");
    const data = await response.json();
    setBookings(data);
  };

  const fetchUserWishlist = async () => {
    // Mock API call. Replace with real API endpoint.
    const response = await fetch("/api/wishlist");
    const data = await response.json();
    setWishlist(data);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="sidebar">
        <a href="Admin" className="active">🏠 Admin Dashboard</a>
        <a href="#">👥 Manage Users</a>
        <a href="ManageDestinations">🗺️ Manage Destinations</a>
        <a href="ManageTours">📅 Manage Tours</a>
        <a href="ManageBookings">📑 Manage Bookings</a>
        <a href="login.jsx" className="logout">🔓 Logout</a>
      </div>
      <div className="container">

        <h2>User Dashboard</h2>

        <section className="profile">
          <h3>Profile</h3>
          <p>Full Name: {userProfile.fullName}</p>
          <p>Email: {userProfile.email}</p>
          <p>Date of Birth: {userProfile.dob}</p>
          <p>Age: {userProfile.age}</p>
          <p>Phone Number: {userProfile.phoneNumber}</p>
          <p>Gender: {userProfile.gender}</p>
          <button className="btn" onClick={() => alert('Edit Profile Clicked')}>Edit Profile</button>
        </section>

        <section className="bookings">
          <h3>Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Tour Name</th>
                  <th>Departure City</th>
                  <th>Booking Date</th>
                  <th>Booking Status</th>
                  <th>Travel Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.tourName}</td>
                    <td>{booking.departureCity}</td>
                    <td>{booking.bookingDate}</td>
                    <td>{booking.status}</td>
                    <td>{booking.travelDate}</td>
                    <td><button onClick={() => alert('Give Review')}>Give Review</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="wishlist">
          <h3>Wishlist</h3>
          {wishlist.length === 0 ? (
            <p>No wishlist items found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.region}</td>
                    <td>{item.location}</td>
                    <td>
                      <button onClick={() => alert('Booking Item')}>Book</button>
                      <button onClick={() => alert('Remove Item')}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
