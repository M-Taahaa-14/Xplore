import React, { useState, useEffect } from 'react';
import './Review.css'

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');
  const [tour, setTour] = useState('');
  const [tours, setTours] = useState([]); // Assuming you have a list of tours

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch('/api/tours');
      const data = await response.json();
      setTours(data);
    };

    fetchTours();
  }, []);

  const validateForm = () => {
    if (!name || !email || !message || !rating) {
      alert("Please fill out all fields and select a rating.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const feedbackData = { name, email, tour, message, rating };
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    // Reset the form fields
    setName('');
    setEmail('');
    setTour('');
    setMessage('');
    setRating('');
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="feedback-body"> {/* Ensure the background image is applied here */}
      <header>
        <nav>
          <ul>
            <li><a href="Home">Home</a></li>
            <li><a href="tours">Tours</a></li>
            <li><a href="Trek">Treks</a></li>
            <li><a href="Faqs">FAQs</a></li>
            <li><a href="UserProfile">Profile</a></li>
            <li><a href="AboutUs">About Us</a></li>
          </ul>
        </nav>
      </header>
      
      <div className="container">
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tour">Select Tour:</label>
            <select
              id="tour"
              value={tour}
              onChange={(e) => setTour(e.target.value)}
              required
            >
              <option value="">Select a tour</option>
              {tours.map((tourItem, index) => (
                <option key={index} value={tourItem.id}>{tourItem.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="rating">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === star.toString()}
                    onChange={() => setRating(star.toString())}
                    required
                  />
                  <label htmlFor={`star${star}`}>&#9733;</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <button type="submit" className="btn">Send Feedback</button>
        </form>
      </div>
    </div>
  );
};




const styles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'url("/images/t6.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      margin: 0,
    },
    container: {
      backgroundColor: '#fff',
      padding: '60px',
      margin: '100px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: 'red',
      marginTop: '5px',
    },
  };

export default Feedback;
