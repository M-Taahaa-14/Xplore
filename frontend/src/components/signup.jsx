import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user_icon from '../images/icons8-name-50.png';
import email_icon from '../images/icons8-email-30.png';
import password_icon from '../images/icons8-password-50.png';
import './signnew.css'; // Import CSS for styling

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    gender: '',
    phoneNum: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    const { name, username, phoneNum, dob, email, password, confirmPassword, gender } = formData;

    if (!name || !username || !phoneNum || !dob || !email || !password || !confirmPassword || !gender) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const age = calculateAge(dob);
    if (age < 18) {
      setError('You must be at least 18 years old to register');
      return;
    }

    setError('');

    const signupData = { name, username, gender, phone_num: phoneNum, dob, email, password };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', signupData, {
        headers: { 'Content-Type': 'application/json' },
      });
    
      console.log('Signup successful', response.data);
      navigate('/login'); // Redirect to login page on success
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
    
      if (typeof errorMsg === 'string') {
        setError(errorMsg);
      } else if (typeof errorMsg === 'object') {
        const messages = Object.values(errorMsg).flat().join(', ');
        setError(messages);
      } else {
        setError('An error occurred during signup');
      }
    }
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up Now!</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              id="name"
              type="text"
              placeholder="Enter your name here."
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              id="username"
              type="text"
              placeholder="Enter your username here."
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email here."
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password here."
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password."
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <input
              id="phoneNum"
              type="text"
              placeholder="Enter your phone number."
              value={formData.phoneNum}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <input
              id="dob"
              type="date"
              placeholder="Enter your date of birth."
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <select
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="" disabled>Select your Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>
        <button
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSubmit}
        >
          Signup
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  );
};

// Inline styles for background and layout
const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: 'url("/images/t6.jpg")',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  button: {
    padding: '10px',
    backgroundColor: '#2e6f40',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '94%',
    fontSize: 18,
    transition: 'background-color 0.5s ease, color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#06402b',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
};

export default SignUp;
