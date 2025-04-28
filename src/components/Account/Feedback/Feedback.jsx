import React, { useState } from 'react';
import './Feedback.css';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import AdminTopNavigationBar from '../../AdminPages/AdminNavigation/AdminTopNavigationBar';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

// Renders the Feedback component for submitting feedback and ratings.
// Takes NavigationBar as input and returns a JSX element.
function Feedback({ NavigationBar }) {
  // State variables to manage feedback, rating, and hover effects.
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // React Router hooks for navigation and accessing location state.
  const navigate = useNavigate();
  const location = useLocation(); // Access location to retrieve state

  // Map string identifiers to actual components for dynamic navigation bar rendering.
  const navigationBarMap = {
    AdminTopNavigationBar: AdminTopNavigationBar,
    TopNavigationBar: TopNavigationBar,
  };

  // Resolve the navigation bar component based on location state or fallback to default.
  const ResolvedNavigationBar = navigationBarMap[location.state?.NavigationBar] || NavigationBar;

  // Handles feedback form submission.
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    // Validate feedback input.
    if (!feedback.trim()) {
      alert('Please enter your feedback before submitting.');
      return;
    }

    // Retrieve user ID from local storage.
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // Prepare feedback data for API submission.
    const feedbackData = {
      comment: feedback,
      rating: null, // Keep rating null for feedback submission
      userId: userId,
    };

    // Retrieve token from local storage and submit feedback to the backend.
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Feedback submitted:', data);
        alert('Thank you for your feedback!');
        setFeedback('');
        navigate('/account'); // Redirect back to the Account page
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again later.');
      });
  };

  // Handles rating submission.
  const handleRatingSubmit = () => {
    // Validate rating input.
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    // Retrieve user ID from local storage.
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // Prepare rating data for API submission.
    const ratingData = {
      comment: 'No comment provided', // Send a default comment instead of an empty string
      rating: rating,
      userId: userId,
    };

    // Retrieve token from local storage and submit rating to the backend.
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Rating submitted:', data);
        alert('Thank you for your rating!');
        setRating(0);
        navigate('/account'); // Redirect back to the Account page
      })
      .catch((error) => {
        console.error('Error submitting rating:', error);
        alert('Failed to submit rating. Please try again later.');
      });
  };

  return (
    <div className="feedback-container">
      {/* Main container for the feedback page layout. */}
      <ResolvedNavigationBar />
      <div className="feedback-content">
        <h1>Share Your Feedback</h1>

        {/* Wrapper for side-by-side layout of feedback and rating sections. */}
        <div className="feedback-wrapper">
          {/* Feedback Form Section (Left) */}
          <div className="feedback-section">
            {/* Header for feedback form. */}
            <div className="feedback-header">
              <h2>Write Your Feedback</h2>
              <p>We value your input! Let us know how we can improve.</p>
            </div>
            {/* Feedback form for user input. */}
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                className="feedback-textarea"
                placeholder="Enter your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
              />
              <button type="submit" className="submit-button">
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Rating Section (Right) */}
          <div className="rating-section">
            {/* Header for rating section. */}
            <h2>Rate Our Platform</h2>
            <p>How would you rate your experience with our PG management platform?</p>
            {/* Star rating component for user input. */}
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    {/* Hidden radio input for selecting a rating. */}
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={{ display: 'none' }}
                    />
                    {/* Star icon with hover and selection effects. */}
                    <FaStar
                      className="star"
                      size={30}
                      color={
                        ratingValue <= (hover || rating) ? '#26a69a' : '#b0aeae'
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            {/* Display the selected rating or prompt to select one. */}
            <p className="rating-text">
              {rating > 0 ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
            </p>
            <button className="submit-button" onClick={handleRatingSubmit}>
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;