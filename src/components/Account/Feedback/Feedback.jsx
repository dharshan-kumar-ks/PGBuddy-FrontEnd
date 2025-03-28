import React, { useState } from 'react';
import './Feedback.css';
import TopNavigationBar from '../../TopNavigationBar';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const navigate = useNavigate();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert('Please enter your feedback before submitting.');
      return;
    }
    // In a real app, you would send the feedback to a backend API here
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
    setFeedback('');
    navigate('/account'); // Redirect back to the Account page
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
    // In a real app, you would send the rating to a backend API here
    console.log('Rating submitted:', rating);
    alert('Thank you for your rating!');
    setRating(0);
    navigate('/account'); // Redirect back to the Account page
  };

  return (
    <div className="feedback-container">
      <TopNavigationBar />
      <div className="feedback-content">
        <h1>Share Your Feedback</h1>

        {/* Wrapper for side-by-side layout */}
        <div className="feedback-wrapper">
          {/* Feedback Form Section (Left) */}
          <div className="feedback-section">
            {/* New header container */}
            <div className="feedback-header">
              <h2>Write Your Feedback</h2>
              <p>We value your input! Let us know how we can improve.</p>
            </div>
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
            <h2>Rate Our Platform</h2>
            <p>How would you rate your experience with our PG management platform?</p>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={{ display: 'none' }}
                    />
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