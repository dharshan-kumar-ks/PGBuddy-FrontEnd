import React from 'react';
import './MenuCard.css';

function MenuCard({ meal, selectedMeal, onMealSelect, mealType, isSkipOption = false }) {
  return (
    <div className={`menu-card ${isSkipOption ? 'skip-option' : ''}`}>
      {/* Display meal image */}
      <img
        src={meal.image} // Image URL for the meal
        alt={isSkipOption ? `Skip ${mealType}` : meal.name} // Alt text for accessibility
        className="meal-image"
        style={isSkipOption ? { opacity: 0.5 } : {}} // Dim the image if it's a skip option
      />

      {/* Display meal details */}
      <div className="meal-details">
        <h3>{isSkipOption ? `Skip ${mealType}` : meal.name}</h3> {/* Meal name or "Skip" text */}
        <p>{isSkipOption ? 'Help us cut down food wastage' : meal.description}</p> {/* Meal description or skip message */}
      </div>

      {/* Meal selection radio button */}
      <div className="meal-selection">
        {/* Show "Default" label for default meal */}
        {meal.id === 'default' && !isSkipOption && <span className="default-label">Default</span>}
        <input
          type="radio" // Radio button for meal selection
          name="meal-selection" // Group name for radio buttons
          value={isSkipOption ? 'skip' : meal.id} // Value is 'skip' for skip option, otherwise meal ID
          checked={selectedMeal === (isSkipOption ? 'skip' : meal.id)} // Check if this meal is selected
          onChange={() => onMealSelect(isSkipOption ? 'skip' : meal.id)} // Handle meal selection
        />
      </div>

      {/* Display vote count for the meal */}
      <div className="meal-count">
        <span>{meal.count}</span> {/* Number of votes for the meal */}
      </div>
    </div>
  );
}

export default MenuCard;