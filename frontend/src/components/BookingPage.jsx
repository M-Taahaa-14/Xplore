import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css'; 

const loggedInEmail = localStorage.getItem("userEmail");

const BookingPage = () => {
  const { state } = useLocation(); 
  const { title, location, price, image } = state || {}; 

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', // Default empty name
    loggedInEmail,
    numberOfPeople: 1,
    specialRequests: ''
  });

  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  // Fetch the user's profile using the logged-in email
  useEffect(() => {
    if (loggedInEmail) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/user-profile/?email=${loggedInEmail}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // Update form data with the fetched user's name
            setFormData((prevData) => ({
              ...prevData,
              name: data.user.name || '', // Update name with the fetched name
            }));
            setLoading(false);
          } else {
            setError("Failed to fetch user profile");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("Failed to fetch user profile");
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [loggedInEmail]);

  if (!title || !location || !price || !image) {
    return <h2>No details available for the selected tour. Please go back and select again.</h2>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'numberOfPeople' ? parseInt(value, 10) : value, // Convert to number if field is numberOfPeople
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingDetails = {
      name: formData.name, // Corrected to formData.name
      loggedInEmail: formData.loggedInEmail,
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
        price: parseFloat(price),
        image
      }
    });
  };

  return (
    <div className="booking-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="form-overlay">
        <h2>Booking Details for</h2>
        <div className="tour-info">
          <h3>{title}</h3>
          <p>{location}</p>
          <p>Price: {price} / day</p>
        </div>

        {/* Show loading state or error if necessary */}
        {loading && <p>Loading user profile...</p>}
        {error && <p>{error}</p>}

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
            <label htmlFor="loggedInEmail">Email:</label>
            <input
              type="email"
              id="loggedInEmail"
              name="loggedInEmail"
              value={formData.loggedInEmail}
              onChange={handleInputChange}
              required
              disabled
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
