import React, { useState } from 'react';
import './ManageBookings.css';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([
        { BookingId: 1, UserId: 'User01', TourId: 'Tour01', DepartureId: 'Dep01', BookingDate: '2024-10-01', TravelDate: '2024-12-10', Status: 'Pending' },
        { BookingId: 2, UserId: 'User02', TourId: 'Tour02', DepartureId: 'Dep02', BookingDate: '2024-09-15', TravelDate: '2024-11-20', Status: 'Pending' },
        { BookingId: 3, UserId: 'User03', TourId: 'Tour02', DepartureId: 'Dep02', BookingDate: '2024-09-15', TravelDate: '2024-11-20', Status: 'Pending' },
        { BookingId: 4, UserId: 'User04', TourId: 'Tour02', DepartureId: 'Dep02', BookingDate: '2024-09-15', TravelDate: '2024-11-20', Status: 'Pending' },
        { BookingId: 5, UserId: 'User05', TourId: 'Tour02', DepartureId: 'Dep02', BookingDate: '2024-09-15', TravelDate: '2024-11-20', Status: 'Pending' },
        { BookingId: 6, UserId: 'User06', TourId: 'Tour02', DepartureId: 'Dep02', BookingDate: '2024-09-15', TravelDate: '2024-11-20', Status: 'Pending' },
        { BookingId: 7, UserId: 'User07', TourId: 'Tour02', DepartureId: 'Dep02', BookingDate: '2024-09-15', TravelDate: '2024-11-20', Status: 'Pending' },
    ]);

    const [newBooking, setNewBooking] = useState({
        UserId: '',
        TourId: '',
        DepartureId: '',
        TravelDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBooking((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addBooking = () => {
        if (newBooking.UserId && newBooking.TourId && newBooking.DepartureId && newBooking.TravelDate) {
            const booking = {
                BookingId: bookings.length + 1,
                BookingDate: new Date().toISOString().split('T')[0],
                Status: 'Pending',
                ...newBooking
            };
            setBookings([...bookings, booking]);
            setNewBooking({ UserId: '', TourId: '', DepartureId: '', TravelDate: '' });
        }
    };

    const handleConfirm = (bookingId) => {
        const updatedBookings = bookings.map((booking) =>
            booking.BookingId === bookingId ? { ...booking, Status: 'Confirmed' } : booking
        );
        setBookings(updatedBookings);
    };

    const handleCancel = (bookingId) => {
        const updatedBookings = bookings.map((booking) =>
            booking.BookingId === bookingId ? { ...booking, Status: 'Canceled' } : booking
        );
        setBookings(updatedBookings);
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
                                    <th>User ID</th>
                                    <th>Tour ID</th>
                                    <th>Departure ID</th>
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
                                        <td>{booking.UserId}</td>
                                        <td>{booking.TourId}</td>
                                        <td>{booking.DepartureId}</td>
                                        <td>{booking.BookingDate}</td>
                                        <td>{booking.TravelDate}</td>
                                        <td>{booking.Status}</td>
                                        <td>
                                            <div>
                                                <button className="btn" onClick={() => handleConfirm(booking.BookingId)}>Confirm</button>
                                            </div>
                                            <div>
                                            <button className="btn delete" onClick={() => handleCancel(booking.BookingId)}>Cancel</button>
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
                            name="UserId"
                            placeholder="User ID"
                            value={newBooking.UserId}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="TourId"
                            placeholder="Tour ID"
                            value={newBooking.TourId}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="DepartureId"
                            placeholder="Departure ID"
                            value={newBooking.DepartureId}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="TravelDate"
                            placeholder="Travel Date"
                            value={newBooking.TravelDate}
                            onChange={handleInputChange}
                        />
                        <button className="btn" onClick={addBooking}>Add Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageBookings;
