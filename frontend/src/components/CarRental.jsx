import React, { useState } from 'react';
import './CarRental.css';

const CarRental = () => {
  const [isWithinCity, setIsWithinCity] = useState(true);
  
  const cars = [
    {
      id: 1,
      name: 'Toyota Corolla',
      model: 'G',
      image: '/images/corolla.jpg',
      category: 'Standard',
      seats: 4,
      bags: 2,
      passengers: 4,
      transmission: 'Auto',
      ac: true,
      price: 25000,
      protection: ['Theft Protection', 'Clean Interior/Exterior']
    },
    {
      id: 2,
      name: 'Toyota Corolla Fielder',
      model: 'X',
      image: '/images/fielder.jpg',
      category: 'Standard',
      seats: 4,
      bags: 4,
      passengers: 4,
      transmission: 'Auto',
      ac: true,
      price: 27500,
      protection: ['Theft Protection', 'Clean Interior/Exterior']
    },
    {
      id: 3,
      name: 'Toyota Voxy',
      model: '2.0 CVT',
      image: '/images/voxy.jpg',
      category: 'Commercial',
      seats: 4,
      bags: 4,
      passengers: 7,
      transmission: 'Auto',
      ac: true,
      price: 35000,
      protection: ['Theft Protection', 'Clean Interior/Exterior']
    }
  ];

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      const formattedHour = hour % 12 || 12;
      const ampm = hour < 12 ? 'AM' : 'PM';
      slots.push(`${formattedHour}:00 ${ampm}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="car-rental-container">
      {/* <div className="top-banner">
        Subscribe XploreCars today to get amazing discounts and exclusive perks!
      </div> */}
      
      <header className="header">
        <div className="header-menu">
          <span>Help</span>
          <span>My Bookings</span>
          <span className="user-icon">M</span>
        </div>
      </header>

      <main className="main-content">
        <section className="search-section">
          <h1>Search for Cars</h1>
          <p>Find the best and most affordable cars</p>

          <div className="search-tabs">
            <span className="active">Rent a Car</span>
            <span>Airport Shuttle</span>
          </div>

          <div className="city-options">
            <label className="radio-label">
              <input
                type="radio"
                checked={isWithinCity}
                onChange={() => setIsWithinCity(true)}
              />
              Within City
            </label>
            <label className="radio-label">
              <input
                type="radio"
                checked={!isWithinCity}
                onChange={() => setIsWithinCity(false)}
              />
              Out of City
            </label>
          </div>

          <div className="search-form">
            <select className="input-field">
              <option value="">Select City</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
            </select>
            <input type="date" className="input-field" placeholder="Pickup Date" />
            <select className="input-field">
              <option value="">Pick-up Time</option>
              {timeSlots.map((time) => (
                <option key={`pickup-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <input type="date" className="input-field" placeholder="Dropoff Date" />
            <select className="input-field">
              <option value="">Drop-off Time</option>
              {timeSlots.map((time) => (
                <option key={`dropoff-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <button className="search-button">Search</button>
          </div>
        </section>

        <section className="cars-section">
          {cars.map(car => (
            <div key={car.id} className="car-card">
              <div className="car-image">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="car-details">
                <div className="car-header">
                  <h3>{car.name}</h3>
                  <span className="car-category">{car.category}</span>
                </div>
                <div className="car-specs">
                  <span>🚪 {car.seats}</span>
                  <span>💼 {car.bags}</span>
                  <span>👤 {car.passengers}</span>
                  <span>🔄 {car.transmission}</span>
                  <span>❄️ {car.ac ? 'AC' : 'Non-AC'}</span>
                </div>
                <div className="car-protection">
                  {car.protection.map((item, index) => (
                    <span key={index} className="protection-tag">{item}</span>
                  ))}
                </div>
                <div className="car-price">
                  <div>
                    <span className="price">Rs {car.price}</span>
                    <span className="price-period">/5 day(s)</span>
                  </div>
                  <button className="book-button">Bookme</button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="highlights-section">
          <h2>Highlights for intra city</h2>
          <ul>
            <li>Customers are responsible for paying for their own Fuel Consumption, Toll Taxes, Parking Fees, etc</li>
            <li>Car Rental service is available between 6am - 12 am only</li>
            <li>Bookings made between 6 pm and 11 pm will be available after 6 am next day</li>
            <li>Vehicle will only be available for up to 12 hours or till 12 am - whichever is less. However, the duration will be up to 10 hours for Karachi City.</li>
            <li>No fuel charges for pickup and dropoff within a 10 km range of the driver's location otherwise fuel charges are applied.</li>
          </ul>
        </section>

        <section className="bottom-section">
          <div className="service-cards">
            <div className="service-card">
              <span className="service-icon">📱</span>
              <h3>Download Bookme App</h3>
              <p>Find the best deals on our mobile app</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🎧</span>
              <h3>Help Center</h3>
              <p>Connect with our support team</p>
            </div>
            <div className="service-card">
              <span className="service-icon">📋</span>
              <h3>Manage Bookings</h3>
              <p>View and manage your bookings</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CarRental;