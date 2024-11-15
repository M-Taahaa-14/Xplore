import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simulate API call to fetch username
const fetchUsername = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('John Doe');
    }, 1000);
  });
};

// Chat Screen Component (Right-Side Dialog Box)
const ChatScreen = ({ closeChat }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch the username on component mount
  useEffect(() => {
    const getUsername = async () => {
      const fetchedUsername = await fetchUsername();
      setUsername(fetchedUsername);
    };
    getUsername();
  }, []);

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: username, text: message }]);
      setMessage(''); // Clear message input after sending
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Chat</h3>
        <button className="close-chat" onClick={closeChat}>X</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>
      <textarea
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
        rows="2"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

const Header = () => {
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChatScreen = () => {
    setChatVisible(!chatVisible);
  };

  return (

      <header>
        <nav>

          <ul>
            <li><Link to="/home" className="nav-link">Home</Link></li>
            <li><Link to="/tours" className="nav-link">Tours</Link></li>
            <li><Link to="/trek" className="nav-link">Treks</Link></li>
            <li><Link to="/faqs" className="nav-link">FAQs</Link></li>
            <li><Link to="/userprofile" className="nav-link">Profile</Link></li>
            <li><Link to="/aboutus" className="nav-link">About Us</Link></li>
            <li className="chat-button" onClick={toggleChatScreen}>
              <i className="fa fa-comments"></i> Chat
            </li>
          </ul>
        </nav>

        {/* Show Chat Screen if chatVisible is true */}
        {chatVisible && <ChatScreen closeChat={() => setChatVisible(false)} />}
      </header>      
  );
};

export default Header;
