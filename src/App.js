import './App.css';
import SignNew from './components/signnew.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import Tours from './components/tours.jsx';
import Trek from './components/trek';
import Feedback from './components/feedback.jsx';
import FAQs from './components/faqs.jsx';
import AboutUs from './components/aboutus.jsx';
import UserProfile from './components/UserProfile.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ManageBookings from './components/ManageBookings.jsx';
import ManageDestinations from './components/ManageDestinations.jsx';
import ManageTours from './components/ManageTours.jsx';
import Review from './components/Review.jsx';
import SideBar from './components/adminSideBar.jsx'
// import Header from './components/header.jsx';
// import Footer from './components/footer.jsx';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      {/* <Header/> */} {/*for client side call this */}
      <SideBar/> {/*for admin side call this */}
      <Routes>
        <Route path="/signnew" element={<SignNew/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/trek" element={<Trek />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/managebookings" element={<ManageBookings />} />
        <Route path="/managedestinations" element={<ManageDestinations />} />
        <Route path="/managetours" element={<ManageTours />} />
        <Route path="/review" element={<Review />} />
        {/* <Route path="*" element={<Login />} /> Redirect to Login if the path is not found */}
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
