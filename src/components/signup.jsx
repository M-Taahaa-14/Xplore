import React, { useState } from 'react';

const Signup = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  // Handle submission logic
  const handleSubmit = () => {
    // Validate inputs
    if (!name || !username || !phoneNum || !dob || !email || !password || !confirmPassword) {
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

    console.log('Signup details:', {
      name, username, gender, phoneNum, dob, email, password
    });

    // API logic here
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

  return (
    <div style={styles.page}>   

      <main style={styles.main}>
        <div style={styles.container}>
          <h2>Create New Account</h2>
          <div style={styles.formGroup}>
            <label htmlFor="signupFullName">Name</label>
            <input
              id="signupFullName"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="signupUsername">Username</label>
            <input
              id="signupUsername"
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="GenderDropDown">Gender</label>
            <select
              id="GenderDropDown"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={styles.input}
            >
              <option value="" disabled>Select your Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="signupPhoneNum">Phone Number</label>
            <input
              id="signupPhoneNum"
              type="tel"
              placeholder="Enter your Phone Number"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="DOB">Date of Birth</label>
            <input
              id="DOB"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="signupEmail">Email</label>
            
            <input
              id="signupEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="signupConfirmPassword">Confirm Password</label>
            <input
              id="signupConfirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button} // Apply hover styles
            onMouseEnter={() => setIsHovered(true)} // Start hover effect
            onMouseLeave={() => setIsHovered(false)} // End hover effect
            onClick={handleSubmit} // Call form submission logic
          >
            Signup
          </button>

          {error && <p style={styles.error}>{error}</p>}

          <p>Have an account? <a href="/login">LogIn</a></p>
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
    backgroundSize: 'cover', // Adjust the size to fit the container
    backgroundRepeat: 'no-repeat', // Prevent repeating the image
    backgroundPosition: 'center',
  },
  main: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#000'
  },
  container: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '60%',
    maxWidth: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    backdropFilter: 'blur(10px)', // Apply a blur effect to the background
    WebkitBackdropFilter: 'blur(10px)',
    fontSize:18,
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
    backgroundColor:'#2e6f40',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '94%',
    fontSize:18,
    transition: 'background-color 0.5s ease, color 0.3s ease',
  },
  buttonHover:{
    backgroundColor: '#06402b',
    color:'#fff',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  footer: {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
  },
  // Media queries for responsiveness
  '@media (max-width: 768px)': {
    header: {
      fontSize: '18px',
    },
    container: {
      padding: '15px',
    },
  },
  '@media (max-width: 576px)': {
    header: {
      fontSize: '16px',
    },
    container: {
      padding: '10px',
    },
    button: {
      padding: '8px',
    },
  },
};

export default Signup;


// import React, { useState } from 'react';

// const Signup = () => {
//   // State for form inputs
//   const [name, setName] = useState('');
//   const [username, setUsername] = useState('');
//   const [gender, setGender] = useState('');
//   const [phoneNum, setPhoneNum] = useState('');
//   const [dob, setDob] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!name || !username || !phoneNum || !dob || !email || !password || !confirmPassword) {
//       setError('All fields are required');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     const age = calculateAge(dob);
//     if (age < 18) {
//       setError('You must be at least 18 years old to register');
//       return;
//     }

//     // Clear errors and proceed with signup logic
//     setError('');

//     console.log('Signup form submitted:', {
//       name, username, gender, phoneNum, dob, email, password
//     });

//     // Implement your API call logic here to send the form data to the backend.
//   };

//   // Helper function to calculate age based on date of birth
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   return (
//     <div style={styles.body}>
//       <form onSubmit={handleSubmit}>
//         <div style={styles.container}>
//           <h2>Create New Account</h2>

//           <div style={styles.formGroup}>
//             <label htmlFor="signupFullName">Name</label>
//             <input
//               id="signupFullName"
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="signupUsername">Username</label>
//             <input
//               id="signupUsername"
//               type="text"
//               placeholder="Enter your Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="GenderDropDown">Gender</label>
//             <select
//               id="GenderDropDown"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               required
//               style={styles.input}
//             >
//               <option value="" disabled>Select your Gender</option>
//               <option value="M">Male</option>
//               <option value="F">Female</option>
//             </select>
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="PhoneNum">Phone Number</label>
//             <input
//               id="signupPhoneNum"
//               type="tel"
//               placeholder="Enter your Phone Number"
//               value={phoneNum}
//               onChange={(e) => setPhoneNum(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="DOB">Date of Birth</label>
//             <input
//               id="DOB"
//               type="date"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="signupEmail">Email</label>
//             <input
//               id="signupEmail"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="signupPassword">Password</label>
//             <input
//               id="signupPassword"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
//               title="Password must be at least 8 characters long and contain uppercase, lowercase, and a number"
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="signupConfirmPassword">Confirm Password</label>
//             <input
//               id="signupConfirmPassword"
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <button type="submit" style={styles.button}>Signup</button>
//           </div>

//           {error && <p style={styles.error}>{error}</p>}

//           <p>Already have an account? <a href="/login">Login</a></p>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Inline CSS styles
// const styles = {
//   body: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundImage: 'url("/images/t6.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     margin: 0,
//     // Use flexbox to center the form vertically and horizontally
//     flexDirection: 'column',
//   },
//   container: {
//     backgroundColor: '#fff',
//     padding: '40px',
//     margin: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '500px',
//     textAlign: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     // Flexbox ensures the form takes available width up to max-width
//     alignItems: 'center',
//   },
//   formGroup: {
//     marginBottom: '15px',
//     textAlign: 'left',
//     width: '100%',
//     // Ensure input fields span full width of their container
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxSizing: 'border-box', // Ensures padding is included in width
//   },
//   button: {
//     width: '100%',
//     padding: '10px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   error: {
//     color: 'red',
//     marginTop: '5px',
//   },
//   // Media queries for responsiveness
//   '@media (max-width: 768px)': {
//     container: {
//       padding: '20px',
//     },
//   },
//   '@media (max-width: 576px)': {
//     container: {
//       margin: '10px',
//       padding: '15px',
//     },
//     button: {
//       padding: '8px',
//     },
//   },
// };

// export default Signup;
