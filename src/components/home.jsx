import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [departures] = useState([]);

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    // Logic for fetching departures based on destination selected
  };

  const handleSearch = () => {
    // Logic for searching tours based on selected values
  };

  return (
    <div>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
      </div>
      <div className="dropdown-menu" id="dropdownMenu">
        <a href="/login">Logout</a>
      </div>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Xplore</h1>
            <p>Book a tour now!</p>

            <form>
              <select value={destination} onChange={handleDestinationChange}>
                <option value="" disabled>Select a Destination</option>
                {/* Add destination options here */}
              </select>

              <select value={departures}>
                <option value="" disabled>Upcoming Departures</option>
                {departures.map((departure, index) => (
                  <option key={index} value={departure}>{departure}</option>
                ))}
              </select>

              <button type="button" className="search-button" onClick={handleSearch}>Search</button>
            </form>
          </div>
        </section>

        <section className="features">
          <div className="feature"><p>100% Best Price Guarantee</p></div>
          <div className="feature"><p>24/7 Expert Customer Support</p></div>
          <div className="feature"><p>No credit card or booking fees</p></div>
        </section>

        <section className="help">
          <h2>We're here to help, 24/7.</h2>
          <p>Connect with our expert travel consultants to plan your next trip.</p>
          <div className="consultants">
                    <img src="/images/consultant1.jpg" alt="Consultant"/>
                    <img src="/images/consultant2.jpg" alt="Consultant"/>
                    <img src="/images/consultant3.jpg" alt="Consultant"/>
                    <img src="/images/consultant4.jpg" alt="Consultant"/>
                    <img src="/images/consultant5.jpg" alt="Consultant"/>
                    <img src="/images/consultant6.jpg" alt="Consultant"/>
                    <img src="/images/consultant.jpg" alt="Consultant"/>
          </div>
          <div className="contact-info">
            <div><p>Call us</p><a href="tel:+3204884375">+3204884375</a></div>
            <div><p>Email Us</p><a href="mailto:info@xplore.com">Send us a message</a></div>
            <div><p>About us</p><Link to="/aboutus">Read more</Link></div>
          </div>
        </section>

        <section class="featured-liveaboards">
    <h2>Featured Tours</h2>
    <a href="/tours" class="see-more">See more tours</a>
    <div class="liveaboard-cards">
        <div class="card">
            <img src="/images/skardu.jpeg" alt="Ocean Quest"/>
            <h3>Shangrilla,Skardu</h3>
            <p>Pakistan</p>
            <p>from 5k / day</p>
            <p>9.0 Superb (413 Reviews)</p>
        </div>
        <div class="card">
            <img src="/images/khumrat.jpeg" alt="Pearl of Papua"/>
            <h3>Khumrat Valley</h3>
            <p>Swat,Pakistan</p>
            <p>from 3K / day</p>
            <p>8.5 Fabulous (43 Reviews)</p>
        </div>
        <div class="card">
            <img src="/images/rattigali.jpeg" alt="Resolute"/>
            <h3>Ratti Galli</h3>
            <p>Azad Kashmir</p>
            <p>from 6K / day</p>
            <p>8.7 Heaven On Earth (169 Reviews)</p>
        </div>
    </div>
</section>
      </main>
    </div>
  );
};

const toggleMenu = () => {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
};

export default Home;
