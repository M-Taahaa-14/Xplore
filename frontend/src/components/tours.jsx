import './tours.css';
import { useNavigate } from 'react-router-dom';

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
  const toursData = [
    // Existing Tours
    {
      image: 'images/skardu.jpeg',
      title: 'Shangrilla, Skardu',
      location: 'Pakistan',
      price: '5K',
      reviews: 413,
      rating: '9.0 Superb',
    },
    {
      image: 'images/khumrat.jpeg',
      title: 'Khumrat Valley',
      location: 'Swat, Pakistan',
      price: '3K',
      reviews: 43,
      rating: '8.5 Fabulous',
    },
    {
      image: 'images/rattigali.jpeg',
      title: 'Ratti Galli',
      location: 'Azad Kashmir',
      price: '6K',
      reviews: 169,
      rating: '8.7 Heaven On Earth',
    },

    // Added Treks
    {
      image: 'images/chittalake.jpg',
      title: 'Chitta Katha Lake Trek (4100 meters)',
      location: 'Neelum Valley, Pakistan',
      price: 'PKR 35,000',
      reviews: 120,
      rating: '9.1 Excellent',
    },
    {
      image: 'images/rakaposhi.jpeg',
      title: 'Rakaposhi Base Camp Trek (3500 Meters)',
      location: 'Gilgit-Baltistan, Pakistan',
      price: 'PKR 80,000',
      reviews: 98,
      rating: '8.8 Fabulous',
    },
    {
      image: 'images/kutwal.jpg',
      title: 'Haramosh Valley (Kutwal Lake) Trek (7409m)',
      location: 'Gilgit-Baltistan, Pakistan',
      price: 'PKR 55,000',
      reviews: 75,
      rating: '9.0 Superb',
    },
    {
      image: 'images/k2.jpeg',
      title: 'K2 Base Camp Trek',
      location: 'Karakoram Range, Pakistan',
      price: 'PKR 80,000',
      reviews: 150,
      rating: '9.5 Exceptional',
    },
    {
      image: 'images/ratti.jpeg',
      title: 'Ratti Gali Trek',
      location: 'Azad Kashmir, Pakistan',
      price: 'PKR 20,000',
      reviews: 60,
      rating: '8.5 Beautiful',
    },
    {
      image: 'images/fairymeadows.jpeg',
      title: 'Fairy Meadows',
      location: 'Gilgit-Baltistan, Pakistan',
      price: 'PKR 40,000',
      reviews: 200,
      rating: '9.3 Amazing',
    },
  ];

  return (
    <div>
      <section className="featured-liveaboards">
        <h2>Our Tours</h2>
        <div className="liveaboard-cards">
          {toursData.map((tour, index) => (
            <TourCard key={index} {...tour} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;
