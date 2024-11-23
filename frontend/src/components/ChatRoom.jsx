import React, { useState } from "react";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to the travel chat.", sender: "bot", time: "2:40:22 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString();
      setMessages([
        ...messages,
        { text: newMessage, sender: "user", time: currentTime },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Travel Chat Room</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
