import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import EditProfileForm from "./EditProfileForm";

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

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); // State for controlling form visibility

  // Retrieve the stored email from localStorage
  const loggedInEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (loggedInEmail) {
      fetchUserProfile(loggedInEmail);
      fetchUserBookings(loggedInEmail);
      fetchUserWishlist(loggedInEmail);
    }
  }, [loggedInEmail]);

  const fetchUserProfile = async (email) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user-profile/?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserProfile(data.user); // Adjusted to access the 'user' field
    } else {
      console.error("Failed to fetch user profile");
    }
  };

  const fetchUserBookings = async (email) => {
    const response = await fetch(`/api/bookings?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      setBookings(data); // Store the bookings data
    } else {
      console.error("Failed to fetch bookings");
    }
  };

  const fetchUserWishlist = async (email) => {
    const response = await fetch(`/api/wishlist?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      setWishlist(data); // Store the wishlist data
    } else {
      console.error("Failed to fetch wishlist");
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="container">
        <h2>User Dashboard</h2>

        <section className="profile">
          <h3>Profile</h3>
          <p>Full Name: {userProfile.Name}</p>
          <p>Username: {userProfile.username}</p>
          <p>Email: {loggedInEmail}</p>
          <p>Date of Birth: {userProfile['DOB']}</p>
          <p>Age: {calculateAge(userProfile['DOB'])}</p>
          <p>Phone Number: {userProfile['Phone-Number']}</p>
          <p>Gender: {userProfile.Gender}</p>
          {/* Update the Edit Profile button to use setIsEditProfileOpen */}
          <button 
            className="btn" 
            onClick={() => setIsEditProfileOpen(true)}
          >
            Edit Profile
          </button>
        </section>

        <section className="bookings">
          <h3>Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Tour Name</th>
                  <th>Departure City</th>
                  <th>Booking Date</th>
                  <th>Booking Status</th>
                  <th>Travel Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.tourName}</td>
                    <td>{booking.departureCity}</td>
                    <td>{booking.bookingDate}</td>
                    <td>{booking.status}</td>
                    <td>{booking.travelDate}</td>
                    <td><button onClick={() => alert('Give Review')}>Give Review</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="wishlist">
          <h3>Wishlist</h3>
          {wishlist.length === 0 ? (
            <p>No wishlist items found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.region}</td>
                    <td>{item.location}</td>
                    <td>
                      <button onClick={() => alert('Booking Item')}>Book</button>
                      <button onClick={() => alert('Remove Item')}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        {/* Add the EditProfileForm component */}
        {isEditProfileOpen && (
          <EditProfileForm
            userProfile={userProfile}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdate={(updatedProfile) => setUserProfile(updatedProfile)}
            refreshProfile={() => fetchUserProfile(loggedInEmail)} // Pass this as a prop
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
