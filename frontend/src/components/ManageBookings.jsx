import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    User: '',
    Tour: '',
    Departure: '',
    TravelDate: '',
  });

  // Fetch all bookings from the API
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/bookings/');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      alert('Failed to fetch bookings. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle input changes for new booking
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a new booking and refresh data
  const addBooking = async () => {
    const { User, Tour, Departure, TravelDate } = newBooking;

    if (!User || !Tour || !Departure || !TravelDate) {
      alert('All fields are required to add a booking.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/bookings/add/', {
        ...newBooking,
        BookingDate: new Date().toISOString().split('T')[0], // Set the current date
        Status: 'Pending', // Default status
      });
      setNewBooking({ User: '', Tour: '', Departure: '', TravelDate: '' }); // Clear the form
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Error adding booking:', error.message);
      fetchBookings(); // Refresh bookings
      //alert('Failed to add booking. Please check your input and try again.');   //open when isuue resolved
    }
  };

  // Update the status of an existing booking and refresh data
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/bookings/status/${bookingId}/`,
        { Status: newStatus }
      );
      fetchBookings(); // Refresh bookings after status change
    } catch (error) {
      console.error('Error updating booking status:', error.message);
      alert('Failed to update booking status. Please try again later.');
    }
  };

  return (
    <div className="manage-bookings">
      <div className="content">
        <div className="container">
          <h2>Manage Bookings</h2>

          {/* Existing Bookings Section */}
          <div className="grid-section">
            <h3>Existing Bookings</h3>
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Tour</th>
                  <th>Departure</th>
                  <th>Booking Date</th>
                  <th>Travel Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.BookingId}>
                      <td>{booking.BookingId}</td>
                      <td>{booking.User}</td>
                      <td>{booking.Tour}</td>
                      <td>{booking.Departure}</td>
                      <td>{booking.BookingDate}</td>
                      <td>{booking.TravelDate}</td>
                      <td>{booking.Status}</td>
                      <td>
                        {booking.Status === 'Pending' && (
                          <div>
                            <button
                              className="btn"
                              onClick={() => handleStatusChange(booking.BookingId, 'Confirmed')}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn delete"
                              onClick={() => handleStatusChange(booking.BookingId, 'Canceled')}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No bookings available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add New Booking Section */}
          <div className="form-section">
            <h3>Add New Booking</h3>
            <input
              type="text"
              name="User"
              placeholder="Username"
              value={newBooking.User}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="Tour"
              placeholder="Tour Name"
              value={newBooking.Tour}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="Departure"
              placeholder="Departure"
              value={newBooking.Departure}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="TravelDate"
              placeholder="Travel Date"
              value={newBooking.TravelDate}
              onChange={handleInputChange}
            />
            <button className="btn" onClick={addBooking}>
              Add Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
