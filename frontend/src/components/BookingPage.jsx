import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const { state } = useLocation();
  const { DestinationId, title, location, price, image, loggedInEmail } = state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    loggedInEmail: loggedInEmail || '',
    numberOfPeople: 1,
    specialRequests: '',
    travelDate: '', // Added travel date
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedInEmail) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/user-profile/?email=${loggedInEmail}`);
          if (response.ok) {
            const data = await response.json();
            setFormData((prevData) => ({
              ...prevData,
              name: data.user.Name || '',
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

  if (!DestinationId || !title || !location || !price || !image) {
    return <h2>No details available for the selected tour. Please go back and select again.</h2>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'numberOfPeople' ? parseInt(value, 10) : value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingDetails = {
      DestinationId,
      name: formData.name,
      loggedInEmail: formData.loggedInEmail,
      numTickets: formData.numberOfPeople,
      specialRequests: formData.specialRequests,
      travelDate: formData.travelDate, // Added travel date
    };

    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    navigate('/payment', {
      state: {
        bookingDetails, // Passing bookingDetails object to payment page
        title,
        location,
        price: parseFloat(price),
        image,
        loggedInEmail,
        travelDate: formData.travelDate, // Pass travel date to payment page
        DestinationId,
      },
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="travelDate">Travel Date:</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
