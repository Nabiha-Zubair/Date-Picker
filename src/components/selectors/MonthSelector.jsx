import React from "react";
import { CALENDAR_MONTHS } from "../../helpers/utils";

export default function MonthSelector({ currentMonth, setCurrentMonth }) {
  const handleMonthChange = (e) => {
    setCurrentMonth(parseInt(e.target.value, 10));
  };
  return (
    <div className="flex text-center items-center justify-center m-3">
      <select
        id="months"
        value={currentMonth}
        onChange={handleMonthChange}
        className="text-gray-700 font-bold"
      >
        {CALENDAR_MONTHS.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}
