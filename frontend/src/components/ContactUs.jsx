import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-pane">
      <h1>Contact Us</h1>
      <p className="contact-description">Reach out to us. We’re here to help you make your travel dreams come true!</p>

      <div className="contact-content">
        <div className="contact-form-container">
          <form className="contact-form">
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter your name" required />
            
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />
            
            <label>Message</label>
            <textarea name="message" placeholder="How can we help you?" rows="5" required></textarea>
            
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="map-and-text">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?..." 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Xplore Location"
            ></iframe>
          </div>
          <div className="contact-info">
            <h2>Visit Us</h2>
            <p className="contact-description">We are located at the heart of the city to make your travel planning easier!</p>
            <p className="contact-description">Our team is excited to guide you with the best options for your journeys.</p>
          </div>
        </div>
      </div>

      <div className="contact-icons">
        <div className="contact-option">
          <i className="fas fa-phone-alt"></i>
          <p className="contact-description">Call us at <span>+123 456 789</span></p>
        </div>
        <div className="contact-option">
          <i className="fas fa-envelope"></i>
          <p className="contact-description">Email us at <span>support@xplore.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
