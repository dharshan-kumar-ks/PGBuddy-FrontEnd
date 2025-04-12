import React, { useState } from 'react';
import './PostBox.css';
import axios from 'axios';

function PostBox() {
  const [noticeTitle, setNoticeTitle] = useState(''); // State for the notice title
  const [successPopup, setSuccessPopup] = useState(false); // State for success popup

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post('http://localhost:8081/api/notices/publish', { title: noticeTitle }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });

      console.log('Notice published successfully:', response.data);
      setSuccessPopup(true); // Show success popup
      setNoticeTitle(''); // Clear the text box
    } catch (error) {
      console.error('Error publishing notice:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="post-box">
      <h3>Publish Notice</h3>
      <form onSubmit={handlePublish}>
        <div className="form-group">
          <label>Notice Title</label>
          <textarea
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            required
            placeholder="Write your notice title here..."
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="publish-button">Publish Notice</button>
        </div>
      </form>

      {successPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h2>Success!</h2>
            <p>The notice has been published successfully!</p>
            <button onClick={() => setSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostBox;