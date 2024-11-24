// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './login.css'; // Assuming you will create a new stylesheet for styles

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if both fields are filled
//     if (!email || !password) {
//       setError('Email and Password are required');
//       return;
//     }
//     setError('');

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/login/', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         console.log('Login successful:', response.data);

//         // Store email in localStorage for session management
//         localStorage.setItem('userEmail', email);
//         localStorage.setItem('userType', isAdmin ? 'admin' : 'user');

//         // Redirect based on user type
//         navigate(isAdmin ? '/admin-dashboard' : '/home');
//       }
//     } catch (error) {
//       // Set the error message from server response or a default error
//       setError(
//         error.response?.data?.error || 'Login failed. Please check your credentials.'
//       );
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-header">
//           <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
//           <div className="toggle-container">
//             <label className="switch">
//               <input
//                 type="checkbox"
//                 checked={isAdmin}
//                 onChange={() => setIsAdmin(!isAdmin)}
//               />
//               <span className="slider round"></span>
//             </label>
//             <span className="toggle-label">
//               {isAdmin ? 'Switch to User' : 'Switch to Admin'}
//             </span>
//           </div>
//         </div>

//         <div className="login-form-group">
//           <label htmlFor="loginEmail">Email</label>
//           <input
//             id="loginEmail"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="login-form-group">
//           <label htmlFor="loginPassword">Password</label>
//           <input
//             id="loginPassword"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         {error && <p className="error-message">{error}</p>}

//         <button type="submit" className="login-button">
//           Login
//         </button>

//         <p>
//           Don't have an account? <Link to="/signup">Signup</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Store email in localStorage for session management
        localStorage.setItem('userEmail', email);

        // Redirect to home page after successful login
        navigate('/home');
      }
    } catch (error) {
      // Set the error message from server response or a default error
      setError(error.response?.data?.error || "Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.body}>
      <form onSubmit={handleSubmit} style={styles.form}>
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
