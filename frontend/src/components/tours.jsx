import './tours.css';
const TourCard = ({ image, title, location, price, reviews, rating }) => {
  const addToWishlist = (tourName) => {
    alert(`${tourName} has been added to your wishlist!`);
  };

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{location}</p>
      <p>from {price} / day</p>
      <p>{rating} ({reviews} Reviews)</p>
      <div className="overlay">
        <a href="/booking" className="book-now">Book Now📅</a>
        <span className="wishlist" onClick={() => addToWishlist(title)}>🤍💌</span>
      </div>
    </div>
  );
};

const Tours = () => {
  const toursData = [
    { image: 'images/skardu.jpeg', title: 'Shangrilla, Skardu', location: 'Pakistan', price: '5K', reviews: 413, rating: '9.0 Superb' },
    { image: 'images/khumrat.jpeg', title: 'Khumrat Valley', location: 'Swat, Pakistan', price: '3K', reviews: 43, rating: '8.5 Fabulous' },
    { image: 'images/rattigali.jpeg', title: 'Ratti Galli', location: 'Azad Kashmir', price: '6K', reviews: 169, rating: '8.7 Heaven On Earth' },
    // Add more tour objects here if needed
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