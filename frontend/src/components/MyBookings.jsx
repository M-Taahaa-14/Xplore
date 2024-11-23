import React from 'react';

// Sample booking data (you can replace this with actual data from your database or API)
const bookings = [
  {
    id: 1,
    destination: 'Paris, France',
    date: '2024-12-15',
    status: 'Confirmed',
    imageUrl: 'https://via.placeholder.com/300x200?text=Paris', // Placeholder image
  },
  {
    id: 2,
    destination: 'Tokyo, Japan',
    date: '2024-12-20',
    status: 'Pending',
    imageUrl: 'https://via.placeholder.com/300x200?text=Tokyo', // Placeholder image
  },
  {
    id: 3,
    destination: 'New York, USA',
    date: '2025-01-10',
    status: 'Confirmed',
    imageUrl: 'https://via.placeholder.com/300x200?text=New+York', // Placeholder image
  },
  // More bookings can be added here...
];

const UserBookings = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Your Bookings</h1>
      <div style={cardsContainerStyle}>
        {bookings.map((booking) => (
          <div key={booking.id} style={cardStyle}>
            <img
              src={booking.imageUrl}
              alt={booking.destination}
              style={imageStyle}
            />
            <div style={cardContentStyle}>
              <h3 style={destinationStyle}>{booking.destination}</h3>
              <p style={dateStyle}>Booking Date: {booking.date}</p>
              <p style={statusStyle}>Status: {booking.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '2rem',
  color: '#4CAF50', // Green color for the title
  marginBottom: '20px',
};

const cardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap: '20px',
};

const cardStyle = {
  width: '300px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  transition: 'transform 0.3s',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const cardContentStyle = {
  padding: '15px',
};

const destinationStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const dateStyle = {
  fontSize: '1rem',
  color: '#555',
};

const statusStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#4CAF50', // Green for confirmed status
};

// Hover effect for the card
const cardHoverStyle = {
  transform: 'scale(1.05)',
};

export default UserBookings;
