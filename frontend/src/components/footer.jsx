import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './footer.css'; // Assuming you have a separate CSS file for styles
import fb_icon from '../images/fb.png'
import insta_icon from '../images/insta.jpeg'
import x_icon from '../images/x.png'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Phone: <a href="tel:+3204884375">+3204884375</a></p>
          <p>Email: <a href="mailto:info@xplore.com">info@xplore.com</a></p>
          <p>Address: 123 Hike St, Adventure City, Country</p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/privacypolicy">Privacy Policy</Link></li>
            <li><Link to="/termsofservice">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h2>Follow Us</h2>
          <a href="https://www.facebook.com/xplore" target="_blank" rel="noopener noreferrer">
            <img src={fb_icon} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.twitter.com/xplore" target="_blank" rel="noopener noreferrer">
            <img src={x_icon} alt="X(twitter)" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/xplore" target="_blank" rel="noopener noreferrer">
            <img src={insta_icon} alt="Instagram" className="social-icon" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Xplore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
