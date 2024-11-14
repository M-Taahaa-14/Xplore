import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingPage.css'; 

const BookingPage = () => {
  const { state } = useLocation(); 
  const { title, location, price, image } = state || {}; 

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    numberOfPeople: 1,
    specialRequests: ''
  });

  if (!title || !location || !price || !image) {
    return <h2>No details available for the selected tour. Please go back and select again.</h2>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingDetails = {
      name: formData.name,
      email: formData.email,
      numTickets: formData.numberOfPeople,
      specialRequests: formData.specialRequests
    };

    // Store booking details in sessionStorage
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // Navigate to the payment page and pass data
    navigate('/payment', {
      state: {
        title,
        location,
        price,
        image
      }
    });
  };

  return (
    <div className="booking-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="form-overlay">
        <h1>Booking Details for {title}</h1>
        <div className="tour-info">
          <h2>{title}</h2>
          <p>{location}</p>
          <p>Price: {price} / day</p>
        </div>

        <form onSubmit={handleBooking} className="booking-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfPeople">Number of People:</label>
            <input
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialRequests">Special Requests:</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
