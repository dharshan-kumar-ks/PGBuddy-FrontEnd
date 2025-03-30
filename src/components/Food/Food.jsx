import React, { useState } from 'react';
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

  // Initial meal options with a count field
  const initialMealOptions = [
    // Today (21 Mar)
    {
      day: 'Today',
      mealType: 'Breakfast',
      meals: [
        {
          id: 'default',
          name: 'Peas Idli, Sambar Plain',
          description: '+ Bread Butter Jam, Coconut Chutney',
          image: '/meals-1.jpg',
          count: 0, // Initial count
        },
        {
          id: 'bisibele',
          name: 'Bisibele Bhath, Bread Butter Jam',
          description: '+ Kara Boondi',
          image: '/meals-1.jpg',
          count: 0,
        },
        {
          id: 'dosa',
          name: 'Masala Dosa',
          description: '+ Sambar, Coconut Chutney',
          image: '/meals-1.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Today',
      mealType: 'Lunch',
      meals: [
        {
          id: 'default',
          name: 'Rice, Dal Tadka',
          description: '+ Aloo Gobi, Raita',
          image: '/meals-2.jpg',
          count: 0,
        },
        {
          id: 'south-indian',
          name: 'South Indian Thali',
          description: '+ Papad, Pickle',
          image: '/meals-2.jpg',
          count: 0,
        },
        {
          id: 'biryani',
          name: 'Veg Biryani',
          description: '+ Raita, Mirchi Salan',
          image: '/meals-2.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Today',
      mealType: 'Dinner',
      meals: [
        {
          id: 'default',
          name: 'Paneer Butter Masala',
          description: '+ Naan, Jeera Rice',
          image: '/meals-3.jpg',
          count: 0,
        },
        {
          id: 'north-indian',
          name: 'North Indian Thali',
          description: '+ Gulab Jamun',
          image: '/meals-3.jpg',
          count: 0,
        },
        {
          id: 'pasta',
          name: 'Pasta Alfredo',
          description: '+ Garlic Bread',
          image: '/meals-3.jpg',
          count: 0,
        },
      ],
    },
    // Tomorrow (22 Mar)
    {
      day: 'Tom',
      mealType: 'Breakfast',
      meals: [
        {
          id: 'default',
          name: 'Poha, Upma',
          description: '+ Sev, Coconut Chutney',
          image: '/meals-4.jpg',
          count: 0,
        },
        {
          id: 'western',
          name: 'Pancakes, Maple Syrup',
          description: '+ Fresh Fruits',
          image: '/meals-4.jpg',
          count: 0,
        },
        {
          id: 'paratha',
          name: 'Aloo Paratha',
          description: '+ Curd, Pickle',
          image: '/meals-4.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Tom',
      mealType: 'Lunch',
      meals: [
        {
          id: 'default',
          name: 'Chole Bhature',
          description: '+ Onion Salad, Pickle',
          image: '/meals-5.jpg',
          count: 0,
        },
        {
          id: 'biryani',
          name: 'Veg Biryani',
          description: '+ Raita, Mirchi Salan',
          image: '/meals-5.jpg',
          count: 0,
        },
        {
          id: 'thali',
          name: 'Gujarati Thali',
          description: '+ Dhokla, Khandvi',
          image: '/meals-5.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Tom',
      mealType: 'Dinner',
      meals: [
        {
          id: 'default',
          name: 'Pasta Alfredo',
          description: '+ Garlic Bread',
          image: '/meals-6.jpg',
          count: 0,
        },
        {
          id: 'continental',
          name: 'Grilled Veggies, Mashed Potatoes',
          description: '+ Mushroom Sauce',
          image: '/meals-6.jpg',
          count: 0,
        },
        {
          id: 'pizza',
          name: 'Pizza Margherita',
          description: '+ Garlic Bread',
          image: '/meals-6.jpg',
          count: 0,
        },
      ],
    },
    // Sunday (23 Mar)
    {
      day: 'Sun',
      mealType: 'Breakfast',
      meals: [
        {
          id: 'default',
          name: 'Masala Dosa',
          description: '+ Sambar, Coconut Chutney',
          image: '/meals-7.jpg',
          count: 0,
        },
        {
          id: 'paratha',
          name: 'Aloo Paratha',
          description: '+ Curd, Pickle',
          image: '/meals-7.jpg',
          count: 0,
        },
        {
          id: 'sandwich',
          name: 'Veg Sandwich',
          description: '+ Ketchup',
          image: '/meals-7.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Sun',
      mealType: 'Lunch',
      meals: [
        {
          id: 'default',
          name: 'Rajma Chawal',
          description: '+ Salad, Papad',
          image: '/meals-8.jpg',
          count: 0,
        },
        {
          id: 'thali',
          name: 'Gujarati Thali',
          description: '+ Dhokla, Khandvi',
          image: '/meals-8.jpg',
          count: 0,
        },
        {
          id: 'khichdi',
          name: 'Moong Dal Khichdi',
          description: '+ Ghee, Papad',
          image: '/meals-8.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Sun',
      mealType: 'Dinner',
      meals: [
        {
          id: 'default',
          name: 'Pizza Margherita',
          description: '+ Garlic Bread',
          image: '/meals-9.jpg',
          count: 0,
        },
        {
          id: 'italian',
          name: 'Lasagna',
          description: '+ Caesar Salad',
          image: '/meals-9.jpg',
          count: 0,
        },
        {
          id: 'north-indian',
          name: 'North Indian Thali',
          description: '+ Gulab Jamun',
          image: '/meals-9.jpg',
          count: 0,
        },
      ],
    },
    // Monday (24 Mar)
    {
      day: 'Mon',
      mealType: 'Breakfast',
      meals: [
        {
          id: 'default',
          name: 'Uttapam',
          description: '+ Sambar, Tomato Chutney',
          image: '/meals-10.jpg',
          count: 0,
        },
        {
          id: 'sandwich',
          name: 'Veg Sandwich',
          description: '+ Ketchup',
          image: '/meals-10.jpg',
          count: 0,
        },
        {
          id: 'poha',
          name: 'Poha, Upma',
          description: '+ Sev, Coconut Chutney',
          image: '/meals-10.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Mon',
      mealType: 'Lunch',
      meals: [
        {
          id: 'default',
          name: 'Pav Bhaji',
          description: '+ Butter Pav, Onion Salad',
          image: '/meals-11.jpg',
          count: 0,
        },
        {
          id: 'khichdi',
          name: 'Moong Dal Khichdi',
          description: '+ Ghee, Papad',
          image: '/meals-11.jpg',
          count: 0,
        },
        {
          id: 'chole',
          name: 'Chole Bhature',
          description: '+ Onion Salad, Pickle',
          image: '/meals-11.jpg',
          count: 0,
        },
      ],
    },
    {
      day: 'Mon',
      mealType: 'Dinner',
      meals: [
        {
          id: 'default',
          name: 'Dal Makhani',
          description: '+ Jeera Rice, Naan',
          image: '/meals-12.jpg',
          count: 0,
        },
        {
          id: 'punjabi',
          name: 'Punjabi Thali',
          description: '+ Lassi',
          image: '/meals-12.jpg',
          count: 0,
        },
        {
          id: 'paneer',
          name: 'Paneer Butter Masala',
          description: '+ Naan, Jeera Rice',
          image: '/meals-12.jpg',
          count: 0,
        },
      ],
    },
  ];

  // State to manage meal options with counts
  const [mealOptionsState, setMealOptionsState] = useState(initialMealOptions);

  const weekMenu = [
    { day: 'Today', date: '21 Mar', counter: '0/2' },
    { day: 'Tom', date: '22 Mar', counter: '0/3' },
    { day: 'Sun', date: '23 Mar', counter: '0/3' },
    { day: 'Mon', date: '24 Mar', counter: '0/2' },
  ];

  // Filter meal options based on selected day and meal type
  const currentMealOptions = mealOptionsState.find(
    (option) => option.day === selectedDay && option.mealType === mealType
  )?.meals || [];

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

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedMeal('default'); // Reset selected meal when day changes
    console.log(`Navigating to page for: ${day}`);
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
                onClick={() => handleDayClick(menu.day)}
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
              onClick={() => handleDayClick(menu.day)}
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