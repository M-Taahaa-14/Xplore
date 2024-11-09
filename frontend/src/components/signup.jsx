import React, { useState } from 'react';

const Signup = () => {
  // State for form inputs
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

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Helper function to calculate age based on date of birth
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

  // Handle submission logic
  const handleSubmit = async () => {
    // Validate inputs
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

    // Clear errors and proceed
    setError('');

    // Prepare data for API call
    const signupData = { name, username, gender, phone_num: phoneNum, dob, email, password };

    // Make API call to backend
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.errors ? JSON.stringify(data.errors) : 'Signup failed');

      console.log('Signup successful', data);
      // Redirect or show success message here

    } catch (error) {
      setError(error.message || 'An error occurred during signup');
    }
  };

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <div style={styles.container}>
          <h2>Create New Account</h2>
          
          {['name', 'username', 'phoneNum', 'dob', 'email', 'password', 'confirmPassword'].map((field) => (
            <div key={field} style={styles.formGroup}>
              <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                id={field}
                type={field === 'password' || field === 'confirmPassword' ? 'password' : field === 'dob' ? 'date' : 'text'}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          ))}

          <div style={styles.formGroup}>
            <label htmlFor="gender">Gender</label>
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

          <button
            style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSubmit}
          >
            Signup
          </button>

          {error && <p style={styles.error}>{error}</p>}

          <p>Have an account? <a href="/login">Log In</a></p>
        </div>
      </main>
    </div>
  );
};

// Inline CSS styles
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
  main: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  container: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '60%',
    maxWidth: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    fontSize: 18,
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '90%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
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
  }
};

export default Signup;
