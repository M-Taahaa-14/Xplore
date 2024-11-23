import './tours.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Fetch logged-in email once, outside of the component
const loggedInEmail = localStorage.getItem("userEmail");

const TourCard = ({ image, title, location, price, reviews, rating, loggedInEmail }) => {
  const navigate = useNavigate();

  const addToWishlist = (tourName) => {
    alert(`${tourName} has been added to your wishlist!`);
  };

  const handleBookNow = () => {
    // Navigate to the booking page with the tour details and user details
    navigate('/booking', {
      state: { 
        title, 
        location, 
        price, 
        image, 
        loggedInEmail, // Pass the user details (email in this case)
      },
    });
  };

  return (
    <div className="card">
      <img src={image} alt={`Image of ${title}`} />
      <h3>{title}</h3>
      <p>{location}</p>
      <p>from {price} / day</p>
      <p>{rating} ({reviews} Reviews)</p>
      <div className="overlay">
        <button className="book-now" onClick={handleBookNow}>
          Book Now📅
        </button>
        <span className="wishlist" onClick={() => addToWishlist(title)}>
          🤍💌
        </span>
      </div>
    </div>
  );
};

const Tours = () => {
  const [destinations, setDestinations] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const navigate = useNavigate();

  // Fetch destinations from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/destinations/')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error("Error fetching destinations:", error);
      });
  }, []);

  // Fetch user details based on the logged-in email when the component mounts
  useEffect(() => {
    if (loggedInEmail) {
      axios.get(`http://127.0.0.1:8000/api/user-profile/${loggedInEmail}/`)
        .then(response => {
          setUserDetails(response.data); // Set the user details in the state
        })
        .catch(error => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [loggedInEmail]);

  // Display NULL if no email is found
  const displayEmail = loggedInEmail ? loggedInEmail : 'NULL';

  return (
    <div>
      <section className="user-info">
        {/* Display the logged-in user's email or NULL if not found */}
        <p>Email: {displayEmail}</p>
        {/* Display user details if they exist */}
        {userDetails && (
          <div>
            <p>Name: {userDetails.name || 'Not Available'}</p>
            <p>Phone: {userDetails.phone || 'Not Available'}</p>
            <p>Address: {userDetails.address || 'Not Available'}</p>
          </div>
        )}
      </section>

      <section className="featured-liveaboards">
        <h2>Our Destinations</h2>
        <div className="liveaboard-cards">
          {destinations.map((destination, index) => (
            <TourCard
              key={index}
              image={`http://127.0.0.1:8000${destination.Image}`} // Assuming ImageURL contains the correct URL
              title={destination.Name}
              location={destination.Location}
              price={destination.Price}
              reviews={destination.reviews || 0} // Default to 0 if no reviews
              rating={destination.rating || 'N/A'} // Default to 'N/A' if no rating
              loggedInEmail={loggedInEmail} // Pass loggedInEmail to TourCard
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;
