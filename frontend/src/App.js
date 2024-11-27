import './App.css';
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
import SideBar from './components/adminSideBar.jsx';
import TourGuide from './components/TourGuide.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import BookingPage from './components/BookingPage.jsx';
import PaymentPage from './components/PaymentPage.jsx';
import WeatherForecast from './components/WeatherForecast.jsx';
import Chatbox from './components/ChatRoom.jsx';
import Sidebar from './components/Sidebar.jsx';
import CarRental from './components/CarRental';
import Privacy from './components/PrivacyPolicy.jsx';
import MyBookings from './components/MyBookings.jsx';
import Chatbot from './components/Chatbot.jsx';
import AdminQueryResponse from './components/AdminQueryResponse.jsx';
// Layout Components
const UserLayout = ({ children }) => (
  <>
    <Sidebar />
    {/* <Header /> */}
    <main>{children}</main>
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <>
    <SideBar />
    <main>{children}</main>
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/managebookings"
          element={
            <AdminLayout>
              <ManageBookings />
            </AdminLayout>
          }
        />
        <Route
          path="/managedestinations"
          element={
            <AdminLayout>
              <ManageDestinations />
            </AdminLayout>
          }
        />
        <Route
          path="/managetours"
          element={
            <AdminLayout>
              <ManageTours />
            </AdminLayout>
          }
        />
        <Route
          path="/AdminQuery"
          element={
            <AdminLayout>
              <AdminQueryResponse />
            </AdminLayout>
          }
        />
        {/* User routes */}
        <Route
          path="/home"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/tours"
          element={
            <UserLayout>
              <Tours />
            </UserLayout>
          }
        />
        <Route
          path="/trek"
          element={
            <UserLayout>
              <Trek />
            </UserLayout>
          }
        />
        <Route
          path="/Chatbot"
          element={
            <UserLayout>
              <Chatbot />
            </UserLayout>
          }
        />        
        <Route
          path="/feedback"
          element={
            <UserLayout>
              <Feedback />
            </UserLayout>
          }
        />
        <Route
          path="/faqs"
          element={
            <UserLayout>
              <FAQs />
            </UserLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <UserLayout>
              <AboutUs />
            </UserLayout>
          }
        />
        <Route
          path="/userprofile"
          element={
            <UserLayout>
              <UserProfile />
            </UserLayout>
          }
        />
        <Route
          path="/contactus"
          element={
            <UserLayout>
              <ContactUs />
            </UserLayout>
          }
        />
        <Route
          path="/signnew"
          element={
            <UserLayout>
              <SignNew />
            </UserLayout>
          }
        />
        <Route
          path="/tourguide"
          element={
            <UserLayout>
              <TourGuide />
            </UserLayout>
          }
        />
        <Route
          path="/termsofservice"
          element={
            <UserLayout>
              <TermsOfService />
            </UserLayout>
          }
        />
        <Route
          path="/booking"
          element={
            <UserLayout>
              <BookingPage />
            </UserLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <UserLayout>
              <PaymentPage />
            </UserLayout>
          }
        />
        <Route
          path="/weather"
          element={
            <UserLayout>
              <WeatherForecast />
            </UserLayout>
          }
        />
        <Route
          path="/review"
          element={
            <UserLayout>
              <Review />
            </UserLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <UserLayout>
              <Chatbox />
            </UserLayout>
          }
        />
        <Route
          path="/car"
          element={
            <UserLayout>
              <CarRental />
            </UserLayout>
          }
        />
        <Route
          path="/privacypolicy"
          element={
            <UserLayout>
              <Privacy />
            </UserLayout>
          }
        />
        <Route
          path="/MyBookings"
          element={
            <UserLayout>
              <MyBookings />
            </UserLayout>
          }
        />
        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
