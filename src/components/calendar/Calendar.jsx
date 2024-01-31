import React, { useEffect, useState } from "react";
import {
  DAYS_OF_WEEK,
  getDaysInMonth,
  firstDayOfWeek,
} from "../../helpers/utils";

export default function Calendar({ currentYear, currentMonth }) {
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const totalDaysInCalendar = getDaysInMonth(currentYear, currentMonth);

    const extraDays = firstDayOfWeek(currentYear, currentMonth) % 7;
    const days = Array.from(
      {
        length: totalDaysInCalendar + extraDays || 0,
      },
      (_, index) => index - firstDayOfWeek(currentYear, currentMonth) + 1
    );

    setCalendarDays(days);
  }, [currentMonth, currentYear]);

  return (
    <div className="mx-auto max-w-screen-md mt-8 p-5">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <button key={day} className="text-center font-bold">
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {calendarDays?.map((day, index) => (
          <button
            key={index}
            className={`text-center border p-2 ${
              day <= 0 ? "text-gray-400" : ""
            }`}
            onClick={() => console.log("fefe")}
          >
            {day > 0 ? day : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
