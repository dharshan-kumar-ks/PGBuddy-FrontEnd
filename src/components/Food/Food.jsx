import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Food.css';
import TopNavigationBar from '../Navigation/TopNavigationBar';
import MenuCard from './MenuCard/MenuCard';

function Food() {
  // State to manage the selected meal type (Breakfast, Lunch, Dinner)
  const [mealType, setMealType] = useState('Breakfast');

  // State to track the selected meal and day
  const [selectedMeal, setSelectedMeal] = useState('default');
  const [selectedDay, setSelectedDay] = useState('Today');

  // State to show/hide notification
  const [showNotification, setShowNotification] = useState(true);

  // State to manage meal options with vote counts
  const [mealOptionsState, setMealOptionsState] = useState([]);

  // Close the notification banner
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  // Generate the week menu dynamically
  const weekMenu = Array.from({ length: 4 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      day: index === 0 ? 'Today' : index === 1 ? 'Tom' : dayNames[date.getDay()],
      date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
      counter: '0/2', // Placeholder counter
    };
  });

  // Fetch meal options and their vote counts from the backend
  useEffect(() => {
    const fetchMealOptionsAndCounts = async () => {
      try {
        console.log('Fetching meal options for:', {
          mealDate: '2025-04-01', // Hardcoded date for now
          mealTime: mealType.toUpperCase(),
        });

        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/food/search?mealDate=2025-04-01&mealTime=${mealType.toUpperCase()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );

        console.log('API response:', response.data);

        // Map the API response to the required format
        const mappedData = response.data.map((item) => ({
          day: item.mealDayType,
          mealType: item.mealTimeType,
          meals: [
            {
              id: item.id,
              name: item.meal.mealItems.join(', '), // Combine meal items into a single string
              description: `+ ${item.meal.mealAddOn.join(', ')}`, // Add meal add-ons
              image: `/${item.meal.mealImageUrl}`, // Meal image URL
              count: 0, // Initialize vote count to 0
            },
          ],
        }));

        console.log('Mapped meal options:', mappedData);

        // Fetch vote counts for all meals
        const updatedMealOptions = await Promise.all(
          mappedData.map(async (option) => {
            const updatedMeals = await Promise.all(
              option.meals.map(async (meal) => {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const voteCountResponse = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/api/food/vote/count/${meal.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                  }
                );
                return { ...meal, count: voteCountResponse.data }; // Update meal with vote count
              })
            );
            return { ...option, meals: updatedMeals }; // Update option with updated meals
          })
        );

        setMealOptionsState(updatedMealOptions); // Update state with fetched meal options
      } catch (error) {
        console.error('Error fetching meal options or vote counts:', error); // Log error
      }
    };

    fetchMealOptionsAndCounts();
  }, [mealType]); // Re-fetch meal options when mealType changes

  // Fetch vote counts for all meals
  const fetchVoteCounts = async () => {
    try {
      const updatedMealOptions = await Promise.all(
        mealOptionsState.map(async (option) => {
          const updatedMeals = await Promise.all(
            option.meals.map(async (meal) => {
              const token = localStorage.getItem('token'); // Retrieve token from localStorage
              const voteCountResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/food/vote/count/${meal.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add token to Authorization header
                  },
                }
              );
              return { ...meal, count: voteCountResponse.data }; // Update meal with vote count
            })
          );
          return { ...option, meals: updatedMeals }; // Update option with updated meals
        })
      );
      setMealOptionsState(updatedMealOptions); // Update state with fetched vote counts
    } catch (error) {
      console.error('Error fetching vote counts:', error); // Log error
    }
  };

  useEffect(() => {
    fetchVoteCounts(); // Fetch vote counts when the component mounts
  }, []);

  // Flatten the meal options to get the current meal options
  const currentMealOptions = mealOptionsState.flatMap(option => option.meals);

  // State to manage the "Skip" option
  const [skipOption, setSkipOption] = useState({
    id: 'skip',
    name: `Skip ${mealType}`,
    description: 'Help us cut down food wastage. Be sure',
    image: '/meals-1.jpg',
    count: 0,
  });

  // Update the "Skip" option name when mealType changes
  React.useEffect(() => {
    setSkipOption((prev) => ({
      ...prev,
      name: `Skip ${mealType}`,
    }));
  }, [mealType]);

  // Handle day selection
  const handleDayClick = (day, index) => {
    setSelectedDay(day); // Update selected day
    setSelectedMeal(null); // Reset selected meal when switching days

    const targetDate = new Date('2025-04-01'); // Start date
    targetDate.setDate(targetDate.getDate() + index); // Adjust date by index

    fetchMealOptionsAndCounts(targetDate.toISOString().split('T')[0]);
  };

  const fetchMealOptionsAndCounts = async (mealDate) => {
    try {
      console.log('Fetching meal options for:', { mealDate, mealTime: mealType.toUpperCase() });

      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/search?mealDate=${mealDate}&mealTime=${mealType.toUpperCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );

      const mappedData = response.data.map((item) => ({
        day: item.mealDayType,
        mealType: item.mealTimeType,
        meals: [
          {
            id: item.id,
            name: item.meal.mealItems.join(', '),
            description: `+ ${item.meal.mealAddOn.join(', ')}`,
            image: `/${item.meal.mealImageUrl}`,
            count: 0, // Initialize count to 0
          },
        ],
      }));

      const updatedMealOptions = await Promise.all(
        mappedData.map(async (option) => {
          const updatedMeals = await Promise.all(
            option.meals.map(async (meal) => {
              const token = localStorage.getItem('token'); // Retrieve token from localStorage
              const voteCountResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/food/vote/count/${meal.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add token to Authorization header
                  },
                }
              );
              return { ...meal, count: voteCountResponse.data };
            })
          );
          return { ...option, meals: updatedMeals };
        })
      );

      setMealOptionsState(updatedMealOptions);
    } catch (error) {
      console.error('Error fetching meal options or vote counts:', error);
    }
  };

  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  const handleMealSelect = async (mealId) => {
    if (selectedMeal === mealId) {
      console.log('User has already voted for this meal. Skipping POST request.');
      return; // Prevent duplicate voting requests
    }

    setSelectedMeal(mealId); // Update selected meal

    if (mealId === 'skip') {
      // Increment skip option count locally
      setSkipOption((prev) => ({
        ...prev,
        count: prev.count + 1,
      }));
    } else {
      try {
        console.log('Sending POST request to backend:', {
          url: `${import.meta.env.VITE_BACKEND_URL}/api/food/vote`,
          body: {
            mealVoteId: mealId,
            userId: userId,
          },
        });

        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food/vote`, {
          mealVoteId: mealId,
          userId: userId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });

        console.log('POST response from backend:', response.data); // Log success message

        // Fetch the updated vote counts
        fetchVoteCounts();
      } catch (error) {
        console.error('Error voting for meal:', error); // Log error
        if (error.response) {
          console.error('Error response from backend:', {
            status: error.response.status,
            data: error.response.data,
          });
        }
      }
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
      {/* Top Navigation Bar */}
      <TopNavigationBar />

      {/* Weekly Menu Section */}
      <section className="menu-week">
        <h2>Menu for the week</h2>
        <div className="days-list-tabs">
          {/* Render buttons for each day in the week menu */}
          {weekMenu.map((menu, index) => (
            <button
              key={index}
              className={`day ${menu.day === selectedDay ? 'active' : ''}`} // Highlight selected day
              onClick={() => handleDayClick(menu.day, index)} // Handle day selection
            >
              <span>{menu.day}</span> {/* Display day name */}
              <span>{menu.date}</span> {/* Display date */}
              <span className="counter">{menu.counter}</span> {/* Placeholder for meal counter */}
            </button>
          ))}
        </div>
      </section>

      {/* Notification Banner */}
      {showNotification && (
        <div className="notification">
          <span className="clock-icon">⏰</span> {/* Clock icon */}
          <span>Your window to set tomorrow's preferences will close at 5 PM today</span> {/* Notification message */}
          <button className="close-btn" onClick={handleCloseNotification}>
            &times; {/* Close button */}
          </button>
        </div>
      )}

      {/* Meal Type Tabs */}
      <div className="meal-type-tabs">
        {/* Render buttons for each meal type */}
        <button
          className={mealType === 'Breakfast' ? 'active' : ''} // Highlight active meal type
          onClick={() => {
            setMealType('Breakfast'); // Set meal type to Breakfast
            setSelectedMeal('default'); // Reset selected meal
          }}
        >
          Breakfast
        </button>
        <button
          className={mealType === 'Lunch' ? 'active' : ''} // Highlight active meal type
          onClick={() => {
            setMealType('Lunch'); // Set meal type to Lunch
            setSelectedMeal('default'); // Reset selected meal
          }}
        >
          Lunch
        </button>
        <button
          className={mealType === 'Dinner' ? 'active' : ''} // Highlight active meal type
          onClick={() => {
            setMealType('Dinner'); // Set meal type to Dinner
            setSelectedMeal('default'); // Reset selected meal
          }}
        >
          Dinner
        </button>
      </div>

      {/* Meal Options Section */}
      <section className="meal-options">
        {/* Render meal options */}
        {currentMealOptions.map((meal) => (
          <MenuCard
            key={meal.id} // Unique key for each meal
            meal={meal} // Pass meal data to MenuCard
            selectedMeal={selectedMeal} // Pass selected meal state
            onMealSelect={handleMealSelect} // Handle meal selection
            mealType={mealType} // Pass current meal type
          />
        ))}
        {/* Render Skip Option */}
        <MenuCard
          meal={skipOption} // Pass skip option data
          selectedMeal={selectedMeal} // Pass selected meal state
          onMealSelect={handleMealSelect} // Handle meal selection
          mealType={mealType} // Pass current meal type
          isSkipOption={true} // Indicate this is the skip option
        />
      </section>
    </div>
  );
}

export default Food;