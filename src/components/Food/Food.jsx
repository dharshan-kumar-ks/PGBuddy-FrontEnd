import React, { useState } from 'react';
//import { Link, useLocation } from 'react-router-dom'; // Import Link from react-router-dom
import './Food.css';
import TopNavigationBar from '../TopNavigationBar';

function Food() {
  const [mealType, setMealType] = useState('Breakfast');
  const [selectedMeal, setSelectedMeal] = useState('default');
  const [selectedDay, setSelectedDay] = useState('Today'); // Add state for selected day
  //const location = useLocation(); // Get the current route

  const mealOptions = [
    {
      id: 'default',
      name: 'Peas Idli, Sambar Plain',
      description: '+ Bread Butter Jam, Coconut Chutney',
      image: '/meals-1.jpg', // CHANGE: Use relative path from public folder
    },
    {
      id: 'bisibele',
      name: 'Bisibele Bhath, Bread Butter Jam',
      description: '+ Kara Boondi',
      image: '/meals-1.jpg', // CHANGE: Use relative path from public folder
    },
  ];

  const weekMenu = [
    { day: 'Today', date: '21 Mar', counter: '0/2' },
    { day: 'Tom', date: '22 Mar', counter: '0/3' },
    { day: 'Sun', date: '23 Mar', counter: '0/3' },
    { day: 'Mon', date: '24 Mar', counter: '0/2' },
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log(`Navigating to page for: ${day}`);
    // Add navigation logic here, e.g., using react-router-dom's useNavigate
  };

  return (
    <div className="food-container">
      {/* Top Navigation */}
        <TopNavigationBar />

        {/* Menu for the Week */}
        <section className="menu-week">
          <h2>Menu for the week</h2>
          <div className="days-list-tabs">
            {weekMenu.map((menu, index) => (
          <button
            key={index}
            className={`day ${menu.day === selectedDay ? 'active' : ''}`}
            onClick={() => handleDayClick(menu.day)} // Update click handler
          >
            <span>{menu.day}</span>
            <span>{menu.date}</span>
            <span className="counter">{menu.counter}</span>
          </button>
            ))}
          </div>
        </section>

        <div className="notification">
          <span className="clock-icon">⏰</span>
          <span>Your window to set preferences will close at 5 PM today</span>
        </div>

        {/* Meal Type Tabs */}
      <div className="meal-type-tabs">
        <button
          className={mealType === 'Breakfast' ? 'active' : ''}
          onClick={() => setMealType('Breakfast')}
        >
          Breakfast
        </button>
        <button
          className={mealType === 'Lunch' ? 'active' : ''}
          onClick={() => setMealType('Lunch')}
        >
          Lunch
        </button>
        <button
          className={mealType === 'Dinner' ? 'active' : ''}
          onClick={() => setMealType('Dinner')}
        >
          Dinner
        </button>
      </div>

      {/* Meal Options */}
      <section className="meal-options">
        {mealOptions.map((meal) => (
          <div key={meal.id} className="meal-option">
            <img src={meal.image} alt={meal.name} className="meal-image" />
            <div className="meal-details">
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
            </div>
            <input
              type="radio"
              name="meal"
              value={meal.id}
              checked={selectedMeal === meal.id}
              onChange={() => setSelectedMeal(meal.id)}
            />
            {meal.id === 'default' && <span className="default-label">Default</span>}
          </div>
        ))}

        {/* Skip Option */}
        <div className="meal-option skip-option">
          <span>Skip Breakfast</span>
          <input
            type="radio"
            name="meal"
            value="skip"
            checked={selectedMeal === 'skip'}
            onChange={() => setSelectedMeal('skip')}
          />
          <p className="skip-note">Help us cut down food wastage. Be sure</p>
        </div>
      </section>

    </div>
  );
}

export default Food;