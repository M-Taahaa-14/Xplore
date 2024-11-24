import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    UserEmail: '',
    DestinationId: '',
    Departure: '',
    TravelDate: '',
    Tickets: 1, // Default number of tickets is 1
    PricePerHead: 0, // New field for price per head
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
    const { UserEmail, DestinationId, Departure, TravelDate, Tickets, PricePerHead } = newBooking;

    if (!UserEmail || !DestinationId || !Departure || !TravelDate || !Tickets || !PricePerHead) {
      alert('All fields are required to add a booking.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/bookings/add/', {
        ...newBooking,
        BookingDate: new Date().toISOString().split('T')[0], // Set the current date
        Status: 'Pending', // Default status
      });
      setNewBooking({ UserEmail: '', DestinationId: '', Departure: '', TravelDate: '', Tickets: 1, PricePerHead: 0 }); // Clear the form
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Error adding booking:', error.message);
      fetchBookings(); // Refresh bookings
      //alert('Failed to add booking. Please check your input and try again.'); // Uncomment when issue is resolved
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
                  <th>User Email</th>
                  <th>Destination ID</th>
                  <th>Destination City</th>
                  <th>Booking Date</th>
                  <th>Travel Date</th>
                  <th>Tickets</th>
                  <th>Price Per Head</th> {/* Display Price per head */}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.BookingId}>
                      <td>{booking.BookingId}</td>
                      <td>{booking.UserEmail}</td>
                      <td>{booking.DestinationId}</td>
                      <td>{booking.Departure}</td>
                      <td>{booking.BookingDate}</td>
                      <td>{booking.TravelDate}</td>
                      <td>{booking.Tickets}</td> {/* Display Tickets */}
                      <td>{booking.Price}</td> {/* Display Price Per Head */}
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
                    <td colSpan="10">No bookings available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add New Booking Section */}
          <div className="form-section">
            <h3>Add New Booking</h3>
            <input
              type="email"
              name="UserEmail"
              placeholder="User Email"
              value={newBooking.UserEmail}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="DestinationId"
              placeholder="Destination ID"
              value={newBooking.DestinationId}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="Departure"
              placeholder="Destination City"
              value={newBooking.Departure}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="TravelDate"
              value={newBooking.TravelDate}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="Tickets"
              placeholder="Number of Tickets"
              value={newBooking.Tickets}
              onChange={handleInputChange}
              min="1"
            />
            <input
              type="number"
              name="PricePerHead"
              placeholder="Price Per Head"
              value={newBooking.PricePerHead}
              onChange={handleInputChange}
              min="0"
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
