import React from "react";
import { dateClass } from "./styles";
import { checkBusinessDay } from "../../helpers/utils";

export default function Day({
  calendarDays,
  dateObjects,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  setBusinessRange,
  setWeekendRange,
}) {
  const handleDateSelections = (date) => {
    setStartDate(date);
    setEndDate(null);
    setWeekendRange([]);
    setBusinessRange([]);
  };

  const handleDatesChange = (index) => {
    const date = dateObjects[index];
    if (startDate === date) {
      handleDateSelections(null);
    } else if (
      (!startDate && checkBusinessDay(date)) ||
      (startDate && endDate)
    ) {
      handleDateSelections(date);
    } else if (date > startDate && checkBusinessDay(date)) {
      setEndDate(date);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-4">
      {calendarDays?.map((day, index) => (
        <button
          key={index}
          className={dateClass(day, dateObjects[index], startDate, endDate)}
          onClick={() => handleDatesChange(index)}
        >
          {day > 0 && day}
        </button>
      ))}
    </div>
  );
}
