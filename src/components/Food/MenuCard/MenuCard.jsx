import React from 'react';
import './MenuCard.css';

function MenuCard({ meal, selectedMeal, onMealSelect, mealType, isSkipOption = false }) {
  return (
    <div className={`menu-card ${isSkipOption ? 'skip-option' : ''}`}>
      <img
        src={meal.image}
        alt={isSkipOption ? `Skip ${mealType}` : meal.name}
        className="meal-image"
        style={isSkipOption ? { opacity: 0.5 } : {}}
      />
      <div className="meal-details">
        <h3>{isSkipOption ? `Skip ${mealType}` : meal.name}</h3>
        <p>{isSkipOption ? 'Help us cut down food wastage' : meal.description}</p>
      </div>
      <div className="meal-selection">
        {meal.id === 'default' && !isSkipOption && <span className="default-label">Default</span>}
        <input
          type="radio"
          name="meal-selection"
          value={isSkipOption ? 'skip' : meal.id}
          checked={selectedMeal === (isSkipOption ? 'skip' : meal.id)}
          onChange={() => onMealSelect(isSkipOption ? 'skip' : meal.id)}
        />
      </div>
      <div className="meal-count">
        <span>{meal.count}</span>
      </div>
    </div>
  );
}

export default MenuCard;