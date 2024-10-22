import { Link } from 'react-router-dom';
import React from 'react';
const Header=()=>{
    return(
        <header>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/tours">Tours</Link></li>
            <li><Link to="/trek">Treks</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/userprofile">Profile</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
          </ul>
        </nav>
      </header>
    );
};

export default Header;