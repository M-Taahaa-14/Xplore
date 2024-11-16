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

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/bookings/');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addBooking = async () => {
    if (newBooking.User && newBooking.Tour && newBooking.Departure && newBooking.TravelDate) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/bookings/add/', {
          ...newBooking,
          BookingDate: new Date().toISOString().split('T')[0],
          Status: 'Pending',
        });
        setBookings([...bookings, response.data]);
        setNewBooking({ User: '', Tour: '', Departure: '', TravelDate: '' });
      } catch (error) {
        console.error('Error adding booking:', error);
      }
    } else {
      alert("All fields are required to add a booking.");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const booking = bookings.find((b) => b.BookingId === bookingId);
      const response = await axios.patch(`http://127.0.0.1:8000/api/bookings/status/`, {
        ...booking,
        Status: newStatus,
      });
      setBookings(bookings.map((b) => (b.BookingId === bookingId ? response.data : b)));
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div className="manage-bookings">
      <div className="content">
        <div className="container">
          <h2>Manage Bookings</h2>

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
                {bookings.map((booking) => (
                  <tr key={booking.BookingId}>
                    <td>{booking.BookingId}</td>
                    <td>{booking.User}</td>
                    <td>{booking.Tour}</td>
                    <td>{booking.Departure}</td>
                    <td>{booking.BookingDate}</td>
                    <td>{booking.TravelDate}</td>
                    <td>{booking.Status}</td>
                    <td>
                      <div>
                        {booking.Status === 'Pending' && (
                          <>
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
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="form-section">
            <h3>Add New Booking</h3>
            <input
              type="text"
              name="User"
              placeholder="User"
              value={newBooking.User}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="Tour"
              placeholder="Tour"
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
