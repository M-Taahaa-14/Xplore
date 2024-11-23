// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const app = express();

// app.use(bodyParser.json());

// app.post('/api/open-gemini', async (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ error: 'No question provided' });
//   }

//   try {
//     // Make sure this API endpoint and body format are correct as per OpenGemini API documentation
//     const response = await axios.post('https://api.opengemini.com', {
//       query: question,
//       // You may need to add authentication, headers, or other parameters
//     });

//     // Assuming the response contains an 'answer' field. Adjust as per the actual API response.
//     const answer = response.data.answer;  
//     res.json({ answer });
//   } catch (error) {
//     // Log the error for debugging
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong', details: error.message });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });


// // import React, { useState } from 'react';

// // const AIChatbot = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [userMessage, setUserMessage] = useState("");

// //   const sendMessage = async () => {
// //     const newMessages = [...messages, { user: "You", text: userMessage }];
// //     setMessages(newMessages);
// //     setUserMessage("");

// //     // Call the OpenGeminiAPI here to get the response
// //     const response = await fetch('/api/open-gemini', {
// //       method: 'POST',
// //       body: JSON.stringify({ question: userMessage }),
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     const data = await response.json();
// //     setMessages([...newMessages, { user: "AI", text: data.answer }]);
// //   };

// //   return (
// //     <div className="chatbot-container">
// //       <div className="chatbot-header">
// //         <h4>Ask me anything about your next tour!</h4>
// //       </div>
// //       <div className="chatbot-messages">
// //         {messages.map((msg, idx) => (
// //           <div key={idx} className={`message ${msg.user}`}>
// //             <p>{msg.text}</p>
// //           </div>
// //         ))}
// //       </div>
// //       <input
// //         type="text"
// //         value={userMessage}
// //         onChange={(e) => setUserMessage(e.target.value)}
// //         placeholder="Ask me about a tour..."
// //       />
// //       <button onClick={sendMessage}>Send</button>
// //     </div>
// //   );
// // };

// // export default AIChatbot;
