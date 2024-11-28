import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import EditProfileForm from "./EditProfileForm"; // Assuming you have an EditProfileForm component
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [destinations, setDestinations] = useState({}); // New state to hold destination data
  const [selectedDestination, setSelectedDestination] = useState(null); // State to store the currently selected destination
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
    const response = await fetch(`http://127.0.0.1:8000/api/wishlist/?user=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setWishlist(data); // Directly set the wishlist data from the response
    } else {
      console.error("Failed to fetch wishlist");
    }
  };

  // Fetch a single destination data by its ID
  const fetchDestinationDetails = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/destinations/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setDestinations((prevDestinations) => ({
        ...prevDestinations,
        [id]: data, // Save the destination details with the id as the key
      }));
    } else {
      console.error("Failed to fetch destination details");
    }
  };

  // Fetch destination details for all wishlist items
  useEffect(() => {
    wishlist.forEach((item) => {
      if (!destinations[item.des]) {
        fetchDestinationDetails(item.des); // Fetch details for each destination in wishlist if not already fetched
      }
    });
  }, [wishlist, destinations]);

  // Handle the click event to show details of the selected destination
  const handleDestinationClick = (id) => {
    setSelectedDestination(destinations[id]); // Set the selected destination from the state
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
                  <th>Tour ID</th>
                  <th>Tour Name</th>
                  <th>Booking Date</th>
                  <th>Booking Status</th>
                  <th>Travel Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.DestinationId}</td>
                    <td>
                      {destinations[booking.DestinationId] ? (
                        destinations[booking.DestinationId].Name
                      ) : (
                        "Loading..."
                      )}
                    </td> {/* Get the destination name */}
                    <td>{booking.BookingDate}</td>
                    <td>{booking.Status}</td>
                    <td>{booking.TravelDate}</td>
                    <td>
                      <button onClick={() => navigate("/feedback")}>Give Review</button>
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
                  <th>Destination Name</th>
                  <th>Region</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => handleDestinationClick(item.des)}>
                      {destinations[item.des] ? destinations[item.des].Name : "Loading..."}
                    </td>
                    <td>{destinations[item.des] ? destinations[item.des].Region : "Loading..."}</td>
                    <td>{destinations[item.des] ? destinations[item.des].Location : "Loading..."}</td>
                    <td>{destinations[item.des] ? destinations[item.des].Price : "Loading..."}</td>
                    <td>{destinations[item.des] ? destinations[item.des].StartDate : "Loading..."}</td>
                    <td>{destinations[item.des] ? destinations[item.des].EndDate : "Loading..."}</td>
                    <td>
                      {destinations[item.des] && destinations[item.des].Image ? (
                        <img
                          src={`http://127.0.0.1:8000${destinations[item.des].Image}`}
                          alt={destinations[item.des].Name}
                          style={{ width: "100px" }}
                        />
                      ) : (
                        "Loading..."
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Display the selected destination details below the wishlist */}
        {selectedDestination && (
          <section className="destination-details">
            <h3>Destination Details</h3>
            <p>Name: {selectedDestination.Name}</p>
            <p>Region: {selectedDestination.Region}</p>
            <p>Location: {selectedDestination.Location}</p>
            <p>Price: {selectedDestination.Price}</p>
            <p>Start Date: {selectedDestination.StartDate}</p>
            <p>End Date: {selectedDestination.EndDate}</p>
            <p>Nights: {selectedDestination.Nights}</p>
            <p>Days: {selectedDestination.Days}</p>
            <p>Google Maps Link: <a href={selectedDestination.GoogleMapsLink} target="_blank" rel="noopener noreferrer">View on Maps</a></p>
            <img src={`http://127.0.0.1:8000${selectedDestination.Image}`} alt={selectedDestination.Name} />
          </section>
        )}

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
