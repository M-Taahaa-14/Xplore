import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import SignNew from './components/signnew.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import Home from './components/home.jsx';
import Tours from './components/tours.jsx';
import Trek from './components/trek.jsx';
import Feedback from './components/feedback.jsx';
import FAQs from './components/faqs.jsx';
import AboutUs from './components/aboutus.jsx';
import UserProfile from './components/UserProfile.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ManageBookings from './components/ManageBookings.jsx';
import ManageDestinations from './components/ManageDestinations.jsx';
import ManageTours from './components/ManageTours.jsx';
import Review from './components/Review.jsx';
import ContactUs from './components/ContactUs.jsx';
import SideBar from './components/adminSideBar.jsx'; // Assuming this is for admin routes
import TourGuide from './components/TourGuide.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import BookingPage from './components/BookingPage.jsx';
import PaymentPage from './components/PaymentPage.jsx';

const App = () => {
  return (
    <Router>
      <Header /> {/* Header for both client and admin */}

      <Routes>
        {/* Client-side routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/trek" element={<Trek />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signnew" element={<SignNew />} />
        <Route path="/tourguide" element={<TourGuide />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* Admin-side routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/managebookings" element={<ManageBookings />} />
        <Route path="/managedestinations" element={<ManageDestinations />} />
        <Route path="/managetours" element={<ManageTours />} />
        <Route path="/review" element={<Review />} />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>

      <Footer /> {/* Footer for both client and admin */}
    </Router>
  );
}

export default App;
