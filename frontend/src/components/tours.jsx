import './tours.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // You can use axios for fetching data, or use fetch

const TourCard = ({ image, title, location, price, reviews, rating }) => {
  const navigate = useNavigate();

  const addToWishlist = (tourName) => {
    alert(`${tourName} has been added to your wishlist!`);
  };

  const handleBookNow = () => {
    navigate('/booking', {
      state: { title, location, price, image }, // Ensure image is included in the state
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
  const navigate = useNavigate();

  // Fetch destinations from the backend
  useEffect(() => {
    // Assuming the backend API returns a list of destinations
    axios.get('http://127.0.0.1:8000/api/destinations/')
      .then(response => {
        // Assuming the response data contains destination objects
        setDestinations(response.data);
      })
      .catch(error => {
        console.error("Error fetching destinations:", error);
      });
  }, []);

  return (
    <div>
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
              reviews={destination.reviews || 0} // If reviews are not available, default to 0
              rating={destination.rating || 'N/A'} // Default to 'N/A' if no rating
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;
