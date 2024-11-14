import React, { useState } from 'react';
import './feedback.css';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tour, setTour] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message || !rating) {
      alert('Please fill out all fields and select a rating.');
      return;
    }

    const newReview = { name, email, tour, message, rating };
    setReviews([...reviews, newReview]);
    setName('');
    setEmail('');
    setTour('');
    setMessage('');
    setRating('');
  };

  return (
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
        <p></p>
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
        <p></p>
        <div className="form-group">
          <label htmlFor="tour">Select Tour:</label>
          <select
            id="tour"
            value={tour}
            onChange={(e) => setTour(e.target.value)}
            required
          >
            <option value="" disabled>Select a tour</option>
            <option value="Tour 1">Tour 1</option>
            <option value="Tour 2">Tour 2</option>
          </select>
        </div>
        <p></p>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <p></p>
        <div className="form-group">
          <label>Rating</label>
          <div className="rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
                <label htmlFor={`star${star}`}>&#9733;</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn">Send Feedback</button>
      </form>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <h4>{review.name} ({review.email})</h4>
            <p>{review.message}</p>
            <small>Tour: {review.tour}, Rating: {review.rating} stars</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
