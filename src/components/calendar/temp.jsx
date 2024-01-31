import React, { useState } from "react";
import { Day } from "../day/day";
import "./calendar.css";

export const CalendarComponent = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const isBusinessDay = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek > 0 && dayOfWeek < 6;
  };

  const isDateInRange = (date, start, end) => {
    return start && end && date >= start && date <= end;
  };

  const selectDate = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(() => date);
      setEndDate(null);
    } else {
      if (date > startDate && isBusinessDay(date)) {
        setEndDate(() => date);
      }
    }
  };

  const processSelectedRange = () => {
    let range = [];
    let weekends = [];
    if (startDate && endDate) {
      let currentDate = new Date(startDate.getTime());
      while (currentDate <= endDate) {
        range.push(currentDate);
        // Adjust the condition to consider Saturday and Sunday as weekend days
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
          weekends.push(currentDate);
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    }
    onDateChange([range, weekends]);
  };

  const renderDays = () => {
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      daysArray.push(
        <Day
          key={i}
          day={dayDate}
          isSelected={isDateInRange(dayDate, startDate, endDate)}
          isInRange={isDateInRange(dayDate, startDate, endDate)}
          isBusinessDay={isBusinessDay}
          onSelect={selectDate}
        />
      );
    }
    return daysArray;
  };

  return (
    <div>
      <div className="calendar">{renderDays()}</div>
      <button onClick={processSelectedRange}>Process Selected Range</button>
    </div>
  );
};

export default CalendarComponent;
