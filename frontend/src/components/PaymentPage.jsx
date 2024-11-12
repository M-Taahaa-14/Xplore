import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('bookingDetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      setBookingDetails(parsedDetails);

      if (location.state?.price) {
        const calculatedPrice = location.state.price * parsedDetails.numTickets;
        setTotalPrice(calculatedPrice);
      }
    }
  }, [location.state]);

  const handlePayment = () => {
    if (totalPrice > 0) {
      alert(`Payment of $${totalPrice} successful for ${location.state?.title || 'your tour'}!`);
      navigate('/confirmation');
    } else {
      alert('Payment could not be processed. Please try again.');
    }
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
        <p>{`Number of Tickets: ${bookingDetails.numTickets}`}</p>
        <p>{`Total Price: $${totalPrice}`}</p>
        <button className="pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
