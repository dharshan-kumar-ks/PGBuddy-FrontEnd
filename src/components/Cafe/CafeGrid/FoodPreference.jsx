import React from 'react';
//import '../Cafe.css';
import './FoodPreference.css';

// This component renders filter buttons for food preferences (All, Veg, Non-Veg).
// Takes 'filter' (current filter state) and 'onFilterChange' (callback to update filter) as props, and returns a set of buttons.
function FoodPreference({ filter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {/* Button to show all food items */}
      <button onClick={() => onFilterChange(null)} className={!filter ? 'active' : ''}>All</button>

      {/* Button to filter vegetarian food items */}
      <button onClick={() => onFilterChange('veg')} className={filter === 'veg' ? 'active' : ''}>
        <span className="circle green"></span> Veg
      </button>

      {/* Button to filter non-vegetarian food items */}
      <button onClick={() => onFilterChange('non-veg')} className={filter === 'non-veg' ? 'active' : ''}>
        <span className="circle red"></span> Non-Veg
      </button>
    </div>
  );
}

export default FoodPreference;