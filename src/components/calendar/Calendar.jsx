import React, { useEffect, useState } from "react";
import {
  DAYS_OF_WEEK,
  getDaysInMonth,
  firstDayOfWeek,
  checkBusinessDay,
  dateFormatter,
  formatDate,
} from "../../helpers/utils";

export default function Calendar({ currentYear, currentMonth }) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [dateObjects, setDateObj] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekendRange, setWeekendRange] = useState([]);
  const [businessRange, setBusinessRange] = useState([]);

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
        dateFormatter(new Date(currentYear, currentMonth, days[i])),
      ]);
    }
    setCalendarDays(days);
  }, [currentMonth, currentYear]);

  const handleDatesChange = (index) => {
    const date = dateObjects[index];
    if (startDate === date) {
      setStartDate(null);
    } else if (
      (!startDate && checkBusinessDay(date)) ||
      (startDate && endDate)
    ) {
      setStartDate(date);
      setEndDate(null);
      setWeekendRange([]);
      setBusinessRange([]);
    } else if (date > startDate && checkBusinessDay(date)) {
      setEndDate(date);
    }
  };

  const checkDateRange = (date) => {
    if (startDate === date) {
      return true;
    } else if (startDate <= date && date <= (endDate || startDate)) {
      if (!checkBusinessDay(date)) {
        return false;
      }
      return true;
    }

    return startDate <= date && date <= (endDate || startDate);
  };

  const calculateRanges = () => {
    let weekends = [];
    let businessDays = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      if (checkBusinessDay(currentDate)) {
        businessDays.push(formatDate(currentDate));
      } else {
        weekends.push(formatDate(currentDate));
      }

      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    setBusinessRange(businessDays);
    setWeekendRange(weekends);
  };

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
              day <= 0 && "text-transparent"
            }  ${checkDateRange(dateObjects[index]) && "bg-[#D13E63]"} 
            ${
              checkBusinessDay(dateObjects[index])
                ? "text-gray-300"
                : "text-gray-600"
            }
            rounded-full hover:bg-[#DF6E8A]`}
            onClick={() => handleDatesChange(index)}
          >
            {day > 0 ? day : ""}
          </button>
        ))}
      </div>

      <div className="flex flex-col justify-end items-end">
        {endDate && (
          <div className="my-2">
            <button
              className="rounded p-2 px-3 bg-blue-600 self-end justify-end text-white"
              onClick={() => calculateRanges()}
            >
              Done
            </button>
            <p className="text-gray-400">Weekends: ({weekendRange.length})</p>
          </div>
        )}
      </div>
    </div>
  );
}
