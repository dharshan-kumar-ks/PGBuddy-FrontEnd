import React from 'react';
//import FoodPreference from './FoodPreference.css';
import './Cafe.css';

function FoodPreference({ filter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      <button onClick={() => onFilterChange(null)} className={!filter ? 'active' : ''}>All</button>
      <button onClick={() => onFilterChange('veg')} className={filter === 'veg' ? 'active' : ''}>🟢 Veg</button>
      <button onClick={() => onFilterChange('non-veg')} className={filter === 'non-veg' ? 'active' : ''}>🔴 Non-Veg</button>
    </div>
  );
}

export default FoodPreference;
