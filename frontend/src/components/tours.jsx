import './tours.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tours = () => {
  const [destinations, setDestinations] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const loggedInEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  // Fetch destinations from the backend
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/destinations/')
      .then((response) => setDestinations(response.data))
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  // Fetch wishlist status for each destination
  useEffect(() => {
    if (loggedInEmail && destinations.length > 0) {
      destinations.forEach((destination) => {
        if (!(destination.DestinationId in wishlistStatus)) {
          checkIfInWishlist(destination.DestinationId);
        }
      });
    }
  }, [loggedInEmail, destinations]);

  // Check if the destination is in the wishlist for the logged-in user
  const checkIfInWishlist = (destinationId) => {
    axios
      .get('http://127.0.0.1:8000/api/wishlist/check/', {
        params: {
          user: loggedInEmail,
          destination: destinationId,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const isWishlisted = response.data.is_in_wishlist;
          setWishlistStatus((prevStatus) => ({
            ...prevStatus,
            [destinationId]: isWishlisted === true,
          }));
          console.log(`Wishlist status for Destination ${destinationId}:`, isWishlisted);
        }
      })
      .catch((error) => {
        console.error(`Error checking wishlist status for Destination ${destinationId}:`, error);
        setWishlistStatus((prevStatus) => ({
          ...prevStatus,
          [destinationId]: false,
        }));
      });
  };

  // Toggle wishlist: add or remove
  const toggleWishlist = (destinationId, isWishlisted) => {
    const currentDateTime = new Date().toISOString();

    if (isWishlisted) {
      axios
        .delete(`http://127.0.0.1:8000/api/wishlist/${destinationId}/`, {
          params: { user: loggedInEmail },
        })
        .then(() => {
          setWishlistStatus((prevStatus) => ({
            ...prevStatus,
            [destinationId]: false,
          }));
        })
        .catch((error) => console.error("Error removing from wishlist:", error));
    } else {
      axios
        .post('http://127.0.0.1:8000/api/wishlist/', {
          user: loggedInEmail,
          destination: destinationId,
          added_on: currentDateTime,
        })
        .then(() => {
          setWishlistStatus((prevStatus) => ({
            ...prevStatus,
            [destinationId]: true,
          }));
        })
        .catch((error) => console.error("Error adding to wishlist:", error));
    }
  };

  // Handle booking navigation
  const handleBookNow = (destination) => {
    navigate('/booking', {
      state: {
        title: destination.Name,
        location: destination.Location,
        price: destination.Price,
        image: `http://127.0.0.1:8000${destination.Image}`,
        loggedInEmail,
        DestinationId: destination.DestinationId,
        startDate: destination.StartDate,
      },
    });
  };

  return (
    <div>
      <section className="featured-liveaboards">
        <h2>Tours</h2>
        <div className="liveaboard-cards">
          {destinations.map((destination) => {
            const wishlisted = wishlistStatus[destination.DestinationId] ?? false;

            return (
              <div key={destination.DestinationId} className="card">
                <img
                  src={`http://127.0.0.1:8000${destination.Image}`}
                  alt={`Image of ${destination.Name}`}
                />
                <h3>{destination.Name}</h3>
                <p>{destination.Location}</p>
                <p>from {destination.Price} / day</p>
                <p>{destination.rating || 'N/A'} ({destination.reviews || 0} Reviews)</p>

                <div className="overlay">
                  <button className="book-now" onClick={() => handleBookNow(destination)}>
                    Book Now📅
                  </button>
                  <span
                    className="wishlist"
                    onClick={() => toggleWishlist(destination.DestinationId, wishlisted)}
                  >
                    {wishlisted ? '💔 Remove from Wishlist' : '🤍 Add to Wishlist'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Tours;
