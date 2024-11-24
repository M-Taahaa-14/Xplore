import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminQuery.css';

const AdminQueriesPage = () => {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState('');
  const [currentQueryId, setCurrentQueryId] = useState(null);

  // Fetch queries from the backend
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-queries');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  // Handle reply submission
  const handleReplySubmit = async (queryId) => {
    if (!reply) {
      alert('Please enter a reply.');
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/reply-query/${queryId}`,
        { reply },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Update the state with the new reply
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.id === queryId ? { ...query, admin_reply: reply } : query
        )
      );
      setReply('');
      setCurrentQueryId(null);
    } catch (error) {
      console.error('Error replying to query:', error);
    }
  };

  return (
    <div className="admin-queries-container">
      <h1>User Queries</h1>
      <div className="queries-list">
        {queries.map((query) => (
          <div key={query.id} className="query-card">
            <div className="user-query">
              <p className="user-name">{query.user_name}</p>
              <p className="query-content">{query.query}</p>
              <p className="query-date">{new Date(query.created_at).toLocaleString()}</p>
            </div>

            {query.admin_reply ? (
              <div className="admin-reply">
                <p className="admin-reply-content">{query.admin_reply}</p>
              </div>
            ) : (
              <div className="admin-reply-form">
                <textarea
                  value={currentQueryId === query.id ? reply : ''}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter your reply here..."
                />
                <button
                  onClick={() => handleReplySubmit(query.id)}
                  className="reply-button"
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQueriesPage;
