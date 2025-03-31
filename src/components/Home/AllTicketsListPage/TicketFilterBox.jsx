import React, { useState } from 'react';
import './TicketFilterBox.css';

function TicketFilterBox({ onFilterChange }) {
  // State for filter criteria
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]

  // Priority options
  const priorities = ['Low', 'Medium', 'High'];

  // Category options (based on your ticket data)
  const categories = ['Incident', 'Suggestion', 'Question', 'Problem'];

  // Status options
  const statuses = ['Resolved', 'Pending'];

  // Handle checkbox changes for Priority
  const handlePriorityChange = (priority) => {
    const updatedPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(updatedPriorities);
    onFilterChange({ priorities: updatedPriorities, categories: selectedCategories, statuses: selectedStatuses, dateRange });
  };

  // Handle checkbox changes for Category
  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onFilterChange({ priorities: selectedPriorities, categories: updatedCategories, statuses: selectedStatuses, dateRange });
  };

  // Handle checkbox changes for Status
  const handleStatusChange = (status) => {
    const updatedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(updatedStatuses);
    onFilterChange({ priorities: selectedPriorities, categories: selectedCategories, statuses: updatedStatuses, dateRange });
  };

  // Handle date range change (simplified for slider)
  const handleDateRangeChange = (event) => {
    const value = event.target.value;
    // For simplicity, we'll use a single slider to filter tickets older than a certain number of days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - value);
    setDateRange([startDate, endDate]);
    onFilterChange({ priorities: selectedPriorities, categories: selectedCategories, statuses: selectedStatuses, dateRange: [startDate, endDate] });
  };

  return (
    <div className="ticket-filter-box">
      <h3>Filters</h3>

      {/* Priority Filter */}
      <div className="filter-section">
        <h4>Priority</h4>
        {priorities.map((priority) => (
          <label key={priority} className="filter-option">
            <input
              type="checkbox"
              checked={selectedPriorities.includes(priority)}
              onChange={() => handlePriorityChange(priority)}
            />
            <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>
          </label>
        ))}
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        {categories.map((category) => (
          <label key={category} className="filter-option">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <span className="category">
              <i className={`icon-${category.toLowerCase()}`}></i>
              {category}
            </span>
          </label>
        ))}
      </div>

      {/* Status Filter */}
      <div className="filter-section">
        <h4>Status</h4>
        {statuses.map((status) => (
          <label key={status} className="filter-option">
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={() => handleStatusChange(status)}
            />
            <span className={`status ${status.toLowerCase()}`}>{status}</span>
          </label>
        ))}
      </div>

      {/* Request Date Filter (Slider) */}
      <div className="filter-section">
        <h4>Request Date (Last X Days)</h4>
        <input
          type="range"
          min="0"
          max="90" // Last 90 days
          step="1"
          defaultValue="90"
          onChange={handleDateRangeChange}
          className="date-range-slider"
        />
        <div className="date-range-labels">
          <span>0 days</span>
          <span>90 days</span>
        </div>
      </div>
    </div>
  );
}

export default TicketFilterBox;