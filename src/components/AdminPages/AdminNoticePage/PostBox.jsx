import React, { useState } from 'react';
import './PostBox.css';
import axios from 'axios';

// Renders the PostBox component to allow admins to create and manage posts.
// Takes no input and returns a JSX element representing the post creation box.
function PostBox() {
  const [noticeTitle, setNoticeTitle] = useState(''); // State for the notice title
  const [successPopup, setSuccessPopup] = useState(false); // State for success popup

  // Handles the publish action when the form is submitted.
  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notices/publish`, { title: noticeTitle }, {
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
      {/* Form for publishing a notice */}
      <form onSubmit={handlePublish}>
        <div className="form-group">
          <label>Notice Title</label>
          {/* Textarea for entering the notice title */}
          <textarea
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            required
            placeholder="Write your notice title here..."
          />
        </div>
        <div className="form-actions">
          {/* Button to submit the notice */}
          <button type="submit" className="publish-button">Publish Notice</button>
        </div>
      </form>

      {/* Success popup displayed after successful submission */}
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