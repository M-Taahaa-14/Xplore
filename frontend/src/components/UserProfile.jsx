import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import EditProfileForm from "./EditProfileForm";

// Function to calculate the user's age based on their date of birth
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
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const loggedInEmail = localStorage.getItem("userEmail");

  // Fetch user data (profile, bookings, wishlist) after the component mounts
  useEffect(() => {
    if (loggedInEmail) {
      fetchUserProfile(loggedInEmail);
      fetchUserBookings(loggedInEmail);
      fetchUserWishlist(loggedInEmail);
    }
  }, [loggedInEmail]);

  // Fetch user profile data from the backend API
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
      setUserProfile(data.user);
    } else {
      console.error("Failed to fetch user profile");
    }
  };

  // Fetch user bookings data from the backend API
  const fetchUserBookings = async (email) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user-bookings/?username=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBookings(data.bookings); // Assume 'bookings' is the key in the response
    } else {
      console.error("Failed to fetch bookings");
    }
  };

  // Fetch user wishlist data from the backend API
  const fetchUserWishlist = async (email) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user-wishlist/?username=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setWishlist(data.wishlist); // Assume 'wishlist' is the key in the response
    } else {
      console.error("Failed to fetch wishlist");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="container">
        <h2>User Dashboard</h2>

        <section className="profile">
          <h3>Profile</h3>
          <p>Full Name: {userProfile.Name}</p>
          <p>Username: {userProfile.Username}</p>
          <p>Email: {loggedInEmail}</p>
          <p>Date of Birth: {userProfile.DOB}</p>
          <p>Age: {calculateAge(userProfile.DOB)}</p>
          <p>Phone Number: {userProfile.PhoneNumber}</p>
          <p>Gender: {userProfile.Gender}</p>
          <button className="btn" onClick={() => setIsEditProfileOpen(true)}>
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
                    <td>{booking.Tour}</td> {/* Correct field names from API */}
                    <td>{booking.Departure}</td>
                    <td>{booking.BookingDate}</td>
                    <td>{booking.Status}</td>
                    <td>{booking.TravelDate}</td>
                    <td>
                      <button onClick={() => alert("Give Review")}>Give Review</button>
                    </td>
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
                      <button onClick={() => alert("Booking Item")}>Book</button>
                      <button onClick={() => alert("Remove Item")}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Edit Profile Form */}
        {isEditProfileOpen && (
          <EditProfileForm
            userProfile={userProfile}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdate={(updatedProfile) => setUserProfile(updatedProfile)}
            refreshProfile={() => fetchUserProfile(loggedInEmail)}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
