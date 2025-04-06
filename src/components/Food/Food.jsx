import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Food.css';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import MenuCard from './MenuCard/MenuCard';

function Food() {
  const [mealType, setMealType] = useState('Breakfast');
  const [selectedMeal, setSelectedMeal] = useState('default');
  const [selectedDay, setSelectedDay] = useState('Today');
  const [showNotification, setShowNotification] = useState(true);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  // State to manage meal options with counts
  const [mealOptionsState, setMealOptionsState] = useState([]);

  const weekMenu = Array.from({ length: 4 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      day: index === 0 ? 'Today' : index === 1 ? 'Tom' : dayNames[date.getDay()],
      date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
      counter: '0/2',
    };
  });

  // Fetch meal options from the backend API
  useEffect(() => {
    const fetchMealOptions = async () => {
      try {
        console.log('Fetching meal options for:', {
          mealDate: '2025-04-01',
          mealTime: mealType.toUpperCase(),
        });

        const response = await axios.get(
          `http://localhost:8081/api/food/search?mealDate=2025-04-01&mealTime=${mealType.toUpperCase()}`
        );

        console.log('API response:', response.data);

        const mappedData = response.data.map((item) => ({
          day: item.mealDayType,
          mealType: item.mealTimeType,
          meals: [
            {
              id: item.id,
              name: item.meal.mealItems.join(', '),
              description: `+ ${item.meal.mealAddOn.join(', ')}`,
              image: `/${item.meal.mealImageUrl}`,
              count: 0,
            },
          ],
        }));

        console.log('Mapped meal options:', mappedData);

        setMealOptionsState(mappedData);
      } catch (error) {
        console.error('Error fetching meal options:', error);
      }
    };

    fetchMealOptions();
  }, [mealType]);

  // Directly use all fetched meal options as the current meal options
  const currentMealOptions = mealOptionsState.flatMap(option => option.meals);

  // Skip option with a count
  const [skipOption, setSkipOption] = useState({
    id: 'skip',
    name: `Skip ${mealType}`,
    description: 'Help us cut down food wastage. Be sure',
    image: '/meals-1.jpg',
    count: 0,
  });

  // Update skip option name when mealType changes
  React.useEffect(() => {
    setSkipOption((prev) => ({
      ...prev,
      name: `Skip ${mealType}`,
    }));
  }, [mealType]);

  const handleDayClick = (day, index) => {
    setSelectedDay(day);
    setSelectedMeal('default'); // Reset selected meal when day changes

    const targetDate = new Date('2025-04-01'); // Start date
    targetDate.setDate(targetDate.getDate() + index); // Adjust date by index

    const fetchMealOptions = async () => {
      try {
        console.log('Fetching meal options for:', {
          mealDate: targetDate.toISOString().split('T')[0],
          mealTime: mealType.toUpperCase(),
        });

        const response = await axios.get(
          `http://localhost:8081/api/food/search?mealDate=${targetDate.toISOString().split('T')[0]}&mealTime=${mealType.toUpperCase()}`
        );

        console.log('API response:', response.data);

        const mappedData = response.data.map((item) => ({
          day: item.mealDayType,
          mealType: item.mealTimeType,
          meals: [
            {
              id: item.id,
              name: item.meal.mealItems.join(', '),
              description: `+ ${item.meal.mealAddOn.join(', ')}`,
              image: `/${item.meal.mealImageUrl}`,
              count: 0,
            },
          ],
        }));

        console.log('Mapped meal options:', mappedData);

        setMealOptionsState(mappedData);
      } catch (error) {
        console.error('Error fetching meal options:', error);
      }
    };

    fetchMealOptions();
  };

  const handleMealSelect = (mealId) => {
    setSelectedMeal(mealId);

    if (mealId === 'skip') {
      // Increment skip option count
      setSkipOption((prev) => ({
        ...prev,
        count: prev.count + 1,
      }));
    } else {
      // Increment the count of the selected meal option
      setMealOptionsState((prevOptions) =>
        prevOptions.map((option) => {
          if (option.day === selectedDay && option.mealType === mealType) {
            return {
              ...option,
              meals: option.meals.map((meal) =>
                meal.id === mealId ? { ...meal, count: meal.count + 1 } : meal
              ),
            };
          }
          return option;
        })
      );
    }
  };

  // If no meal options are found, show a fallback message
  if (!currentMealOptions.length) {
    return (
      <div className="food-container">
        <TopNavigationBar />
        <section className="menu-week">
          <h2>Menu for the week</h2>
          <div className="days-list-tabs">
            {weekMenu.map((menu, index) => (
              <button
                key={index}
                className={`day ${menu.day === selectedDay ? 'active' : ''}`}
                onClick={() => handleDayClick(menu.day, index)}
              >
                <span>{menu.day}</span>
                <span>{menu.date}</span>
                <span className="counter">{menu.counter}</span>
              </button>
            ))}
          </div>
        </section>
        {showNotification && (
          <div className="notification">
            <span className="clock-icon">⏰</span>
            <span>Your window to set tomorrow's preferences will close at 5 PM today</span>
            <button className="close-btn" onClick={handleCloseNotification}>
              &times;
            </button>
          </div>
        )}
        <div className="meal-type-tabs">
          <button
            className={mealType === 'Breakfast' ? 'active' : ''}
            onClick={() => {
              setMealType('Breakfast');
              setSelectedMeal('default');
            }}
          >
            Breakfast
          </button>
          <button
            className={mealType === 'Lunch' ? 'active' : ''}
            onClick={() => {
              setMealType('Lunch');
              setSelectedMeal('default');
            }}
          >
            Lunch
          </button>
          <button
            className={mealType === 'Dinner' ? 'active' : ''}
            onClick={() => {
              setMealType('Dinner');
              setSelectedMeal('default');
            }}
          >
            Dinner
          </button>
        </div>
        <section className="meal-options">
          <p>No meal options available for {mealType} on {selectedDay}.</p>
        </section>
      </div>
    );
  }

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
              onClick={() => handleDayClick(menu.day, index)}
            >
              <span>{menu.day}</span>
              <span>{menu.date}</span>
              <span className="counter">{menu.counter}</span>
            </button>
          ))}
        </div>
      </section>

      {showNotification && (
        <div className="notification">
          <span className="clock-icon">⏰</span>
          <span>Your window to set tomorrow's preferences will close at 5 PM today</span>
          <button className="close-btn" onClick={handleCloseNotification}>
            &times;
          </button>
        </div>
      )}

      {/* Meal Type Tabs */}
      <div className="meal-type-tabs">
        <button
          className={mealType === 'Breakfast' ? 'active' : ''}
          onClick={() => {
            setMealType('Breakfast');
            setSelectedMeal('default');
          }}
        >
          Breakfast
        </button>
        <button
          className={mealType === 'Lunch' ? 'active' : ''}
          onClick={() => {
            setMealType('Lunch');
            setSelectedMeal('default');
          }}
        >
          Lunch
        </button>
        <button
          className={mealType === 'Dinner' ? 'active' : ''}
          onClick={() => {
            setMealType('Dinner');
            setSelectedMeal('default');
          }}
        >
          Dinner
        </button>
      </div>

      {/* Meal Options */}
      <section className="meal-options">
        {currentMealOptions.map((meal) => (
          <MenuCard
            key={meal.id}
            meal={meal}
            selectedMeal={selectedMeal}
            onMealSelect={handleMealSelect}
            mealType={mealType}
          />
        ))}
        <MenuCard
          meal={skipOption}
          selectedMeal={selectedMeal}
          onMealSelect={handleMealSelect}
          mealType={mealType}
          isSkipOption={true}
        />
      </section>
    </div>
  );
}

export default Food;