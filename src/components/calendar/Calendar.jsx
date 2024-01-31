import React, { useEffect, useState } from "react";
import {
  DAYS_OF_WEEK,
  getDaysInMonth,
  firstDayOfWeek,
  checkBusinessDay,
} from "../../helpers/utils";

import Day from "./Day";

export default function Calendar({ currentYear, currentMonth }) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [dateObjects, setDateObj] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const totalDaysInCalendar = getDaysInMonth(currentYear, currentMonth);
    const firstDay = firstDayOfWeek(currentYear, currentMonth);
    const extraDays = firstDay % 7;
    const days = Array.from(
      {
        length: totalDaysInCalendar + extraDays || 0,
      },
      (_, index) => index - firstDayOfWeek(currentYear, currentMonth) + 1
    );

    for (let i = 0; i < days?.length; i++) {
      setDateObj((prevData) => [
        ...prevData,
        new Date(currentYear, currentMonth, days[i]),
      ]);
    }
    setCalendarDays(days);
  }, [currentMonth, currentYear]);

  const handleDatesChange = (index) => {
    const date = dateObjects[index];
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date > startDate && checkBusinessDay(date)) {
        setEndDate(date);
      }
    }
  };

  console.log("sates: ", startDate, endDate);

  return (
    <div className="mx-auto max-w-screen-md mt-8 p-5">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <button key={day} className="text-center font-bold text-white">
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {calendarDays?.map((day, index) => (
          <button
            key={index}
            className={`text-center text-gray-300 p-1  ${
              day <= 0 ? "text-transparent" : ""
            } rounded-full`}
            onClick={() => handleDatesChange(index)}
          >
            {day > 0 ? day : ""}
          </button>
          // <Day key={day} day={day} index={index} dateObjects={dateObjects} />
        ))}
      </div>

      <div className="flex justify-end items-end">
        {endDate && (
          <button className="rounded p-2 px-3 bg-blue-600 self-end justify-end text-white">
            Done
          </button>
        )}
      </div>
    </div>
  );
}
