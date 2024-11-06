import React from 'react'
import user_icon from '../images/icons8-name-50.png'
import email_icon from '../images/icons8-email-30.png'
import password_icon from '../images/icons8-password-50.png'
import './signnew.css';
const signnew = () => {
  return (
    <div>
        <div className="container">
            <div className="header">
                <div className="text">Sign Up Now!</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Enter your name here.'/>
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Enter your email here.' />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Enter your password here.'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default signnew;