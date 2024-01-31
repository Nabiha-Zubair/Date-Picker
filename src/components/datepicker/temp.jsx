import React from 'react';
import './day.css'; // Import the CSS file for styling

export const Day = ({
  day,
  isSelected,
  isInRange,
  isBusinessDay,
  onSelect,
}) => {
  const formattedDay = day.toLocaleDateString('en-US', { day: 'numeric' });

  const getDayStyle = () => {
    if (isSelected) {
      return 'selected-day';
    } else if (isInRange) {
      return 'in-range-day';
    } else if (!isBusinessDay(day)) {
      return 'non-business-day';
    }
    // Add additional styling for other cases if needed
    return '';
  };

  return (
    <button className={`day ${getDayStyle()}`} onClick={() => onSelect(day)}>
      <h3>{formattedDay}</h3>
    </button>
  );
};