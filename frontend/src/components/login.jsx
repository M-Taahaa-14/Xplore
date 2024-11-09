import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        navigate('/home'); // Redirect to home after successful login
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={styles.body}>
      <form onSubmit={handleSubmit}>
        <div style={styles.container}>
          <h2>Login to Xplore</h2>

          <div style={styles.formGroup}>
            <div style={styles.e1}>
              <label htmlFor="loginEmail">Email</label>
            </div>
            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.e1}>
              <label htmlFor="loginPassword">Password</label>
            </div>
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <button type="submit" style={styles.button}>Login</button>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("/images/t1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 0,
  },
  container: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent white
    backdropFilter: 'blur(10px)', // Apply a blur effect to the background
    WebkitBackdropFilter: 'blur(10px)', // Safari support
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'center',
  },
  e1: {
    textAlign: 'left',
    marginLeft: '24px',
  },
  input: {
    width: '80%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '90%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default Login;
