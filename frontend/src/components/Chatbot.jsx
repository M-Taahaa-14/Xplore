import React, { useState, useRef, useEffect } from "react";
import axios from "axios";  // Importing Axios
import "./Chatbot.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const quickActions = [
    "Tell me about the latest AI developments",
    "How can I improve my productivity?",
    "Give me some learning resources",
    "Help me with problem-solving",
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (message = inputMessage) => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Make the POST request using Axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chat/", // API endpoint
        {
          message, // Sending message in the body
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensuring content type is JSON
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
          },
        }
      );

      // Handle the response from the backend
      if (response.data.response) {
        setMessages((prev) => [...prev, { text: response.data.response, isUser: false }]);
      } else if (response.data.error) {
        setMessages((prev) => [
          ...prev,
          { text: `Error: ${response.data.error}`, isUser: false },
        ]);
      }
    } catch (error) {
      // Handle any errors
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${error.message}`, isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main-container">
      <div className="chat-interface">
        <div className="header">
          <h1>AI Assistant</h1>
          <p className="subtitle">
            Your personal AI companion for daily tasks and information
          </p>
        </div>

        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleSend(action)}
              disabled={isLoading}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="chat-container" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? "user-message" : "ai-message"}`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="message ai-message loading">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            rows="2"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
