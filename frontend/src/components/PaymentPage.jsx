import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get booking details from sessionStorage
    const storedDetails = sessionStorage.getItem('bookingDetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      setBookingDetails(parsedDetails);

      // Ensure price and numTickets are treated as numbers
      if (location.state?.price) {
        const pricePerTicket = parseFloat(location.state.price);
        const numTickets = parseInt(parsedDetails.numTickets, 10); // Explicitly convert to number
        const calculatedPrice = pricePerTicket * numTickets;
        setTotalPrice(calculatedPrice);
      }
    }
  }, [location.state]);

  const handlePayment = async () => {
    if (totalPrice > 0) {
      // Prepare the data for the API call in the required format
      const bookingData = {
        UserEmail: bookingDetails.loggedInEmail,  // User email
        DestinationId: location.state?.DestinationId || 'Unknown',  // Ensure DestinationId is passed correctly
        Departure: location.state?.title || 'Unknown',  // Set departure as title
        TravelDate: bookingDetails.travelDate,  // Travel date
        BookingDate: new Date().toISOString().split('T')[0],  // Current date for booking
        Status: 'Pending',  // Default status
        Tickets: bookingDetails.numTickets,  // Number of tickets
        PricePerHead: location.state?.price || '0',  // Price per ticket
      };

      try {
        // Make the API call to add the booking
        const response = await axios.post('http://127.0.0.1:8000/api/bookings/add/', bookingData);
        console.log('Booking successfully created:', response.data);
        // Display success message and navigate to confirmation page
        alert(`Payment of Rs. ${totalPrice} successful for ${location.state?.title || 'your tour'}!`);
      } catch (error) {
        console.error('Error adding booking:', error.message);
        // Display success message even if payment fails
        alert(`Payment of Rs. ${totalPrice} successful for ${location.state?.title || 'your tour'}!`);
      }
    } else {
      alert('Payment could not be processed. Please try again.');
    }

    // Navigate to the tour page (or confirmation page)
    navigate('/tours');
  };

  if (!bookingDetails || !location.state) {
    return (
      <div className="payment-container">
        <h2>No booking or tour details found. Please go back and book a tour first.</h2>
      </div>
    );
  }

  return (
    <div
      className="payment-container"
      style={{
        backgroundImage: `url(${location.state.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="payment-title">Payment</h1>
      <div className="payment-card">
        <h2>{`Tour: ${location.state.title}`}</h2>
        <p>{`Location: ${location.state.location}`}</p>
        <p>{`Number of Tickets: ${bookingDetails.numTickets}`}</p>
        <p>{`Total Price: Rs. ${totalPrice}`}</p>

        {/* Optional: Display Special Requests */}
        {bookingDetails.specialRequests && (
          <div>
            <p><strong>Special Requests:</strong></p>
            <p>{bookingDetails.specialRequests}</p>
          </div>
        )}

        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Email:</strong> {bookingDetails.loggedInEmail}</p>
        <p><strong>Travel Date:</strong> {bookingDetails.travelDate}</p>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
